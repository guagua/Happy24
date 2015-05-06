
var GameInitLayer = cc.Layer.extend({
   // startLabel:null,
   // ranklayer:null,//排行榜
   // itemString:["开始游戏", "设置", "查看成就"],
    init:function () {
        this._super();
        
        var size = cc.winSize;
        
        initLevelNum();
        
        //设置背景图案
        var layerbg = new cc.Sprite("res/hz/game_bg.png");
        layerbg.attr({
        	x: 0,
        	y: 0,
        	anchorX: 0,
        	anchorY: 0,
        	scale: 1
        });
        this.addChild(layerbg); 
        
        
        var logo_bigsprite = new cc.Sprite("res/hz/logo_big.png");
        logo_bigsprite.attr({
        	x: size.width/2,
        	y: size.height*3/5,
        	anchorX: 0.5,
        	anchorY: 0.5,
        	scale: 1
        });
        this.addChild(logo_bigsprite);  
        
        
        
        var huanle_logosprite = new cc.Sprite("res/hz/huanle_logo.png");
        huanle_logosprite.attr({
        	x: size.width/2-logo_bigsprite.getBoundingBox().width/2,
        	y: logo_bigsprite.y+logo_bigsprite.getBoundingBox().height/2,
        	anchorX: 0,
        	anchorY: 0,
        	scale: 1
        });
        this.addChild(huanle_logosprite);  
        
        
        
        //添加开始按钮
        var item1 = new cc.MenuItemImage(
        		res.gameStartNormal_png,
        		res.gameStartSelect_png,
        		this.onClickStart,this
        );

        var menu = new cc.Menu(item1);
        menu.x = size.width/2;	
        menu.y = size.height/4;	
        this.addChild(menu,1);
        
        
//        this.size = cc.winSize;
//
//        var layerbg=new cc.LayerColor(cc.color(100,67,245,255),this.size.width,this.size.height);   
//        this.addChild(layerbg, 0);
        
//        this.ranklayer=new RankLayer();
//        this.addChild(this.ranklayer,100);
        
//        this.startLabel = createLabelTTF("欢乐24点", "微软雅黑", 50);
//        this.startLabel.setAnchorPoint(0.5, 0.5)
//        this.startLabel.setColor(cc.color(255, 255, 0, 1));
//        this.startLabel.setPosition(this.size.width/2, this.size.height - 100);
//        this.addChild(this.startLabel, 1);
//        
//        var itemStart = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[0], null, 25);
//        var itemSetting = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[1], null, 25);
//        var itemAchieve = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[2], null, 25);
//        
//        var menu = new cc.Menu(itemStart, itemSetting, itemAchieve);
//        menu.alignItemsVertically();
//        
//        this.addChild(menu);
//        menu.x = this.size.width/2;
//        menu.y = this.size.height/2;
//        
//        itemStart.setCallback(this.onClickStart, this);
//        itemSetting.setCallback(this.onClickSetting, this);
//        itemAchieve.setCallback(this.onClickAchieve, this);
    },
    onClickStart:function() {
    	//增加场景切换效果（可适当更改）
    	var scene = new cc.Scene();
    	scene.addChild(new GameSelectScene());
    	cc.director.runScene(new cc.TransitionFade(1.2,scene));	
//    	cc.director.runScene(new GameSelectScene());
    }
//    onClickSetting:function() {
//    	//弹出设置页面层
//    	
//    	
//    },
//    onClickAchieve:function() {
//    	// 弹出排行榜
//    	//this.ranklayer.onRankshow();
//    }
});

var GameInitScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameInitLayer();
        layer.init();
        this.addChild(layer);
    }
});

