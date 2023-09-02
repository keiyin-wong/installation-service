import SheetSubtitle from "../../../../components/common/SheetSubtitle";
import EditOrderDetailTable from "./EditOrderDetailTable";
import AddOrderDetailModal from "./AddOrderDetailModal";
import {customSomethingWentWrongSwal, customSuccessSwal, customSwal} from "../../../../utils/sweetalert-utils";

/**
 *
 * @param {object} props
 * @param {string|number} props.orderId - id of the order
 *
 * @returns {JSX.Element|jQuery}
 * @constructor
 */
export default function OrderDetailPane(props) {
    let orderId = props.orderId;

    // ================[ Jquery Elements ]====================

    let {
        $component: $AddOrderDetailModal,
        showModal: showAddOrderDetailModal,
        setFormData: setAddOrderDetailModalFormData
    } = AddOrderDetailModal({
        orderId: orderId,
        settings: {
            serviceList: {
                data: serviceListFromServer,
                loadFromServer: false
            }
        },
        create: {
            onSuccess: (res) => {
                if (res.status) {
                    customSuccessSwal.fire({}).then(() => {
                        refreshEditOrderDetailTable();
                    });
                } else {
                    customSomethingWentWrongSwal.fire({}).then(() => {
                        refreshEditOrderDetailTable();
                    });
                }
            },
            onFailure: () => {
                customSomethingWentWrongSwal.fire({}).then(() => {
                    refreshEditOrderDetailTable();
                });
            }
        }
    });

    let {
        $component: $EditOrderDetailTable,
        refreshTable: refreshEditOrderDetailTable
    } = EditOrderDetailTable({
        orderId: orderId
    });

    // ================[End of Jquery Elements ]===============

    return (
        <div>
            <div className="mt-2">
                <SheetSubtitle title="Order" />
            </div>
            <form>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Order ID</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control-plaintext"
                            value={orderId}
                            readOnly
                        />
                    </div>
                </div>
            </form>
            <div className="mt-2">
                <SheetSubtitle title="Order Details" />
            </div>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                        // Clear the form data
                        setAddOrderDetailModalFormData({
                            serviceId: "",
                            description: "",
                            width: "",
                            height: "",
                            quantity: "",
                            unitPrice: "",
                        });
                        showAddOrderDetailModal();
                    }}
                >
                    <i className="bi bi-plus"></i>
                    <span className="ms-1">New</span>
                </button>
            </div>
            <$EditOrderDetailTable />
            <$AddOrderDetailModal />
        </div>
    )
}