import {pageContext} from "../../utils/common-utils";
import moment from "moment";

export function getOrderVOApi(id) {
    return $.ajax({
        url: `${pageContext}/orders/${id}/vo`,
        type: "GET",
        dataType: "json",
    })
}

export function getOrderApi(id) {
    return $.ajax({
        url: `${pageContext}/orders/${id}`,
        type: "GET",
        dataType: "json",
    })
}

/**
 *
 * @param {string|number} id - the order id
 * @param {object} order
 * @param {string} order.date - the order date in format DD-MM-YYYY
 * @param {string} order.remarks - the remarks, customer notes
 * @param {string} order.comments - the comments
 *
 * @returns {*|jQuery}
 */
export function updateOrderApi(id, order) {
    let formattedDate = moment(order.date, "DD-MM-YYYY").format("YYYY-MM-DD");

    return $.ajax({
        url: `${pageContext}/orders/${id}/update`,
        type: "POST",
        dataType: "json",
        data: {
            date: formattedDate,
            remarks: order.remarks,
            comments: order.comments,
        }
    })
}

/**
 * Create a new order
 *
 * @param {object} order
 * @param {string} order.date - the order date in format DD-MM-YYYY
 * @param {string} order.remarks - the remarks, customer notes
 * @param {string} order.comments - the comments
 *
 * @returns {*|jQuery}
 */
export function createOrderApi(order) {
    let formattedDate = moment(order.date, "DD-MM-YYYY").format("YYYY-MM-DD");

    return $.ajax({
        url: `${pageContext}/orders/create`,
        type: "POST",
        dataType: "json",
        data: {
            date: formattedDate,
            remarks: order.remarks,
            comments: order.comments,
        }
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