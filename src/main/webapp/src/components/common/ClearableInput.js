import "./style/ClearableInput.scss";

/**
 *
 * Jquery component to create clearable input
 *
 * @param {jQuery|*} props.input- The input element
 * @param {function} [props.additionalClearCallback] - The additional callback to be called when clear button is clicked
 *
 * @returns {jQuery}
 * @constructor
 */
export default function ClearableInput(props, children) {
    if (children instanceof Array) {
        children = children[0];
    }

    let clearCallback = props?.additionalClearCallback ?? function() {};

    let $clearableIcon = (
        $("<i>").addClass("bi bi-x clearable-icon")
            .on("click", function(e) {
                e.preventDefault();
                children.val("").trigger("input");
                clearCallback();
            })
    )
    $clearableIcon.hide();

    children.on("input", function() {
        $clearableIcon.toggle(this.value !== "");
    })

    return (
        $("<span>").addClass("clearable w-100 d-flex align-items-center").append(
            children,
            $clearableIcon
        )
    )
}