<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${empty contextUrl}" >
	<c:set var="contextUrl" value="${pageContext.request.contextPath}"/>
</c:if> 

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
		<title><tiles:insertAttribute name="title" /></title>
	</head>
	<body>
		<tiles:insertAttribute name="header" />
		<tiles:insertAttribute name="menu" />
		<div id="loader"></div>
		<div id="pop-message"></div>
		<tiles:insertAttribute name="body" />
	</body>
</html>