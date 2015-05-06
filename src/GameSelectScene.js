
var GameSelectLayer = cc.Layer.extend({
//	startLabel:null,
//	mainBtn:null,
//	bgFirst:null,
//	bgSecond:null,
//	bgThird:null,
//	container:null,
	//startY:0,
	//moveY:0,
	
	gamecheckpoints:null,
	mapnode:null,
	_SettingLayer:null,
	init:function () {
		this._super();
		
		var size = cc.winSize;
		
        //屏幕顶部半透明浮层
		var gamecontrol_bg=new cc.LayerColor(cc.color(255,255,255,150),size.width,100);  
		gamecontrol_bg.y=size.height-100;
		this.addChild(gamecontrol_bg, 10);
		
		
		
		//标题
		var map_titlesprite = new cc.Sprite("res/hz/map_title.png");
		map_titlesprite.attr({
			x: 0,
			y: -10,
			anchorX: 0,
			anchorY: 1,
			scale: 0.5
		});
		gamecontrol_bg.addChild(map_titlesprite); 
		
		
		
		//log
		var logo_bigsprite = new cc.Sprite("res/hz/logo_big.png");
		logo_bigsprite.attr({
			x: 0,
			y: 50,
			anchorX: 0,
			anchorY: 0.5,
			scale: 0.5
		});
		gamecontrol_bg.addChild(logo_bigsprite);  
		
		//添加设置按钮
		var settingsitem1 = new cc.MenuItemImage(
				"res/hz/settings.png",
				"res/hz/settings.png",
				this.onClickSettings,this
		);
		settingsitem1.anchorX=1;
		settingsitem1.x = size.width-5;	
		settingsitem1.y = 50;	

		var settingsmenu = new cc.Menu(settingsitem1);
		settingsmenu.anchorX=0;
		settingsmenu.anchorY=0;
		settingsmenu.x = 0;	
		settingsmenu.y = 0;	
		gamecontrol_bg.addChild(settingsmenu,1);
		

		//添加随机模式按钮
		var item1 = new cc.MenuItemImage(
				"res/hz/random_btn.png",
				"res/hz/random_btn.png",
				this.onClickStart,this
		);
		item1.anchorX=1;
		item1.x = size.width-10;	
		item1.y = size.height/10;	
		
		var menu = new cc.Menu(item1);
		menu.anchorX=0;
		menu.anchorY=0;
		menu.x = 0;	
		menu.y = 0;	
		this.addChild(menu,1);
		
		//设置背景图案
		var layerbg = new cc.Sprite("res/hz/game_bg.png");
		layerbg.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		this.addChild(layerbg,-1); 
		
		//地图基点
		this.mapnode=new cc.Node();
		this.addChild(this.mapnode);
		
		//各点坐标集合
		var checkpoints=this.gamecheckpoints=[];
		
		//当前所在关卡
		var testgamelevel=GV.getCurrentLevel();
		
		//判断地图应该加载哪一层级  如0-100 101-200 201-300
		var maplevel=Math.floor(testgamelevel/100);
		
		
		//设置第一点   （后续点坐标由第一点开始䢑代生成）
		checkpoints[0]=new Checkpoint(0,maplevel,true,size.width/2,size.height/3);
		this.mapnode.addChild(checkpoints[0],8)
		
		
		//生成后续点
		for(var i=1;i<=100;i++)
		{
		var islock=false;
		if(i+maplevel*100<=testgamelevel)
			islock=true;
		
		checkpoints[i]=new Checkpoint(i,maplevel,islock,checkpoints[i-1]._point.x,checkpoints[i-1]._point.y);
			
		//checkpoints[i].setPosition(cc.pAdd(checkpoints[i-1].getPosition(),checkpoints[i-1]._point));
		
		this.mapnode.addChild(checkpoints[i],8)
		
			
		}
		
		//所在点 笑脸标签
		var mansprite = new cc.Sprite("res/hz/gameplay_node_current.png");
		mansprite.attr({
			x: checkpoints[testgamelevel].x,
			y: checkpoints[testgamelevel].y,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		this.mapnode.addChild(mansprite,9); 
		
		
		//设置当前所闯关卡在屏幕当中显示
		this.mapnode.y=-checkpoints[testgamelevel].y+size.height/3;
		
//		this.size = cc.winSize;
//		
//		var layerbg=new cc.LayerColor(cc.color(100,67,245,255),this.size.width,this.size.height);   
//		this.addChild(layerbg, 0);
//		
//		this.startLabel = new cc.LabelTTF("选择关卡，点击开始", "微软雅黑", 50);
//		this.startLabel.setAnchorPoint(0.5, 0.5)
//		this.startLabel.setColor(cc.color(255, 255, 0, 1));
//		this.startLabel.setPosition(this.size.width/2, this.size.height-50);
//		this.addChild(this.startLabel, 1);
//		
//		var menuMain = new cc.Menu();
//		this.addChild(menuMain, 2);
//		menuMain.setPosition(0, 0);
//		this.mainBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "返回", null, 25);
//		menuMain.addChild(this.mainBtn, 2);
//		this.mainBtn.setCallback(this.returnToMain, this);
//		this.mainBtn.setPosition(150, 50);
//		
//		this.container = new cc.Node();
//		this.addChild(this.container, 0);
//		
//		this.bgFirst = createSprite(res.select_bg);
//		this.bgSecond = createSprite(res.select_bg);
//		this.bgThird = createSprite(res.select_bg);
//		this.bgFirst.setAnchorPoint(0, 0);
//		this.bgFirst.setPosition(0, 0);
//		this.bgSecond.setAnchorPoint(0, 0);
//		this.bgSecond.setPosition(0, SELECT_BG_HEIGHT);
//		this.bgThird.setAnchorPoint(0, 0);
//		this.bgThird.setPosition(0, -SELECT_BG_HEIGHT);
//		this.container.addChild(this.bgFirst, 0, 1);
//		this.container.addChild(this.bgSecond, 0, 2);
//		this.container.addChild(this.bgThird, 0, 3);
//		
//		var menuSelect = new cc.Menu();
//		for (var i = 0; i < 100; i++) {
//			var item = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "第" + (i+1) + "关", null, 25);
//			menuSelect.addChild(item, 0, i);
//			item.setPosition(0, i * 500);
//			item.setCallback(this.onClickStart, this);
//		}
//		this.container.addChild(menuSelect, 1);
//		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this)
			//onTouchesMoved: this.onToucheMoved.bind(this),
			//onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
		

	},
	
//	returnToMain:function() {
//		cc.director.runScene(new GameInitScene());
//	},
//	
	onClickStart:function(item) {
		var tag = item.getTag();
		cc.log("tag:%d", tag);
		//cc.director.runScene(new GameScene(tag));
	},
	onClickSettings:function() {		
			if(this._SettingLayer)
			{
				if(!this._SettingLayer.Visible)
					{
					this._SettingLayer.setVisible(true);
					//暂停页面按钮功能   
					cc.eventManager.pauseTarget(this, true);
					//开启设置层按钮功能
					cc.eventManager.resumeTarget(this._SettingLayer,true);
					}
			}
			else
			{
				//暂停页面已存按钮功能
				cc.eventManager.pauseTarget(this, true);
				
				this._SettingLayer=new SettingLayer();
				this.addChild(this._SettingLayer,100);
				
			}
	},
	

	onToucheMoved:function(touches, event){
		cc.log("move:")
		var size = cc.winSize;
		
		var touch = touches[0];
		var location = touch.getLocation();
		this.moveY = location.y - this.startY; 
		
		var containerY = this.mapnode.y + this.moveY;
		//||containerY<-this.gamecheckpoints[testgamelevel].y-size.height
		if (containerY > 0||containerY<-this.gamecheckpoints[testgamelevel].y-size.height/2) 
			return;
	
		this.mapnode.y=containerY;
		this.startY = location.y;
		
//		var currentPos = this.container.getPosition();
//		var containerY = currentPos.y + this.moveY;
//		if (containerY > 0) return;
//		this.container.setPositionY(containerY);
//		this.startY = location.y;
//		 
//		var firstPosY = this.bgFirst.getPosition().y;
//		var secondPosY = this.bgSecond.getPosition().y;
//		var thirdPosY = this.bgThird.getPosition().y;
//		cc.log("first:%s", firstPosY);
//		cc.log("second:%s", secondPosY);
//		cc.log("third:%s", thirdPosY);
//		cc.log("container:%s", containerY);
//		if (firstPosY < secondPosY && firstPosY < thirdPosY) {
//			var realFirstPosY = containerY + firstPosY;
//			if (realFirstPosY > -100) {
//				if (secondPosY < thirdPosY) {
//					this.bgThird.setPositionY(thirdPosY - 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgSecond.setPositionY(secondPosY - 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
//		if (secondPosY < firstPosY && secondPosY < thirdPosY) {
//			var realSecondPosY = containerY + secondPosY;
//			if (realSecondPosY > -100) {
//				if (firstPosY < thirdPosY) {
//					this.bgThird.setPositionY(thirdPosY - 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgFirst.setPositionY(firstPosY - 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
//		if (thirdPosY < firstPosY && thirdPosY < secondPosY) {
//			var realThirdPosY = containerY + thirdPosY;
//			if (realThirdPosY > -100) { 
//				if (firstPosY < secondPosY) {
//					this.bgSecond.setPositionY(secondPosY - 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgFirst.setPositionY(firstPosY - 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
//		
//		if (firstPosY > secondPosY && firstPosY > thirdPosY) {
//			var realFirstPosY = containerY + firstPosY;
//			if (realFirstPosY < 100) {
//				if (secondPosY > thirdPosY) {
//					this.bgThird.setPositionY(thirdPosY + 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgSecond.setPositionY(secondPosY + 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
//		if (secondPosY > firstPosY && secondPosY > thirdPosY) {
//			var realSecondPosY = containerY + secondPosY;
//			if (realSecondPosY < 100) {
//				if (firstPosY > thirdPosY) {
//					this.bgThird.setPositionY(thirdPosY + 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgFirst.setPositionY(firstPosY + 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
//		if (thirdPosY > firstPosY && thirdPosY > secondPosY) {
//			var realThirdPosY = containerY + thirdPosY;
//			if (realThirdPosY < 100) { 
//				if (firstPosY > secondPosY) {
//					this.bgSecond.setPositionY(secondPosY + 3 * SELECT_BG_HEIGHT);
//				} else {
//					this.bgFirst.setPositionY(firstPosY + 3 * SELECT_BG_HEIGHT);
//				}
//			}
//		}
	},
	
	onTouchEnded:function(touches, event){
		cc.log("end:")
	},
	
	onTouchBegan:function(touches, event){
		cc.log("begin:")
		var touch = touches[0];
		var location = touch.getLocation();
		//this.startY = location.y;
		
		//this.mapnode
		for(var i=0;i<=100;i++)
		{
			if(cc.pDistance(this.mapnode.convertToWorldSpace(this.gamecheckpoints[i].getPosition()),location)<=65)
			{
				
				if(this.gamecheckpoints[i]._num==GV.getCurrentLevel())
				cc.director.runScene(new GameScene(i));
				
				return false;
			}
			
		}
			
		
	}
});

var GameSelectScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameSelectLayer();
		layer.init();
		this.addChild(layer);
	}
});


