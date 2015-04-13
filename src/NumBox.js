var NumBox = cc.Sprite.extend({
	numLabel:null,//数字显示
	draw:null,
	State:STATE_INIT,//所处的状态   选中，待选 ，   已选
	colorArr:null,
	num:null,//所显示的数字
	ctor:function (num) {
		this._super();	
		this.size = cc.winSize;
		if (num == null) num = 0;
		this.num = num;
		
		this.numLabel = new cc.LabelTTF(this.num, "微软雅黑", 50);
		this.numLabel.setAnchorPoint(cc.p(0.5, 0.5));
		this.numLabel.setPosition(BOX_WIDTH/2,	BOX_WIDTH/2);
		this.addChild(this.numLabel, 1, 1);
		
		this.colorArr = [];
		this.colorArr[0] = cc.color(255, 255, 255, 255);
		this.colorArr[1] = cc.color(255, 0, 0, 255);
		this.colorArr[2] = cc.color(100, 100, 100, 255);
		
		this.draw = new cc.DrawNode();
		this.addChild(this.draw, 0);
		var sWidth = BOX_WIDTH;
		var pos = cc.p(sWidth, sWidth);
//		this.draw.drawRect(cc.p(-sWidth/2, -sWidth/2), cc.p(sWidth/2, sWidth/2), cc.color(0, 255, 255, 50), 2, cc.color(128, 128, 0, 255));
		this.draw.drawRect(cc.p(0, 0), cc.p(sWidth, sWidth), cc.color(0, 255, 255, 50), 2, cc.color(128, 128, 0, 255));

		this.opacity=150; 
		this.setAnchorPoint(cc.p(0.5, 0.5));
		this._setWidth(BOX_WIDTH);
		this._setHeight(BOX_WIDTH);
	},
	//改数字
	setNum:function(num){	
		this.num = num;
		this.numLabel.setString(num);
	},
	getNum:function() {
		return this.num;
	},
	getState:function() {
		return this.State;
	},
	setState:function(_State){
		this.State=_State;
		this.numLabel.setColor(this.colorArr[_State]);
//		switch(_State){
//		case 0:
//			//待选状态
//			this.opacity=150;
//			break;
//		case 1:
//			//选中状态
//			this.opacity=255;
//			break;
//		case 2:
//			//已选状态
//			break;
//		}
	}

});
