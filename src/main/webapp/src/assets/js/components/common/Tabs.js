
/**
 *
 * @param props
 * @param {Array<TabItem>} props.tabItems
 * @param {Array<TabPane>} props.tabPanes
 *
 * @returns {*|jQuery}
 */
export default function Tabs(props) {
    let tabItems = props.tabItems ?? [];
    let tabPanes = props.tabPanes ?? [];


    return (
        $("<div>").append(
            $("<ul>").addClass("nav nav-tabs nav-tabs-bordered").append(
                tabItems
            ),
            $("<div>").addClass("tab-content pt-2").append(
                tabPanes
            )
        )
    )
}

/**
 *
 * Tab Item
 *
 * @param props
 * @param {string} props.text - text of the tab item
 * @param {string} props.targetId - id of the target, without #
 * @param {boolean} [props.active=false] - is active tab
 *
 */
export function TabItem(props) {
    let text = props.text;
    let targetId = props.targetId;
    let active = props.active;

    return $("<li>").addClass("nav-item").append(
        $("<button>").addClass(
            active ? "nav-link active" : "nav-link"
        ).attr({
            "data-bs-toggle": "tab",
            "data-bs-target": `#${targetId}`
        }).text(text)
    )
}

/**
 *
 * Tab Pane
 *
 * @param props
 * @param {string} props.id - id of the tab pane, without #
 * @param {boolean} [props.active=false] - is active tab pane
 * @param {jQuery} props.paneContent - content of the tab pane
 *
 * @returns {*|jQuery}
 * @constructor
 */
export function TabPane(props) {

    let id = props.id;
    let active = props.active;
    let paneContent = props.paneContent;

    return (
        $("<div>").addClass(
            active ? "tab-pane fade show active" : "tab-pane fade"
        ).attr({
            "id": id,
        }).append(
            paneContent
        )
    )
}
