
var GameInitLayer = cc.Layer.extend({
    init:function () {
        this._super();
        
        var size = cc.winSize;
        
        GV.UI_HEIGHT_SPACE=size.height/22;
        
        
        cc.spriteFrameCache.addSpriteFrames(res.gameui_plist);
        
        initLevelNum();
        
        //设置背景图案
        var layerbg = new cc.Sprite("res/game_bg.png");
        layerbg.attr({
        	x: 0,
        	y: 0,
        	anchorX: 0,
        	anchorY: 0,
        	scale: 1
        });
        this.addChild(layerbg); 
        
        
        var logo_bigsprite = new cc.Sprite("#logo_big.png");
        logo_bigsprite.attr({
        	x: size.width/2,
        	y: size.height*3/5,
        	anchorX: 0.5,
        	anchorY: 0.5,
        	scale: 1
        });
        this.addChild(logo_bigsprite);  
        
        
        
        var huanle_logosprite = new cc.Sprite("#huanle_logo.png");
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
        		"#gameStartNormal.png",
        		"#gameStartSelect.png",
        		this.onClickStart,this
        );

        var menu = new cc.Menu(item1);
        menu.x = size.width/2;	
        menu.y = size.height/4;	
        this.addChild(menu,1);
        
    },
    onClickStart:function() {
    	//增加场景切换效果（可适当更改）
    	Sound.getInstance().playBtn();
    	var scene = new cc.Scene();
    	scene.addChild(new GameSelectScene());
    	cc.director.runScene(new cc.TransitionFade(1.2,scene));	
//    	cc.director.runScene(new GameSelectScene());
    }

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

