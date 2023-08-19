import {pageContext} from "../../utils/common-utils";

export function getOrderApi(id) {
    return $.ajax({
        url: `${pageContext}/orders/${id}/vo`,
        type: "GET",
        dataType: "json",
    })
}