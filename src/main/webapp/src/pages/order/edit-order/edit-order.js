import PageTitle, {BreadcrumbItem} from "../../../components/common/PageTitle";
import {TabItem, TabItems, TabPane, TabPanes} from "../../../components/common/Tabs";
import {nanoid} from "nanoid";
import {pageContext} from "../../../utils/common-utils";
import OrderPane from "./components/OrderPane";
import OrderDetailPane from "./components/OrderDetailPane";

PageTitle({
    title: "Edit Order",
    breadcrumb: [
        BreadcrumbItem({
            title: "Order",
            href: `${pageContext}/order.html`
        }),
        BreadcrumbItem({
            title: "Edit Order",
            active: true
        })
    ]
}).appendTo("#rootContent")

App().appendTo("#rootContent");

function App() {
    let editOrderDetailPaneId = `id-${nanoid()}`;
    let editOrderPaneId = `id-${nanoid()}`;

    let {$component: $OrderPane} = OrderPane({
        orderId: orderId
    })

    return (
        <section>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body pt-3">
                            <div>
                                <TabItems>
                                    <TabItem
                                        text="Order Details"
                                        active={true}
                                        targetId={editOrderDetailPaneId}
                                    />,
                                    <TabItem
                                        text="Order"
                                        targetId={editOrderPaneId}
                                    />
                                </TabItems>
                                <TabPanes>
                                    <TabPane active={true} id={editOrderDetailPaneId}>
                                        <OrderDetailPane orderId={orderId} />
                                    </TabPane>
                                    <TabPane id={editOrderPaneId}>
                                        <$OrderPane />
                                    </TabPane>
                                </TabPanes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}