
/**
 *
 * @param {boolean} [props.isIndicatorStart=false] - whether you want to display the icon indicator at the start of the menu
 *
 * @returns {*|jQuery}
 * @constructor
 */
export default function MoreOptions2(props, children) {
    let isIndicatorStart = props?.isIndicatorStart ?? false;
    let indicatorStartClass = isIndicatorStart ? "dropdown-menu-indicator-start" : "";

    return (
        <div className="dropdown me-2 dropstart">
            <button
                className="btn btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-popper-config='{"strategy":"fixed"}'
            >
                <i className="bi bi-three-dots-vertical" style={{fontSize: "1.2rem"}}></i>
            </button>
            <ul className={`dropdown-menu ${indicatorStartClass}`}>
                {children}
            </ul>
        </div>
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
export function MoreOptionsItem2(props) {
    let text = props?.text ?? "";
    let onClick = props?.onClick ?? function () {};
    let href = props?.href ?? "#";

    return (
        <li>
            <a
                className="dropdown-item"
                href={href}
                onClick={onClick}
            >
                <div className="dropdown-item-content">
                    <i></i>
                    <span>{text}</span>
                </div>
            </a>
        </li>
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
 *
 */
export function MoreOptionsItemWithIcon2(props) {
    let text = props?.text ?? "";
    let href = props?.href ?? "#";
    let iconClass = props?.iconClass ?? "";
    let onClick = props?.onClick ?? function () {};

    return (
        <li>
            <a
                className="dropdown-item"
                href={href}
                onClick={onClick}
            >
                <div className="dropdown-item-content">
                    <i className={iconClass}></i>
                    <span>{text}</span>
                </div>
            </a>
        </li>
    )
}