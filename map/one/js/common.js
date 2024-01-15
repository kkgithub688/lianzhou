var $httpSrc = 'http://'+window.location.host+'/aiyoumatch/Donor/',
	$httpC ='http://'+window.location.host+'/aiyoumatch/MonthDonor/',
	donorCode = '',
	$httpSrcpass = 'http://'+window.location.host+'/aiyoumatch/system/',
	pulicSrc = 'http://'+window.location.host+'/aiyoumatch/checkLogin.aspx',
	pulicSrcone = "http://"+window.location.host+"/aiyoumatch/donation/html/login.html",
	codeSrc = "http://"+window.location.host+"/aiyoumatch/donation/",
	exitSrc = 'http://'+window.location.host+'/';


//获取local.href中的一个值

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}

//获取当前年月

function getYearMonth(){
	let nowdays = new Date();
	let year = nowdays.getFullYear();
	let month = nowdays.getMonth();
	if (month == 0) {
		month = 12;
		year = year - 1;
	}
	if (month < 10) {
		month = "0" + month;
	}
	return year + "-" + month;
}
//获取url参数某一个值
function getParam(param) {
	var query  = window.location.search.substring(1);
	var iLen = param.length + 1; //增加等号长度 
	var iStart = query.indexOf(param + "=");
	if(iStart == -1) return "1";
	var iEnd = query.indexOf("&", iStart + iLen);
	if(iEnd == -1) return query.substring(iStart + iLen);
	return query.substring(iStart + iLen, iEnd);
}
donorCode = getParam("code");
//时间戳转换年月日时分秒
function timestampToTime(timestamp) {
	if(timestamp == '-') {
		return '-';
	}
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}
//时间转时间戳
function timegetTime(strtime) {
	var date = new Date(strtime.replace(/-/g, '/'));
	time = date.getTime();
	return time;
}
//时间戳转换年月日
function timestampTodata(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	return Y + M + D;
}

function timestampTodataOne(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
	return Y + M + D;
}
function timestampTodatatwo(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	return Y + M;
}
//时间戳转换年月
function timestampTodataMonth(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '/';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	return Y + M;
}
//时间戳转换年月日
function timestamphanzi(timestamp) {
	if(isNaN(timestamp)) return '-';
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '年';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
	return Y + M + D;
}

function getYearmonth(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '年';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
	return Y + M;
}

function getMonthFun(timestamp) {
	var date = new Date(timestamp);
	var Y = date.getFullYear();
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
	return M;
}
//数组去重
function fiterArr(arr) {
	for(var i = 0; i < arr.length; i++) {
		for(var j = i + 1; j < arr.length; j++) {
			if(arr[i] == arr[j]) {
				arr.splice(i, 1);
				i--;
			}
		}
	}
	return arr;
}
//排序
function positiveSequence(prop) {
	return function(obj1, obj2) {
		var val1 = obj1[prop];
		var val2 = obj2[prop];
		if(!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);
			val2 = Number(val2);
		}
		if(val1 < val2) {
			return -1;
		} else if(val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	}
}
//限制输入字符
function getLen(str, type) {
	if(!str) return;
	if(typeof str != "string") return;
	var res = 0;
	for(var i = 0; i < str.length; i++) {
		var pos = str.charAt(i).charCodeAt()
		if(pos >= 0x4e00 && pos <= 0x9fa5) {
			switch(type) {
				case "utf-8":
					res += 3;
					break;
				case "gb2312":
					res += 2;
					break;
			}
		} else {
			res++;
		}
	}
	return res;
}

function getStr(str, maxlength) {
	if(!str) return;
	if(typeof str != "string") return;
	var res = 0,
		sum = 0,
		newStr = '';
	for(var i = 0; i < str.length; i++) {
		var pos = str.charAt(i).charCodeAt()
		if(pos >= 0x4e00 && pos <= 0x9fa5) {
			res += 2;
		} else {
			res++;
		}
		if(res <= maxlength) {
			sum++;
		}
	}
	newStr = str.substring(0, sum);
	return newStr;
}

