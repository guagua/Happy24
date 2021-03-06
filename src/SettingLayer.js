//设置层
var SettingLayer = cc.Layer.extend({
	switchControl1:null,
	switchControl2:null,
	ctor:function(){
		this._super();
		//this.retain();
		this.init();
	},
	init:function () {
		//var _this=this;
		var winSize = cc.winSize;
		
		//半透明遮罩背景
		var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
		this.addChild(bgLayer, 1);
		
		
		
		//黑色底框
		var bgLayer2 = new cc.LayerColor(cc.color(58,62,70,255), 530, 788);
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
				"#close_icon.png",
				"#close_icon.png",
				this.closeSetting,this
		);

		item1.x=bgLayer2.getBoundingBox().width;	
		item1.y=bgLayer2.getBoundingBox().height;
		var menu = new cc.Menu(item1);
		menu.x = 0;	
		menu.y = 0;	
		bgLayer2.addChild(menu,2);
		
		
		
		
        //标题
		var settitle= new cc.Sprite("#shezhi.png");
		settitle.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height-settitle.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 1
		});
		bgLayer2.addChild(settitle,2);
		
		
		//白色底框
		var white_bg = new cc.Sprite("res/set_bg.png");
		white_bg.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height*2/5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		bgLayer2.addChild(white_bg,2);
		
		
		//添加音乐栏
		var musictag = new cc.Sprite("#music_icon.png");
		musictag.attr({
			x: white_bg.getBoundingBox().width/6,
			y: white_bg.getBoundingBox().height*5/6,
			anchorX: 0.5,
			anchorY: 0.5
		});
		white_bg.addChild(musictag,2);
		
		
		var musicLabel = new cc.LabelTTF("音乐", "微软雅黑",25);
		musicLabel .attr({
			x: white_bg.getBoundingBox().width/3,
			y: white_bg.getBoundingBox().height*5/6,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		white_bg.addChild(musicLabel,1);
		
		
		//
		this.switchControl1 = new cc.ControlSwitch
		(
				new cc.Sprite(res.switch_mask_png),
				new cc.Sprite(res.switch_on_png),
				new cc.Sprite(res.switch_off_png),
				new cc.Sprite(res.switch_mv1_png),
				new cc.LabelTTF("off", "Arial-BoldMT", 32),
				new cc.LabelTTF("on", "Arial-BoldMT", 32)
		);
		this.switchControl1.x = white_bg.getBoundingBox().width*2/3;
		this.switchControl1.y = white_bg.getBoundingBox().height*5/6;
		

		//if (getIsPlayMusic()==1) {
		if (!Sound.getInstance()._Silence1) {
			this.switchControl1.setOn(true, false);
		} else {
			this.switchControl1.setOn(false, false);
		}
		white_bg.addChild(this.switchControl1);
		
		
		
		//添加音效栏
		var sfxtag = new cc.Sprite("#sfx_icon.png");
		sfxtag.attr({
			x: white_bg.getBoundingBox().width/6,
			y: white_bg.getBoundingBox().height*4/7,
			anchorX: 0.5,
			anchorY: 0.5
		});
		white_bg.addChild(sfxtag,2);


		var sfxLabel = new cc.LabelTTF("音效", "微软雅黑",25);
		sfxLabel .attr({
			x: white_bg.getBoundingBox().width/3,
			y: white_bg.getBoundingBox().height*4/7,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		white_bg.addChild(sfxLabel,1);
		
		
		//
		this.switchControl2 = new cc.ControlSwitch
		(
				new cc.Sprite(res.switch_mask_png),
				new cc.Sprite(res.switch_on_png),
				new cc.Sprite(res.switch_off_png),
				new cc.Sprite(res.switch_mv2_png),
				new cc.LabelTTF("off", "Arial-BoldMT", 32),
				new cc.LabelTTF("on", "Arial-BoldMT", 32)
		);
		this.switchControl2.x = white_bg.getBoundingBox().width*2/3;
		this.switchControl2.y = white_bg.getBoundingBox().height*4/7;
		
		if (!Sound.getInstance()._Silence2) {
			this.switchControl2.setOn(true, false);
		} else {
			this.switchControl2.setOn(false, false);
		}
		white_bg.addChild(this.switchControl2);
		
		
		
		
		this.switchControl1.addTargetWithActionForControlEvents(this, this.valueChanged, cc.CONTROL_EVENT_VALUECHANGED);

		this.switchControl2.addTargetWithActionForControlEvents(this, this.valueChanged2, cc.CONTROL_EVENT_VALUECHANGED);
		
		
		
		//添加关于我们按钮
		var aboutitem1 = new cc.MenuItemImage(
				"#about_us_btn.png",
				"#about_us_btn2.png",
				this.aboutClick,this
		);

		aboutitem1.x=white_bg.getBoundingBox().width/2;	
		aboutitem1.y=white_bg.getBoundingBox().height/5;
		
		var aboutmenu = new cc.Menu(aboutitem1);
		aboutmenu.x = 0;	
		aboutmenu.y = 0;	
		white_bg.addChild(aboutmenu,2);
		
		
		
		
		
	},
	valueChanged:function (sender, controlEvent) {
		Sound.getInstance().playBtn();
		Sound.getInstance().bgOnOff();
	
	
	},
	valueChanged2:function (sender, controlEvent) {
		Sound.getInstance().playBtn();
		Sound.getInstance().effectOnOff();
	},
	
	closeSetting:function () {
		Sound.getInstance().playBtn();
		this.setVisible(false);
		this.y=-2000;
		cc.eventManager.resumeTarget(this.getParent(),true);
	},
		
	aboutClick:function () {
		Sound.getInstance().playBtn();
		var aboutLayer = new AboutLayer();
		this.addChild(aboutLayer, 300);
	}	
		
		
		
		




});