//关卡
var Checkpoint_leftorright=true;
var Checkpoint = cc.Sprite.extend({
	_State:true,//所处的状态   lock or unlock
	_num:null,//第几关
	_xian:null,//上端的线
	_point:null,//上面圈的位置
	ctor:function (num,maplevel,state,pointx,pointy) {

		//this._super();	
		var size = cc.winSize;

		this._State=state;
		this._num=num+maplevel*100;
		
		
		   if(state)
			{
			  this._super("res/hz/gameplay_node_unlocked.png");	
			}else{
			  this._super("res/hz/gameplay_node_locked.png");	
			}
		
		   this.x=pointx;
		   this.y=pointy;
 
		   var MyLabel = new cc.LabelTTF("第" + this._num + "关", "微软雅黑",25);
		    MyLabel .attr({
			x: this.width/2,
			y: this.height+5,
			anchorX: 0.5,
			anchorY: 0,
			color: cc.color(0,0,0),
			scale: 1
		   });
		  this.addChild(MyLabel,1);
		  
		      //小于最大关数
		  if(this._num<(maplevel+1)*100)
			  { 
		    	  //放置线
		    	  this._xian = new cc.Sprite();
		    	  var xianheight=Math.round(Math.random()*150+200);
		    	  this._xian.setContentSize(cc.size(5,xianheight));
		    	  this._xian.setTextureRect(cc.rect(0, 0, 5, xianheight));
		    	  var pcolor;
		    	  if(this._num<GV.CURRENT_LEVEL){
		    		  pcolor =cc.color(238,79,54);  
		    	  }else {
		    		  pcolor =cc.color(157,159,163);
		    	  }
		    	  this._xian.setColor(pcolor);
		    	  
		    	  var roundnum= Math.round(Math.random()*15+15);
		    	  	
		    	  if(!Checkpoint_leftorright)
		    		{
		    		   roundnum=-roundnum;
		    		   
		    		   Checkpoint_leftorright=true;
		    		}else
		    			{
		    			Checkpoint_leftorright=false;
		    			}
		    	   
		    	   
		    	  this._xian.attr({
		    		  x: this.width/2,
		    		  y: this.height/2,
		    		  anchorX: 0.5,
		    		  anchorY: 0,
		    		  scale: 1,
		    		  rotation: roundnum
		    	  });
		    	  this.addChild(this._xian,-1); 
			  
		    	  var px=this.x+xianheight*Math.sin(2*Math.PI/360*roundnum);
		    	  var py=this.y+xianheight*Math.cos(2*Math.PI/360*roundnum);
		    	  
		    	  if(px>=size.width-this.getBoundingBox().width/2||px<=this.getBoundingBox().width/2)
		    	  {
		    		  roundnum=-roundnum;
		    		  this._xian.setRotation(roundnum);
		    		  //this._xian.rotation=-roundnum;
		    		  px=this.x+xianheight*Math.sin(2*Math.PI/360*roundnum);
		    		  if(Checkpoint_leftorright) 
		    			  Checkpoint_leftorright=false;
		    		  else
		    			  Checkpoint_leftorright=true;  
		    	  }

		    	
		    	  this._point=cc.p(px,py);
		    	  
			  
			  }
		  
		  
	},

	setState:function()
	{
		this._State=true;
		this.setSpriteFrame("res/hz/gameplay_node_unlocked.png");
	
	},
	setxian:function()
	{
		this._xian.setColor(cc.color(238,79,54));
	}
});


