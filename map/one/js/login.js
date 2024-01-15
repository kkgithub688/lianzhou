/*
 * @Author: xinyue
 * @Date: 2023-05-25 14:24:10
 * @Description: 
 */
;(function () {
	//登录内容高度自适应
	// function setHeight() {
	// 	var windowH = $(window).height()
	// 	$('.login-cen').css("height", (windowH - 78) + "px");
	// 	$('.login-cen .fr').css("margin-top", (windowH - 570) / 2 + "px");
	// }
	// $(function() {
	// 	setHeight();
	// });
	// $(window).resize(function() {
	// 	setHeight();
	// });
	$(".login-box dl dt input").focus(function() {
		$(this).parent().parent("dl").addClass("focus");
	});
	$(".login-box dl dt input").blur(function() {
		$(this).parent().parent("dl").removeClass("focus");
	});
	// 13782342213
	function httpGetAjax($url, todo) {
		$.ajax({
			type: "get",
			// url: $httpSrc + $url,
			url: 'http://data.ayfoundation.org:8088/aiyoumatch/Donor/' + $url,
			dataType: "text",
			success: function(msg) {
				var data = JSON.parse(msg);
				if(data.code == 200) {
					todo(data);
				} else {
					// alert(data.message);
					$('.message-box').html(data.message)
				}
			},
			error: function(msg) {
				// alert('请求异常！');
				$('.message-box').html('服务器繁忙 请稍候重试！')
			}
		});
	};

	//倒计时
	var num = 0,
		isgetNumber = true,
		timer;

	function DonorPhoneCode(msg) {
		// alert('短信发送成功，请查看手机！');
		$('.message-box').html('短信发送成功，请查看手机！')
	}
	$('div.login-cen div.login-box dl dt button').click(function() {
		var $that = $(this),
			num = 60,
			mobileFilter = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
			phoneNumber = $('.login-cen .login-box .phoneBox dt input').val();
		if(!mobileFilter.test(phoneNumber)) {
			// alert('请输入正确的手机号码！');
			$('.message-box').html('请输入正确的手机号码！')
			$('.login-cen .login-box .phoneBox dt input').focus();
			return;
		}
		$that.attr('disabled', true);
		clearInterval(timer);
		timer = setInterval(function() {
			num--;
			if(num == 0) {
				clearInterval(timer);
				isgetNumber = true;
				$that.html('再次获取');
				$that.attr('disabled', false);
			} else {
				if(isgetNumber) {
					isgetNumber = false;
					httpGetAjax('DonorPhoneCode.aspx?' + phoneNumber, DonorPhoneCode);
				}
				$that.html(num + 's后再次获取');
			}
		}, 1000);
	});

	// 登陆
	function DonorPhoneLoginFun(list) {
		var donorCode = list.data.user.donorCode,
			mobileVal = $('.login-box dl.phoneBox dt input').val().trim();
		window.sessionStorage.clear();
		window.localStorage.clear();
		sessionStorage.setItem('data', JSON.stringify(list.data))
		window.localStorage.setItem('userId', list.data.user.id);
		sessionStorage.setItem('donorId', list.data.donor.donorId);
		window.sessionStorage.setItem("donorName", list.data.user.nickname);
		window.sessionStorage.setItem("nickname", list.data.donor.donorAlias);
		window.sessionStorage.setItem("phoneNumber", mobileVal);
		window.location.href = 'oneIndex.html';
	}
	function loginFun() {
		var mobileFilter = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
			// passwordFilter = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]\w{6,15}$/,
			numberFilter = /^\d{6}$/,
			mobileVal = $('.login-box dl.phoneBox dt input').val().trim(),
			// passwordVal = $('.login-box dl.passwordWarp dt input').val(),
			numberVal = $('.login-box dl.NumberBox dt input').val().trim()
			// onState = $('a.btn-password').attr('data-state');
		if(!mobileFilter.test(mobileVal)) {
			// layer.msg('请输入正确的手机号！');
			$('.message-box').html('请输入正确的手机号码！')
			$('.login-box dl.phoneBox dt input').focus();
			return;
		}
		if(!numberFilter.test(numberVal)) {
			// layer.msg('验证码格式错误（6位数字）！');
			$('.message-box').html('验证码格式错误（6位数字）！')
			$('.login-box dl.NumberBox dt input').focus();
			return;
		} else {
			httpGetAjax('DonorPhoneLogin.aspx?code=' + numberVal + '&userName=' + mobileVal, DonorPhoneLoginFun);
		}
		// if(onState == 2) {
		// 	if(!numberFilter.test(numberVal)) {
		// 		layer.msg('验证码格式错误（6位数字）！');
		// 		$('.login-box dl.NumberBox dt input').focus();
		// 		return;
		// 	} else {
		// 		httpGetAjax('DonorPhoneLogin.aspx?code=' + numberVal + '&userName=' + mobileVal, DonorPhoneLoginFun);
		// 	}
		// } else if(onState == 1) {
		// 	if(!passwordFilter.test(passwordVal)) {
		// 		layer.msg('请输入正确的密码！');
		// 		$('.login-box dl.passwordWarp dt input').focus();
		// 		return;
		// 	} else {
		// 		var DonorLoginJson = {
		// 			"userName": mobileVal,
		// 			"password": passwordVal
		// 		}
		// 		httpAjax('DonorLogin.aspx', DonorPhoneLoginFun, DonorLoginJson);
		// 	}
		// }
	}
	//登录
	$('.login-box .passwordWarp input,.login-box .NumberBox input').on('keyup', function(event) {
		if(event.keyCode == 13) {
			loginFun();
		}
	})
	$('div.login-cen div.login-box a.loginBtn').click(function() {
		loginFun();
	})
	$('div.login-cen div.login-box a.btn-password').click(function() {
		if($(this).attr('data-state') == 1) {
			$('div.login-cen div.login-box dl.passwordWarp').hide().siblings('dl.NumberBox').show();
			$(this).html('账号密码登录').attr('data-state', '2');
		} else {
			$('div.login-cen div.login-box dl.passwordWarp').show().siblings('dl.NumberBox').hide();
			$(this).html('验证码登录').attr('data-state', '1');
		}
	})
	$('.close-dialog').click(function(){
		$('.login-mask').fadeOut('fast');
	});
})();