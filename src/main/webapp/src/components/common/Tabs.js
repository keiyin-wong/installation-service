/**
 *
 * Tab Item
 *
 * @param props
 * @param {string} props.text - text of the tab item
 * @param {string} props.targetId - id of the target, without #
 * @param {boolean} [props.active=false] - is active tab
 *
 * @returns {*|jQuery}
 */
export function TabItem(props) {
    let text = props.text;
    let targetId = props.targetId;
    let active = props.active;

    return (
        <li className="nav-item">
            <button
                className={active ? "nav-link active" : "nav-link"}
                data-bs-toggle="tab"
                data-bs-target={`#${targetId}`}
            >
                {text}
            </button>
        </li>
    )
}

/**
 *
 * Tab Pane
 *
 * @param props
 * @param {string} props.id - id of the tab pane, without #
 * @param {boolean} [props.active=false] - is active tab pane
 * @param {JSX.Element} [children] - JSX children
 *
 * @returns {*|jQuery}
 * @constructor
 */
export function TabPane(props, children) {

    let id = props.id;
    let active = props.active;

    return (
        <div
            className={active ? "tab-pane fade show active" : "tab-pane fade"}
            id={id}
        >
            {children}
        </div>
    )
}

export function TabItems(props, children) {
    return (
        <ul className="nav nav-tabs nav-tabs-bordered">
            {children}
        </ul>
    )
}

export function TabPanes(props, children) {
    return (
        <div className="tab-content pt-2">
            {children}
        </div>
    )
}
