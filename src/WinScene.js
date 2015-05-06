var WinLayer = cc.Layer.extend({
	init:function () {
		this._super();
		cc.log("111")
		var size = cc.winSize;
		
		var layerbg=new cc.LayerColor(cc.color(255,255,255,255),size.width,size.height);   
		this.addChild(layerbg, 0);
		
		var gongxiSprite = new cc.Sprite(res.gongxi);
		gongxiSprite.attr({
			x: size.width/2,
			y: size.height*4.3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(gongxiSprite);  
		
		var introSprite = new cc.Sprite(res.intro);
		introSprite.attr({
			x: size.width/2,
			y: size.height*3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(introSprite); 
		
		var continueItem = new cc.MenuItemImage(
				res.continue_game,
				res.continue_game,
				this.onContinue,this
		);
		var backItem = new cc.MenuItemImage(
				res.backToMain,
				res.backToMain,
				this.onBackToMain,this
		);

		var menu = new cc.Menu(continueItem, backItem);
		menu.alignItemsVerticallyWithPadding(15);
		menu.x = size.width/2;	
		menu.y = size.height/4;	
		this.addChild(menu,1);
	},
	onContinue:function() {
		cc.director.runScene(new GameScene(GV.getCurrentLevel()));
	},
	onBackToMain:function() {
		cc.director.runScene(new GameSelectScene());
	}
});

var WinScene = cc.Scene.extend({
	ctor:function () {
		this._super();
	},
	onEnter:function () {
		this._super();
		var layer = new WinLayer();
		layer.init();
		this.addChild(layer);
	}
});