import SpinnerBs from "../../../../components/common/SpinnerBs";
import {
    calculateFt,
    calculateTotalPriceWithQuantity,
    calculateTotalPriceWithFT,
    convertNumberToCurrency, formatServiceName, calculateTotalPriceWithPingFeng
} from "../../../../utils/common-utils";
import MoreOptions, {MoreOptionsItemWithIcon} from "../../../../components/common/MoreOptions";
import {deleteOrderDetailApi, getOrderVOApi} from "../../../../apis/order-fetchers";
import EditOrderDetailModal from "./EditOrderDetailModal";
import {
    customConfirmSwal,
    customSomethingWentWrongSwal,
    customSuccessSwal,
    customSwal
} from "../../../../utils/sweetalert-utils";

/**
 *
 * Order Detail Table
 *
 * @param props
 * @param {string|number} props.orderId - id of the order
 *
 * @return {{
 *     $component: jQuery|*,
 *     refreshTable: function
 * }}
 *
 */
export default function EditOrderDetailTable(props) {
    let orderId = props.orderId;

    // ====================================================

    let $table = $("<table>")
    let $tbody = $("<tbody>")
    let $tfoot = $("<tfoot>")
    let {$modal: $editOrderDetailModal, setForm: setEditOrderDetailModalForm} = EditOrderDetailModal({
        settings: {
            useApi: false,
            serviceList: serviceListFromServer
        },
        update: {
            onSuccess: function (res) {
                if (res.status) {
                    customSuccessSwal.fire({}).then(() => {
                        loadData();
                    })
                } else {
                    customSomethingWentWrongSwal.fire({}).then(() => {
                        loadData();
                    })
                }
            },
            onFailure: function () {
                customSomethingWentWrongSwal.fire({}).then(() => {
                    loadData();
                })
            }
        }
    });

    loadData();

    function loadData () {
        $tbody.empty().append(
            $("<tr>").append(
                $("<td>").attr("colspan", "10").append(
                    SpinnerBs()
                )
            )
        );
        getOrderVOApi(orderId).done(function (data) {
            let subTotal = 0;
            $tbody.empty();

            if (data.orderDetails.length === 0) {
                $tbody.append(
                    <tr>
                        <td colSpan={10} className="text-center">No data</td>
                    </tr>
                )
                return;
            }

            data.orderDetails.forEach(function (orderDetail, index) {
                $tbody.append(
                    $("<tr>").append(
                        $("<td>").text(index + 1),
                        $("<td>").text(() => {
                            return formatServiceName(orderDetail.service.descriptionEnglish, orderDetail.service.descriptionChinese);
                        }),
                        $("<td>").text(orderDetail.description),
                        $("<td>").text(
                            () => {
                                switch (orderDetail.service.calculationType) {
                                    case 0: // FT
                                        return orderDetail.width;
                                    case 1: // Quantity
                                        return "-";
                                    case 2: // ping feng
                                        return orderDetail.width;
                                    default:
                                        return "???";
                                }
                            }
                        ),
                        $("<td>").text(
                            () => {
                                switch (orderDetail.service.calculationType) {
                                    case 0: // FT
                                        return orderDetail.height;
                                    case 1: // Quantity
                                        return "-";
                                    case 2: // ping feng
                                        return orderDetail.height;
                                    default:
                                        return "???";
                                }
                            }
                        ),
                        $("<td>").text(() => {
                            switch (orderDetail.service.calculationType) {
                                case 0: // FT
                                    return calculateFt(orderDetail.width);
                                case 1: // Quantity
                                    return "-";
                                case 2: // ping feng
                                    return calculateFt(orderDetail.width)
                                default:
                                    return "???";
                            }
                        }),
                        $("<td>").text(() => {
                            switch (orderDetail.service.calculationType) {
                                case 0: // FT
                                    return "-";
                                case 1: // Quantity
                                    return orderDetail.quantity;
                                case 2: // ping feng
                                    return "-";
                                default:
                                    return "???";
                            }
                        }),
                        $("<td>").text(convertNumberToCurrency(orderDetail.finalPrice/100)),
                        $("<td>").addClass("text-end").text(() => {
                            switch (orderDetail.service.calculationType) {
                                case 0: // FT
                                {
                                    let totalPrice = calculateTotalPriceWithFT(orderDetail.width, orderDetail.finalPrice/100);
                                    subTotal = subTotal + totalPrice;
                                    return convertNumberToCurrency(totalPrice);
                                }
                                case 1: // Quantity
                                    let totalPrice1 = calculateTotalPriceWithQuantity(orderDetail.quantity, orderDetail.finalPrice/100);
                                    subTotal = subTotal + totalPrice1;
                                    return convertNumberToCurrency(totalPrice1);
                                case 2: // ping feng
                                    let totalPrice2 = calculateTotalPriceWithPingFeng(orderDetail.width,
                                        orderDetail.height,
                                        orderDetail.finalPrice/100
                                    );
                                    subTotal = subTotal + totalPrice2;
                                    return convertNumberToCurrency(totalPrice2);
                                default:
                                    return "???";
                            }
                        }),
                        $("<td>").append(
                            $("<div>").addClass("d-flex justify-content-end align-items-center").append(
                                MoreOptions({
                                    isIndicatorStart: true,
                                    menuItems: [
                                        MoreOptionsItemWithIcon({
                                            text: "Edit",
                                            iconClass: "bi bi-pencil-square",
                                            onClick: function (e) {
                                                e.preventDefault();
                                                setEditOrderDetailModalForm({
                                                    orderId: orderDetail.orderId,
                                                    lineNumber: orderDetail.lineNumber,
                                                    serviceId: orderDetail.service.id,
                                                    description: orderDetail.description,
                                                    width: orderDetail.width,
                                                    height: orderDetail.height,
                                                    quantity: orderDetail.quantity,
                                                    unitPrice: orderDetail.finalPrice/100,
                                                });
                                                $editOrderDetailModal.modal("show");
                                            }
                                        }),
                                        MoreOptionsItemWithIcon({
                                            text: "Delete",
                                            iconClass: "bi bi-trash",
                                            onClick: function (e) {
                                                e.preventDefault();
                                                customConfirmSwal.fire({
                                                    text: "Are you sure you want to delete this order detail?",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteOrderDetailApi(orderDetail.orderId, orderDetail.lineNumber).done(
                                                            function (res) {
                                                                if (res.status) {
                                                                    customSuccessSwal.fire({}).then(() => {
                                                                        loadData();
                                                                    })
                                                                } else {
                                                                    customSomethingWentWrongSwal.fire({}).then(() => {
                                                                        loadData();
                                                                    })
                                                                }
                                                            }
                                                        ).fail(function () {
                                                            customSomethingWentWrongSwal.fire({}).then(() => {
                                                                loadData();
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    ]
                                })
                            )
                        )
                    )
                )
            });
            $tfoot.empty().append(
                $("<tr>").append(
                    $("<td>").attr("colspan", 8).addClass("text-end").text("Total Price"),
                    $("<td>").addClass("text-end").text(convertNumberToCurrency(Number(subTotal))),
                    $("<td>")
                )
            )
        })
    }

    let $component = $("<div>").addClass("table-responsive").append(
        $table.addClass("table w-100").append(
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
                    $("<th>").addClass("text-end").text("Total Price"),
                    $("<th>")
                )
            ),
            $tbody,
            $tfoot
        )
    );

    return {
        $component,
        refreshTable: function () {
            loadData();
        }
    }
}