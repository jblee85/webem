<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
		<div class="location" >
			<a ui-sref="{{main}}" ><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
			<a ui-sref="{{parentUrl}}" href="/{{parentUrl}}">{{parentName}}</a>
			<span class="current">{{title}}</span>
		</div>
	</body> <!-- /body -->
</html> <!-- /html -->

