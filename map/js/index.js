


$(".logo").hover(function () {
	$(this).find(".qc").fadeIn()
},function () {
	$(this).find(".qc").fadeOut()
})


//	var cloneX = option.series[0].data
//		var cloneY = option.series[1].data
//		option.series[0].data = []
//		option.series[1].data = []
//		mapChart.setOption(option);
//		var i = 0
//		setInterval(function() {
//			option.series[0].data.push(cloneX[i++]) > 10 && option.series[0].data.shift()
//			option.series[1].data.push(cloneY[i++]) > 10 && option.series[1].data.shift()
//			i>=cloneX.length && (i=0)
//			mapChart.setOption(option);
//		}, 1000)