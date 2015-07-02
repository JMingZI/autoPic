//自定义插件
(function($){
	$.fn.autoPic = function(options){
		//定义变量
		var t = 0,	//自动播放时间句柄
			n = 0,	//用来判断当前图片是第几张图片
			//必须有3个子div
			div1 = $(this).children("div:first"),
			div2 = $(this).children("div:nth-child(2)");
			div3 = $(this).children("div:nth-child(3)");
		//默认的参数
		var settings = $.extend({}, {	
			playTime:3000, 
			picNum:3, 
			isShowDesc:true, //是否显示描述
			fadeOutTime:500, //图片隐藏时间
			fadeInTime:1000 //图片显示时间
		}, options);

		// 根据图片数创建 状态提示的数量
		for(var i=0;i< settings.picNum;i++){
			div3.append($('<span></span>'));
		}
		//为第一个span赋激活的class
		div3.children('span:first').addClass('selected');
		// 获取span
		var num_nav_span = div3.children('span');

		// 隐藏除第一张外的图片 和 描述
		div1.children("a:not(:first)").hide();
		if(settings.isShowDesc) 
			div2.children("a:not(:first)").hide();
		else
			div2.hide();
		// 定义span的点击使图片轮换显示 以及 状态提示的更换
		num_nav_span.click(function(){
			var num_nav = num_nav_span.index(this);
			$(this).addClass("selected").siblings().removeClass("selected");
			$(this).parent().prev().prev().children("a").filter(":visible").fadeOut(settings.fadeOutTime).parent().children().eq(num_nav).fadeIn(settings.fadeInTime);
			if(settings.isShowDesc) 
				$(this).parent().prev().children('a').filter(":visible").fadeOut(settings.fadeOutTime).parent().children().eq(num_nav).fadeIn(settings.fadeInTime); 
		});
		// 定义自动播放幻灯片
		var showAuto = function(){   
			n = n >= settings.picNum-1 ? 0 : (n + 1);   
			num_nav_span.eq(n).trigger('click');   
		}
		t = setInterval(showAuto, settings.playTime);  

		// 当鼠标hover停止播放，离开继续播放
		// hover(over, out);
		div1.hover(
			function(){ clearInterval(t) }, 
			function(){t = setInterval(showAuto, settings.playTime);}
			); 
	}
})(jQuery);