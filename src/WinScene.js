var WinLayer = cc.Layer.extend({
	isRand:false,
	init:function (isRand) {
		this._super();
		var size = cc.winSize;
		this.isRand = isRand;
		//cc.log("isRand:%s", isRand);
		
		
		if(!cc.audioEngine.isMusicPlaying())
		{	
			var action1=cc.delayTime(2.5);
			var action2=cc.sequence(action1,cc.callFunc(function(){
				Sound.getInstance().playBg();	
			}, this));
			this.runAction(action2);
		}
		
		
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
				"#restart_btn2.png",
				this.onContinue,this
		);
		var backItem = new cc.MenuItemImage(
				"#backtomap_btn.png",
				"#backtomap_btn2.png",
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
		var level;
		if (!this.isRand) {
			level = GV.CURRENT_LEVEL;
		}else
			{
			level = Math.floor(Math.random() * CU.levelNum.length);
			}
		scene.addChild(new GameScene(level, this.isRand));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
		
		
	},
	onBackToMain:function() {
		Sound.getInstance().playBtn();
		cc.director.runScene(new GameSelectScene());
	}
});

var WinScene = cc.Scene.extend({
	isRand:false,
	ctor:function (isRand) {
		this.isRand = isRand
		this._super();
	},
	onEnter:function () {
		this._super();
		var layer = new WinLayer();
		layer.init(this.isRand);
		this.addChild(layer);
	}
});