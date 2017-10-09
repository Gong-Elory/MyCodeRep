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
