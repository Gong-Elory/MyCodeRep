/**查询目录
 *
 * @group 字符串操作
 * 
 *         获取URL查询字符串的值..............................getQueryString
 *         HTML特殊字符串转换.................................js_htmlspeacialchars_decode
 *         多余字符应省略号标志...............................CheckStringLength
 *         
 * @group window.location对象属性操作 
 *  
 *         获取URL查询字符串的值..............................getQueryString 
 *         获取页面的文件名...................................getPageUrl
 *
 * @group 时间相关操作
 * 
 *        获取此时格式化后的时间..............................getNowFormatDate
 *        将秒格式化为小时分钟秒..............................formatSeconds
 *        根据指定规则，格式化时间戳..........................date
 *        字符串转时间格式（待完善）..........................strtotime
 *
 * @group 数字相关操作
 * 
 *        格式化数字为999,999,999格式.........................FormateNum
 *        获取随机数..........................................mt_rand
 *        生成随机编码........................................getSid
 *
 * 
 *@group 数组相关操作
 *
 *       数组去重.............................................array_unique
 *
 *@group 文件相关操作
 *
 *       读写Cookie...........................................RWCookie
 * 		 转化对象为JSON格式...................................syntaxJSON
 * 		 
 *group 表格数据相关操作
 *		 计算每一页数据的大小.................................calculatePageSizes
 *		 获取指定页的数据.....................................getPage
 * 
 *@group 其他操作 
 *       点赞和评论框计数显示效果.............................outNum
 */




/**
 * 获取查询字符串的值
 * @param  {[string]} name [查询的键，即?a=b&c=d中的a,c]
 * @return {[type]}       [查询的值]
 */
function getQueryString(name){
	var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substring(1).match(reg);
	return r == null?null:unescape(r[2]);
}

/**
 * 特殊字符串转换
 * @param  {[string]} html [要进行转换的字符串]
 * @return {[string]}      [转换后的字符串]
 */
