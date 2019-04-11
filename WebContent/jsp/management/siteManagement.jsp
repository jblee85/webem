<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="content-wrapper">
    <section class="content-header userMgmtWrap">
      <h1>
        <b>사이트 관리</b>
        <!--<small>사이트 상세정보를 수정 및 관리하실 수 있습니다.</small>-->
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="row userMgmtWrap">
			<div class="col-lg-12 dashBox" ng-class="{shadowBox : themeClassName == 'mechanic'}">
				<div class="subBox"><p>사이트 상세정보를 <br>수정 및 관리하실 수 있습니다.</p><i class="clip-site"></i></div>
				<div class="conBox">
					<div>
						<form class="form-horizontal"  name="siteForm" ng-submit="siteRegist()">
							<div class="form-group">
								<label for="deviceId" class="col-xs-3 col-sm-3 control-label">사이트 아이디</label>
								<div class="col-xs-9 col-sm-9">
									<input type="text" class="form-control"  ng-model="siteModel.sid"  ng-required="true"  id="deviceId" name="deviceId" placeholder="장치 ID 형식" >
								</div>
							</div>
							<div class="alertBox"  ng-if="siteForm.deviceId.$dirty">
								<span class="primaryFont"  ng-if="!siteForm.deviceId.$error.required">장치아이디는 수정이 불가능하니 신중히 입력해주세요</span>
								<span ng-if="siteForm.deviceId.$error.required">장치아이디를 입력 해주세요</span>
							</div>
							<div class="form-group">
								<label for="siteName" class="col-xs-3 col-sm-3 control-label">사이트 명</label>
								<div class="col-xs-9 col-sm-9">
									<input type="text" class="form-control"  ng-model="siteModel.sname"   ng-required="true"  id="siteName" name="siteName" placeholder="사이트 명을 입력해주세요" >
								</div>
							</div>
							<div class="alertBox"  ng-if="siteForm.siteName.$dirty">
							</div>
							<div class="form-group">
								<label for="addrs" class="col-xs-3 col-sm-3 control-label">주소</label>
								<div class="col-xs-9 col-sm-9">
									<input type="text" class="form-control leftInput"  ng-model="siteModel.addr1"  ng-required="true" id="addrs" name="addrs" placeholder="주소를 입력해주세요">
<!-- 									<button type="button" class="btn btn-default rightBtn" ng-click="getPostCode()">주소 찾기</button> -->
								</div>
							</div>
							<div class="alertBox" ng-if="siteForm.addrs.$dirty">
							</div>
							<div class="form-group">
								<label for="detailAddrs" class="col-xs-3 col-sm-3 control-label">상세주소</label>
								<div class="col-xs-9 col-sm-9">
									<input type="text" class="form-control"  ng-model="siteModel.addr2"  ng-required="true"  id="detailAddrs" name="detailAddrs" placeholder="상세주소를 입력해주세요">
								</div>
							</div>
							<div class="alertBox" ng-if="siteForm.detailAddrs.$dirty">
								<span ng-if="siteForm.deviceId.$error.required">필수 입력란 입니다.</span>
							</div>
							<div class="form-group">
								<label for="payType" class="col-xs-3 col-sm-3 control-label" >나의 요금제</label>
								<div class="col-xs-9 col-sm-9">
									<select class="form-control" id="payType"  ng-model="siteModel.bcode" ng-required="true"  name="payType" ng-options="bc.bcode as bc.text for bc in bcodes">
									</select>
								</div>
							</div>
							<div class="alertBox"  ng-if="siteForm.payType.$dirty">
					  		<span ng-if="siteForm.payType.$error.required">요금제를 선택해주세요</span>
						  </div>
							<div class="form-group">
								<label for="ePower" class="col-xs-3 col-sm-3 control-label">계약 전력</label>
								<div class="col-sm-4 floatFlex">
									<input type="number" class="form-control col-xs-12"  ng-model="siteModel.data.kepcockw"  ng-required="true" id="ePower" name="ePower" placeholder="숫자로만 입력해주세요"><p class="rightText">kW</p>
								</div>
							</div>
							<div class="alertBox" ng-if="siteForm.ePower.$dirty">
						  </div>
						 <div class="form-group" >
								<label for="meteringDay" class="col-xs-3 col-sm-3 control-label">검침일</label>
								<div class="col-sm-4 floatFlex">
									<select class="form-control" id="meteringDay"   ng-model="siteModel.rdday" ng-required="true"  name="meteringDay"  ng-options="rdl for rdl in rddayList">
									</select>
									<p class="rightText">일</p>
								</div>
						 </div>
						 <div class="alertBox"  ng-if="siteForm.meteringDay.$dirty">
					  		<span ng-if="siteForm.meteringDay.$error.required">검침일을 선택해주세요</span>
						  </div>
						</form>
						<div class="buttonWrap">
							 <button type="submit" class="btn btn-default btn-lg"  ng-disabled="siteForm.$invalid" ng-click="confirm()">저장</button>
		       				<button type="button" class="btn btn-default btn-lg" ng-click="cancel()">취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>
    </section>
    <!-- /.content -->
  </div>