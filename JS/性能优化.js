
/**
 * @[1] 触发事件
 * @param  {[type]} element [description]
 * @param  {[type]} event   [description]
 * @return {[type]}         [description]
 */
var fireEvent = function(element,event){ 
//document.creatEventObject()是IE创建event对象实例的方法，
//和document.creatEvent('HTMLEvents')在非IE主流浏览器下的作用相同，
//fireEvent是IE下的事件触发器，与dispatchEvent在非IE主流浏览器下作用相同。 
        if (document.createEventObject){  
            // IE浏览器支持fireEvent方法  
            var evt = document.createEventObject();  
            return element.fireEvent('on'+event,evt)  
        }  
        else{  
            // 其他标准浏览器使用dispatchEvent方法  
            var evt = document.createEvent( 'HTMLEvents' );  
            evt.initEvent(event, true, true);  
            return !element.dispatchEvent(evt);  
        }  
    }; 

/**
 * currentStyle和getComputedStyle
 * @return {[type]} [description]
 */
 window.onload=function(){
    var oBtn=document.getElementById("btn");
    var oDiv=document.getElementById("div1");

    oBtn.onclick=function(){
        //alert(oDiv.style.width); //写在样式表里无法读取，只能得到写在行内的
        //alert(getComputedStyle(oDiv).width); //适用于标准浏览器       IE6、7、8不识别
        //alert(oDiv.currentStyle.width); //适用于IE浏览器，标准浏览器不识别
        if(oDiv.currentStyle){
            alert(oDiv.currentStyle.width);
        }else{
            alert(getComputedStyle(oDiv).width);
        }

    };
};

@[2]
//1.为了兼容IE，我们将`window.event`赋给 `evt`，其他浏览器则会正确将接收到的`event`对象赋给`evt`。
//2.w3c使用addEventListener来为事件元素添加事件监听器，而IE则使用attachEvent。addEventListener为事件冒泡到的当前对象，而attachEvent是window
//3.对于事件类型，IE需要加`on + type`属性，而其他浏览器则不用
//4.对于阻止元素的默认事件行为，下面是w3c和IE的做法：

    e.preventDefault();//w3c   
    e.returnValue = false;//IE

//5.对于取消事件传播，w3c和IE也有不同的处理机制：
    e.stopPropagation();//w3c
    e.cancelBubble = true;//IE


@[3]
/**
 * 事件注册
 * @param  {[type]} eventObj     [description]
 * @param  {[type]} event        [description]
 * @param  {[type]} eventHandler [description]
 * @return {[type]}              [description]
 */
function listenEvent(eventObj, event, eventHandler) {
    if (eventObj.addEventListener) {
        eventObj.addEventListener(event, eventHandler, false);
    } else if (eventObj.attachEvent) {
        event = "on" + event;
        eventObj.attachEvent(event, eventHandler);
    } else {
        eventObj["on" + event] = eventHandler;
    }
}

@[4]
/**
 * 取消事件默认
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function cancelEvent(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = true;
    }
}

@[5]
/**
 * [size description]
 * @return {[type]} [description]
 *
 * 对于主流浏览器来说，比如IE9、Firefox，Chrome和Safari，支持名为innerWidth 和 innerHeight的窗口对象属性，
 * 它返回窗口的视口区域，减去任何滚动条的大小。IE不支持innerWidth 和 innerHeight
 * 
 */
function size() {
    var w = 0,
        h = 0;
    if (!window.innerWidth) {
        w = (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);
        h = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);
    } else {
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return { width: w, height: h };
}

@[6]
/**
 * 跨浏览器获取目标对象
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
function getTarget(ev){
    if(ev.target){//w3c
        return ev.target;
    }else if(window.event.srcElement){//IE
        return window.event.srcElement;
    }
}  

@[7]
/**
 * 支持所有浏览器
 * @type {[type]}
 */
var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h=window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;

@[8]
/**
 * setAttribute 和 getAttribute，removeAttribute()
 * IE6 及更低版本不支持 removeAttribute()方法。
 */
//在IE中是不认识class属性的，需改为className属性，同样，在Firefox中，也是不认识className属性的，
//Firefox只认识class属性，所以通常做法如下：
element.setAttribute(class, value);  //for firefox
element.setAttribute(className, value);  //for IE
document.getElementById("box").getAttribute("class");//获取元素的 class 值，IE 不支持
document.getElementById("box").getAttribute("className");//非 IE 不支持
//在 IE7 及更低版本的IE浏览器中，使用 setAttribute()方法设置 class 和 style 属性是没有效果的，
//虽然 IE8 解决了这个 bug，但还是不建议使用。


@[9]
/**
 * XMLHTTPRequest对象
 * @param  {[type]} window.XMLHttpRequest [description]
 * @return {[type]}                       [description]
 */
if(window.XMLHttpRequest){ 
    xhr = new XMLHttpRequest(); 
}else if(window.ActiveXObject){ 
    xhr = new ActiveXObject("Microsoft.XMLHttp");
}