function js_htmlspeacialchars_decode(html){
	html = html.replace(/&amp;/gi,'&');
	html = html.replace(/&ldquo;/gi,'“');
	html = html.replace(/&ldquo;/gi,'”');
	html = html.replace(/nbsp/gi,'nbsp;');
	html = html.replace(/&quot;/gi,'"');
	html = html.replace(/&#039;/gi,'\'');
	html = html.replace(/&lt;/gi,'\'');
	html = html.replace(/&lt;([\/]?(p|img|span|strong|br|h\d|div|table|source|tbody|audio|object|thead|tfoot|tr|th|td|dd|dt|dl|ul|li|ol|a|embed|iframe))/gi, "<$1");
	html = html.replace(/&gt;/gi, '>');
	html = html.replace(/<img [^>]*src=['"]?([^'" ]+)[^>]*>/gi, function(match, src) {
		return '<img src=' + src + '>';
	});

	return html;
}

/**
 * 获取此时格式化后的时间
 * @return {[string]} [格式化后的时间]
 */
function getNowFormatDate(){
	var day = new Date();
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	Year = day.getFullYear();
	Month = day.getMonth() + 1;
	Day = day.getDate();

	CurrentDate += Year + "-";
	if(Month >= 10){
		CurrentDate += Month + "-";
	}
	else{
		CurrentDate += "0" +Month + "-";
	}

	if(Day >= 10){
		CurrentDate += Day;
	}else{
		CurrentDate += "0" + Day;
	}

	return CurrentDate;
}


/**
 * 多余字符应省略号标志
 * @param {[string]} str    [要进行处理的字符串]
 * @param {[number]} length [规定的长度阈值]
 * @return {[string]}     [处理后的表示]
 */
function CheckStringLength(str,length){
	if(str.length > length){
		return str.substring(0,length)+"...";
	}else{
		return str;
	}
}


/**
 * 点赞和评论框计数显示效果
 * @param  {[number]} num [要处理的数字]
 * @return {[string]}     [处理后的表示]
 */
function outNum(num){
	num = parseInt(num);
	if(num < 1000){
		return ''+num;
	}else if(num >= 1000 && num < 10000){
		return (num / 1000).toFixed(1)+"K";
	}else if(num >= 10000 && num < 100000){
		return (num / 10000).toFixed(1)+"W";
	}else if(num >0 100000 && num < 1000000){
		return (num / 10000).toFixed(0)+"W";
	}else {
		return "99W";
	}
}

/**
 * 人类语言格式化时间
 * @param {[string]} string [要进行格式化的时间字串]
 * @return {[string]}     [处理后的表示]
 */
function ReloadPubdate(string){
	var re = /^(\d{2,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	if(re.test(string)){
		var t = string.match(re);
		var d = new Date(t[1],t[2]-1,t[3],t[4],t[5],t[6]);
		var c = new Date();
		var s = (c.getTime()-d.getTime())/1000;
		var m = Math.floor(s / 60);
		var h = Math.floor(s / 3600);
		var d = Math.floor(s / 86400);
		var n = Math.floor(s / (86400 * 30));
		var y = Math.floor(s / (86400 * 365));
		if(y > 0) return y+ "年以前";
		if(n > 0) return n+ "个月以前";
		if(d > 0) return d+ "天以前";
		if(h > 0) return h+ "小时以前";
		if(m > 0) return m+ "分钟以前";
	}
	return "刚刚";
}


/**
 * 将秒格式化为小时分钟秒
 * @param  {[string/number]} value [要格式化的时间，以秒计]
 * @return {[string]}       [格式化后的时间]
 */
function formatSeconds(value){
	var theTime = parseInt(value);
	var theTime1 = 0;
	var theTime2 = 0;
	if(theTime > 60 ){
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if(theTime1 > 60){
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var result = "" + parseInt(theTime) + "秒";
	if(theTime1 > 0){
		result = "" + parseInt(theTime1) + "分" + result;
	}
	if(theTime2 > 0){
		result = ""+ parseInt(theTime2) + "小时"+ result;
	}
	return result;
}

/**
 * [根据指定规则，格式化时间戳]
 * @param  {[string]} format    [想要格式化的类型]
 * @param  {[number]} timestamp [时间戳]
 * @return {[type]}           [description]
 */
function date(format,timestamp){
	var s,jsdate = timestamp? new Date(timestamp * 1000):new Date();
	//前缀加0，先判断需要格式为几位数，c表示位数 n表示格式化原数据
	//例如n为1，要把它格式化为3位数，则c为3.
	var pad = function(n,c){
		if((n = n + "").length < c){
			//三位数，已经有了1位数，在本例中为1，所以还需要两个0，
			//这里用的是数组填0法，要填两个0，可以建一个默认值为3个undefined的数组
			//然后用“0”连接  最终就为“00”
			return new Array(++c - n.length).join("0")+n;
		}else{
			return n;
		}
	};
	var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var txt_orgin = {
		1: "st",
		2: "nd",
		3: "rd",
		21: "st",
		22: "nd",
		23: "rd",
		31: "st"
	};
	var f = {
		// date format
		d: function(){
			return pad(f.j(),2);
		},
		// get date
		j: function(){
			return jsdate.getDate();
		},
		D: function(){
			return f.l().substr(0,3);
		},
		//英语格式化  星期几
		l: function() {
			return txt_weekdays[f.w()];
		},
		// get day星期
		w: function(){
			return jsdate.getDay();
		},
		N: function(){
			return f.w()+1;
		},
		//英语日期表示
		S:function(){
			return txt_orgin[f.j()]?txt_ordin[f.j()]:'th';
		},
		//获取今年过了多少天
		z:function(){
			return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
		},
		//还剩多少天
		W:function(){
			var a = f.z();
			b= 364 + f.L() - a;
		},
		//今年有多少天
		L:function(){
			var y = f.Y();
			//能被4整除 并且如果是100的整数倍的话 需要被400整除，才是闰年
			return (!(y&3) && (y % 1e2 || !(y % 4e2)))?1:0;
		},
		//今年的年份
		Y:function(){
			return jsdate.getFullYear();
		},
		//获取年份的后两位
		y:function(){
			return (jsdate.getFullYear() + "").slice(2);
		},
		//上午还是下午
		a:function(){
			return jsdate.getHours() > 11 ? "pm" : "am";
		},
		//大写上午下午
		A:function(){
			return f.a().toUpperCase();
		},
		//未知
		B:function(){
			var off = (jsdate.getTimezoneOffset() + 60) * 60;
			var theSeconds = (jsdate.getHours()*3600) + (jsdate.getMinutes() *60);
			var beat = Math.floor(theSeconds / 86.4);
			if(beat > 1000) beat -= 1000;
			if(beat < 0 ) beat += 1000;
			if((String(beat)).length == 1) beat = "00"+beat;
			if((String(beat)).length == 2) beat = "0"+beat;
			return beat;
		},
		g:function(){
			return jsdate.getHours() % 12 || 12;
		},
		G:function(){
			return jsdate.getHours();
		},
		h:function(){
			return pad(f.g(),2);
		},
		H:function(){
			return pad(jsdate.getHours(),2);
		},
		i:function(){
			return pad(jsdate.getMinutes(),2);
		},
		s:function(){
			return pad(jsdate.getSeconds(),2);
		},
		O:function(){
			var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
			else t = "+" + t;
			return t;
		},
		P: function() {
			var O = f.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		c: function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		//获取以毫秒计算
		U: function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};
	return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){
		console.log(t+"|"+s);
		// if(t != s){
		// 	ret = s;
		// }else if(f[s]){
		// 	ret = f[s]();
		// }else{
		// 	ret = s;
		// }
		return ret;
	});
}

/**
 * 获取随机数
 * @param  {[string,number]} min [起始区间（包含本身）]
 * @param  {[string,number]} max [终点区间（包含本身）]
 * @return {[number]}     [在区间内的随机整数]
 */
function mt_rand(min,max){
	var argc = arguments.length;
	if(argc === 0){
		min = 0;
		max = 2147483647;
	}else if(argc === 1){
		throw new Error('Warning: mt_rand() expects exactly 2 params,1 given');
	}else{
		min = parseInt(min, 10);
		max = parseInt(max,10);
	}
	return Math.floor(Math.random()*(max-min + 1)+ min);
}

/**
 * 字符串转时间格式（待完善）
 * @param  {[type]} text [description]
 * @param  {[type]} now  [description]
 * @return {[type]}      [description]
 */
function strtotime(text,now){
	var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;
	if(!text){
		return fail;
	}
	text = text.replace(/^\s+|\s+$/g,'')
	.replace(/\s{2,}/g,' ')
	.replace(/[\t\r\n]/g,'')
	.toLowerCase();

	match = text.match(/(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/gi);
	if(match && match[2] === match[4]){
		if(match[1] > 1901){
			switch(match[2]){
				case "-" :{
					if(match[3] > 12 || match[5] > 31){
						return fail;
					}
					return new Date(match[1],parseInt(match[3],10)-1,match[5],
							match[6] || 0,match[7] || 0,match[8] || 0,match[9] || 0) / 1000;
				}

				case "." :{
					return fail;
				}
				case "/" :{
					if (match[3] > 12 || match[5] > 31) {
							return fail;
						}
					return new Date(match[1],parseInt(match[3],10)-1,match[5],
							match[6] || 0,match[7] || 0,match[8] || 0,match[9] || 0) / 1000;
				}
			}
		}else if(match[5] > 1901){
			switch(match[2]){
				case "-" :{
					if(match[3] > 12 || match[1] >31){
						return fail;
					}
						return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				}

				case "." :{
					if (match[3] > 12 || match[1] > 31) {
							return fail;
						}

						return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					
				}
				case "/":
				{
					if (match[1] > 12 || match[3] > 31) {
							return fail;
						}

						return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				}
			}
		}else{
			switch(match[2]){
				case "-" :{
					if(match[3]> 12 || match[5] >31 || (match[1]< 70 && match[1] > 38)){
						return fail;
					}
				}

				case ".":{// D.M.YY or H.MM.SS
					if(match[5] >= 70){// D.M.YY
						if(match[3]> 12 || match[1] > 31){
							return fail;
						}
					return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}

					if(match[5] < 60 && !match[6]){
						// H.MM.SS
						// 
						if(match[1] > 23 || match[3] > 59){
							return fail;
						}

						today = new Date();
						return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
								match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
					}

					return fail;
				}
				case '/':
					{ // M/D/YY
						if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
							return fail;
						}

						year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
						return new Date(year, parseInt(match[1], 10) - 1, match[3],
							match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					}
				case ':':
					{ // HH:MM:SS
						if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
							return fail;
						}

						today = new Date();
						return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
							match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
					}

			}
		}
	}

	if(text === 'now'){
		return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
	}
	if(!isNaN(parsed = Date.parse(text))){
		return parsed / 1000 | 0;
	}

	date = now ? new Date(now * 1000) : new Date();
	days={
		'sun': 0,
		'mon': 1,
		'tue': 2,
		'wed': 3,
		'thu': 4,
		'fri': 5,
		'sat': 6
	};

	ranges = {
		'yea': 'FullYear',
		'mon': 'Month',
		'day': 'Date',
		'hou': 'Hours',
		'min': 'Minutes',
		'sec': 'Seconds'
	};

	function lastNext(type,range,modifier){
		var diff , day = days[range];
		if(typeof day !== 'undefined'){
			diff = day - date.getDay();

			if(diff === 0){
				diff = 7 * modifier;
			}else if(diff > 0 && type === "last"){
				diff -= 7;
			}else if(diff < 0 && type === "next"){
				diff += 7;
			}

			date.setDate(date.getDate() + diff);
		}
	}
	function process(val) {
		var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
			type = splt[0],
			range = splt[1].substring(0, 3),
			typeIsNumber = /\d+/.test(type),
			ago = splt[2] === 'ago',
			num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

		if (typeIsNumber) {
			num *= parseInt(type, 10);
		}

		if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
			return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
		}

		if (range === 'wee') {
			return date.setDate(date.getDate() + (num * 7));
		}

		if (type === 'next' || type === 'last') {
			lastNext(type, range, num);
		} else if (!typeIsNumber) {
			return false;
		}

		return true;
	}

	times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
		'|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
		'|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
	regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

	match = text.match(new RegExp(regex, 'gi'));
	if (!match) {
		return fail;
	}
	for (i = 0, len = match.length; i < len; i++) {
		if (!process(match[i])) {
			return fail;
		}
	}
	return (date.getTime() / 1000);	
}

/**
 * 格式化数字为999,999,999格式
 * @param {[number]} num [要被格式化的数字]
 */
function FormateNum(num){
	num = num + "";
	num = num.replace(/[ ]/g,"");
	if(num == ""){
		return ;
	}

	if(isNaN(num)){
		return;
	}

	// 是否有小数点，分情况处理
	// 
	var index= num.indexOf(".");
	if(index == -1 ){
		var reg = /(-?\d+)(\d{3})/;
		while(reg.test(num)){
			num = num.replace(reg,"$1,$2");
		}
	}else{
		var intPart = num.substring(0,index);
		var pointPart = num.substring(index+1,num.length);
		var reg = /(-?\d+)(\d{3})/;
		while(reg.test(intPart)){
			intPart = intPart.replace(reg,"$1,$2");
		}
		num = intPart + "." + pointPart;
	}

	return num;
}

/**
 * 获取页面的文件名
 * @return {[string]}  [文件名]
 */
function getPageUrl(){
	var url = window.location.href;//获取完整的URL地址
	var tmp = '';
	tmp = url.split('/');
	var cc = tmp[tmp.length - 1];
	tmp = cc.split('?');
	return tmp[0].split('.')[0];
}

/**
 * 数组去重
 * @param  {[array]} arr [要进行去重的数组]
 * @return {[array]}     [去重后的数组]
 */
function array_unique(arr){
	var key = '',
		tmp_arr2 = {},
		val = '',ar = [];

	//判断needle是否已经存在于对象haystack中了
	//判断的方法是遍历haystack，判断每个属性的值是否和needle相等。如果相等
	//返回键，如果不相等，最终返回false
	var __array_search = function(needle,haystack){
		var fkey = '';
		for(fkey in haystack){
			if(haystack.hasOwnProperty(fkey)){
				if((haystack[fkey] + '') === (needle + '')){
					return fkey;
				}
			}
		}
		return false;
	};

	//遍历要去重的数组，如果能在tmp_arr2对象中找到这个值
	//（调用array_search），说明重复了，则抛弃进行下一次循环
	//如果不重复，则以索引-值为键值对存入对象tmp_arr2
	for(key in arr){
		if(arr.hasOwnProperty(key)){
			val = arr[key];
			if(false === __array_search(val,tmp_arr2)){
				tmp_arr2[key] = val;
			}
		}
	}

	for(var i in tmp_arr2){
		ar.push(tmp_arr2[i]);
	}
	return ar;

}

//获取热评
function getHotCom(iComment,ElementId,source){
	cmt_id =iComment;
	createCommentIframe(ElementId,source);
}

//创建评论框架
function createCommentIframe(id,srouce){
	var iframe = document.createElement('iframe');
	iframe.id = 'commentIframe';
	iframe.border = 0;
	iframe.scrolling = 'no';
	iframe.style.border= 'none';
	iframe.width = '100%';
	iframe.height = '100%';
	bindIframeOnloadEvent(iframe,function){
		if(source == 'app'){
			queryLoginUserInfoAPP();
		}else{
			queryLoginUserInfo();
		}
	}

	jQuery('#commentIframe').contents().find('#top_reply').find('span').eq(1).hide();
	jQuery('#commentIframe').contents().find('.change').hide();
	jQuery('#commentIframe').contents().find('.np-nav-tab').hide();
	jQuery('#commentIframe').contents().find('.np-index-link').hide();

	iframe.src = "index.html";
	//参考腾讯热评框架 src="http://www.qq.com/coral/coralBeta3/coralMainDom3.0.htm"
	document.getElementById(ElementId).appendChild(iframe);
	setTimeout(function(){
		document.getElementById(ElementId).style.disable = "block";
	},1000);
}

/**
 * 这两个方法待完善，不清楚need方法干了些啥
 */
//获取牛评内头像等信息
// function QueryLoginUserInfo() {
// 	need("biz.login", function(LoginManager) {
// 		LoginManager.checkLogin(function() {
// 			var nickName = '';
// 			var userFace = '';
// 			LoginManager.getNickName(function(loginInfo) {
// 				if (loginInfo.isLogin) {
// 					nickName = loginInfo.nickName;
// 					LoginManager.getUserFace(function(data) {
// 						userFace = data.userFace;
// 						registerCoralEvent.publicLogined(LoginManager.getUserUin(), nickName, userFace);
// 					});
// 				}
// 			});
// 		});
// 	});
// }
// //获取APP牛评内头像等信息
// function QueryLoginUserInfoAPP() {
// 	need("biz.login", function(LoginManager) {
// 		LoginManager.checkLogin(function() {
// 			milo.loader.loadScript("http://ptlogin2.qq.com/getface?appid=21000501&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + LoginManager.getUserUin(), function() {});
// 		});
// 	});
// }
// 
function bindIframeOnloadEvent(el,onload){
	if(el,attachEvent){
		el.attachEvent("onload",onload);
	}else {
		el.onload = onload;
	}
}

//获取iframe对象
function getIframeWindow(el){
	return el.contentWindow || el.contentDocument.parentWindow;
}

//生成随机编码
function getSid(){
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var maxPos = chars.length;
	var pwd ="";
	var timer = (new Date()).getTime().toString();
	if(typeof timer != "string"){
		timer = Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000).toString();
	}
	if(timer == undefined || timer == null){
		var timerArr = Math.random().toString().split();
		timer = timerArr[1];
	}
	if(timer){
		timer = timer.split("");
	}

	for(var i = 0;i < 13;i++){
		var rank = Math.floor(Math.random()* maxPos);
		pwd += chars.charAt(rank)+timer[i];
	}

	return pwd;
}

/**
 * 读写Cookie
 * @param {[string]} cookie名    [description]
 * @param {[string]} cookie值   [description]
 * @param {[object]} 参数选项 [description]
 */
function RWCookie(name,value,options){
	if(typeof value != "undefined"){
		//如果没有输入value值，说明是读取cookie
		
		//初始化options
		options = options || {};
		if(value === null){
			value = "";
			options.expires = -1;
		}
		var expires = "";
		//判断是否给定过期期限
		if(options.expires && (typeof options.expires == "number" || options.expires.toUTCString)){
			var date;
			if(typeof options.expires == "number"){
				date = new Date();
				//跟去给定的过期期限，算出过期的时间
				date.setTime(date.getTime() + (options.expires * 60 * 1000 ));
			}else {
				//如果不是数字的话直接付给date
				date = options.expires;
			}

			expires = ";expires="+date.toUTCString();
		}
		var path = options.path?";path=" + options.path : "";
		var domain = options.domain?";domain="+options.domain : "";
		var secure = options.secure?";secure":"";
		document.cookie = [name,"=",encodeURIComponent(value),expires,path,domain,secure].join("");
	}
	else{
		//如果没给定，说明是读取操作
			var cookieValue = null;
			if(document.cookie && document.cookie != ""){
				//分割所有的cookie数据
				var cookies = document.cookie.split(";");
				for(var i=0;i<cookies.length;i++){
					//将空格和\u00A0这个删掉
					var cookie = cookies[i].replace(/^(\s|\u00A0)+/,"").replace(/^(\s|\u00A0)+$/,"");
					if(cookie.substring(0,name.length+1) == (name + "=")){
						//解码
						cookieValue = decodeURIComponent(cookie.substring(name.length+1));
						break;
					}
				}
			}
			return cookieValue;
	}
}

//转化对象为JSON格式
function syntaxJSON(obj){

	var json = JSON.stringify(Obj,undefined,4);
	json = json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\"])*"(\s*:)? | \b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(match){
		var cls = "number";
		if(/^"/.test(match)){
			if(/:$/.test(match)){
				cls = "key";
			}else {
				cls = "string";
			}
		}else if(/true|false/.test(match)){
			cls = "boolean";
		}else if(/null/.test(match)){
			cls="null";
		}
		return match;
	});
}

/**
 * 计算每一页数据的多少
 * 前提是通过指定字符串来作为分类方式
 * @param  {[json]} data [json对象]
 * @return {[type]}      [description]
 */
function calculatePageSizes(data) {
    var initials = [];
    return data.reduce(function(pageSizes, row) {
      var initial = row.name.charAt(0);
      //获取每一个数据对象的name属性的首字母
      var index = initials.indexOf(initial);
      //如果首字母索引数组里面有这个索引，那么接下来就是将该索引上的数据size加一
      //如果没有这个索引，则在首字母索引中添加这个索引
      if(index < 0)
      {
        index = initials.length;
        initials.push(initial);
      }
      //存放size的数组上，在相对应的索引项加一
      pageSizes[index] = (pageSizes[index] || 0) + 1;
      return pageSizes;
    }, []);
  }
  
/**
 * 获取指定页的数据
 * @param  {[json]} data       [json对象]
 * @param  {[number]} pageNumber [要获取哪一页的数据]
 * @return {[type]}            [description]
 */
 function getPage(data, pageNumber)
  {
    var initials = [];
    return data.reduce(function(pages, row) {
      var initial = row.name.charAt(0);
     //pages被初始化为一个空对象，这个对象将被用作存放每一页的数据
     //格式为
     //{
     //	A:[
     //		{对象1},
     //		{对象2}
     //	  ]
     //	}
     //索引值为首字母索引
     //
     //如果对象中不存在某个索引，先初始化这个属性的键值，为数组
     //如果存在，则把当前数据（一个对象）压如以某字母索引的数组中
      if(!pages[initial]) pages[initial] = [];
      pages[initial].push(row);
 
 	//initial是存放字母索引的一个数组，如果某字母不存在，压入后，排序
      if(initials.indexOf(initial) < 0)
      {
        initials.push(initial);
        initials.sort();
      }
 	//返回的是pages对象
      return pages;
	 //取的是pages对象，指定索引值得对象数组
	 //索引值通过给定的pageNumber，在initial数组中查询
    }, {})[initials[pageNumber - 1]] || [];
  }
