
var GameInitLayer = cc.LayerColor.extend({
    startLabel:null,
    itemString:["开始游戏", "设置", "查看成就"],
    init:function () {
        this._super();
        this.size = cc.winSize;
        this.startLabel = createLabelTTF("欢乐24点", "微软雅黑", 50);
        this.startLabel.setAnchorPoint(0.5, 0.5)
        this.startLabel.setColor(cc.color(255, 255, 0, 1));
        this.startLabel.setPosition(this.size.width/2, this.size.height - 100);
        this.addChild(this.startLabel, 1);
        
        var itemStart = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[0], null, 25);
        var itemSetting = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[1], null, 25);
        var itemAchieve = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), this.itemString[2], null, 25);
        
        var menu = new cc.Menu(itemStart, itemSetting, itemAchieve);
        menu.alignItemsVertically();
        
        this.addChild(menu);
        menu.x = this.size.width/2;
        menu.y = this.size.height/2;
        
        itemStart.setCallback(this.onClickStart, this);
        itemSetting.setCallback(this.onClickSetting, this);
        itemAchieve.setCallback(this.onClickAchieve, this);
        
        //背景音乐
        cc.AudioEngine.getInstance().playMusic(res.bg_mp3, true);
    },
    onClickStart:function() {
    	cc.director.runScene(new GameSelectScene());
    },
    onClickSetting:function() {
    	//弹出设置页面层
    },
    onClickAchieve:function() {
    	//弹出排行榜
    }
});

var GameInitScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameInitLayer();
        layer.init();
        this.addChild(layer);
    }
});

