
var GameSelectLayer = cc.LayerColor.extend({
	startLabel:null,
	bgFirst:null,
	bgSecond:null,
	bgThird:null,
	container:null,
	startY:0,
	moveY:0,
	init:function () {
		this._super();
		this.size = cc.winSize;
		this.startLabel = new cc.LabelTTF("选择关卡，点击开始", "微软雅黑", 50);
		this.startLabel.setAnchorPoint(0.5, 0.5)
		this.startLabel.setColor(cc.color(255, 255, 0, 1));
		this.startLabel.setPosition(this.size.width/2, this.size.height-50);
		this.addChild(this.startLabel, 1);
		
		this.container = new cc.Node();
		this.addChild(this.container, 0);
		
		this.bgFirst = createSprite(res.select_bg);
		this.bgSecond = createSprite(res.select_bg);
		this.bgThird = createSprite(res.select_bg);
		this.bgFirst.setAnchorPoint(0, 0);
		this.bgFirst.setPosition(0, 0);
		this.bgSecond.setAnchorPoint(0, 0);
		this.bgSecond.setPosition(0, SELECT_BG_HEIGHT);
		this.bgThird.setAnchorPoint(0, 0);
		this.bgThird.setPosition(0, -SELECT_BG_HEIGHT);
		this.container.addChild(this.bgFirst, 0, 1);
		this.container.addChild(this.bgSecond, 0, 2);
		this.container.addChild(this.bgThird, 0, 3);
		
		var menu = new cc.Menu();
		for (var i = 0; i < 100; i++) {
			var item = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "第" + (i+1) + "关", null, 25);
			menu.addChild(item, 0, i);
			item.setPosition(0, i * 500);
			item.setCallback(this.onClickStart, this);
		}
		this.container.addChild(menu, 1);
		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this),
			onTouchesMoved: this.onToucheMoved.bind(this),
			onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 

	},
	
	onClickStart:function() {
		cc.director.runScene(new GameScene());
	},
	
	onToucheMoved:function(touches, event){
		cc.log("move:")
		var touch = touches[0];
		var location = touch.getLocation();
		this.moveY = location.y - this.startY; 
		var currentPos = this.container.getPosition();
		var containerY = currentPos.y + this.moveY;
		this.container.setPositionY(containerY);
		this.startY = location.y;
		 
		var firstPosY = this.bgFirst.getPosition().y;
		var secondPosY = this.bgSecond.getPosition().y;
		var thirdPosY = this.bgThird.getPosition().y;
		cc.log("first:%s", firstPosY);
		cc.log("second:%s", secondPosY);
		cc.log("third:%s", thirdPosY);
		cc.log("container:%s", containerY);
		if (firstPosY < secondPosY && firstPosY < thirdPosY) {
			var realFirstPosY = containerY + firstPosY;
			if (realFirstPosY > -100) {
				if (secondPosY < thirdPosY) {
					this.bgThird.setPositionY(thirdPosY - 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgSecond.setPositionY(secondPosY - 3 * SELECT_BG_HEIGHT);
				}
			}
		}
		if (secondPosY < firstPosY && secondPosY < thirdPosY) {
			var realSecondPosY = containerY + secondPosY;
			if (realSecondPosY > -100) {
				if (firstPosY < thirdPosY) {
					this.bgThird.setPositionY(thirdPosY - 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgFirst.setPositionY(firstPosY - 3 * SELECT_BG_HEIGHT);
				}
			}
		}
		if (thirdPosY < firstPosY && thirdPosY < secondPosY) {
			var realThirdPosY = containerY + thirdPosY;
			if (realThirdPosY > -100) { 
				if (firstPosY < secondPosY) {
					this.bgSecond.setPositionY(secondPosY - 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgFirst.setPositionY(firstPosY - 3 * SELECT_BG_HEIGHT);
				}
			}
		}
		
		if (firstPosY > secondPosY && firstPosY > thirdPosY) {
			var realFirstPosY = containerY + firstPosY;
			if (realFirstPosY < 100) {
				if (secondPosY > thirdPosY) {
					this.bgThird.setPositionY(thirdPosY + 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgSecond.setPositionY(secondPosY + 3 * SELECT_BG_HEIGHT);
				}
			}
		}
		if (secondPosY > firstPosY && secondPosY > thirdPosY) {
			var realSecondPosY = containerY + secondPosY;
			if (realSecondPosY < 100) {
				if (firstPosY > thirdPosY) {
					this.bgThird.setPositionY(thirdPosY + 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgFirst.setPositionY(firstPosY + 3 * SELECT_BG_HEIGHT);
				}
			}
		}
		if (thirdPosY > firstPosY && thirdPosY > secondPosY) {
			var realThirdPosY = containerY + thirdPosY;
			if (realThirdPosY < 100) { 
				if (firstPosY > secondPosY) {
					this.bgSecond.setPositionY(secondPosY + 3 * SELECT_BG_HEIGHT);
				} else {
					this.bgFirst.setPositionY(firstPosY + 3 * SELECT_BG_HEIGHT);
				}
			}
		}
	},
	
	onTouchEnded:function(touches, event){
		cc.log("end:")
	},
	
	onTouchBegan:function(touches, event){
		cc.log("begin:")
		var touch = touches[0];
		var location = touch.getLocation();
		this.startY = location.y;
	}
});

var GameSelectScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameSelectLayer();
		layer.init();
		this.addChild(layer);
	}
});

