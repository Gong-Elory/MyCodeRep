//页面滚动条出现跳动
//100vm为视口宽度，相当于innerWidth，包括滚动条
//100%位可用宽度，不包括滚动条
//当没有滚动条时，计算为0，有滚动条时，计算出的结果刚好为滚动条的宽度，相当于给左边也来了这么个宽度，就不会出现抖动了
//使用的对象
@方案一
margin-left：calc(100vm - 100%);
padding-left：calc(100vm - 100%);
//兼容性 IE9+及现代浏览器
@方案二
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}



