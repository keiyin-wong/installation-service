import {nanoid} from "nanoid";

Sidebar().appendTo("#rootSidebar");

function Sidebar() {
    return (
        $("<aside>").addClass("sidebar").append(
            $("<ul>").addClass("sidebar-nav").attr({
                id: "sidebarNav"
            }).append(
                SidebarItem({
                    href: "index.html",
                    icon: "bi bi-grid",
                    text: "Dashboard"
                }),
                SidebarItem({
                    href: "order.html",
                    icon: "bi bi-grid",
                    text: "Order Management"
                }),
                SidebarItemCollapse({
                    icon: "bi bi-menu-button-wide",
                    text: "Components",
                    bsParent: "#sidebarNav",
                    items: [
                        SidebarItemCollapseItem({
                            href: "components-alerts.html",
                            text: "Alerts"
                        }),
                        SidebarItemCollapseItem({
                            href: "components-badges.html",
                            text: "Badges"
                        }),
                    ]
                }),
                SidebarHeading("Documentation"),
                SidebarItem({
                    href: "documentation.html",
                    icon: "bi bi-book",
                    text: "Documentation"
                })
            )
        )
    )
}

/**
 * Sidebar Item
 *
 * @param props
 * @param {string} props.href - href of the link
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 *
 * @returns {*|jQuery}
 * @constructor
 */
function SidebarItem(props) {
    let href = props.href;
    let icon = props.icon;
    let text = props.text;

    return (
       $("<li>").addClass("nav-item").append(
           $("<a>").addClass("nav-link collapsed").prop({
              href: href
           }).append(
               $("<i>").addClass(icon),
               $("<span>").text(text)
           )
       )
    )
}

/**
 *
 * @param props
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 * @param {string} props.bsParent - id of the parent
 * @param {array} [props.items=[]] - array of items
 *
 * @returns {*|jQuery}
 * @constructor
 */
function SidebarItemCollapse(props) {
    let icon = props.icon;
    let text = props.text;
    let bsParent = props.bsParent;
    let items = props.items ?? [];

    // ===============================
    let componentListId = `id${nanoid()}`;

    return (
        $("<li>").addClass("nav-item").append(
            $("<a>").addClass("nav-link collapsed").attr({
                href: "#",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#${componentListId}`
            }).on("click", function (e) {
                e.preventDefault();
            }).append(
                $("<i>").addClass(icon),
                $("<span>").text(text),
                $("<i>").addClass("bi bi-chevron-down ms-auto")
            ),
            $("<ul>").addClass("nav-content collapse").attr({
                id: componentListId,
                "data-bs-parent": bsParent
            }).append(
                items
            )
        )
    )
}

/**
 * Sidebar Item Collapse Item
 *
 * @param {object} props
 * @param {string} props.href - href of the link
 * @param {string} props.text - text of the link
 *
 * @returns {*|jQuery}
 * @constructor
 */
function SidebarItemCollapseItem(props) {
    let href = props.href;
    let text = props.text;

    return (
        $("<li>").append(
            $("<a>").prop({
                href: href
            }).append(
                $("<i>").addClass("bi bi-circle"),
                $("<span>").text(text)
            )
        )
    )
}

/**
 * Sidebar Heading
 *
 * @param {string} text - text of the heading
 * @returns {*|jQuery}
 * @constructor
 */
function SidebarHeading(text) {
    return (
        $("<li>").addClass("nav-heading").text(text)
    )
}