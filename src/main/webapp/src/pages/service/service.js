import PageTitle, {BreadcrumbItem} from "../../components/common/PageTitle";
import ServiceTable from "./components/ServiceTable";

$("#rootContent").append(
    <App />
);

function App() {
    let {
        $component: $ServiceTable,
    } = ServiceTable()

    return (
        <div>
            <PageTitle
                title="Service Management"
                breadcrumb={[
                    <BreadcrumbItem title="Home" href="#" />,
                    <BreadcrumbItem title="Service" active={true} />
                ]}
            />
            <section>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>Services Table</h5>
                                </div>
                                <div className="d-flex justify-content-end mb-3">
                                    <button type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                alert("New")
                                            }}
                                    >
                                        <i className="bi bi-plus"></i>
                                        <span className="ms-1">New</span>
                                    </button>
                                </div>
                                <$ServiceTable />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}