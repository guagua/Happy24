
var GameSelectLayer = cc.Layer.extend({

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
		
		//设置背景图案
		var layerbg = new cc.Sprite("res/game_bg.png");
		layerbg.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		this.addChild(layerbg,-1); 
		
		//标题
		var map_titlesprite = new cc.Sprite("#map_title.png");
		map_titlesprite.attr({
			x: 0,
			y: -10,
			anchorX: 0,
			anchorY: 1,
			scale: 0.5
		});
		gamecontrol_bg.addChild(map_titlesprite); 
		
		
		
		//log
		var logo_bigsprite = new cc.Sprite("#logo_big.png");
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
				"#settings.png",
				"#settings.png",
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
				"#random_btn.png",
				"#random_btn.png",
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
		

		
		//地图基点
		this.mapnode=new cc.Node();
		this.addChild(this.mapnode);
		
		//各点坐标集合
		var checkpoints=this.gamecheckpoints=[];
		
		//当前所在关卡
		var testgamelevel=GV.CURRENT_LEVEL;
		
		
		//判断地图应该加载哪一层级  如0-100 101-200 201-300
		var maplevel=Math.floor(testgamelevel/100);

		//在层级中 关卡的位置
		var testgamelevel2=testgamelevel-maplevel*100;
		
		
		
		//生成点
		for(var i=0;i<100;i++)
		{
		var islock=false;
		if(i+maplevel*100<=testgamelevel)
			islock=true;
	
		//cc.log(""+GV.MAPPOINTS[i][0]);
		checkpoints[i]=new Checkpoint(i,maplevel,islock,GV.MAPPOINTS[i][0],GV.MAPPOINTS[i][1],GV.MAPPOINTS[(i+1)][0],GV.MAPPOINTS[(i+1)][1]);
		
		//checkpoints[i]=new Checkpoint(i,maplevel,islock,checkpoints[i-1]._point.x,checkpoints[i-1]._point.y);

		
		this.mapnode.addChild(checkpoints[i],8)
		
			
		}
		
		//所在点 笑脸标签
		var mansprite = new cc.Sprite("#gameplay_node_current.png");
		mansprite.attr({
			x: checkpoints[testgamelevel2].x,
			y: checkpoints[testgamelevel2].y,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		this.mapnode.addChild(mansprite,9); 
		
		
		//设置当前所闯关卡在屏幕当中显示
		this.mapnode.y=-checkpoints[testgamelevel2].y+size.height/3;
		
	
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this)
			//onTouchesMoved: this.onToucheMoved.bind(this)
			//onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
		

	},
	onClickStart:function() {
	Sound.getInstance().playBtn();
	
	},
	onClickSettings:function() {	
		Sound.getInstance().playBtn();
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
	
	
	onTouchBegan:function(touches, event){

		var touch = touches[0];
		var location = touch.getLocation();
		

		for(var i=0;i<100;i++)
		{
			if(cc.pDistance(this.mapnode.convertToWorldSpace(this.gamecheckpoints[i].getPosition()),location)<=65)
			{
				
				if(this.gamecheckpoints[i]._num==GV.CURRENT_LEVEL)
				Sound.getInstance().playBtn();
				cc.director.runScene(new GameScene(GV.CURRENT_LEVEL));
				
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
var Checkpoint = cc.Sprite.extend({
	_State:true,//所处的状态   lock or unlock
	_num:null,//第几关
	_xian:null,//上端的线
	_abovepointx:null,//上面圈的位置
	_abovepointy:null,//上面圈的位置
	ctor:function (num,maplevel,state,pointx,pointy,abovepointx,abovepointy) {

		//this._super();	
		var size = cc.winSize;

		this._State=state;
		this._num=num+maplevel*100;
		
		
		   if(state)
			{
			  this._super("#gameplay_node_unlocked.png");	
			}else{
			  this._super("#gameplay_node_locked.png");	
			}
		
		   this.x=pointx;
		   this.y=pointy;
		   
		   this._abovepointx=abovepointx;
		   this._abovepointy=abovepointy;
		   
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
		  if(this._num<(maplevel+1)*100-1)
			  { 
		    	  //放置线
		    	  this._xian = new cc.Sprite();
		    	  var xianheight=this._abovepointy-this.y;
		    	  var xianwidth=this._abovepointx-this.x;
		    	  this._xian.setContentSize(cc.size(5,xianheight));
		    	  this._xian.setTextureRect(cc.rect(0, 0, 5, xianheight));
		    	  var pcolor;
		    	  if(this._num<GV.CURRENT_LEVEL){
		    	  pcolor =cc.color(238,79,54);  
		    	  }else {
		    	  pcolor =cc.color(157,159,163);
		    	  }
		    	  this._xian.setColor(pcolor);
		    	  
		    	  var roundnum=180*Math.atan2(xianwidth, xianheight)/Math.PI;
		    	  this._xian.attr({
		    		  x: this.width/2,
		    		  y: this.height/2,
		    		  anchorX: 0.5,
		    		  anchorY: 0,
		    		  scale: 1,
		    		  rotation: roundnum
		    		  });
		    		  this.addChild(this._xian,-1); 
	  
			  
			  }
		  
		  
	},

	setState:function()
	{
		this._State=true;
		this.setSpriteFrame("#gameplay_node_unlocked.png");
	
	},
	setxian:function()
	{
		this._xian.setColor(cc.color(238,79,54));
	}
});


