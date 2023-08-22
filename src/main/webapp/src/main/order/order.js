import PageTitle, {BreadcrumbItem} from "../../assets/js/components/common/PageTitle";
import OrderTable from "./components/OrderTable";
import AddOrderModal from "./components/AddOrderModal";

PageTitle({
    title: "Order Management",
    breadcrumb: [
        BreadcrumbItem({
            title: "Home",
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
    let {$component: $AddOrderModal} = AddOrderModal();

    return (
        $("<section>").append(
            $AddOrderModal,
            $("<div>").addClass("row").append(
                $("<div>").addClass("col-12").append(
                    $("<div>").addClass("card").append(
                        $("<div>").addClass("card-body").append(
                            $("<div>").addClass("card-title").append(
                                $("<h5>").text("Order Table")
                            ),
                            // Add Order Button
                            $("<div>").addClass("d-flex justify-content-end mb-3").append(
                                $("<button>").addClass("btn btn-primary").attr({
                                    "type": "button",
                                }).append(
                                    $("<i>").addClass("bi bi-plus"),
                                    $("<span>").addClass("ms-1").text("New")
                                ).on("click", function () {
                                    $AddOrderModal.modal("show");
                                })
                            ),
                            OrderTable()
                        )
                    )
                )
            ),
        )
    );
}