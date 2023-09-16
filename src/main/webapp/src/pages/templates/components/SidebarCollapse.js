import {nanoid} from "nanoid";

/**
 *
 * @param props
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 * @param {string} props.bsParent - id of the parent
 *
 * @param {} children - children
 * @returns {JSX.Element}
 *
 * @constructor
 */
export default function SidebarCollapse(props, children) {
    let icon = props.icon;
    let text = props.text;
    let bsParent = props.bsParent;
    let items = props.items ?? [];

    let componentListId = `id${nanoid()}`;

    return (
        <li className="nav-item">
            <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target={`#${componentListId}`}
                aria-expanded="true"
                aria-controls={bsParent}
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <i className={icon}></i>
                <span>{text}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
                className="nav-content collapse"
                id={componentListId}
                data-bs-parent={bsParent}
            >
                {children}
            </ul>
        </li>
    )
}

/**
 *
 * SidebarItemCollapseItem
 *
 * @param props
 * @param {string} props.href - href of the link
 * @param {string} props.text - text of the link
 *
 * @returns {JSX.Element}
 * @constructor
 */
export function SidebarCollapseItem(props) {
    let href = props.href;
    let text = props.text;

    return (
        <li>
            <a href={href}>
                <i className="bi bi-circle"></i>
                <span>{text}</span>
            </a>
        </li>
    )
}