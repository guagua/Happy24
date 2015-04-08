var CalBox = cc.Sprite.extend({
	calLabel:null,//运算符
	State:0,//所处的状态   选中，待选 ，   已选
	cal:null,//所显示的数字
	ctor:function (cal) {

		this._super();	
		this.size = cc.winSize;
		this.cal = cal;
		
		this.numLabel = new cc.LabelTTF(this.cal, "微软雅黑", 30);
		this.numLabel.setAnchorPoint(cc.p(0.5, 0.5));
		this.numLabel.setPosition(BOX_WIDTH/4,	BOX_WIDTH/4);
		this.addChild(this.numLabel, 1, 1);
		
		var draw = new cc.DrawNode();
		this.addChild(draw, 0);
		var sWidth = BOX_WIDTH/2;
//		draw.drawRect(cc.p(-sWidth/2, -sWidth/2), cc.p(sWidth/2, sWidth/2), cc.color(0, 255, 255, 50), 2, cc.color(128, 128, 0, 255));
		draw.drawRect(cc.p(0, 0), cc.p(sWidth, sWidth), cc.color(0, 100, 100, 255), 2, cc.color(60, 60, 0, 255));
		
		this.opacity=150; 
		this.setAnchorPoint(cc.p(0.5, 0.5));
		this._setWidth(sWidth);
		this._setHeight(sWidth);
	},
	setState:function(_State){
		this.State=_State;
		switch(_State){
		case 0:
			//待选状态
			this.opacity=150;
			break;
		case 1:
			//选中状态
			this.opacity=255;
			break;
		case 2:
			//已选状态
			break;
		}
	}
});
