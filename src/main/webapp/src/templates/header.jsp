<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<script type="text/javascript">
$(document).ready(function(){
	$("#logout").on("click", function(){
		window.open("${pageContext.request.contextPath}/j_spring_security_logout", "_self");
	})
});

</script>


<div class="header">
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="float-left">
					<div class="hamburger sidebar-toggle">
						<span class="line"></span> <span class="line"></span> <span
							class="line"></span>
					</div>
				</div>
				<div class="float-right">
					<!-- <div class="dropdown dib" style="display:none">
						<div class="header-icon" data-toggle="dropdown">
							<i class="ti-bell"></i>
							<div class="drop-down dropdown-menu dropdown-menu-right">
								<div class="dropdown-content-heading">
									<span class="text-left">Recent Notifications</span>
								</div>
								<div class="dropdown-content-body">
									<ul>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Mr. John</div>
													<div class="notification-text">5 members joined today
													</div>
												</div>
										</a></li>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Mariam</div>
													<div class="notification-text">likes a photo of you</div>
												</div>
										</a></li>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Tasnim</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Mr. John</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li class="text-center"><a href="#" class="more-link">See
												All</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="dropdown dib" style="display:none">
						<div class="header-icon" data-toggle="dropdown">
							<i class="ti-email"></i>
							<div class="drop-down dropdown-menu dropdown-menu-right">
								<div class="dropdown-content-heading">
									<span class="text-left">2 New Messages</span> <a
										href="email.html"> <i class="ti-pencil-alt pull-right"></i>
									</a>
								</div>
								<div class="dropdown-content-body">
									<ul>
										<li class="notification-unread"><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Michael Qin</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li class="notification-unread"><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Mr. John</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Michael Qin</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li><a href="#"> <img
												class="pull-left m-r-10 avatar-img"
												src="" alt="" />
												<div class="notification-content">
													<small class="notification-timestamp pull-right">02:34
														PM</small>
													<div class="notification-heading">Mr. John</div>
													<div class="notification-text">Hi Teddy, Just wanted
														to let you ...</div>
												</div>
										</a></li>
										<li class="text-center"><a href="#" class="more-link">See
												All</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div> -->
					<div class="dropdown dib">
						<div class="header-icon" data-toggle="dropdown">
							<span class="user-avatar">
								<c:if test="${pageContext.request.userPrincipal.name != null}">
									${pageContext.request.userPrincipal.name}
								</c:if>
								<i class="ti-angle-down f-s-10"></i>
							</span>
							<div class="drop-down dropdown-profile dropdown-menu dropdown-menu-right">
								<div class="dropdown-content-heading">
									<!-- <span class="text-left">Upgrade Now</span>
									<p class="trial-day">30 Days Trail</p> -->
									<span class="text-left">Hello, ${pageContext.request.userPrincipal.name}</span>
								</div>
								<div class="dropdown-content-body">
									<ul>
										<!-- <li><a href="#"> <i class="ti-user"></i> <span>Profile</span>
										</a></li>

										<li><a href="#"> <i class="ti-email"></i> <span>Inbox</span>
										</a></li>
										<li><a href="#"> <i class="ti-settings"></i> <span>Setting</span>
										</a></li>

										<li><a href="#"> <i class="ti-lock"></i> <span>Lock
													Screen</span>
										</a></li> -->
										<li id="logout">
											<a href="#">
												<i class="ti-power-off"></i><span>Logout</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
