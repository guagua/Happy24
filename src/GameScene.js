var GameLayer = cc.Layer.extend({
	isRand:false, 		// 是否是随机模式
	numBoxArr:null,		// 存储数字精灵
	numArr:null,		// 当前关卡数字集合，存储所有回合的，用于撤销
	stateArr:null,		// 当前关卡状态集合
	gameStep:0,			// 当前第几步了，一个24点需要3步 一次运算增加一次
	calStep:0,          // 计算步骤 a + b 为 3个步骤
	calBoxArr:null,		// 计算符号集合
	calStringArr:["+","-","*","/"],	// 计算表达式字符，打印用
	calNum:-1,			// 当前的计算符号
	undoBtn:null,		// 撤销按钮
	resetBtn:null,		// 重置按钮
	// numList:null, //题目集合
	guankaNum:0,		// 当前关卡
	resetFlag:false,	// 是否进入下一关
	firstPic:-1,		// 第一个选择的数字
	secondPic:-1,		// 第二个选择的数字


	selectBtn:null,		// 进入选择关卡按钮
	mainBtn:null,		// 进入主页面按钮
	tipBtn:null,		// 提示按钮

	numLabel:null,// 显示计算公式
	startLabel:null,// 显示关卡标题

	numbtns:null,// 数字按钮数组
	calbtns:null,// 运算符按钮数组

	_PauseLayer:null,// 暂停界面
	

	isGuide:false,//是否需要引导
	GuideSprites:null,//引导箭头数组
	showyindao:null,//引导图文

	
	
	initData:function() {
		this.numBoxArr = [];
		this.calBoxArr = [];
		this.calNum = -1;
		this.gameStep = 0;
		this.firstPic = -1;
		this.secondPic = -1;
		this.resetFlag = false;
		this.numArr = [];
		this.stateArr = [];
	},

	init:function (level, isRand) {
		this._super();

		if(!cc.audioEngine.isMusicPlaying())
		{	
			var action1=cc.delayTime(1.0);
			var action2=cc.sequence(action1,cc.callFunc(function(){
				Sound.getInstance().playBg();	
			}, this));
			this.runAction(action2);
		}

		this.isRand = isRand;
		this.guankaNum = level;	
		if(level==0)
		this.isGuide=true;
		
//		if (this.isRand == true && level < 0) {
//			this.guankaNum = Math.floor(Math.random() * CU.levelNum.length);
//		} else {
//			this.guankaNum = level;	
//		}
		
		//cc.log("level:%d", level)
		var size=cc.winSize;

		var layerbg=new cc.LayerColor(cc.color(251,254,238,255),size.width,size.height);  	
		this.addChild(layerbg);


		// 屏幕顶部标题浮层
		var gametitle_bg=new cc.LayerColor(cc.color(255,255,255,150),size.width,100);  
		gametitle_bg.y=size.height-100;
		this.addChild(gametitle_bg);

		// log
		var logo_bigsprite = new cc.Sprite("#logo_big.png");
		logo_bigsprite.attr({
			x: 0,
			y: 5,
			anchorX: 0,
			anchorY: 0,
			scale: 0.4
		});
		gametitle_bg.addChild(logo_bigsprite);  

		this.startLabel = new cc.LabelBMFont(" ", res.gamefont_fnt);
		this.startLabel.scale=0.8;
		this.startLabel.setAnchorPoint(0, 0);
		this.startLabel.setColor(cc.color(58, 62, 70, 255));

		this.startLabel.setPosition(logo_bigsprite.getBoundingBox().width+10,0);
		gametitle_bg.addChild(this.startLabel, 1);



		// 添加暂停按钮
		var pauseitem = new cc.MenuItemImage(
				"#pause_btn.png",
				"#pause_btn2.png",
				this.onClickPause,this
		);
		pauseitem.anchorX=1;
		pauseitem.anchorY=0.5;
		pauseitem.x = size.width-pauseitem.getBoundingBox().width/2;	
		pauseitem.y = size.height-gametitle_bg.getBoundingBox().height/2;



		// 放置提示和重来按钮
		var tipitem = new cc.MenuItemImage(
				"#tips_btn.png",
				"#tips_btn2.png",
				this.showTip,this
		);
		tipitem.anchorY=0;
		tipitem.x = size.width/4;	
		tipitem.y = 0;

		var restartitem= new cc.MenuItemImage(
				"#retry_btn.png",
				"#retry_btn2.png",
				this.restartgame,this
		);
		restartitem.anchorY=0;
		restartitem.x = size.width*3/4;	
		restartitem.y = 0;
		
	
		
		// 初始化数据
		this.initData();
		this.resetWithGuanka(this.guankaNum);

		// 放置数字按钮以及运算符按钮
		var numbtn=this.numbtns=[];
		var calbtn=this.calbtns=[];
		var numbtnbg_x=(size.width-20)/8;

		for(var i=0;i<4;i++)
		{
			//运算符按钮
			calbtn[i]=new cc.MenuItemImage(
					"#cal_btn_"+i+".png",
					"#cal_btn_"+i+".png",
					this.onClickCal,this
			);

			calbtn[i].x=10+numbtnbg_x*(2*i+1);
			calbtn[i].y=calbtn[i].getBoundingBox().height/2+restartitem.getBoundingBox().height+GV.UI_HEIGHT_SPACE;		 

			// 标记
			calbtn[i].mytag=i;
			
			//数字按钮
			
			numbtn[i]=new Numbtn(this.onClickNum,this,this.numArr[i],i);
			numbtn[i].x=10+numbtnbg_x*(2*i+1);
			var pheight=numbtn[i].getBoundingBox().height/2+calbtn[i].y+calbtn[i].getBoundingBox().height/2+GV.UI_HEIGHT_SPACE;
			numbtn[i].y=pheight;	

			var numbtnbg = new cc.Sprite("#card_shadow.png");
			numbtnbg.attr({
				x: 10+numbtnbg_x*(2*i+1),
				y: pheight,
				anchorX: 0.5,
				anchorY: 0.5,
				scale: 1
			});
			this.addChild(numbtnbg); 

			// 标记
			numbtn[i].mytag=i;	
		}
		
		
		// 提示显示
		this.resultLabel = new cc.LabelTTF("提示：","Arial", 30);
		this.resultLabel.setAnchorPoint(0, 0);
		this.resultLabel.setColor(cc.color(0, 0, 0, 255));
		this.resultLabel.setPosition(size.width/6, numbtn[0].y+numbtn[0].getBoundingBox().height/2+20+GV.UI_HEIGHT_SPACE/3);
		this.addChild(this.resultLabel, 1);

		// 放置数字运算显示框

		var showbg = new cc.Sprite("#display_bg.png");
		showbg.attr({
			x: size.width/2,
			y: showbg.getBoundingBox().height/2+this.resultLabel.y+30+GV.UI_HEIGHT_SPACE/3,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(showbg,1); 


		// 添加保存按钮
		var saveitem = new cc.MenuItemImage(
				"#save_btn3.png",
				//"#save_btn.png",
				"#save_btn_grey.png",
				this.onClickSave,this
		);
		saveitem.anchorX=0;
		saveitem.x = showbg.x-showbg.getBoundingBox().width/2+10;	
		saveitem.y = showbg.y;
		
		
		this.numLabel = new cc.LabelBMFont("", res.gamefont_fnt,showbg.getBoundingBox().width-saveitem.getBoundingBox().width,cc.TEXT_ALIGNMENT_CENTER);
		this.numLabel  .attr({
			x: showbg.getBoundingBox().width/2,
			y: showbg.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(58, 62, 70),
			scale: 0.8
		});
		showbg.addChild(this.numLabel ,1);


		var menu = new cc.Menu(pauseitem,saveitem,tipitem,restartitem,numbtn[0],numbtn[1],numbtn[2],numbtn[3],calbtn[0],calbtn[1],calbtn[2],calbtn[3]);

		menu.anchorX=0;
		menu.anchorY=0;
		menu.x = 0;	
		menu.y = 0;	
		this.addChild(menu,99);


		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this)
			//onTouchesMoved: this.onToucheMoved.bind(this)
			//onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
		
		
		this.showyindao = new cc.Sprite("#yindao.png");
		this.showyindao.attr({
			x: showbg.getBoundingBox().width,
			y: showbg.getBoundingBox().height,
			anchorX: 1,
			anchorY: 1,
			scale: 1
		});
		showbg.addChild(this.showyindao,1); 
		this.showyindao.setVisible(false);
		
		//增加引导
		if(this.isGuide)
		{
			this.showyindao.setVisible(true);
			this.addGuide(0);
		}


		
	},
	addGuide:function(Guidestate){
		if(!this.isGuide)
		return;
		

			if(this.GuideSprites==null)
			{
				this.GuideSprites=[];
				for(var i=0;i<4;i++)
				{
					this.GuideSprites[i]=new cc.Sprite("#yindao_down1.png");
				this.GuideSprites[i].attr({
					anchorX: 0.5,
					anchorY: 0,
					scale: 1
				});

				this.addChild(this.GuideSprites[i],100); 
				this.GuideSprites[i].setVisible(false);
			   }
				
				for(var i=4;i<6;i++)
				{
					this.GuideSprites[i]=new cc.Sprite("#yindao_down2.png");
					this.GuideSprites[i].attr({
						anchorX: 0.5,
						anchorY: 0,
						scale: 1
					});
					
					this.addChild(this.GuideSprites[i],100); 
					this.GuideSprites[i].setVisible(false);
				}
				
				
				for(var i=0;i<6;i++)
				{
					var action0=cc.moveBy(0.5,0,-30);
					var action1=cc.moveBy(0.2,0,30);
					var action2=cc.sequence(action0,action1);
					var repeat1 = new cc.RepeatForever(action2);
					this.GuideSprites[i].runAction(repeat1);
	
				}
	
		
			}
		var size=cc.winSize;

		switch(Guidestate)
		{
		case 0:
		//黄色箭头隐藏
			this.GuideSprites[4].setVisible(false);
			this.GuideSprites[5].setVisible(false);
			

		 //添加4个绿色箭头指向数字
			for(var i=0;i<4;i++)
				{
			this.GuideSprites[i].x=this.numbtns[i].x;
			this.GuideSprites[i].y=this.numbtns[i].y;
			
			if(this.numbtns[i].State==0)
				this.GuideSprites[i].setVisible(true);
			else
				this.GuideSprites[i].setVisible(false);
			
				//cc.log("Visible:",this.GuideSprites[i].isVisible());
			
				}

			
		    break;
		case 1:
			//添加4个绿色箭头指向运算符
			for(var i=0;i<4;i++)
			{
				this.GuideSprites[i].x=this.calbtns[i].x;
				this.GuideSprites[i].y=this.calbtns[i].y;
				this.GuideSprites[i].setVisible(true);
			}
		  //添加指向选中数字键   和  指向空白和向下 的黄色箭头
		//数字键
			this.GuideSprites[4].x=this.numbtns[this.firstPic].x;
			this.GuideSprites[4].y=this.numbtns[this.firstPic].y;
			this.GuideSprites[4].setVisible(true);
			
		 //黄色指向空白地
			this.GuideSprites[5].x=size.width-100;
			this.GuideSprites[5].y=this.resultLabel.y+50;
			this.GuideSprites[5].setVisible(true);
			
			break;
		case 2:
			//添加4个绿色箭头指向数字  已被选的隐藏
			for(var i=0;i<4;i++)
			{
				this.GuideSprites[i].x=this.numbtns[i].x;
				this.GuideSprites[i].y=this.numbtns[i].y;

				if(this.numbtns[i].State==0)
					this.GuideSprites[i].setVisible(true);
				else
					this.GuideSprites[i].setVisible(false);
			}
			
			
			//黄色指向空白地
			this.GuideSprites[5].x=size.width-100;
			this.GuideSprites[5].y=this.resultLabel.y+100;
			this.GuideSprites[5].setVisible(true);

			this.GuideSprites[4].setVisible(false);
			
			break;
		
		}

		
	},

	onTouchBegan:function(touches, event){
		if(this.firstPic==-1)
		return;
		
		if(this.numbtns[this.firstPic].State==1)
		{
			Sound.getInstance().playSel2();
			this.numbtns[this.firstPic].setState(0);
			this.numLabel.setString("");
			this.calStep=0;
		}
		
		this.addGuide(0);
		
		return false;
	},
	onClickSave:function() {
		//cc.log("test:onClickSave");	
//		if(this.firstPic==-1)
//			return;
//
//		if(this.numbtns[this.firstPic].State==1)
//		{
//			Sound.getInstance().playSel2();
//			this.numbtns[this.firstPic].setState(0);
//			this.numLabel.setString("");
//			this.calStep=0;
//		}
		
		if(this.isGuide)
		{
		this.isGuide=false;	
		
		this.showyindao.setVisible(false);
		
		for(var i=0;i<6;i++)
		{
			
			this.GuideSprites[i].removeFromParent(true);

		}
		
		this.GuideSprites=null;
		
			
		}else
		{
			this.isGuide=true;	
			
			this.showyindao.setVisible(true);
			

			this.addGuide(this.calStep);

			
			
		}
		
		
	},
	
	onClickPause:function() {
		Sound.getInstance().playBtn();
		if(this._PauseLayer)
		{
			if(!this._PauseLayer.Visible)
			{
				this._PauseLayer.y=0;
				this._PauseLayer.setVisible(true);
				// 暂停页面按钮功能
				cc.eventManager.pauseTarget(this, true);
				// 开启设置层按钮功能
				cc.eventManager.resumeTarget(this._PauseLayer,true);
			}
		}
		else
		{
			// 暂停页面已存按钮功能
			cc.eventManager.pauseTarget(this, true);

			this._PauseLayer=new PauseLayer();
			this.addChild(this._PauseLayer,101);

		}




	},


	onClickNum:function(sender) {
		if(sender.State==2)
			return;


		switch (this.calStep)
		{
		case 0:
			// firstPic数字可选
			Sound.getInstance().playSel1();
			sender.onselect();
			this.firstPic=sender.mytag;
			this.calStep++;

			this.numLabel.setString(this.numbtns[this.firstPic].num);

			this.addGuide(1);
			break;
		case 1:
			// firstPic数字可取消
			
			if(sender.mytag!=this.firstPic)
				return;
			Sound.getInstance().playSel2();
			sender.onselect();
			this.firstPic=-1;
			this.calStep--;
			this.numLabel.setString("");
			
			this.addGuide(0);
			break;
		case 2:

			if(sender.mytag==this.firstPic)
				return;
			Sound.getInstance().playSel1();
			// secondPic数字可选
			sender.onselect();
			this.secondPic=sender.mytag;

			// 计算式子结果
			var calreslut="("+this.numbtns[this.firstPic].num+this.calNum+this.numbtns[this.secondPic].num+")";

			// var pshownum=eval(calreslut);
			// pshownum经过一定处理
			//
			var pnum=eval(calreslut);
			
			this.numLabel.setString(calreslut);

			this.calStep=1;
			this.gameStep++;
			if(this.gameStep==3){
				// 游戏结束
				//var pnum=eval(calreslut);
				if(pnum>=23.999&&pnum<=24.001) 
				{
					// youwin

					Sound.getInstance().playWin();
					if (!this.isRand) {
						var nextLevel = this.guankaNum + 1;
						if (nextLevel == CU.levelNum.length) 
							nextLevel = 0;	
						
						GV.setCurrentLevel(nextLevel);
					}
					//cc.log("youwin"+pnum);
					cc.director.runScene(new WinScene(this.isRand));

				}else
				{
					// youlose
					Sound.getInstance().playLose();
					// cc.log("youlose"+pnum);
					cc.director.runScene(new GameScene(this.guankaNum, this.isRand));
				}
				return;
			}



			// 置secondPic为状态2 firstPic为计算结果
			this.numbtns[this.secondPic].setState(2);
			this.secondPic=-1;
			
			//if(pnum.toFixed(2))
			if(pnum*100%1>=0.1)
			pnum=pnum.toFixed(2);
			//cc.log(pnum*100%1);
			
			this.numbtns[this.firstPic].setString(pnum);

			this.numbtns[this.firstPic].setAboveString(calreslut);
			
			this.calNum=-1;
			
			this.addGuide(1);
			break;

		}


	},
	onClickCal:function(sender) {
		if(this.calStep==0)
			return;

		if(this.calStep==1)
		{
			// 可选
			Sound.getInstance().playSel3();
			this.calNum=this.calStringArr[sender.mytag];
			this.calStep++;

		}else if(this.calStep==2)
		{
			// 可替换
			Sound.getInstance().playSel3();
			this.calNum=this.calStringArr[sender.mytag];		
		}

		// 更新显示
		this.numLabel.setString(this.numbtns[this.firstPic].num+this.calNum);
		// cc.log("test:"+this.calStringArr[sender.calnum]);
		this.addGuide(2);
	},

	showTip:function() {
		if(this.resultLabel.getString()!="提示：")
			return;

		Sound.getInstance().playBtn();
		canCalc(this.numArr[0], this.numArr[1], this.numArr[2], this.numArr[3], GV.TARGET_NUMBER);
		// this.resultLabel.setString(tipString);
		this.resultLabel.setString("提示："+CU.tipString);
	},

	restartgame:function() {
		Sound.getInstance().playBtn();
		
		//this.resetWithGuanka(this.guankaNum);
		cc.director.runScene(new GameScene(this.guankaNum, this.isRand));
		
		//cc.director.runScene(new GameScene(this.guankaNum, this));

	},

	returnToMain:function() {
		Sound.getInstance().playBtn();
		cc.director.runScene(new GameInitScene());
	},

	returnToSelect:function() {
		Sound.getInstance().playBtn();
		cc.director.runScene(new GameSelectScene());
	},


	backToStep:function(step) {
		if (step > this.gameStep) return;
		if (step == null) step = 0;
		this.calNum = -1;
		this.gameStep = step;
		this.firstPic = -1;
		this.secondPic = -1;
		this.resetFlag = false;
		var popNum = this.numArr.length;
		var needNum = 4 * (step + 1);
		for(var i = needNum; i < popNum; i++) {
			this.numArr.pop();
			this.stateArr.pop();
		}
		for(var i = 0; i < 4; i++) {
			this.numBoxArr[i].setNum(this.numArr[i + 4 * step]);
			this.numBoxArr[i].setState(this.stateArr[i + 4 * step]);
		}
		this.closeCalcItem();
	},

	resetWithGuanka:function(num) {
		this.guankaNum = num;
		this.calNum = -1;
		this.gameStep = 0;
		this.numArr = [];
		this.stateArr = [];

		var tempArr = CU.levelNum[this.guankaNum];
		var result;
		if (this.isRand == true) {
			//result = "随机模式 难度系数:" + tempArr[0];
			result = "随机模式";
		} else {
			//result = "关卡:" + (this.guankaNum) +  " 难度系数:" + tempArr[0];
			if(this.guankaNum==0)
			result = "引导关";
			else
			result = "第" + (this.guankaNum) + "关";
			
			
		}
		this.startLabel.setString(result);
		
		for (var i = 0; i < 4; i++) {
			this.numArr.push(tempArr[i+1]);
			this.stateArr.push(GV.STATE_INIT);
		}

		this.resetFlag = false;
	},

	resetWithNums:function(tempNums) {
		this.calNum = -1;
		this.gameStep = step;
		this.firstPic = -1;
		this.secondPic = -1;
		this.numArr = [];
		this.stateArr = [];
		for(var i = 0; i < tempNums.length; i++) {
			this.numArr.push(temgNums[i]);
			this.stateArr.push(STATE_INIT);
			this.numBoxArr.setNum(tempNums[i]);
		}
	},

	nextGame:function() {
		if (isRand == true) {
			var randLevel = Math.floor(Math.random() * CU.levelNum.length);
			this.resetWithGuanka(this.guankaNum + 1);
		} else {
			setCurrentLevel(this.guankaNum);
			this.resetWithGuanka(this.guankaNum + 1);
		}
	},

	randNums:function() {
		for (var i = 0; i < 4; i++) {
			var num = Math.floor(Math.random() * 13) + 1;
			this.numList[this.guankaNum * 4 + i] = num;
		}
	}
})

var GameScene = cc.Scene.extend({
	level:0,
	isRand:false,
	ctor:function (level, isRand) {
		this._super();
		this.level = level;
		this.isRand = isRand;
		//cc.log("level:%d", level);
	},
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		layer.init(this.level, this.isRand);
		this.addChild(layer);
	}
});
