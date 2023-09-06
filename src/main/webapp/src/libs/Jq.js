export default class Jq {
    static createElement(tag, props, ...children) {
        if (typeof tag === "function") {
            return tag(props, children);
        }

        if (tag instanceof $) {
            assignAttributes(tag, props)
            appendChildren(tag, children)
            return tag;
        }

        const element = document.createElement(tag);
        let $element = $(element);
        assignAttributes($element, props)
        appendChildren($element, children)
        return $element
    }

    static fragment(props, ...children) {
        return children;
    }
}

function assignAttributes($element, props) {
    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith("on")) {
            switch (name) {
                case "onReady":
                    $element.ready(value);
                    break;
                default:
                    let eventName = name.toLowerCase().substr(2);
                    if (name.toLowerCase() in window) {
                        $element.on(eventName, value);
                    } else {
                        // Replace the underscore with a dot
                        eventName = eventName.replaceAll("_", ".");
                        $element.on(eventName, value);
                    }
                    break;
            }
        } else {
            switch (name) {
                case "className":
                    $element.attr("class", value);
                    break;
                case "style":
                    $element.css(value);
                    break;
                case "htmlFor":
                    $element.attr("for", value);
                    break;
                case "disabled":
                    if (value) {
                        $element.prop("disabled", true);
                    }
                    break;
                case "required":
                    if (value) {
                        $element.prop("required", true);
                    }
                    break;
                case "readonly":
                    if (value) {
                        $element.prop("readonly", true);
                    }
                    break;
                case "checked":
                    if (value) {
                        $element.prop("checked", true);
                    }
                    break;
                default:
                    $element.attr(name, value);
            }
        }
    });
}

function appendChildren($parent, children) {
    children.forEach((child) => {
        if (typeof child == 'string') {
            if ($parent.attr("isDangerousHtml")) {
                $parent.append(child);
            } else {
                $parent.append(
                    $(document.createTextNode(child))
                );
            }
            // $parent.append(child);
        } else if (child instanceof $) {
            $parent.append(child);
        } else {
            if (child instanceof Array) {
                appendChildren($parent, child);
            } else {
                $parent.append(child);
            }
        }
    });
}