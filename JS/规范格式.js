对象
数组
字符串
函数
变量
注释
命名
访问器
重写原型
模块
jQuery
    DOM
    Ajax
盒模型
样式



[对象]
1.使用字面量法创建对象

[数组]
1.使用字面量创建数组
2.复制数组时，采用slice方法
用途1.
var items = [1,2,3,4],
    itemcopy = [];
itemcopy = items.slice();
用途2.
转换类数组对象为数组时，使用slice方法
Array.prototype.slice.call(arguments);

[字符串]
1.字符串使用单引号
2.尽量使用数组的join方法去替代+连接字符串

[函数]
不要在非函数块（if,where）内声明函数

[变量]
1.先声明已赋值变量，再声明未赋值变量。
2.置顶变量赋值

[注释]
//FIXME:需要解决的问题
//TODO：需要完善的问题

[命名]
1.使用下划线_来命名私有属性
2.存储this的引用使用_this
3.给函数命名，有助于堆栈重写
var log = function log(msg) {
  console.log(msg);
};

[访问器]
创建访问函数使用get，set
如果返回值为boolean 使用is,has

[重写原型]
方法返回this有助于方法链

[模块]
模块应该以！开始，以确保当模块忘记包含最后一个分号时，在脚本连接时不会出错。
增加一个noConflict，使模块输出早期版本并返回
在模块开始部位声明'use strict'

[jquery]
1.use find for nested selector, the .find() is faster 
    // BAD, a nested query for Sizzle selector engine
    var $productIds = $("#products div.id");
    // GOOD, #products is already selected by document.getElementById() so only div.id needs to go through Sizzle selector engine
    var $productIds = $("#products").find("div.id");

2.always to use a cdn to include jQuery on your page and implement a fallback to hosted libs
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js" type="text/javascript"><\/script>')</script>
3.填链接时，不用带上http或是https //参考https://www.paulirish.com/2010/the-protocol-relative-url/
4.use ID selector whenever possible,its faster
5.when using class selector dont use the element type in your selector
    var $products = $("div.products"); // SLOW
    var $products = $(".products"); // FAST
6.give your selectors a context
    // SLOWER because it has to traverse the whole DOM for .class
    $('.class');
    // FASTER because now it only looks under class-container.
    $('.class', '#class-container');
7.避免使用通用选择器
    $('div.container > *'); // BAD
    $('div.container').children(); // BETTER
8.避免使用隐式通用选择器
    $('div.someclass :radio'); // BAD
    $('div.someclass input:radio'); // GOOD
9.有ID选择器就不用弄嵌套了。

[jquery->dom]
1.对DOM操作时，先把他从DOM中detach出来，操作后，在append上去。
    detech()会保留绑定的事件和数据。
2.使用join来代替+
3.dont use anonymous functions to attach event.its to difficult to debug
4.document ready event handler should not be an anonymous function
    $(function(){ ... }); // BAD: You can never reuse or write a test for this function.
    // GOOD
    $(initPage); // or $(document).ready(initPage);
    function initPage(){
        // Page load event where you can initialize values and call other initializers.
    }
5.when possible,use custom namescape for events
[jquery->ajax]
1.尽量使用$.post，而不是$.get,$.post
2.尽量指定datatype,便于知道返回的是什么数据
//案例
    var jqxhr = $.ajax({
        url: url,
        type: "GET", // default is GET but you can use other verbs based on your needs.
        cache: true, // default is true, but false for dataType 'script' and 'jsonp', so set it on need basis.
        data: {}, // add your request parameters in the data object.
        dataType: "jsonp", // specify the dataType for future reference
        jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.
        statusCode: { // if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500
        }
    });
    jqxhr.done(successHandler);
    jqxhr.fail(failureHandler);

[盒模型]
最好让整个文档的盒模型相同，而不是单独设置具体元素的盒模型
* { box-sizing: border-box; }
如果可以避免的话，尽量不要把元素从文档流中取出
[样式]
/* bad */
div {
  width: 100px;
  position: absolute;
  right: 0;
}

/* good */
div {
  width: 100px;
  margin-left: auto;
}


/* bad */
li {
  visibility: hidden;
}
li:first-child {
  visibility: visible;
}

/* good */
li + li {
  visibility: hidden;
}

保持代码简洁（terse）
/* bad */
div {
  transition: all 1s;
  top: 50%;
  margin-top: -10px;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}

/* good */
div {
  transition: 1s;
  top: calc(50% - 10px);
  padding: 5px 10px 20px;
}


