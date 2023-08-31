import {convertNumberToCurrency, pageContext} from "../../../utils/common-utils";
import {convertUnixTimestampToMomentDate} from "../../../utils/moment-utils";
import MoreOptions, {MoreOptionsItemWithIcon} from "../../../components/common/MoreOptions";
import {jqueryDatatablePreXhrProcessing} from "../../../utils/jquery-utils";
import {customSomethingWentWrongSwal, customSuccessSwal, customSwal} from "../../../utils/sweetalert-utils";
import {deleteOrderApi} from "../../../apis/order-fetchers";

/**
 *
 * @returns {{$table: (*|jQuery|HTMLElement), refreshTable: refreshTable, $component: (*|jQuery)}}
 * @constructor
 */
export default function OrderTable() {

    // ========================================
    let $table = $("<table>");
    let $tbody = $("<tbody>");

    $table.ready(function () {
        $table.on('preXhr.dt', function ( e, settings, data ) {
            jqueryDatatablePreXhrProcessing(e, 6)
        }).DataTable({
            serverSide: true,
            ajax: {
                url: `${pageContext}/orders/datatable`,
                type: "POST",
            },
            language: {
                processing: '',
                paginate: {
                    previous: "<i class='bi bi-chevron-left'></i>",
                    next: "<i class='bi bi-chevron-right'></i>"
                }
            },
            searching: false,
            scrollX: true,
            processing: false,
            pageLength: 10,
            ordering: true,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "id",
                    name: "id",
                    orderable: true,
                },
                {
                    data: "date",
                    name: "date",
                    orderable: true,
                    render: function (data, type, row, meta) {
                        if (type === "display") {
                            return convertUnixTimestampToMomentDate(data)
                        }
                        return data;
                    }
                },
                {
                    data: "remarks",
                    name: "remarks",
                    orderable: false,
                    render: function (data, type) {
                        if (type === "display") {
                            return data ?? "";
                        }
                        return data;
                    }
                },
                {
                    data: "comments",
                    name: "comments",
                    orderable: false,
                    render: function (data, type) {
                        if (type === "display") {
                            return data ?? "";
                        }
                        return data;
                    }
                },
                {
                    data: "total",
                    name: "total_price",
                    orderable: true,
                    className: "dt-right",
                    render: function (data, type) {
                        if (type === "display") {
                            return convertNumberToCurrency(data/100)
                        }
                        return data;
                    }
                },
                {
                    data: null,
                    defaultContent: "",
                    className: "dt-right",
                    orderable: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).append(
                            MoreOptions({
                                isIndicatorStart: true,
                                menuItems: [
                                    MoreOptionsItemWithIcon({
                                        text: "Edit",
                                        href: `${pageContext}/edit-order.html?orderId=${rowData.id}`,
                                        iconClass: "bi bi-pencil-square",
                                    }),
                                    MoreOptionsItemWithIcon({
                                        text: "Delete",
                                        iconClass: "bi bi-trash",
                                        onClick: function (e) {
                                            e.preventDefault();
                                            customSwal.fire({
                                                icon: "warning",
                                                title: "Are you sure?",
                                                text: `Delete order ${rowData.id}?. You won't be able to revert this!`,
                                                confirmButtonText: "Yes, delete it!",
                                                showCancelButton: true,
                                                allowOutsideClick: false,
                                                showCloseButton: true,
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    deleteOrderApi(rowData.id).done(function (response) {
                                                        if (response.status) {
                                                            customSuccessSwal.fire({}).then(function () {
                                                                $table.DataTable().ajax.reload();
                                                            })
                                                        } else {
                                                            customSomethingWentWrongSwal.fire({}).then(function () {
                                                                $table.DataTable().ajax.reload();
                                                            })
                                                        }
                                                    }).fail(function () {
                                                        customSomethingWentWrongSwal.fire({}).then(function () {
                                                            $table.DataTable().ajax.reload();
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                ]
                            })
                        )
                    }
                },
            ]
        })
    });

    let $component = (
        $table.addClass("table w-100").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th>").css("width", "10%").text("Order ID"),
                    $("<th>").css("width", "15%").text("Order Date"),
                    $("<th>").css("width", "20%").text("Remarks"),
                    $("<th>").css("width", "20%").text("Comments (Internal Use)"),
                    $("<th>").css("width", "15%").text("Total"),
                    $("<th>").css("width", "5%")
                )
            ),
            $tbody
        )
    )

    return {
        $component,
        refreshTable: function () {
            $table.DataTable().ajax.reload();
        },
        $table
    }

}