@[10]
/**
 * 禁止选取网页内容
 */
IE： obj.onselectstart = function(){return false;}
FF: -moz-user-select: none;

IE678 submit事件不冒泡
IE678下 change事件要等到blur时再触发。

@[11]
@js加载优化
1.将script脚本文件放置在body标签闭合之前
2.减少script请求数量
3.无阻塞脚本, 在页面加载完成后才加载 JavaScript 代码。这就意味着在 window 对象的 onload事件触发后再下载脚本:
    defer, async
    动态添加script元素

 @[12]
//使用DocumentFragments或者innerHTML去带循环注入
//案例示范
var list = document.querySelector('ul');
ajaxResult.items.forEach(function(item) {
    // 创建<li>元素
    var li = document.createElement('li');
    li.innerHTML = item.text;

    // <li>元素常规操作，例如添加class，更改属性attribute，添加事件监听等

    // 迅速将<li>元素注入父级<ul>中
    list.apppendChild(li);
});
                                                    ////////////////////////////
                                                    //考虑到性能问题，@方案一//
                                                    ////////////////////////////
@方案一
var frag = document.createDocumentFragment();

ajaxResult.items.forEach(function(item) {
    // 创建<li>元素
    var li = document.createElement('li');
    li.innerHTML = item.text;

    // <li>元素常规操作
    // 例如添加class，更改属性attribute，添加事件监听，添加子节点等

    // 将<li>元素添加到碎片中
    frag.appendChild(li);
});

// 最后将所有的列表对象通过DocumentFragment集中注入DOM
document.querySelector('ul').appendChild(frag);

                                                    ////////////////////////////
                                                    //考虑到性能问题，@方案二///
                                                    ////////////////////////////
@方案二
var htmlStr = '';

ajaxResult.items.forEach(function(item) {
    // 构建包含HTML页面内容的字符串
    htmlStr += '<li>' + item.text + '</li>';
});

// 通过innerHTML设定ul内容
document.querySelector('ul').innerHTML = htmlStr;


/**
 * 高频执行事件/方法的防抖
 * @param  {Function} fn       [description]
 * @param  {[type]}   interval [description]
 * @return {[type]}            [description]
 */
function debounce(fn,interval){
    let timer = null;
    return function(){
        var that = this,args = arguments;
        clearInterval(timer);
        timer = setTimeOut(function(){
            fn.apply(that,args);
        },interval);
    }
}


@[13]
/*
*函数节流（throttle）
 */

function throttle（fn,interval）{
    let canRun = true;
    return function(){
        if(!canRun) return;
        canRun = false;
        setTimeOut(function(){
            canRun = true;
            fn.apply(this,arguments);
        },interval);
    }
}

@[14]
/*
*网络存储的静态缓存和非必要内容优化
 */
define(function() {

    var cacheObj = window.sessionStorage || {
        getItem: function(key) {
            return this[key];
        },
        setItem: function(key, value) {
            this[key] = value;
        }
    };

    return {
        get: function(key) {
            return this.isFresh(key);
        },
        set: function(key, value, minutes) {
            var expDate = new Date();
            expDate.setMinutes(expDate.getMinutes() + (minutes || 0));

            try {
                cacheObj.setItem(key, JSON.stringify({
                    value: value,
                    expires: expDate.getTime()
                }));
            }
            catch(e) { }
        },
        isFresh: function(key) {
            // 返回值或者返回false
            var item;
            try {
                item = JSON.parse(cacheObj.getItem(key));
            }
            catch(e) {}
            if(!item) return false;

            // 日期算法
            return new Date().getTime() > item.expires ? false : item.value;
        }
     }
});

@[15]
/**
 * 使用Array.prototype.join代替字符串连接
 * @type {Array}
 */
var items = [];

ajaxResult.items.forEach(function(item) {
    // 构建字符串
    items.push('<li>', item.text, '</li>');
});

// 通过innerHTML设置列表内容
document.querySelector('ul').innerHTML = items.join('');


@[16]
/**
 * 尽可能使用CSS动画
 */
.myAnimation {
    animation: someAnimation 1s;
    transform: translate3d(0, 0, 0); /* 强制硬件加速 */
}

// <!--[if 低于IE8版本]>
// <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
// <script src="/js/ie-animations.js"></script>
// <![endif]-->
// 

@[17]
//使用事件委托
@[18]
//使用Data URI代替图片SRC
@[19]
//使用媒体查询加载指定大小的背景图片
/* 默认是为桌面应用加载图片 */
.someElement { background-image: url(sunset.jpg); }
 
@media only screen and (max-width : 1024px) {
    .someElement { background-image: url(sunset-small.jpg); }
}
更好的方法
使用srcset和sizes

@[20]
使用索引对象代替遍历数组。
AJAX JSON 数据一般为对象数组
创建一个对象，以unique作为索引来保存数组的每一项对象
索引查找比遍历数组更快捷




