//数字按钮
var Numbtn = cc.MenuItemImage.extend({
	State:0,//所处的状态   选中，待选 ，   已选
	numLabel:null,
	num:null,//显示的数字
	mytag:null,//标记
	ctor:function (three, four,five,six) {
		
	
	this.num=five;
	this._super("res/hz/num_bg_btn.png", "res/hz/num_bg_btn.png", three, four);	
	this.setTag(six);
	
	this.numLabel = new cc.LabelTTF(""+five, "微软雅黑",25);
	this.numLabel .attr({
		x: this.getBoundingBox().width/2,
		y: this.getBoundingBox().height/2,
		anchorX: 0.5,
		anchorY: 0.5,
		color: cc.color(0,0,0),
		scale: 1
	});
	this.addChild(this.numLabel ,1);
	

	
	},
	setString:function(five){
		this.num=five
		this.numLabel.setString(""+five);
		
	},
	onselect:function(){
		if(this.State==0)	
		{
		this.setState(1);
		}else if(this.State==1)
		{
		this.setState(0);	
		}
		
	},
//3种状态   0正常  1选中 2不能选
	setState:function(_State){
		if(this.State==2)
		return;
		
		if(this.State==_State)
		return;
		
		this.State=_State;
		switch(_State){
		case 0:
			this.y-=20;
			break;
		case 1:
			//选中状态
			this.y+=20;
			break;
		case 2:
			this.color=cc.color(0,0,0,255);
			break;
		}
	}
});