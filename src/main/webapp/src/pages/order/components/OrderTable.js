import {convertNumberToCurrency, pageContext} from "../../../utils/common-utils";
import {convertUnixTimestampToMomentDate, dateRangesOptions} from "../../../utils/moment-utils";
import {jqueryDatatablePreXhrProcessing} from "../../../utils/jquery-utils";
import MoreOptions2, {MoreOptionsItemWithIcon2} from "../../../components/common/MoreOptions2";
import {customConfirmSwal, customSomethingWentWrongSwal, customSuccessSwal} from "../../../utils/sweetalert-utils";
import {deleteOrderApi, getOrderDatatableApi, getOrderInvoiceUrl} from "../../../apis/order-fetchers";
import ClearableInput from "../../../components/common/ClearableInput";

/**
 *
 * @returns {{$table: (*|jQuery|HTMLElement), refreshTable: refreshTable, $component: (*|jQuery)}}
 * @constructor
 */
export default function OrderTable() {

    // ================[ Jquery Elements ]====================
    let $table = $("<table>");
    let $tbody = $("<tbody>");

    let $orderIdInput = <input/>;
    let $orderDateInput = <input/>;
    let $orderStartDateInput = <input/>;
    let $orderEndDateInput = <input/>;

    // ================[End of Jquery Elements ]===============

    $table.ready(function () {
        $table.on('preXhr.dt', function ( e, settings, data ) {
            jqueryDatatablePreXhrProcessing(e, 6)
        }).DataTable({
            serverSide: true,
            ajax: getOrderDatatableApi(function (d) {
                if ($orderIdInput.val().trim() !== "") {
                    d.orderId = $orderIdInput.val();
                }
                if ($orderStartDateInput.val().trim() !== "") {
                    d.startDate = $orderStartDateInput.val();
                }
                if ($orderEndDateInput.val().trim() !== "") {
                    d.endDate = $orderEndDateInput.val();
                }
            }),
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
                            <MoreOptions2 isIndicatorStart={true}>
                                <MoreOptionsItemWithIcon2
                                    text="Edit"
                                    href={`${pageContext}/edit-order.html?orderId=${rowData.id}`}
                                    iconClass="bi bi-pencil-square"
                                />
                                <MoreOptionsItemWithIcon2
                                    text="Delete"
                                    iconClass="bi bi-trash"
                                    onClick={function (e) {
                                        e.preventDefault();
                                        customConfirmSwal.fire({
                                            text: `Delete order ${rowData.id}?. You won't be able to revert this!`,
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
                                    }}
                                />
                                <MoreOptionsItemWithIcon2
                                    text="View Invoice"
                                    iconClass="bi bi-file-earmark-text"
                                    onClick={function (e) {
                                        e.preventDefault();
                                        window.open(getOrderInvoiceUrl(rowData.id, true, false), "_blank");
                                    }}
                                />
                                <MoreOptionsItemWithIcon2
                                    text="View Invoice With Sketch"
                                    iconClass="bi bi-file-earmark-text"
                                    onClick={function (e) {
                                        e.preventDefault();
                                        window.open(getOrderInvoiceUrl(rowData.id, true, true), "_blank");
                                    }}
                                />
                                <MoreOptionsItemWithIcon2
                                    text="Download Invoice"
                                    iconClass="bi bi-cloud-download"
                                    onClick={function (e) {
                                        e.preventDefault();
                                        window.open(getOrderInvoiceUrl(rowData.id, false, false), "_blank");
                                    }}
                                />
                            </MoreOptions2>
                        )
                    }
                },
            ]
        })
    });

    let $component = (
        <div>
            <div className="row gy-2">
                <div className="col-md-10">
                    <form className="row g-3">
                        <div className="col-sm-6 col-lg-4 col-xl-3">
                            <label htmlFor="order-id" className="form-label">Order ID</label>
                            <ClearableInput>
                                <$orderIdInput
                                    type="text"
                                    className="form-control"
                                    placeholder="Order ID"
                                />
                            </ClearableInput>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xl-3">
                            <label htmlFor="order-date" className="form-label">Order Date</label>
                            <ClearableInput
                                additionalClearCallback={function () {
                                    $orderStartDateInput.val('');
                                    $orderEndDateInput.val('');
                                }}
                            >
                                <$orderDateInput
                                    className="form-control"
                                    type="text"
                                    id="order-date"
                                    placeholder="Order Date"
                                    onReady={() => {
                                        $orderDateInput.daterangepicker({
                                            showDropdowns: true,
                                            locale: {
                                                cancelLabel: 'Clear'
                                            },
                                            ranges: dateRangesOptions,
                                            autoUpdateInput: false,
                                        }).on('apply.daterangepicker', function (ev, picker) {
                                            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY')).trigger("input");
                                            $orderStartDateInput.val(picker.startDate.format('YYYY-MM-DD'));
                                            $orderEndDateInput.val(picker.endDate.format('YYYY-MM-DD'));
                                        }).on('cancel.daterangepicker', function (ev, picker) {
                                            $(this).val('').trigger("input");
                                            $orderStartDateInput.val('');
                                            $orderEndDateInput.val('');
                                        });
                                    }}
                                />
                            </ClearableInput>
                            <$orderStartDateInput type="hidden" />
                            <$orderEndDateInput type="hidden" />
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xl-3">
                            <label htmlFor="order-remarks" className="form-label">Remarks</label>
                            <input type="text" className="form-control" id="order-remarks" placeholder="Remarks"/>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xl-3">
                            <label htmlFor="order-remarks" className="form-label">Comments</label>
                            <input type="text" className="form-control" id="order-remarks"
                                   placeholder="Comments"/>
                        </div>
                    </form>
                </div>
                <div className="col-md-2 align-self-end">
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={function (e) {
                            e.preventDefault();
                            $table.DataTable().ajax.reload();
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <$table className="table w-100">
                    <thead>
                    <tr>
                        <th style={{width: "10%"}}>Order ID</th>
                        <th style={{width: "15%"}}>Order Date</th>
                        <th style={{width: "20%"}}>Remarks</th>
                        <th style={{width: "20%"}}>Comments (Internal Use)</th>
                        <th style={{width: "15%"}}>Total</th>
                        <th style={{width: "5%"}}></th>
                    </tr>
                    </thead>
                    <$tbody></$tbody>
                </$table>
            </div>
        </div>
    )

    return {
        $component,
        refreshTable: function () {
            $table.DataTable().ajax.reload();
        },
        $table
    }

}