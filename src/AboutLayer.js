//关于我们
var AboutLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function () {
		var winSize = cc.winSize;
		
		//半透明遮罩背景
		var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
		this.addChild(bgLayer, 1);
		
		//黑色底框
		var bgLayer2 = new cc.LayerColor(cc.color(58,62,70,255), 530, 850);
		bgLayer2.attr({
			x: winSize.width/2,
			y: winSize.height/2,
			anchorX: 0.5,
			anchorY: 0.5
		});
		bgLayer2.ignoreAnchorPointForPosition(false);
		this.addChild(bgLayer2, 1);

		//添加关闭按钮
		var item1 = new cc.MenuItemImage(
				"res/hz/close_icon.png",
				"res/hz/close_icon.png",
				this.closeSetting,this
		);

		item1.x=bgLayer2.getBoundingBox().width;	
		item1.y=bgLayer2.getBoundingBox().height;
		var menu = new cc.Menu(item1);
		menu.x = 0;	
		menu.y = 0;	
		bgLayer2.addChild(menu,2);
		
        //标题
		var settitle= new cc.Sprite("res/about_title.png");
		settitle.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height-settitle.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 1
		});
		bgLayer2.addChild(settitle,2);
		
		//白色底框
		var white_bg = new cc.Scale9Sprite("res/dark_bg.png");
		white_bg.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height*2.3/5,
			anchorX: 0.5,
			anchorY: 0.5,
			width : 500,
			height : 750 
		});
		bgLayer2.addChild(white_bg,2);
		
		var logo = new cc.Sprite("res/logo.png");
		logo.attr({
			x: white_bg.getBoundingBox().width/2,
			y: white_bg.getBoundingBox().height-10,
			anchorX: 0.5,
			anchorY: 1
		});
		white_bg.addChild(logo,2);
		
		var introLabel = new cc.LabelTTF("哲合致力于开发开心、好玩的小游戏。\n让你的生活充满乐趣。", "微软雅黑",22);
		introLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		introLabel .attr({
			x: white_bg.getBoundingBox().width/2,
			y: logo.y - logo._getHeight() - 30,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		white_bg.addChild(introLabel,1);
		
		var weixin = new cc.Sprite("res/weixin.png");
		weixin.attr({
			x: white_bg.getBoundingBox().width/2,
			y: introLabel.y - introLabel._getHeight() - 90,
			anchorX: 0.5,
			anchorY: 0.5
		});
		white_bg.addChild(weixin,2);

		var enterWeb = new cc.MenuItemImage(
			"res/enter_web.png",
			"res/enter_web.png",
			this.enterWebClick,this
		);

		enterWeb.x=white_bg.getBoundingBox().width/2;	
		enterWeb.y=weixin.y - weixin._getHeight() + 40;
		
		var enterMenu = new cc.Menu(enterWeb);
		enterMenu.x = 0;	
		enterMenu.y = 0;	
		white_bg.addChild(enterMenu,2);
		
		var line = new cc.Sprite("res/line.png");
		line.attr({
			x: white_bg.getBoundingBox().width/2,
			y: enterWeb.y - enterWeb._getHeight() + 30,
			anchorX: 0.5,
			anchorY: 1
		});
		white_bg.addChild(line,2);
		
		var manLabel = new cc.LabelTTF("程序猿：小瓜、阿振\n设计师：仓\n督查：小方", "微软雅黑",22);
		manLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		manLabel .attr({
			x: white_bg.getBoundingBox().width/2,
			y: line.y - line._getHeight() - 65,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		white_bg.addChild(manLabel,1);
	},
	
	closeSetting:function () {
		this.removeFromParent(true);
	},
	
	enterWebClick:function() {
//		openURL("www.zhehekeji.com");
	}

});
