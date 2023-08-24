import {pageContext} from "../utils/common-utils";

export function getAllServicesApi() {
    return $.ajax({
        url: `${pageContext}/services/vo`,
        type: "GET",
        dataType: "json",
    })
}