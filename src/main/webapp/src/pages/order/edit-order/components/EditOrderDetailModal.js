import {getAllServicesApi} from "../../../../apis/service-fetchers";
import "./EditOrderDetailModal.scss";
import {
    calculateTotalPriceWithQuantity,
    calculateTotalPriceWithFT,
    convertNumberToCurrency,
    formatServiceName, hideLoader,
    showLoader, calculateTotalPriceWithPingFeng
} from "../../../../utils/common-utils";
import {updateOrderDetailApi} from "../../../../apis/order-fetchers";
import {jqueryValidateClassOptions} from "../../../../utils/jquery-utils";
import {customSomethingWentWrongSwal, customSuccessSwal} from "../../../../utils/sweetalert-utils";

/**
 *
 * Edit Order Detail Modal
 * @param {object} [props] - Settings
 * @param {object} [props.settings] - Settings
 * @param {boolean} [props.settings.useApi] - Use api to get services list, default is true
 * @param {array} [props.settings.serviceList] - List of services, default is empty array. This will be used if useApi is false
 * @param {function} [props.update.onSuccess] - On success callback, default is show success swal
 * @param {function} [props.update.onFailure] - On failure callback, default is show something went wrong swal
 * @param {function} [props.update.onComplete] - On complete callback, default is empty function
 *
 * @returns {{
 *     $modal: (*|jQuery|HTMLElement),
 *     setForm: setForm,
 * }}
 */
