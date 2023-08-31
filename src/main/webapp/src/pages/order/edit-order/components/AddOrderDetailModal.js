import {
    calculateTotalPriceWithFT,
    calculateTotalPriceWithQuantity,
    convertNumberToCurrency,
    formatServiceName
} from "../../../../utils/common-utils";
import {getAllServicesApi} from "../../../../apis/service-fetchers";
import * as Redux from "redux";

/**
 *
 * @param props
 * @param {object} props.settings
 * @param {object} props.settings.serviceList
 * @param {boolean} [props.settings.serviceList.loadFromServer=true] - load service list from server
 *
 * @returns {{$component: JSX.Element, showModal(): void}}
 * @constructor
 */
export default function AddOrderDetailModal(props) {

    let loadServiceListFromServer = props?.settings?.serviceList?.loadFromServer ?? true;
    let serviceList = props?.settings?.serviceList?.data ?? [];


    // ================[ Jquery Elements ]====================

    let $modal = <div />;
    let $form = <div />;
    let $serviceSelect = <select />;
    let $descriptionTextArea = <textarea />;
    let $widthDiv = <div />;
    let $widthInput = <input />;
    let $heightDiv = <div />;
    let $heightInput = <input />;
    let $quantityDiv = <div />;
    let $quantityInput = <input />;
    let $priceInput = <input />;
    let $totalPriceInput = <input />;

    // ================[End of Jquery Elements ]===============

    // ================[ Redux ]====================

    let formData = {
        serviceId: "",
        description: "",
        width: "",
        height: "",
        quantity: "",
        unitPrice: "",
    }

    let formDataReducer = (state = formData, action) => {
        switch (action.type) {
            case "SET_FORM_DATA":
                return {
                    serviceId: action.payload.serviceId,
                    description: action.payload.description,
                    width: action.payload.width,
                    height: action.payload.height,
                    quantity: action.payload.quantity,
                    unitPrice: action.payload.unitPrice,
                }
            default:
                return state;
        }
    }

    const formDataStore = Redux.createStore(formDataReducer);

    // Old state is used to compare with the new state
    let oldState = formDataStore.getState();
    formDataStore.subscribe(() => {
        let newState = formDataStore.getState();
        render(newState, oldState);
        oldState = newState;
    });

    function render(newState, oldState) {
        console.log("old status:" + JSON.stringify(oldState));
        console.log("new status:" + JSON.stringify(newState));

        if (newState === oldState) {
            return;
        }

        if (newState.serviceId !== oldState.serviceId) {
            let service = serviceList.find(service => service.id === Number(newState.serviceId));
            switch (service?.calculationType) {
                case 0: // FT
                case 2: // Pane
                    $widthDiv.show();
                    $heightDiv.show();
                    $quantityDiv.hide();
                    break;
                case 1: // Quantity
                    $widthDiv.hide();
                    $heightDiv.hide();
                    $quantityDiv.show();
                    break;
                default:
                    $widthDiv.show();
                    $heightDiv.show();
                    $quantityDiv.show();
                    break;
            }
            $serviceSelect.val(newState.serviceId).trigger("change", true);
        }

        if (newState.description !== oldState.description) {
            $descriptionTextArea.val(newState.description);
        }

        if (newState.width !== oldState.width) {
            $widthInput.val(newState.width);
        }

        if (newState.height !== oldState.height) {
            $heightInput.val(newState.height);
        }

        if (newState.quantity !== oldState.quantity) {
            $quantityInput.val(newState.quantity);
        }

        if (newState.unitPrice !== oldState.unitPrice) {
            $priceInput.val(newState.unitPrice);
        }

        let service = serviceList.find(service => service.id === Number(newState.serviceId));
        switch (service?.calculationType) {
            case 0: {
                // FT
                if (newState.width && newState.unitPrice) {
                    let totalPrice = calculateTotalPriceWithFT(newState.width, newState.unitPrice);
                    $totalPriceInput.val(convertNumberToCurrency(totalPrice));
                }
                break;
            }
            case 1: { // Quantity
                if (newState.quantity && newState.unitPrice) {
                    let totalPrice = calculateTotalPriceWithQuantity(newState.quantity, newState.unitPrice);
                    $totalPriceInput.val(convertNumberToCurrency(totalPrice));
                }
                break;
            }
            case 2: { // Pane
                if (newState.width && newState.height && newState.unitPrice) {

                }
                break;
            }
            default: {
                $totalPriceInput.val("???");
                break;
            }
        }
    }

    // ================[End of Redux ]===============

    /**
     * @param data
     * @param {string} data.serviceId
     * @param {string} data.description
     * @param {string} data.width
     * @param {string} data.height
     * @param {string} data.quantity
     * @param {string} data.unitPrice
     *
     */
    function setFormData(data) {
        formDataStore.dispatch({
            type: "SET_FORM_DATA",
            payload: {
                serviceId: data.serviceId,
                description: data.description,
                width: data.width,
                height: data.height,
                quantity: data.quantity,
                unitPrice: data.unitPrice,
            }
        })
    }

    function renderServiceList() {
        if (loadServiceListFromServer) {
            getAllServicesApi().then(function (services) {
                serviceList = services;
                populateServiceList(services);
                $serviceSelect.val("").trigger("change");
            })
        } else {
            populateServiceList(serviceList);
            $serviceSelect.val("").trigger("change");
        }
    }

    function populateServiceList(serviceList) {
        let data = serviceList.map(function (service) {
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

    function handleChanges(event) {
        let {name, value, type, checked} = event.target;
        if (event.originalEvent) {
            setFormData({
                ...formDataStore.getState(),
                [name]: type === "checkbox" ? checked : value,
            })
        }
    }

    function handleSelect2Changes(event, skip) {
        if (skip) {
            return;
        }
        let {name, value, type, checked} = event.target;
        setFormData({
            ...formDataStore.getState(),
            [name]: value,
        })
    }

    let $component = (
        <$modal
            class="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Order Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <$form>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Service</label>
                                <div className="col-sm-10">
                                    <$serviceSelect
                                        className="form-select"
                                        name="serviceId"
                                        onReady={() => {
                                            renderServiceList();
                                        }}
                                        onChange={(e, skip) => {
                                            if (skip) {
                                                return;
                                            }
                                            let {value} = e.target;
                                            let service = serviceList.find(service => service.id === Number(e.target.value));
                                            switch (service?.calculationType) {
                                                case 0: // FT
                                                case 2: {
                                                    setFormData({
                                                        ...formDataStore.getState(),
                                                        quantity: "0",
                                                        serviceId: value,
                                                    })
                                                    break;
                                                }
                                                case 1: {
                                                    // Quantity
                                                    setFormData({
                                                        ...formDataStore.getState(),
                                                        width: "0",
                                                        height: "0",
                                                        serviceId: value,
                                                    })
                                                    break;
                                                }
                                                default:
                                                    setFormData({
                                                        ...formDataStore.getState(),
                                                        width: "0",
                                                        height: "0",
                                                        quantity: "0",
                                                        serviceId: value,
                                                    })
                                                    break;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <$descriptionTextArea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        onInput={handleChanges}
                                    />
                                </div>
                            </div>
                            <$widthDiv className="row mb-3">
                                <label className="col-sm-2 col-form-label">Width</label>
                                <div className="col-sm-10">
                                    <$widthInput
                                        type="number"
                                        className="form-control"
                                        name="width"
                                        onInput={handleChanges}
                                    />
                                </div>
                            </$widthDiv>
                            <$heightDiv className="row mb-3">
                                <label className="col-sm-2 col-form-label">Height</label>
                                <div className="col-sm-10">
                                    <$heightInput
                                        type="number"
                                        className="form-control"
                                        name="height"
                                        onInput={handleChanges}
                                    />
                                </div>
                            </$heightDiv>
                            <$quantityDiv className="row mb-3">
                                <label className="col-sm-2 col-form-label">Quantity</label>
                                <div className="col-sm-10">
                                    <$quantityInput
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        onInput={handleChanges}
                                    />
                                </div>
                            </$quantityDiv>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Unit Price</label>
                                <div className="col-sm-10">
                                    <$priceInput
                                        type="number"
                                        className="form-control"
                                        name="unitPrice"
                                        onInput={handleChanges}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Total Price</label>
                                <div className="col-sm-10">
                                    <$totalPriceInput
                                        type="text"
                                        className="form-control-plaintext"
                                        name="totalPrice"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </$form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </$modal>
    )

    return {
        $component,
        showModal() {
            $modal.modal("show");
        }
    }
}