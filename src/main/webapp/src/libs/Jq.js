const add = (parent, child) => {
    parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
};

const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild) => appendChild(parent, nestedChild));
    } else {
        add(parent, child);
    }
};

export default class Jq {
    static createElement(tag, props, ...children) {
        if (typeof tag === "function") {
            return tag(props, children);
        }

        if (tag instanceof $) {
            Object.entries(props || {}).forEach(([name, value]) => {
                if (name.startsWith("on")) {
                    switch (name) {
                        case "onReady":
                            tag.ready(value);
                            break;
                        default:
                            if (name.toLowerCase() in window) {
                                tag.on(name.toLowerCase().substr(2), value);
                            }
                            break;
                    }
                } else {
                    switch (name) {
                        case "className":
                            tag.attr("class", value);
                            break;
                        case "style":
                            tag.css(value);
                            break;
                        default:
                            tag.attr(name, value);
                    }
                }
            });
            children.forEach((child) => {
                if (child instanceof $) {
                    tag.append(child);
                } else {
                    tag.append(
                        $(document.createTextNode(child))
                    );
                }
            });
            return tag;
        }


        const element = document.createElement(tag);
        let $element = $(element);
        Object.entries(props || {}).forEach(([name, value]) => {
            if (name.startsWith("on")) {
                switch (name) {
                    case "onReady":
                        $element.ready(value);
                        break;
                    default:
                        if (name.toLowerCase() in window) {
                            $element.on(name.toLowerCase().substr(2), value);
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
                    default:
                        $element.attr(name, value);
                }
            }
        });

        children.forEach((child) => {
            if (child instanceof $) {
                $element.append(child);
            } else {
                $element.append(
                    $(document.createTextNode(child))
                );
            }
        });

        return $element
    }
}