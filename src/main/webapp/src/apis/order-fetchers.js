import {pageContext} from "../utils/common-utils";
import moment from "moment";

/**
 *
 * @param {function} [assignData=function(){}] - the function to assign data to the datatable
 *
 * @returns {{data: data, type: string, url: string}}
 */
export function getOrderDatatableVOApi(assignData) {
    let assignDataFn = assignData == null ? function () {} : assignData;

    return {
        url: `${pageContext}/orders/datatable/vo`,
        type: "POST",
        data: function (d) {
            assignData(d);
        }
    }
}

/**
 * Get the order view object, including the order details list
 *
 * @param id
 * @returns {*|jQuery}
 */
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
 *
 * @param {string|number} id - the order id
 *
 * @returns {*|jQuery}
 */
export function deleteOrderApi(id) {
    return $.ajax({
        url: `${pageContext}/orders/${id}/delete`,
        type: "POST",
        dataType: "json",
    })
}


// =================================================
// Order Detail
// =================================================


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
        url: `${pageContext}/orders/${orderId}/line-number/${lineNumber}/order-details/update`,
        type: "POST",
        dataType: "json",
        data: data
    })
}

/**
 * Create a new order detail
 *
 * @param orderId - the order id
 * @param orderDetail - the order detail
 * @param {number|string} orderDetail.serviceId - the service id
 * @param {string} orderDetail.description - the description
 * @param {number|string} orderDetail.width - the width
 * @param {number|string} orderDetail.height - the height
 * @param {number|string} orderDetail.quantity - the quantity
 * @param {number|string} orderDetail.finalPrice - the final unit price, no need in cents, it will be automatically converted
 *
 * @returns {*|jQuery}
 */
export function createOrderDetailApi(orderId, orderDetail) {
    if (!orderId) {
        throw new Error("orderId is required")
    }

    let data = {
        serviceId : orderDetail.serviceId,
        description : orderDetail.description,
        width : orderDetail.width,
        height : orderDetail.height,
        quantity : orderDetail.quantity,
        finalPrice : (Number(orderDetail.finalPrice) * 100).toFixed(0), // Convert to cents
    }

    return $.ajax({
        url: `${pageContext}/orders/${orderId}/order-details/create`,
        type: "POST",
        dataType: "json",
        data: data
    })
}

/**
 *
 * Delete an order detail
 *
 * @param {string|number} orderId - the order id
 * @param {string|number} lineNumber - the line number
 * @returns {*|jQuery}
 */
export function deleteOrderDetailApi(orderId, lineNumber) {
    if (!orderId) {
        throw new Error("orderId is required")
    }
    if (!lineNumber) {
        throw new Error("lineNumber is required")
    }

    return $.ajax({
        url: `${pageContext}/orders/${orderId}/line-number/${lineNumber}/order-details/delete`,
        type: "POST",
        dataType: "json",
    })
}


// ================[ Order Invoice ]====================

/**
 *
 * Get the order invoice url
 *
 * @param {string|number} orderId
 * @param {boolean} [inline=true]
 * @param {boolean} [mergeWithSketch=false]
 * @returns {string}
 */
export function getOrderInvoiceUrl(orderId, inline, mergeWithSketch) {
    if (orderId == null) {
        throw new Error("orderId is required")
    }
    let inlineParam = inline == null ? true : inline;
    let mergeWithSketchParam = mergeWithSketch == null ? false : mergeWithSketch;

    return `${pageContext}/orders/${orderId}/invoice?inline=${inlineParam}&mergeWithSketch=${mergeWithSketchParam}`
}

// ================[End of Order Invoice ]===============