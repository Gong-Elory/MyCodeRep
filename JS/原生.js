/*
* @Author: Elory
* @Date:   2017-11-01 14:35:56
* @Last Modified by:   Elory
* @Last Modified time: 2017-11-01 21:22:17
*/
let xhr = new XMLHttpRequest()
xhr.open('get', 'api', false)
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    if( xhr.status == 200 || xhr.status == 304) {
      console.log(xhr.responseText)
    }
  }
}

2xx 表示成功处理请求
3xx 需要重定向，浏览器直接跳转 301永久重定向 302临时重定向 304文件未修改
4xx 客户端请求错误 400请求的资源不存在 403拒绝服务 401未经授权
5xx 服务端错误 500服务器发生了错误 503服务器当前不能处理客户请求 504连接超时