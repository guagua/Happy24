
var GameInitLayer = cc.LayerColor.extend({
    startLabel:null,
    init:function () {
        this._super();
        this.size = cc.winSize;
        this.setColor(cc.color(180, 170, 160, 255));
        this.startLabel = new cc.LabelTTF("点击开始游戏哟~", "微软雅黑", 50);
        this.startLabel.setAnchorPoint(0.5, 0.5)
        this.startLabel.setColor(cc.color(255, 0, 0, 1));
        this.startLabel.setPosition(this.size.width/2, this.size.height/2);
        this.addChild(this.startLabel, 1);
        
        cc.eventManager.addListener({
        	event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        	onTouchesBegan: function (touches, event) {
        		cc.director.runScene(new GameSelectScene());
        	}
        }, this);
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

