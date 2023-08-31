import {pageContext} from "../utils/common-utils";

export function redirectToEditOrderPage(orderId) {
    window.location.href = `${pageContext}/edit-order.html?orderId=${orderId}`;
}