

var geoCoorddata = {

}
// 初始化echarts示例mapChart

var mapChart = echarts.init(document.getElementById('map'));

// mapChart的配置

option = {
	geo: {
		map: 'china',

		itemStyle: { // 定义样式
			normal: { // 普通状态下的样式
				areaColor: '#333b48',
				borderColor: '#8b8e95'
			},
			emphasis: { // 高亮状态下的样式
				areaColor: '#d3c296'
			}
		}
	},
	backgroundColor: '#051227', // 图表背景色

	series: [{
			type: 'lines',

			//          mapType: 'china',
			coordinateSystem: 'geo',
			zlevel: 1,
			data: [], //线
			//线上面的动态特效
			effect: {
				show: true,
				period: 6,
				trailLength: 0.7,
				color: '#fff',
				symbolSize: 4
			},
			lineStyle: {
				normal: {
					width: '',
					color: '#a6c84c',
					curveness: 0.3
				}
			}
		},
		{
			type: 'effectScatter',
			//          mapType: 'china',
			coordinateSystem: 'geo',
			zlevel: 3,
			data: [], //点

			rippleEffect: {
				brushType: 'stroke'
			},
			showEffectOn: 'render',
			rippleEffect: {
				brushType: 'stroke'
			},
			hoverAnimation: true,
			label: {
				normal: {
					formatter: '{b}',
					position: 'right',
					show: false,
					color: '#cfc592'
				},
				emphasis: {
					show: true
				}
			},
			itemStyle: {
				normal: {
					color: '#c6cacd',
					shadowBlur: 10,
					shadowColor: '#333'
				}
			},

		}
	]
};

var num = 1;
var timer;
var maxLen = 15;

function extractDataAndDrawMap() {

	$.ajax({
		type: "get",
		url: 'http://aiyou-blchain.ayfoundation.org/api/realTimeAssists?pageNum=' + num,
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		async: true,

		success: function(data) {
			
			$("#blockList").html('');

			for(var i = 0; data.data.assists && i < data.data.assists.length && i < maxLen; i++) {
				if(1 == data.data.assists[i].assistAmountType) {
					tx = '救助'
				} else if( 2 == data.data.assists[i].assistAmountType) {
					tx = '调整'
				}else 
				{
					tx = '调整'
				}
				var ainfo = '<div class="left">' +data.data.assists[i].assistDate + '&nbsp;&nbsp;&nbsp;' + data.data.assists[i].charityProject + '项目' + tx + data.data.assists[i].childName+ '</div>'  + '<strong class="right">' + data.data.assists[i].amount.toFixed(2) + '元</strong>';
				var ali = $('<li data-index="' + i + '"><a target="_blank" href="blockchain.html?param=' + data.data.assists[i].transactionHash + '" >' + ainfo + '</a></li>');
				$("#blockList").append(ali);
				ali.hover(function() {
					//移入
					var _this = this;

					timer.pause();
					mapChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 1,
						dataIndex: _this.dataset.index
					});
				}, 
				
				function() {
					timer.resume();
					//移出
					mapChart.dispatchAction({
						type: 'downplay',
						seriesIndex: 1,
						dataIndex: this.dataset.index
					});

				})

				var arr = [];
				arr.push(Number(data.data.assists[i].cityLng))
				arr.push(Number(data.data.assists[i].cityLat))
				geoCoorddata[data.data.assists[i].uid] = arr //cityLat改
				var coords = [
					["116.40739499999995", "39.904211"]
				]
				coords.push(arr)
				coords.push
				option.series[0].data.push({
					'name': arr,
					'toname': "北京",
					'coords': coords,
				})
				option.series[1].data.push({
					'name': data.data.assists[i].charityProject + '项目' + tx + data.data.assists[i].childName + data.data.assists[i].amount.toFixed(2) + '元',
					'value': arr.concat(500)
				})
			}
			num++;

			if(num > data.data.pageCount) {
				num = 1
			}


			var coordSeries = option.series[0].data
			var labelSeries = option.series[1].data
			option.series[0].data = coordSeries.slice(0, maxLen); option.series[1].data = labelSeries.slice(0, maxLen);

			mapChart.setOption(option);
		
			$("#blockList").toggle("slide", {
				direction: "down"
			})
		},
		error: function(error) {
			
		}
	});
}

function paint() {

	$("#blockList").toggle("slide", {
		direction: "up"
	})

	option.series[1].data = [];
	option.series[0].data = [];

	extractDataAndDrawMap();
}

paint();
$('#pc-login-btn').click(function(){
	$('.login-mask').fadeIn('fast');
	// window.location.href = 'oneLogin.html';
});
timer = $.timer(5000, paint);


