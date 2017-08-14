//getCookie ..........................................获得解码后的cookie值
//delCookie ..........................................删除cookie值
//jsonp ..............................................利用jsonp获得数据
//nlog ...............................................打印日志传回服务器


var init = {
	getCookie: function(cookieName){
		var cookies = ducument.cookie
		//注意这里的双反斜杠，对\进行转移  如果是采用字面量方法来创建模式的话不需要
		,cookieValue = cookies.match(RegExp("(^|;\\s*)" + cookieName +"=([^;]*)(;|$)"))?unescape(t[2]):"";
		
		//ECMAScript v3 已从标准中删除了 unescape() 函数，并反对使用它，因此应该用 decodeURI() 和 decodeURIComponent() 取而代之。
		return function(value){
			if(!value) return value;
			//数据完全解码
			for(;value!= unescape(value))
				value = unescape(value);

			return value;
		}(cookieValue);

	}

	setCookie:function(cookieName,cookieValue,delays,domain,path,secure){
		if(cookieName){
			cookieValue || (cookieValue = "");
			var cookie = cookieName + "=" + escape(cookieValue) + ";";
			if(!isNaN(delayms)){
				var date = new Date();
				date.setTime(date.getTime() + 1e3 * delays);
				cookie += "expires=" + date.toGMTString();
			}

			domain && (cookie += 'domain=' + 'domain' + ';');
			cookie += s ? "path=" + path + ';' : 'path=/';
			secure && (secure += 'secure'); 
			document.cookie = cookie;
		}

	}

	delCookie: function(cookieName,path,domain){
		document.cookie = cookieName + "=; expires = Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path || '/') +"; " + (domain ? 'domain=' + domain + ';' : '');
	}

	jsonp: function(src){
		var t = document.createElement('script');
		t.setAttribute('src',src);
		document.getElementsByTagName('head')[0].appendChild(t);
	}

	//打印客户端信息，并传回服务端
	nlog: function(id){
		if('http' == location.protocol){
			var href = location.href
			,p = encodeURIComponent(o + '|_|' + href + '|_|' + window.navagitor.userAgent)
			,a = "api/report?id=" + id + "&msg=" + p;
			(new Image).src = a;
		}
	}

	
	/**
	 * js下载
	 * @param  {[type]}   url      [下载链接]
	 * @param  {Function} callback [回调函数]
	 * @param  {[type]}   options  [description]
	 * @return {[type]}            [配置选项]
	 */
	jsLoader: function(url,callback,options){
		options = options || {};
		var head = document.getElementsByTagName('head')[0] || document.documentElement
		,   script = document.createElement('script')
		,   done = false;

		script.src =url;
		if(options.charset){
			script.charset = options.charset;
		}
		script.onerror = script.onload = script.onreadystatechange = function(){
			if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')){
				done = true;
				if(callback){
					callback();
				}
				script.onerror = script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		}
	}

	cssLoader: function(href){
		var ele = document.createElement('link');
		ele.href = href;
		ele.rel = 'stylesheet';
		ele.type = "text/css";
		ele.getElementsByTagName('head')[0].appendChild(ele);
	}

}