export default function EditOrderDetailModal(props) {
    let useApi = props?.settings?.useApi ?? true;
    let serviceList = props?.settings?.serviceList ?? [];
    let updateOnSuccess = props?.update?.onSuccess ?? function (response) {
    	if(response.status) {
    		customSuccessSwal.fire();
    	} else {
    		customSomethingWentWrongSwal.fire();
    	}
    };
    let updateOnFailure = props?.update?.onFailure ?? function () {
    	customSomethingWentWrongSwal.fire();
    };
    let updateOnComplete = props?.update?.onComplete ?? function () {};

    // ========================================

    let servicesList = [];
    let $modal = $("<div>");
    let $form = $("<form>");

    let $orderIdInput = $("<input>").attr({
        "type": "hidden",
        "name": "orderId",
    });
    let $lineNumberInput = $("<input>").attr({
        "type": "hidden",
        "name": "lineNumber",
    });
    let $serviceSelect = $("<select>").addClass("form-select").attr({
        "name": "serviceId",
    });
    let $descriptionContainer = $("<div>");
    let $descriptionInput = $("<textarea>").addClass("form-control").attr({
        "rows": "3",
        "name": "description",
    });
    let $widthContainer = $("<div>");
    let $widthInput = $("<input>").addClass("form-control").attr({
        "type": "text",
        "name": "width",
        "min": "0",
    });
    let $heightContainer = $("<div>");
    let $heightInput = $("<input>").addClass("form-control").attr({
        "type": "text",
        "name": "height",
        "min": "0",
    });
    let $quantityContainer = $("<div>");
    let $quantityInput = $("<input>").addClass("form-control").attr({
        "type": "text",
        "name": "quantity",
        "min": "0",
        "step": "1"
    });
    let $unitPriceInput = $("<input>").addClass("form-control").attr({
        "type": "text",
        "name": "unitPrice",
        "min": "0",
        "step": "0.01",
    });
    let $totalPriceInput = $("<input>").addClass("form-control-plaintext").prop({
        "type": "text",
        "readonly": true,
    })

    $serviceSelect.ready(function () {
        if (useApi) {
            renderSelectServiceOptionByApi();
        } else {
            renderSelectServiceOptionByServices(serviceList);
        }
    });

    $serviceSelect.on("select2:select", function (e) {
        let unitPrice = e.params.data.price;
        setForm({
            orderId: $orderIdInput.val(),
            lineNumber: $lineNumberInput.val(),
            serviceId: e.params.data.id,
            description: $descriptionInput.val(),
            width: $widthInput.val(),
            height: $heightInput.val(),
            quantity: $quantityInput.val(),
            unitPrice: unitPrice/100,
        })
    })

    $widthInput.on("change", function () {
        renderTotalPrice();
    });

    $heightInput.on("change", function () {
        renderTotalPrice();
    });

    $quantityInput.on("change", function () {
        renderTotalPrice();
    });

    $unitPriceInput.on("change", function () {
        renderTotalPrice();
    });

    $form.validate({
        ...jqueryValidateClassOptions,
        rules: {
            [$serviceSelect.prop("name")]: {
                required: true,
            },
            [$widthInput.prop("name")]: {
                required: function () {
                    let service = $serviceSelect.select2("data")[0];
                    if (!service) {
                        return true;
                    }
                    switch (service.calculationType) {
                        case 0: // FT
                        case 2: // Pane
                            return true;
                        case 1: // Quantity
                            return false;
                        default:
                            return true;
                    }
                },
                number: true,
            },
            [$heightInput.prop("name")]: {
                number: true,
                required: function () {
                    let service = $serviceSelect.select2("data")[0];
                    if (!service) {
                        return true;
                    }
                    switch (service.calculationType) {
                        case 0: // FT
                        case 2: // Pane
                            return true;
                        case 1: // Quantity
                            return false;
                        default:
                            return true;
                    }
                }
            },
            [$quantityInput.prop("name")]: {
                required: function () {
                    let service = $serviceSelect.select2("data")[0];
                    if (!service) {
                        return true;
                    }
                    switch (service.calculationType) {
                        case 0: // FT
                        case 2: // Pane
                            return false;
                        case 1: // Quantity
                            return true;
                        default:
                            return true;
                    }
                },
                number: true,
            },
            [$unitPriceInput.prop("name")]: {
                required: true,
                number: true,
            }
        }
    })

    /**
     *
     * @param props
     * @param {string|number} props.orderId
     * @param {string|number} props.lineNumber
     * @param {string|number} props.serviceId
     * @param {string} props.description
     * @param {string|number} props.width
     * @param {string|number} props.height
     * @param {string|number} props.quantity
     * @param {string|number} props.unitPrice
     *
     */
    function setForm(props) {
        resetForm();
        // console.log(props)
        let orderId = props.orderId;
        let lineNumber = props.lineNumber;
        let serviceId = props.serviceId;
        let description = props.description;
        let width = props.width;
        let height = props.height;
        let quantity = props.quantity;
        let unitPrice = props.unitPrice;

        // ========================================

        $orderIdInput.val(orderId);
        $lineNumberInput.val(lineNumber);
        $serviceSelect.val(serviceId).trigger("change");
        $descriptionInput.val(description);

        $widthContainer.detach();
        $heightContainer.detach();
        $quantityContainer.detach();

        let service = servicesList.find(function (service) {
            return service.id === Number(serviceId);
        });

        switch (service.calculationType) {
            case 0:
            case 2: // FT, ping feng
                $widthInput.val(width);
                $heightInput.val(height);
                $descriptionContainer.after($widthContainer);
                $widthContainer.after($heightContainer);
                break;
            case 1: // Quantity
                $descriptionContainer.after($quantityContainer);
                $quantityInput.val(quantity);
                break;
            default:
                break;
        }
        $unitPriceInput.val(unitPrice);
        renderTotalPrice();
    }

    function renderTotalPrice() {
        let serviceId = $serviceSelect.val();
        let service = servicesList.find(function (service) {
            return service.id === Number(serviceId);
        });
        let calculationType = service.calculationType;
        let width = $widthInput.val();
        let height = $heightInput.val();
        let quantity = $quantityInput.val();
        let unitPrice = $unitPriceInput.val();
        let totalPrice = 0;
        switch (calculationType) {
            case 0: // FT
                if (width && unitPrice) {
                    totalPrice = calculateTotalPriceWithFT(width, unitPrice)
                }
                break;
            case 1: // Quantity
                if (quantity && unitPrice) {
                    totalPrice = calculateTotalPriceWithQuantity(quantity, unitPrice);
                }
                break;
            case 2: // ping feng
                if (width && height && unitPrice) {
                    totalPrice = calculateTotalPriceWithPingFeng(width, height, unitPrice);
                }
                break;
            default:
                break;
        }
        $totalPriceInput.val(convertNumberToCurrency(totalPrice));
    }

    function resetForm() {
        $orderIdInput.val(null);
        $lineNumberInput.val(null);
        $serviceSelect.val(null).trigger("change");
        $descriptionInput.val(null);
        $widthInput.val(null);
        $heightInput.val(null);
        $quantityInput.val(null);
        $unitPriceInput.val(null);
    }

    function renderSelectServiceOptionByApi() {
        getAllServicesApi().then(function (services) {
            renderSelectServiceOptionByServices(services);
        }).always(function () {
            $serviceSelect.val(null).trigger("change");
        })
    }

    function renderSelectServiceOptionByServices(services) {
        servicesList = services;
        let data = services.map(function (service) {
            return {
                id: service.id,
                text: formatServiceName(service.descriptionEnglish, service.descriptionChinese),
                calculationType: service.calculationType,
                price: service.price,
            }
        })
        $serviceSelect.select2({
            placeholder: "Select a service",
            dropdownParent: $modal,
            data: data,
            width: "100%",
            closeOnSelect: true,
            allowClear: true,
            templateResult: function (data) {
                return $("<div>").addClass("d-flex justify-content-between").append(
                    $("<div>").text(data.text),
                    $("<div>").text(convertNumberToCurrency(data.price/100))
                )
            }
        })
    }

    function updateForm(e) {
        e.preventDefault();
        if ($form.valid()) {
            let service = $serviceSelect.select2("data")[0];
            let calculationType = service.calculationType;

            let data = {
                serviceId: $serviceSelect.val(),
                description: $descriptionInput.val(),
                finalPrice: $unitPriceInput.val(),
                width: 0,
                height: 0,
                quantity: 0,
            }

            switch (calculationType) {
                case 0: // FT
                case 2: // Pane
                    data.width = $widthInput.val();
                    data.height = $heightInput.val();
                    break;
                case 1: // Quantity
                    data.quantity = $quantityInput.val();
                    break;
                default:
                    throw new Error("Invalid calculation type");
            }
            $modal.modal("hide");
            showLoader();
            updateOrderDetailApi($orderIdInput.val(), $lineNumberInput.val(),data)
                .done(updateOnSuccess)
                .fail(updateOnFailure)
                .always(function () {
                    hideLoader();
                    updateOnComplete();
                })
        }
    }

    $modal.addClass("modal fade").attr({
        "tabindex": "-1",
        "data-bs-backdrop": "static",
        "data-bs-keyboard": "false",
    }).append(
        $("<div>").addClass("modal-dialog modal-lg").append(
            $("<div>").addClass("modal-content").append(
                $("<div>").addClass("modal-header").append(
                    $("<h5>").addClass("modal-title").text("Edit Order Details"),
                    $("<button>").addClass("btn-close").attr({
                        "type": "button",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                    })
                ),
                $("<div>").addClass("modal-body").append(
                    $form.addClass("needs-validation").append(
                        $orderIdInput,
                        $lineNumberInput,
                        $("<div>").addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Service"),
                            $("<div>").addClass("col-sm-10 align-self-center").append(
                                $serviceSelect
                            )
                        ),
                        $descriptionContainer.addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Description"),
                            $("<div>").addClass("col-sm-10").append(
                                $descriptionInput
                            )
                        ),
                        $widthContainer.addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Width"),
                            $("<div>").addClass("col-sm-10").append(
                                $widthInput
                            )
                        ),
                        $heightContainer.addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Height"),
                            $("<div>").addClass("col-sm-10").append(
                                $heightInput
                            )
                        ),
                        $quantityContainer.addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Quantity"),
                            $("<div>").addClass("col-sm-10").append(
                                $quantityInput
                            )
                        ),
                        $("<div>").addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Unit Price"),
                            $("<div>").addClass("col-sm-10").append(
                                $unitPriceInput
                            )
                        ),
                        $("<div>").addClass("row mb-3 position-relative").append(
                            $("<label>").addClass("col-form-label col-sm-2").text("Total Price"),
                            $("<div>").addClass("col-sm-10").append(
                                $totalPriceInput
                            )
                        )
                    )
                ),
                $("<div>").addClass("modal-footer").append(
                    $("<button>").addClass("btn btn-secondary").attr({
                        "type": "button",
                        "data-bs-dismiss": "modal"
                    }).text("Close"),
                    $("<button>").addClass("btn btn-primary").attr({
                        "type": "button",
                    }).text("Save changes").on("click",updateForm)
                )
            )
        )
    )

    return {
        $modal: $modal,
        setForm: setForm,
    }
}