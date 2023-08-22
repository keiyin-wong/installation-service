import {getOrderApi, getOrderVOApi, updateOrderApi} from "../../../assets/js/containers/order/order-fetchers";
import moment from "moment/moment";
import {hideLoader, showLoader} from "../../../assets/js/utils/common-utils";
import {customSomethingWentWrongSwal, customSuccessSwal} from "../../../assets/js/utils/sweetalert-utils";
import SheetSubtitle from "../../../assets/js/components/common/SheetSubtitle";

/**
 *
 * @param {object} props
 * @param {string|number} props.orderId
 *
 * @returns {{$component: (*|jQuery|HTMLElement), setForm: setForm}}
 * @constructor
 */
export default function EditOrderPane(props) {
    let orderId = props.orderId;

    // ========================================

    let originalOrder = {};
    let $component = $("<div>");

    let $dateInput = $("<input>").prop({
        "readonly": true,
    });
    let $orderInput = $("<input>").prop({
        "readonly": true,
        "type": "text",
    });
    let $remarks = $("<textarea>").prop({
        "rows": 8,
    });
    let $comments = $("<textarea>").prop({
        "rows": 3,
    });

    $dateInput.ready(function () {
        $dateInput.daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "DD-MM-YYYY",
                cancelLabel: 'Clear'
            }
        })
    })

    loadData();

    $component.append(
        // $("<h5>").addClass("card-title").text("Order"),
        SheetSubtitle({
            title: "Order"
        }),
        $("<form>").append(
            $("<div>").addClass("row mb-3").append(
                $("<label>").addClass("col-sm-2 col-form-label").text("Order ID"),
                $("<div>").addClass("col-sm-10").append(
                    $orderInput.addClass("form-control")
                )
            ),
            $("<div>").addClass("row mb-3").append(
                $("<label>").addClass("col-sm-2 col-form-label").text("Order Date"),
                $("<div>").addClass("col-sm-10").append(
                    $dateInput.addClass("form-control")
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
            ),
            // Save Button
            $("<div>").addClass("d-flex justify-content-end mb-3").append(
                $("<button>").addClass("btn btn-primary").attr({
                    "type": "button",
                }).append(
                    $("<span>").addClass("ms-1").text("Save Changes")
                ).on("click", updateOrder),
                $("<button>").addClass("btn btn-secondary ms-2").attr({
                    "type": "button",
                }).append(
                    $("<span>").addClass("ms-1").text("Cancel").on("click", function () {
                        setForm({
                            orderId: originalOrder.orderId,
                            orderDate: originalOrder.orderDate,
                            remarks: originalOrder.remarks,
                            comments: originalOrder.comments,
                        });
                    })
                )
            )
        )
    )

    // ========================================

    /**
     *
     * @param {object} props
     * @param {string|number} props.orderId - the order id
     * @param {string} props.orderDate - the order date
     * @param {string} props.remarks - the remarks, customer notes
     * @param {string} props.comments - the comments
     *
     */
    function setForm(props) {
        let orderId = props.orderId;
        let orderDate = props.orderDate;
        let remarks = props.remarks;
        let comments = props.comments;

        $orderInput.val(orderId);
        $dateInput.val(orderDate);
        $remarks.val(remarks);
        $comments.val(comments);
    }

    function loadData() {
        getOrderApi(orderId).then(function (response) {
            originalOrder = {
                orderId: response.id,
                orderDate: moment(response.date).format("DD-MM-YYYY"),
                remarks: response.remarks,
                comments: response.comments,
            }
            setForm(originalOrder);
        })
    }

    function updateOrder(e) {
        e.preventDefault();
        showLoader();
        updateOrderApi($orderInput.val(), {
            date: $dateInput.val(),
            remarks: $remarks.val(),
            comments: $comments.val(),
        }).done(function (response) {
            if (response.status) {
                customSuccessSwal.fire().then(function () {
                    loadData();
                })
            } else {
                customSomethingWentWrongSwal.fire().then(function () {
                    loadData();
                })
            }
        }).fail(function () {
            customSomethingWentWrongSwal.fire().then(function () {
                loadData();
            })
        }).always(function () {
            hideLoader();
        })
    }

    return {
        $component: $component,
        setForm: setForm
    }
}