//数字每三个逗号分隔
function dealNumber(money) {
	if(isNaN(Number(money))) {
		return '0.00'
	};
	if(money && money != null) {
		var money = money.toFixed(2);
		var left = money.split('.')[0],
			right = money.split('.')[1];
		right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
		var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
		return(Number(money) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
	} else if(money == 0) {
		return '0.00';
	} else {
		return "";
	}
};
//随机色
function backGround() {
	var arr = [
		"rgba(236,114,134,1)",
		// "rgba(203,114,236,1)",
		// "rgba(94,215,188,1)",
		// "rgba(109,178,237,1)",
		// "rgba(125,136,242,1)",
		// "rgba(243,174,99,1)",
	]
	//  var r = Math.floor(Math.random()*256);
	//  var g = Math.floor(Math.random()*256);
	//  var b = Math.floor(Math.random()*256);
	return arr[Math.floor(Math.random() * arr.length)];
}
var selfSrc = window.location.href;
if(selfSrc.indexOf('login') >= 0 || selfSrc.indexOf('html/month-share') >= 0 || selfSrc.indexOf('html/main-share') >= 0||selfSrc.indexOf('html/upmobilereport') >= 0) {
	window.localStorage.clear();
} else {
	var userId = window.localStorage.getItem('userId') || '';
	setInterval(function() {
		(function() {
			var xhr = null;
			if(window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.open('post', $httpSrc + 'checkUserSession.aspx', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send('id=' + userId);
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					if(JSON.parse(xhr.responseText).code == "201") {
						window.opener = null;
						window.open('', '_self');
						window.close();
						window.location.href = "about:blank";
					}
				}
			};
		})();
	}, 3600)
}

function commonExpenseType(index) {
	switch(index) {
		case "BUS_AYCX":
			return '爱佑晨星';
		case "BUS_AYTS":
			return '爱佑天使';
		case "FINANCIAL":
			return "筹资费用";
		case "BUS_YJ":
			return "爱佑益+";
		case "BUS_FNS":
			return "赋能社";
		case "BUS_AYTX":
			return '爱佑童心';
		case "BUS_AYXS":
			return '爱佑新生';
		case "BUS_AYHK":
			return '爱佑和康';
		case "BUS_AYYA":
			return '爱佑雅安';
		case "BUS_OTHER":
			return '其他项目';
		case "BUS_GYCT":
			return '公益创投';
		case "BUS_AYAS":
			return '爱佑安生';
		case "BUS_CSGJ":
			return '慈善管家';
		case "BUS_BIGD":
			return '大数据';
		case "BUS_KYCX":
			return '科研创新';
		case "MANAGE":
			return '管理费用';
	}
}
function AccountFlowOperateType(index){
	switch(index) {
		case 1:
			return '医疗救助扣减';
		case 2:
			return '医疗救助对应业务成本扣减';
		case 3:
			return '医疗救助用于医疗及业务成本冻结';
		case 4:
			return '医疗救助冻结金扣减';
		case 5:
			return '医疗救助对应业务成本冻结金扣减';
		case 6:
			return '医疗救助回退';
		case 7:
			return '医疗救助对应业务成本回退';
		case 8:
			return '医疗救助用于医疗及业务成本冻结回退';
		case 9:
			return '理财冻结';
		case 10:
			return '理财返还解冻';
		case 11:
			return '理财收益';
		case 12:
			return '收入';
			return '医疗救助用于医疗及业务成本冻结回退';
		case 13:
			return '账户间转账';
		case 14:
			return '业务成本或管理费用扣减';
		case 15:
			return '业务成本或管理费用冻结';
		case 16:
			return '收入';
			return '业务成本或管理费用扣减回退';
		case 17:
			return '业务成本或管理费用冻结金扣减';
		case 18:
			return '业务成本或管理费用冻结回退';
		case 19:
			return '医疗救助对应业务成本冻结金回退至余额';
		case 20:
			return '业务成本-个人请款垫付金额恢复';
		case 21:
			return '业务成本-个人借款';
		case 22:
			return '业务成本-个人请款垫付金额恢复';
	}
}
var accountProject = {
	"ASSIST_AYTX": {
		"name": "爱佑童心",
		"entity": "孤贫先天性心脏病患儿手术治疗项目"
	},
	"ASSIST_AYTS": {
		"name": "爱佑天使",
		"entity": "孤贫血液病及肿瘤患儿医疗救助项目"
	},
	"ASSIST_AYCX": {
		"name": "爱佑晨星",
		"entity": "孤贫儿童多病种医疗救助项目"
	},
	"BUS_AYXS":{
		"name":"爱佑新生 病患孤儿医疗养护项目",
		"entity": ""

	},
	"BUS_AYHK":{
		"name":"爱佑和康 残障儿童康复项目",
		"entity": ""
	},
	"BUS_AYYA":{
		"name":"爱佑雅安",
		"entity": ""
	},
	"BUS_OTHER":{
		"name":"其他项目",
		"entity": ""
	},
	"BUS_GYCT":{
		"name":"爱佑益+ 多维度公益资助项目",
		"entity": ""
	},
	"BUS_AYAS":{
		"name":"爱佑安生 困境儿童救助与保护项目",
		"entity": ""
	},
	"BUS_CSGJ":{
		"name":"慈善管家",
		"entity": ""
	},
	"BUS_BIGD":{
		"name":"大数据",
		"entity": ""
	},
	"BUS_KYCX":{
		"name":"科研项目",
		"entity": ""
	},
	"MANAGE":{
		"name":"管理费用",
		"entity": ""
	},
	"FINANCIAL":{
		"name":"筹资费用",
		"entity": ""
	},
	"BUS_YJ":{
		"name":"爱佑益+ 多维度公益资助项目",
		"entity": ""
	},
	"BUS_FNS":{
		"name":"赋能社 公益人才能力建设项目",
		"entity": ""
	}
}
