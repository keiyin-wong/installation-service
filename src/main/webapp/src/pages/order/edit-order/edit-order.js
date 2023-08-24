import PageTitle, {BreadcrumbItem} from "../../../components/common/PageTitle";
import Tabs, {TabItem, TabPane} from "../../../components/common/Tabs";
import {nanoid} from "nanoid";
import EditOrderDetailTable from "./components/EditOrderDetailTable";
import {pageContext} from "../../../utils/common-utils";
import EditOrderPane from "./components/EditOrderPane";
import SheetSubtitle from "../../../components/common/SheetSubtitle";

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

    let {$component: $editOrderPane} = EditOrderPane({
        orderId: orderId
    })

    return (
        $("<section>").append(
            $("<div>").addClass("row").append(
                $("<div>").addClass("col-12").append(
                    $("<div>").addClass("card").append(
                        $("<div>").addClass("card-body pt-3").append(
                            Tabs({
                                tabItems: [
                                    TabItem({
                                        text: "Order Details",
                                        active: true,
                                        targetId: editOrderDetailPaneId
                                    }),
                                    TabItem({
                                        text: "Order",
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
                                        paneContent: $editOrderPane
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

/**
 *
 * @param {object} props
 * @param {string|number} props.orderId - id of the order
 *
 * @returns {*|jQuery}
 * @constructor
 */
function EditOrderDetailPane(props) {
    let orderId = props.orderId;

    return (
        $("<div>").append(
            // $("<h5>").addClass("card-title").text("Order"),
            $("<div>").addClass("mt-2").append(
                SheetSubtitle({
                    title: "Order",
                }),
            ),
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
            // $("<h5>").addClass("card-title").text("Order Details"),
            $("<div>").addClass("mt-2").append(
                SheetSubtitle({
                    title: "Order Details",
                }),
            ),
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