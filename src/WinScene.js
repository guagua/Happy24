var WinLayer = cc.Layer.extend({
	init:function () {
		this._super();
		var size = cc.winSize;
		
		var layerbg=new cc.LayerColor(cc.color(255,255,255,255),size.width,size.height);   
		this.addChild(layerbg, 0);
		
		var gongxiSprite = new cc.Sprite("#congrats_title.png");
		gongxiSprite.attr({
			x: size.width/2,
			y: size.height*4.3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(gongxiSprite);  
		
		var introSprite = new cc.Sprite("#victory_cards.png");
		introSprite.attr({
			x: size.width/2,
			y: size.height*3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(introSprite); 
		
		
		var introSprite = new cc.Sprite("#celebration.png");
		introSprite.attr({
			x: size.width/2,
			y: size.height*3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(introSprite); 
		
		
		var continueItem = new cc.MenuItemImage(
				"#restart_btn.png",
				"#restart_btn.png",
				this.onContinue,this
		);
		var backItem = new cc.MenuItemImage(
				"#backtomap_btn.png",
				"#backtomap_btn.png",
				this.onBackToMain,this
		);

		var menu = new cc.Menu(continueItem, backItem);
		menu.alignItemsVerticallyWithPadding(15);
		menu.x = size.width/2;	
		menu.y = size.height/4;	
		this.addChild(menu,1);
	},
	onContinue:function() {
		Sound.getInstance().playBtn();
		//cc.director.runScene(new GameScene(GV.CURRENT_LEVEL));
		var scene = new cc.Scene();
		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
		
		
	},
	onBackToMain:function() {
		Sound.getInstance().playBtn();
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