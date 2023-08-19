/**
 *
 *
 * @param {object} props
 * @param {string} props.title - The title of the page
 * @param {Array} [props.breadcrumb=[]] - The breadcrumb items
 *
 * @returns {*|jQuery}
 * @constructor
 */
export default function PageTitle(props) {

    let title = props.title;
    let breadcrumb = props.breadcrumb ?? [];

    // ========================================================================

    return (
        $("<div>").addClass("pagetitle").append(
            $("<h1>").text(title),
            $("<nav>").append(
                $("<ol>").addClass("breadcrumb").append(
                    breadcrumb
                )
            )
        )
    )
}

/**
 *
 *
 * @param props
 * @param {string} props.title - The title of the breadcrumb item
 * @param {string} [props.href="#"] - The href of the breadcrumb item
 * @param {boolean} [props.active=false] - Whether the breadcrumb item is active
 *
 * @returns {*|jQuery}
 * @constructor
 */
export function BreadcrumbItem(props) {

    let title = props.title;
    let href = props.href ?? "#";
    let active = props.active ?? false;

    // ========================================================================

    return (
        $("<li>").addClass(
            active ? "breadcrumb-item active" : "breadcrumb-item"
        ).append(
            active ? title : $("<a>").attr("href", href).text(title)
        )
    )
}