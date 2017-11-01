1.
当函数作为方法调用时，this指向调用该方法的对象， 
当函数作为嵌套函数（内部函数）调用时， this指向全局对象（非严格模式下）或者undefined（严格模式）而不是其外包函数的上下文
//举例：
var name = "foo";  
var person = {  
  name : "bar",  
  hello : function(sth){  
    var sayhello = function(sth) {
      console.log(this.name + " says " + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello("hello"); // foo says hello
//此时的this指向window
var name = "foo";  
var person = {  
  name : "bar",  
  hello : function(sth){  
    var self = this;
    var sayhello = function(sth) {
      console.log(self.name + " says " + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello("hello"); // bar says hello
//此时的this才指向person对象
【常见的坑】
addEventListener(elem, func, false);即使func的形式为obj.func,其中的this依然指向elem

2.超时调用的代码都是在全局作用域中执行的，因此，函数中的this的值在在严格模式下指向window对象，在严格模式下位undefined
setTimeout(匿名函数, time)这种形式下，匿名函数中的变量也需要根据上下文来判断
//案例
var test = "in the window";
 
setTimeout(function() {alert('outer' + test)}, 0); // outer in the window  ，没有问题，在全局下调用，访问全局中的test
 
function f() {
  var test = 'in the f!';
  setTimeout(function(){alert('inner '+ test)}, 0);  // inner in the f!  有问题，不是说好了执行函数中的this指向的是window吗？那test也应该对应window下                                                      //  的值才对，怎么test的值却是 f()中的值呢？？？？
}
 
f();
这里的匿名函数相当于一个闭包

var handleObj = {
    handleEvent: function() {
        console.log("handleEvent obj:", this);
    }
}

window.addEventListener('click', handleObj, false);
这个函数的第二个参数也可以是一个对象，只要这个对象有handleEvent方法就行，this指向的是这个对象

2.跨域
同源策略： 协议，域名， 端口号相同
可以跨域的三个标签   img,打点统计
                     script,
                     link
使用jsonp解决 设置http header
Access-Control-Allow-Origin 用逗号分开，或者*
Access-Control-Allow-Header
Access-Control-Allow-Methods

3.cookie， seesionStorage，LocalStorage的区别
cookie用来服务器与客户端通信的

4.cookie储存量太小，只有4kb， 所有http请求都会带着，会影响获取资源的效率， 需要封装才能用
HTML5的标准ls，最大容量为5M，API简单易用，不需要自己封装，建议使用try catch包起来







