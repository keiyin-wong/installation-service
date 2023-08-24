import PageTitle, {BreadcrumbItem} from "../../components/common/PageTitle";
import OrderTable from "./components/OrderTable";
import AddOrderModal from "./components/AddOrderModal";

let $rootContent = $("#rootContent");

let {$component: $AddOrderModal} = <AddOrderModal />;



$rootContent.append(
    <PageTitle
        title="Order Management"
        breadcrumb={[
            <BreadcrumbItem title="Home" href="#" />,
            <BreadcrumbItem title="Order" active={true} />
        ]}
    />,
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
                                onClick={() => $AddOrderModal.modal("show")}
                            >
                                <i className="bi bi-plus"></i>
                                <span className="ms-1">New</span>
                            </button>
                        </div>
                        <OrderTable />
                    </div>
                </div>
            </div>
        </div>
    </section>
)
