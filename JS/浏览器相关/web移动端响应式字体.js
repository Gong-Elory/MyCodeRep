(function(window,document){
	var docEl = document.documentElement,
		//device pixel ratio
		dpr = window.devicePixelRatio || 1;

		adjust body font size
		function setBodyFontSize(){
			if(document.body){
				document.body.style.fontSize = (12*dpr)+'px';
			}else{
				document.addEventListener('DOMContentLoaded',setBodyFontSize);
			}
		}

		//set 1rem = viewWidth/10
		function setRemUnit(){

			var rem = docEl.clientWidth / 10;
			//兼容性强的还有：document.documentElement.getBoundingClientRect().width
			docEl.style.fontSize = rem + 'px'; 
		}

		setRemUnit();

		//reset rem unit on page resize
		window.addEventListener('resize',setRemUnit);
		//onload在第一次加载页面时触发，pageshow在每次加载页面时触发、onload在页面从浏览器缓存中读取时不触发
		//可以通过事件对象的persisted属性来判断是从服务器上载入还是本地缓存中载入（true）
		window.addEventListener('pageshow',function(e){
			if(e.persisted){
				setRemUnit();
			}
		})

		//detect 0.5px supports
		if(dpr >= 2){
			var fakeBody = document.createElement('body'),
				testElement = document.createElement('div');
				testElement.style.border = '0.5px solid transparent';
				fakeBody.appendChild(testElement);
				docEl.appendChild(fakeBody);
				if(testElement.offsetHeight === 1){
					docEl.classList.add('hairlines');
				}
				docEl.removeChild(fakeBody);

		}
//来源：https://github.com/amfe/lib-flexible
})(window,document)