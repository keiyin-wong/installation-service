import PageTitle, {BreadcrumbItem} from "../../assets/js/components/common/PageTitle";
import OrderTable from "./components/OrderTable";

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
  return (
      $("<section>").append(
          $("<div>").addClass("row").append(
              $("<div>").addClass("col-12").append(
                  $("<div>").addClass("card").append(
                      $("<div>").addClass("card-body").append(
                          $("<div>").addClass("card-title").append(
                              $("<h5>").text("Order Table")
                          ),
                          OrderTable()
                      )
                  )
              )
          )
      )
  );
}