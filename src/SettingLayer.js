//设置层
var SettingLayer = cc.Layer.extend({
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
		var settitle= new cc.Sprite("res/hz/shezhi.png");
		settitle.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height-settitle.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 1
		});
		bgLayer2.addChild(settitle,2);
		
		
		//白色底框
		var white_bg = new cc.Sprite("res/hz/set_bg.png");
		white_bg.attr({
			x: bgLayer2.getBoundingBox().width/2,
			y: bgLayer2.getBoundingBox().height*2/5,
			anchorX: 0.5,
			anchorY: 0.5
		});
		bgLayer2.addChild(white_bg,2);
		
		
		//添加音乐栏
		var musictag = new cc.Sprite("res/hz/music_icon.png");
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
		var switchControl = new cc.ControlSwitch
		(
				new cc.Sprite("res/hz/switch-mask.png"),
				new cc.Sprite("res/hz/switch-on.png"),
				new cc.Sprite("res/hz/switch-off.png"),
				new cc.Sprite("res/hz/p1.png"),
				new cc.LabelTTF("off", "Arial-BoldMT", 32),
				new cc.LabelTTF("on", "Arial-BoldMT", 32)
		);
		switchControl.x = white_bg.getBoundingBox().width*2/3;
		switchControl.y = white_bg.getBoundingBox().height*5/6;
		if (getIsPlayMusic()) {
			switchControl.setOn(true, false);
		} else {
			switchControl.setOn(false, false);
		}
		white_bg.addChild(switchControl);
		
		
		
		//添加音效栏
		var sfxtag = new cc.Sprite("res/hz/sfx_icon.png");
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
		var switchControl2 = new cc.ControlSwitch
		(
				new cc.Sprite("res/hz/switch-mask.png"),
				new cc.Sprite("res/hz/switch-on.png"),
				new cc.Sprite("res/hz/switch-off.png"),
				new cc.Sprite("res/hz/s1.png"),
				new cc.LabelTTF("off", "Arial-BoldMT", 32),
				new cc.LabelTTF("on", "Arial-BoldMT", 32)
		);
		switchControl2.x = white_bg.getBoundingBox().width*2/3;
		switchControl2.y = white_bg.getBoundingBox().height*4/7;
		white_bg.addChild(switchControl2);
		
		
		
		
		switchControl.addTargetWithActionForControlEvents(this, this.valueChanged, cc.CONTROL_EVENT_VALUECHANGED);

		switchControl2.addTargetWithActionForControlEvents(this, this.valueChanged2, cc.CONTROL_EVENT_VALUECHANGED);
		
		
		
		//添加关于我们按钮
		var aboutitem1 = new cc.MenuItemImage(
				"res/hz/about_us_btn.png",
				"res/hz/about_us_btn.png",
				this.closeSetting,this
		);

		aboutitem1.x=white_bg.getBoundingBox().width/2;	
		aboutitem1.y=white_bg.getBoundingBox().height/5;
		
		var aboutmenu = new cc.Menu(aboutitem1);
		aboutmenu.x = 0;	
		aboutmenu.y = 0;	
		white_bg.addChild(aboutmenu,2);
		
		
		
		
		
	},
	valueChanged:function (sender, controlEvent) {
		if (sender.isOn()) {
			//this._displayValueLabel.setString("On");
			setIsPlayMusic(1);
			cc.audioEngine.playMusic(res.bg_mp3, true);
		}
		else {
			//this._displayValueLabel.setString("Off");
			setIsPlayMusic(0);
			cc.audioEngine.stopMusic(true);
		}
	
	},
	valueChanged2:function (sender, controlEvent) {

		if (sender.isOn()) {

		
		}
		else {

			

		}
	},
	
	closeSetting:function () {
		this.visible=false;	
	}
		
		
		
		
		
		




});
