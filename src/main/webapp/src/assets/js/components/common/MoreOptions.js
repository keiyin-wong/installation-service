import "./MoreOptions.scss"

/**
 *
 * @param {boolean} [props.isIndicatorStart=false] - whether you want to display the icon indicator at the start of the menu
 * @param {[jQuery]} [props.menuItems=[]] - the menu items to be displayed
 *
 * @returns {*|jQuery}
 * @constructor
 */
export default function MoreOptions(props) {
    let isIndicatorStart = props?.isIndicatorStart ?? false;
    let menuItems = props?.menuItems ?? [];

    let indicatorStartClass = isIndicatorStart ? "dropdown-menu-indicator-start" : "";

    return (
        $("<div>").addClass("dropdown me-2 dropstart").append(
            $("<button>").addClass("btn btn-sm")
                .attr("type", "button")
                .attr("data-bs-toggle", "dropdown")
                .attr("aria-expanded", "false")
                .attr("data-bs-popper-config", '{"strategy":"fixed"}')
                .append(
                    $("<i>").addClass("bi bi-three-dots-vertical").css({
                        fontSize: "1.2rem"
                    })
                ),
            $("<ul>").addClass(`dropdown-menu ${indicatorStartClass}`).append(
                menuItems
            )
        )
    )
}


/**
 *
 * @param {string} props.text="" - the text to be displayed on the menu item
 * @param {string} [props.href="#"] - the href to be displayed on the menu item
 * @param {function} [props.onClick] - the callback function when the menu item is clicked
 *
 * @returns {jQuery}
 * @constructor
 */
export function MoreOptionsItem(props) {
    let text = props?.text ?? "";
    let onClick = props?.onClick ?? function () {};
    let href = props?.href ?? "#";

    return (
        $("<li>").append(
            $("<a>").addClass("dropdown-item")
                .attr("href", href)
                .append(
                    $("<div>").addClass("dropdown-item-content").append(
                        $("<i>"),
                        $("<span>").text(text)
                    )
                ).on("click", onClick)
        )
    )
}

/**
 *
 * @param {string} props.text="" - the text to be displayed on the menu item
 * @param {string} [props.iconClass=""] - the icon class to be displayed on the menu item
 * @param {string} [props.href="#"] - the href to be displayed on the menu item
 * @param {function} [props.onClick] - the callback function when the menu item is clicked
 *
 * @returns {jQuery}
 * @constructor
 */
export function MoreOptionsItemWithIcon(props) {
    let text = props?.text ?? "";
    let href = props?.href ?? "#";
    let iconClass = props?.iconClass ?? "";
    let onClick = props?.onClick ?? function () {};

    return (
        $("<li>").append(
            $("<a>").addClass("dropdown-item")
                .attr("href", href)
                .append(
                    $("<div>").addClass("dropdown-item-content").append(
                        $("<i>").addClass(iconClass),
                        $("<span>").text(text)
                    )
                ).on("click", onClick)
        )
    )
}