export default function Nav() {
    return (
        <nav
            className="header-nav ms-auto"
        >
            <ul className="d-flex align-items-center">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link nav-icon"
                        href="#"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-bell-fill"></i>
                        <span className="badge bg-primary badge-number">4</span>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a
                        className="nav-link nav-icon"
                        href="#"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span className="badge bg-success badge-number">4</span>
                    </a>
                </li>
                <li className="nav-item dropdown pe-3">
                    <a
                        className="nav-link nav-profile d-flex align-items-center pe-0"
                        href="#"
                        data-bs-toggle="dropdown"
                    >
                        <img className="rounded-circle" src="images/profile.jpg" alt="profile"/>
                        <span className="d-none d-md-block dropdown-toggle ps-2">Kei Yin</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li className="dropdown-header">
                            <h6>KeiYin</h6>
                            <span>Web Developer</span>
                        </li>
                        <ProfileDivider />
                        <ProfileItem
                            href="profile.html"
                            icon="bi bi-person-fill"
                            text="Profile"
                        />
                        <ProfileDivider />
                        <ProfileItem
                            href="pages-faq.html"
                            icon="bi bi-question-circle-fill"
                            text="Help"
                        />
                        <ProfileDivider />
                        <ProfileItem
                            href="#"
                            icon="bi bi-box-arrow-right"
                            text="Logout"
                        />
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export function ProfileDivider() {
    return (
        <li>
            <hr className="dropdown-divider" />
        </li>
    )
}

/**
 *
 * @param props
 * @param {string} props.href - href of the link
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 *
 * @returns {jQuery}
 * @constructor
 */
export function ProfileItem(props) {
    return (
        <li>
            <a
                className="dropdown-item d-flex align-items-center"
                href={props.href}
            >
                <i className={props.icon}></i>
                <span>{props.text}</span>
            </a>
        </li>
    )
}
