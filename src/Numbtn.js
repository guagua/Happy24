//数字按钮
var Numbtn = cc.MenuItemImage.extend({
	State:0,//所处的状态   选中，待选 ，   已选
	numLabel:null,
	num:null,//显示的数字
	mytag:null,//标记
	abovenumLabel:null,//在上端显示全运算式子
	ctor:function (three, four,five,six) {
		
	
	this.num=five;
	this._super("#card_bg.png", "#card_bg.png", three, four);	
	this.setTag(six);
	
	this.numLabel = new cc.LabelBMFont(""+five, res.gamefont_fnt,this.getBoundingBox().width,cc.TEXT_ALIGNMENT_CENTER);
	this.numLabel .attr({
		x: this.getBoundingBox().width/2,
		y: this.getBoundingBox().height/2,
		anchorX: 0.5,
		anchorY: 0.5,
		color: cc.color(238,79,54),
		scale: 1
	});
	this.addChild(this.numLabel ,1);
	

	this.abovenumLabel = new  cc.LabelTTF("","Arial", 30);
	this.abovenumLabel .attr({
		x: this.getBoundingBox().width/2,
		y: this.getBoundingBox().height*3/4,
		anchorX: 0.5,
		anchorY: 0.5,
		color: cc.color(238,79,54),
		scale: 1
	});
	this.addChild(this.abovenumLabel ,1);
	

	},
	setString:function(five){
		//this.num=five;
		var fivestring=""+five;
		if(fivestring.length>=3)
		this.numLabel.scale=0.8;
		else
		this.numLabel.scale=1;
		
		
		this.numLabel.setString(fivestring);
		
		
		
	},
	setAboveString:function(five){
		this.num=five;
		this.abovenumLabel.setString(""+five);

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
			this.numLabel.setVisible(false);
			this.abovenumLabel.setVisible(false);
			//覆盖层
			var sprite = new cc.Sprite("#card_back.png");
			sprite.attr({
				x: 0,
				y: 0,
				anchorX: 0,
				anchorY: 0,
				scale: 1
			});
			this.addChild(sprite); 
			//this.y-=20;可做个动画过渡下
			
			//this.color=cc.color(0,0,0,255);

			break;
		}
	}
});
