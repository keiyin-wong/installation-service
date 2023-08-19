import PageTitle, {BreadcrumbItem} from "../../assets/js/components/common/PageTitle";
import Tabs, {TabItem, TabPane} from "../../assets/js/components/common/Tabs";
import {nanoid} from "nanoid";
import {getOrderApi} from "../../assets/js/containers/order/order-fetchers";
import {convertNumberToCurrency} from "../../assets/js/utils/common-utils";

PageTitle({
    title: "Edit Order",
    breadcrumb: [
        BreadcrumbItem({
            title: "Edit Order",
            href: "#"
        }),
        BreadcrumbItem({
            title: "Order",
            active: true
        })
    ]
}).appendTo("#rootContent")

App().appendTo("#rootContent");

function App() {
    let editOrderDetailPaneId = `id-${nanoid()}`;

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
                                    })
                                ],
                                tabPanes: [
                                    TabPane({
                                        active: true,
                                        id: editOrderDetailPaneId,
                                        paneContent: EditOrderDetailPane({
                                            orderId: orderId
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
            $("<h5>").addClass("card-title").text("Order Details"),
            OrderDetailTable({
                orderId: orderId
            })
        )
    )
}

/**
 *
 * Order Detail Table
 *
 * @param props
 * @param {string|number} props.orderId - id of the order
 *
 * @returns {*|jQuery}
 * @constructor
 */
function OrderDetailTable(props) {
    let orderId = props.orderId;

    // ====================================================

    let $table = $("<table>")
    let $tbody = $("<tbody>")

    getOrderApi(orderId).done(function (data) {
        data.orderDetails.forEach(function (orderDetail, index) {
            $tbody.append(
                $("<tr>").append(
                    $("<td>").text(index + 1),
                    $("<td>").text(orderDetail.serviceId),
                    $("<td>").text(orderDetail.description),
                    $("<td>").text(orderDetail.width),
                    $("<td>").text(orderDetail.height),
                    $("<td>").text(orderDetail.ft),
                    $("<td>").text(orderDetail.quantity),
                    $("<td>").text(convertNumberToCurrency(orderDetail.finalPrice/100)),
                    $("<td>").text(orderDetail.totalPrice),
                )
            )
        })
    })

    return (
        $table.addClass("table").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th>").text("#"),
                    $("<th>").text("Service"),
                    $("<th>").text("Description"),
                    $("<th>").text("Width"),
                    $("<th>").text("Height"),
                    $("<th>").text("Ft"),
                    $("<th>").text("Quantity"),
                    $("<th>").text("Unit Price"),
                    $("<th>").text("Total Price"),
                    $("<th>")
                )
            ),
            $tbody
        )
    )
}