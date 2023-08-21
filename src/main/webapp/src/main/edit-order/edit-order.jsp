<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<script type="text/javascript">
    let orderId = ${orderId};
    let serviceListFromServer = [
        <c:forEach items="${serviceVOList}" var="service" varStatus="status">
            {
                id: ${service.id},
                descriptionEnglish: "${service.descriptionEnglish}",
                descriptionChinese: "${service.descriptionChinese}",
                differentPrice: ${service.differentPrice},
                price: ${service.price},
                calculationType: ${service.calculationType},
                <c:if test="${service.differentPrice ne null}">
                serviceDiffPrices: [
                    <c:forEach items="${service.serviceDiffPrices}" var="serviceDiffPrice" varStatus="status">
                        {
                            serviceId: ${serviceDiffPrice.serviceId},
                            height: ${serviceDiffPrice.height},
                            price: ${serviceDiffPrice.price},
                        }<c:if test="${!status.last}">,</c:if>
                    </c:forEach>
                ]
                </c:if>
            }<c:if test="${!status.last}">,</c:if>
        </c:forEach>
    ]
</script>

<div id="rootContent">

</div>