import logoImg from "../assets/files/img/logo.png";

Header().appendTo("#rootHeader")
Nav().appendTo("#rootHeader")

$(function () {
    $(".toggle-sidebar-btn").on("click", function () {
        $("body").toggleClass("toggle-sidebar");
    })
})

function Header() {
    return (
        $("<div>").addClass("d-flex align-items-center justify-content-between").append(
            $("<a>").addClass("logo d-flex align-items-center").prop({
                href: "index.html"
            }).append(
                $("<img>").prop({
                    src: logoImg
                }),
                $("<span>").addClass("d-none d-lg-block").text("Kei Yin")
            ),
            $("<i>").addClass("bi bi-list toggle-sidebar-btn")
        )
    )
}

function Nav() {
    return (
        $("<nav>").addClass("header-nav ms-auto").append(
            $("<ul>").addClass("d-flex align-items-center").append(
                // Notification
                $("<li>").addClass("nav-item dropdown").append(
                    $("<a>").addClass("nav-link nav-icon").prop({
                        href: "#",
                        "data-bs-toggle": "dropdown"
                    }).append(
                        $("<i>").addClass("bi bi-bell-fill"),
                        $("<span>").addClass("badge bg-primary badge-number").text("4")
                    )
                ),
                // Message
                $("<li>").addClass("nav-item dropdown").append(
                    $("<a>").addClass("nav-link nav-icon").prop({
                        href: "#",
                        "data-bs-toggle": "dropdown"
                    }).append(
                        $("<i>").addClass("bi bi-chat-left-text"),
                        $("<span>").addClass("badge bg-success badge-number").text("4")
                    )
                ),
                // Profile
                $("<li>").addClass("nav-item dropdown pe-3").append(
                    $("<a>").addClass("nav-link nav-profile d-flex align-items-center pe-0").attr({
                        href: "#",
                        "data-bs-toggle": "dropdown"
                    }).append(
                        $("<img>").addClass("rounded-circle").prop({
                            src: "images/profile.jpg",
                        }),
                        $("<span>").addClass("d-none d-md-block dropdown-toggle ps-2").text("Kei Yin")
                    ),
                    // Profile dropdown menu
                    $("<ul>").addClass("dropdown-menu dropdown-menu-end dropdown-menu-arrow profile").append(
                        $("<li>").addClass("dropdown-header").append(
                            $("<h6>").text("KeiYin"),
                            $("<span>").text("Web Developer")
                        ),
                        ProfileDivider(),
                        ProfileItem({
                            href: "profile.html",
                            icon: "bi bi-person-fill",
                            text: "Profile"
                        }),
                        ProfileDivider(),
                        ProfileItem({
                            href: "pages-faq.html",
                            icon: "bi bi-question-circle-fill",
                            text: "Help"
                        }),
                        ProfileDivider(),
                        ProfileItem({
                            href: "#",
                            icon: "bi bi-box-arrow-right",
                            text: "Logout"
                        })
                    )
                )
            )
        )
    )
}

function ProfileDivider() {
    return (
        $("<li>").append(
            $("<hr>").addClass("dropdown-divider")
        )
    )
}

/**
 * Profile item
 *
 * @param props
 * @param {string} props.href - href of the link
 * @param {string} props.icon - icon class
 * @param {string} props.text - text of the link
 *
 * @returns {*|jQuery}
 * @constructor
 */
function ProfileItem(props) {
    let href = props.href;
    let icon = props.icon;
    let text = props.text;

    return $("<li>").append(
        $("<a>").addClass("dropdown-item d-flex align-items-center").prop({
            href: href
        }).append(
            $("<i>").addClass(icon),
            $("<span>").text(text)
        )
    )
}