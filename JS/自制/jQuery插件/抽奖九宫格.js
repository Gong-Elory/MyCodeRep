(function($){
	var lot = function(options){
			options = $.extend({
				prize: -1,
				cycle: 60,
				itemName: "",
				startBtn: "",
				qz:""
			},options);

			var timer = 0,
			count,
			isRoll = false,
			index=0,
			speed =20,
			times =0,
			cycle = options.cycle,
			prize = options.prize,
			$units = null;


			var roll = function(){
				times++;
				$(options.qz+index).removeClass("on");
				index = index++ >= 8 ? 1 : index;
				$(options.qz+index).addClass("on");

				if(times > cycle && prize == index ){
					clearTimeout(timer);
					isRoll = false;
					// prize = -1;
					times = 0;
					timer = null;
				}else{


					if( times > Math.floor(60 - 5)){
						speed += 40;
					}else if(times > Math.floor(60 - 15)){
						speed += 15;
					}else{
						speed = 30;
					}
					setTimeout(arguments.callee,speed);
				}
			};

			var stop = function(){
					clearTimeout(timer);
			};

			var init = function(obj){
				if(options.itemName == "" || options.startBtn == "") return;
				$units = obj.find(options.itemName);
				count = $units.length
				count > 0?$($units[0]).addClass("on"):void 0;
				$(options.startBtn).click(function(){
					if(isRoll){
						 return false;
					}else{
						isRoll = true;
						roll();
					}
					
				});

			};

			init($(this));

		};
		$.fn.extend({
				"lottery": lot
			});                        
})($);