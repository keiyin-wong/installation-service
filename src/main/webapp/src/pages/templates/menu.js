import {nanoid} from "nanoid";
import SidebarItem from "./components/SidebarItem";
import SidebarHeading from "./components/SidebarHeading";
import SidebarCollapse, {SidebarCollapseItem} from "./components/SidebarCollapse";

Sidebar().appendTo("#rootSidebar");

function Sidebar() {
    let sidebarId = `id-${nanoid()}`;

    return (
        <aside className="sidebar">
            <ul className="sidebar-nav" id={sidebarId}>
                <SidebarHeading text="Main" />
                <SidebarItem
                    href="index.html"
                    icon="bi bi-grid"
                    text="Dashboard"
                />
                <SidebarItem
                    href="order.html"
                    icon="bi bi-clipboard-data"
                    text="Order Management"
                />
                <SidebarItem
                    href="service.html"
                    icon="bi bi-boxes"
                    text="Service Management"
                />
                <SidebarHeading text="System" />
                <SidebarCollapse
                    text="Role Management"
                    icon="bi bi-person-fill-gear"
                    bsParent={`#${sidebarId}`}
                >
                    <SidebarCollapseItem
                        href="components-alerts.html"
                        text="User Management"
                    />
                    <SidebarCollapseItem
                        href="authorization.html"
                        text="Authorization"
                    />
                </SidebarCollapse>
            </ul>
        </aside>
    )
}