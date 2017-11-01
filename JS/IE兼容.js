//事件代理
function BindEvent(el, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
   //当然，如果还要兼容IE78，需要加上attachEvent的兼容 
    el.addEventListener(type, function(e){
        let target = e.target
        if(selector) {
            let match =target.matches(selector)
            match && fn.call(target, e)
        } else {
            fn(e)
        }
    })
}

//IE9+实现了带前缀的matchesSelector IE8不支持
//以下方法很好地兼容了IE系列以及移动端
Element.prototype.mathces = function() {
    if(!Element.prototype.matches) {
        Element.prototype.matchesSelector || Element.prototype.mozMatchesSlector || 
        Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || function(s) {
            let matches = (this.document || this.ownerDocument).querySelectorAll(s)
            let i = matches.lenth 
            while (--i >= 0 && matches[i] !== this){}
            return i > -1
        } 
    }
}


























$(function () {
        //IE7、8下处理
        function ieChange(flag){
            var winwidth=$(window).width();
            var sectionheigth=$('body').height();
            if(winwidth==1920 && sectionheigth<975){
                $('.my-pic').css({'background-size':'auto'});
            }else{
                $('.my-pic').css({'background-size':'cover'});
            }
            var trim_Version;
            var browser=navigator.appName;
            var b_version=navigator.appVersion;
            var version=b_version.split(";");
            if(version && version[1]){
                trim_Version=version[1].replace(/[ ]/g,"");
            }
            var winheigt=$(window).height();


            if(browser=="Microsoft Internet Explorer" && (trim_Version=="MSIE7.0" || trim_Version=="MSIE8.0" || trim_Version=="MSIE9.0"))
            {
                if(flag){
                    location.reload();
                }
                $(".page2").addClass("visible");
                $(".page4").addClass("visible");
                $(".page5").addClass("visible");
                $(".section3").addClass("visible");
                $(".qp").css({"display":"none"});
                if(winheigt<860){
                    $(".fig01").addClass("iefig01");
                    $(".fig02").addClass("iefig02");
                    $(".fig04").addClass("iefig04");
                    $(".fig05").addClass("iefig05");
                    $(".section3").addClass("iesection3");
                }
            }

        }
        ieChange(0);
        // 判断是否支持canvas
        function canvasSupport() {
            return !!document.createElement('canvas').getContext;
        }
    });
