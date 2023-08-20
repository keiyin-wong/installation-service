import {pageContext} from "../../utils/common-utils";

export function getOrderApi(id) {
    return $.ajax({
        url: `${pageContext}/orders/${id}/vo`,
        type: "GET",
        dataType: "json",
    })
}

/**
 *
 * @param {number|string} orderId
 * @param {number|string} lineNumber
 * @param orderDetail
 * @param {number|string} orderDetail.serviceId
 * @param {string} orderDetail.description
 * @param {number|string} orderDetail.width
 * @param {number|string} orderDetail.height
 * @param {number|string} orderDetail.quantity
 * @param {number|string} orderDetail.finalPrice
 *
 *
 * @returns {*|ajax}
 */
export function updateOrderDetailApi(orderId, lineNumber, orderDetail) {
    if (!orderId) {
        throw new Error("orderId is required")
    }
    if (!lineNumber) {
        throw new Error("lineNumber is required")
    }

    let data = {
        serviceId : orderDetail.serviceId,
        description : orderDetail.description,
        width : orderDetail.width,
        height : orderDetail.height,
        quantity : orderDetail.quantity,
        finalPrice : (Number(orderDetail.finalPrice) * 100).toFixed(0),
    }

    return $.ajax({
        url: `${pageContext}/orders/${orderId}/line-number/${lineNumber}/order-detail/update`,
        type: "POST",
        dataType: "json",
        data: data
    })
}