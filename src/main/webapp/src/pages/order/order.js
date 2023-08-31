import PageTitle, {BreadcrumbItem} from "../../components/common/PageTitle";
import OrderTable from "./components/OrderTable";
import AddOrderModal from "./components/AddOrderModal";
import {customSomethingWentWrongSwal, customSuccessSwal} from "../../utils/sweetalert-utils";
import {redirectToEditOrderPage} from "../../apis/page-fetchers";

$("#rootContent").append(<App />);

function App() {
    let {
        $component: $AddOrderModal,
        showModal: showAddOrderModal
    } = AddOrderModal({
        create: {
            onSuccess: function (response) {
                if(response.status) {
                    // If data is valid
                    customSuccessSwal.fire({
                        confirmButtonText: "Go to edit page",
                        showCancelButton: true,
                        cancelButtonText: "Stay on this page",
                    }).then((result) => {
                        if (response.data?.id != null && result.isConfirmed) {
                            redirectToEditOrderPage(response.data.id);
                        } else {
                            refreshOrderTable();
                        }
                    });
                } else {
                    customSomethingWentWrongSwal.fire({}).then(() => {
                        refreshOrderTable();
                    });
                }
            },
            onFailure: function () {
                customSomethingWentWrongSwal.fire({}).then(() => {
                    refreshOrderTable();
                });
            }
        }
    })

    let {
        $component: $OrderTable,
        refreshTable: refreshOrderTable
    } = OrderTable();

    return (
        <div>
            <PageTitle
                title="Order Management"
                breadcrumb={[
                    <BreadcrumbItem title="Home" href="#" />,
                    <BreadcrumbItem title="Order" active={true} />
                ]}
            />
            <section>
                {$AddOrderModal}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>Order Table</h5>
                                </div>
                                {/* Add Order Button */}
                                <div className="d-flex justify-content-end mb-3">
                                    <button type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            showAddOrderModal()
                                        }
                                    >
                                        <i className="bi bi-plus"></i>
                                        <span className="ms-1">New</span>
                                    </button>
                                </div>
                                <$OrderTable />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
