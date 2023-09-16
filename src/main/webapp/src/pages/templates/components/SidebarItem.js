/**
 *
 *
 * @param props
 * @param {string} props.href - href of the link
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 *
 * @returns {JSX.Element|jquery|HTMLElement|*}
 * @constructor
 */
export default function SidebarItem(props) {
    let href = props.href;
    let icon = props.icon;
    let text = props.text;

    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href={href}>
                <i className={icon}></i>
                <span>{text}</span>
            </a>
        </li>
    )
}