import SheetSubtitle from "../../../assets/js/components/common/SheetSubtitle";
import DateInput from "../../../assets/js/components/common/DateInput";
import ClearableInput from "../../../assets/js/components/common/ClearableInput";
import moment from "moment";
import {createOrderApi} from "../../../assets/js/containers/order/order-fetchers";
import {customSomethingWentWrongSwal, customSuccessSwal} from "../../../assets/js/utils/sweetalert-utils";
import {hideLoader, showLoader} from "../../../assets/js/utils/common-utils";

/**
 * @param {function} [props.create.onSuccess] - On success callback, default is show success swal
 * @param {function} [props.create.onFailure] - On failure callback, default is show something went wrong swal
 * @param {function} [props.create.onComplete] - On complete callback, default is empty function

 *
 * @returns {{$component: (*|jQuery|HTMLElement)}}
 *
 */
export default function AddOrderModal(props) {

    let createOnSuccess = props?.create?.onSuccess ?? function (response) {
    	if(response.status) {
    		customSuccessSwal.fire();
    	} else {
    		customSomethingWentWrongSwal.fire();
    	}
    };
    let createOnFailure = props?.create?.onFailure ?? function () {
    	customSomethingWentWrongSwal.fire();
    };
    let createOnComplete = props?.create?.onComplete ?? function () {};

    // ========================================

    let $modal = $("<div>");
    let $dateInput = DateInput();
    let $remarks = $("<textarea>").prop({
        "rows": 6,
    });
    let $comments = $("<textarea>").prop({
        "rows": 3,
    });

    // ========================================

    $dateInput.on("apply.daterangepicker", function (ev, picker) {
        $(this).trigger("input");
    });

    $modal.on("show.bs.modal", function (e) {
        resetForm();
    })


    $modal.addClass("modal fade").attr({
        "tabindex": "-1",
        "data-bs-backdrop": "static",
        "data-bs-keyboard": "false",
    }).append(
        $("<div>").addClass("modal-dialog modal-lg").append(
            $("<div>").addClass("modal-content").append(
                $("<div>").addClass("modal-header").append(
                    $("<h5>").addClass("modal-title").text("Add Order"),
                    $("<button>").addClass("btn-close").attr({
                        "type": "button",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                    }),
                ),
                $("<div>").addClass("modal-body").append(
                    SheetSubtitle({
                        title: "Order Details"
                    }),
                    $("<form>").append(
                        $("<div>").addClass("row mb-3").append(
                            $("<label>").addClass("col-sm-2 col-form-label").text("Order Date"),
                            $("<div>").addClass("col-sm-10").append(
                                ClearableInput({
                                    input: $dateInput.addClass("form-control")
                                })
                            )
                        ),
                        $("<div>").addClass("row mb-3").append(
                            $("<label>").addClass("col-sm-2 col-form-label").text("Customer Notes"),
                            $("<div>").addClass("col-sm-10").append(
                                $remarks.addClass("form-control")
                            )
                        ),
                        $("<div>").addClass("row mb-3").append(
                            $("<label>").addClass("col-sm-2 col-form-label").text("Comments"),
                            $("<div>").addClass("col-sm-10").append(
                                $comments.addClass("form-control")
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
                    }).text("Save changes").on("click", onCreate)
                )
            )
        )
    );

    function resetForm() {
        $dateInput.val(moment().format("DD-MM-YYYY"));
        $remarks.val("");
        $comments.val("");
    }

    function onCreate(e) {
    	e.preventDefault();

        $modal.modal("hide");
        showLoader();
        createOrderApi({
            date: $dateInput.val(),
            remarks: $remarks.val(),
            comments: $comments.val(),
        }).done(createOnSuccess).fail(createOnFailure).always(function () {
            hideLoader();
    		createOnComplete();
    	})
    }

    return {
        $component: $modal,
    }
}