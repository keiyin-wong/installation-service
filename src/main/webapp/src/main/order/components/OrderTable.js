import {convertNumberToCurrency, pageContext} from "../../../assets/js/utils/common-utils";
import {convertUnixTimestampToMomentDate} from "../../../assets/js/utils/moment-utils";
import MoreOptions, {MoreOptionsItemWithIcon} from "../../../assets/js/components/common/MoreOptions";
import {jqueryDatatableProcessingFunction} from "../../../assets/js/utils/jquery-utils";

export default function OrderTable() {

    // ========================================

    let $table = $("<table>");

    $table.ready(function () {
        $table.DataTable({
            serverSide: true,
            ajax: {
                url: `${pageContext}/orders/datatable`,
                type: "POST",
            },
            searching: false,
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
                    orderable: false,
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
                    name: "total",
                    orderable: false,
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
                                        href: "www.google.com",
                                        iconClass: "bi bi-pencil-square",
                                    })
                                ]
                            })
                        )
                    }
                },
            ]
        }).on("processing.dt", function (e, settings, processing) {
            jqueryDatatableProcessingFunction(e, processing, 6);
        });
    });


    return (
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
            $("<tbody>").append(
            )
        )
    )
}