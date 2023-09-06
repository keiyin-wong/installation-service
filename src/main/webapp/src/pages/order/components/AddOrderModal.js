import SheetSubtitle from "../../../components/common/SheetSubtitle";
import DateInput from "../../../components/common/DateInput";
import ClearableInput from "../../../components/common/ClearableInput";
import moment from "moment";
import {createOrderApi} from "../../../apis/order-fetchers";
import {customSomethingWentWrongSwal, customSuccessSwal} from "../../../utils/sweetalert-utils";
import {hideLoader, showLoader} from "../../../utils/common-utils";
import {jqueryValidateClassOptions} from "../../../utils/jquery-utils";

/**
 * @param {function} [props.create.onSuccess] - On success callback, default is show success swal
 * @param {function} [props.create.onFailure] - On failure callback, default is show something went wrong swal
 * @param {function} [props.create.onComplete] - On complete callback, default is empty function
 *
 *
 * @returns {{$component: (*|jQuery|HTMLElement), showModal: function}}
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

    // ================[ Jquery Elements ]====================

    let $modal = <div />;
    let $form = <form />;
    let $dateInput = (<DateInput />);
    $dateInput.prop("name", "date");
    let $remarks = <textarea rows="5" />
    let $comments = <textarea rows="3" />

    // ================[End of Jquery Elements ]===============


    // $dateInput.on("apply.daterangepicker", function (ev, picker) {
    //     $(this).trigger("input");
    // });

    $modal.on("show.bs.modal", function (e) {
        resetForm();
    })

    function initFormValidation() {
        $form.validate({
            ...jqueryValidateClassOptions,
            rules: {
                [$dateInput.prop("name")]: {
                    required: true,
                }
            }
        })
    }



    function resetForm() {
        $dateInput.val(moment().format("DD-MM-YYYY"));
        $remarks.val("");
        $comments.val("");
    }

    function onCreate(e) {
    	e.preventDefault();

        if(!$form.valid()) {
            return;
        }

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

    let $component = (
        <$modal
            className="modal fade"
            tabIndex="-1"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Order</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <SheetSubtitle title="Order Details"/>
                        <$form
                            className="needs-validation"
                            onReady={() => {initFormValidation()}}
                        >
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Order Date</label>
                                <div className="col-sm-10">
                                    <ClearableInput>
                                        <$dateInput className="form-control"/>
                                    </ClearableInput>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Customer Notes</label>
                                <div className="col-sm-10">
                                    <$remarks className="form-control"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Comments</label>
                                <div className="col-sm-10">
                                    <$comments className="form-control"/>
                                </div>
                            </div>
                        </$form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onCreate}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </$modal>
    )

    return {
        $component: $component,
        showModal: function () {
            $modal.modal("show");
        }
    }
}