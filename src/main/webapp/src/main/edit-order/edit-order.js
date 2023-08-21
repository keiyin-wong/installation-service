import PageTitle, {BreadcrumbItem} from "../../assets/js/components/common/PageTitle";
import Tabs, {TabItem, TabPane} from "../../assets/js/components/common/Tabs";
import {nanoid} from "nanoid";
import EditOrderDetailTable from "./components/EditOrderDetailTable";
import {pageContext} from "../../assets/js/utils/common-utils";

PageTitle({
    title: "Edit Order",
    breadcrumb: [
        BreadcrumbItem({
            title: "Order",
            href: `${pageContext}/order.html`
        }),
        BreadcrumbItem({
            title: "Edit Order",
            active: true
        })
    ]
}).appendTo("#rootContent")

App().appendTo("#rootContent");

function App() {
    let editOrderDetailPaneId = `id-${nanoid()}`;
    let editOrderPaneId = `id-${nanoid()}`;

    return (
        $("<section>").append(
            $("<div>").addClass("row").append(
                $("<div>").addClass("col-12").append(
                    $("<div>").addClass("card").append(
                        $("<div>").addClass("card-body pt-3").append(
                            Tabs({
                                tabItems: [
                                    TabItem({
                                        text: "Edit Order Details",
                                        active: true,
                                        targetId: editOrderDetailPaneId
                                    }),
                                    TabItem({
                                        text: "Edit Order",
                                        targetId: editOrderPaneId
                                    })
                                ],
                                tabPanes: [
                                    TabPane({
                                        active: true,
                                        id: editOrderDetailPaneId,
                                        paneContent: EditOrderDetailPane({
                                            orderId: orderId
                                        })
                                    }),
                                    TabPane({
                                        id: editOrderPaneId,
                                        paneContent: EditOrderPane({

                                        })
                                    })
                                ]
                            })
                        )
                    )
                )
            )
        )
    );
}

function EditOrderDetailPane(props) {
    let orderId = props.orderId;

    return (
        $("<div>").append(
            $("<h5>").addClass("card-title").text("Order"),
            $("<form>").append(
                $("<div>").addClass("row mb-3").append(
                    $("<label>").addClass("col-sm-2 col-form-label").text("Order ID"),
                    $("<div>").addClass("col-sm-10").append(
                        $("<input>").addClass("form-control-plaintext").attr({
                            "type": "text",
                            "value": orderId,
                        })
                    )
                )
            ),
            $("<h5>").addClass("card-title").text("Order Details"),
            // Add Order Button
            $("<div>").addClass("d-flex justify-content-end mb-3").append(
                $("<button>").addClass("btn btn-primary").attr({
                    "type": "button",
                }).append(
                    $("<i>").addClass("bi bi-plus"),
                    $("<span>").addClass("ms-1").text("New")
                )
            ),
            EditOrderDetailTable({
                orderId: orderId
            })
        )
    )
}

function EditOrderPane(props) {
    let orderId = props.orderId;

    // ========================================

    let $dateInput = $("<input>").prop({
        "readonly": true,
    })

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

    return (
        $("<div>").append(
            $("<h5>").addClass("card-title").text("Order"),
            $("<form>").append(
                $("<div>").addClass("row mb-3").append(
                    $("<label>").addClass("col-sm-2 col-form-label").text("Order ID"),
                    $("<div>").addClass("col-sm-10").append(
                        $("<input>").addClass("form-control").attr({
                            "type": "text",
                        })
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
                        $("<textarea>").addClass("form-control").attr({
                            "rows": "3"
                        })
                    )
                ),
                $("<div>").addClass("row mb-3").append(
                    $("<label>").addClass("col-sm-2 col-form-label").text("Comments"),
                    $("<div>").addClass("col-sm-10").append(
                        $("<textarea>").addClass("form-control").attr({
                            "rows": "3"
                        })
                    )
                ),
                // Save Button
                $("<div>").addClass("d-flex justify-content-end mb-3").append(
                    $("<button>").addClass("btn btn-primary").attr({
                        "type": "button",
                    }).append(
                        $("<i>").addClass("bi bi-save"),
                        $("<span>").addClass("ms-1").text("Save Changes")
                    )
                )
            )
        )
    )
}

