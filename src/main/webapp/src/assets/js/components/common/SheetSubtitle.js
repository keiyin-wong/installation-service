import "./style/SheetSubtitle.scss";

/**
 *
 * Sheet subtitle component
 *
 * @param {string} props.title sheet title. Default value is "Information"
 * @param {boolean} [props.showButton=false] show button or not. Default value is false
 * @param {string} [props.button.buttonText=""] button text. Default value is ""
 * @param {string} [props.button.buttonClass="btn btn-sm btn-outline-secondary"] button class. Default value is "btn btn-sm btn-outline-secondary"
 * @param {function} [props.button.buttonOnClick=function] button on click event. Default value is function () {}
 *
 * @returns {*|jQuery}
 * @constructor
 */
export default function SheetSubtitle (props) {
    let title = props?.title ?? "Information";
    let showButton = props?.showButton ?? false;
    let buttonText = props?.button?.buttonText ?? "";
    let buttonClass = props?.button?.buttonClass ?? "btn btn-sm btn-outline-secondary";
    let buttonOnClick = props?.button?.buttonOnClick ?? function () {};

    return $("<div>").addClass("sheet").append(
        $("<div>").addClass("sheet-subtitle").text(title),
        showButton && $("<div>").addClass("sheet-button").append(
            $("<a>").addClass(buttonClass)
                .text(buttonText)
                .on("click", buttonOnClick)
        )
    )
}