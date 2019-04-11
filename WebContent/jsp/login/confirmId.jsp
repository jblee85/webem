<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<div class="container loginContainer">
		<div class="logoWrap"><h2 class="form-signin-heading"><span href="login.jsp" class="logo"><!-- <i></i>&nbsp;Smart ICE <span>EMS</span></span> --></h2></div>
		<div class="langService"><span><i></i><a href="#" class="focus">KO</a><a href="#">EN</a></span></div>
		<form class="form-signin row" name="myForm" role="form" >
			<div class="loginForm">
				<h4>아이디<br>찾기 확인</h4>
				<div class="inputIn">
					<div class="idViewWrap">
						<h6>회원님의 아이디는 아래와 같습니다.</h6>
						<b><span>이름</span>&nbsp;&nbsp;<span>ID<span>@</span>wooam.com</span></b><br>
						<p><span>2019.02.28 15:56</span>가입</p>
					</div>
			        <div class="inputBtnWrap">
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login" href="#!/login">로그인</button>
			        </div>
				</div>
			</div>
		</form>
		<div class="loginFooter">Copyright Wooam, INC. ALL right reserved</div>
	</div>
