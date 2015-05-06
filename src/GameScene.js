var GameLayer = cc.Layer.extend({
	numBoxArr:null,		//存储数字精灵
	numArr:null,		//当前关卡数字集合，存储所有回合的，用于撤销
	stateArr:null,		//当前关卡状态集合
	gameStep:0,			//当前第几步了，一个24点需要3步    一次运算增加一次
	calStep:0,          //计算步骤   a + b 为 3个步骤
	calBoxArr:null,		//计算符号集合
	calStringArr:["+","-","*","/"],	//计算表达式字符，打印用
	calNum:-1,			//当前的计算符号
	undoBtn:null,		//撤销按钮
	resetBtn:null,		//重置按钮
	//numList:null,		//题目集合
	guankaNum:0,		//当前关卡
	resetFlag:false,	//是否进入下一关
	firstPic:-1,		//第一个选择的数字
	secondPic:-1,		//第二个选择的数字
	
	
	selectBtn:null,		//进入选择关卡按钮
	mainBtn:null,		//进入主页面按钮
	tipBtn:null,		//提示按钮
	
	numLabel:null,//显示计算公式
	startLabel:null,//显示关卡标题
	
	numbtns:null,//数字按钮数组
	calbtns:null,//运算符按钮数组

	_PauseLayer:null,//暂停界面
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
//		this.numList = 
//			[6, 6, 6, 6,
//			 1, 2, 3, 4, 
//			 1, 1, 12, 12, 
//			 3, 5, 6, 8,
//			 1, 3, 5, 6,
//			 2, 2, 7, 13,
//			 4, 5, 3, 12,
//			 7, 8, 9, 4,
//			 13, 8, 9, 6,
//			 1, 5, 5, 5];
	},
	
	init:function (level) {
		this._super();
		
		
		this.guankaNum = level;
		cc.log("level:%d", level)
		//this.size = cc.winSize;
		var size=cc.winSize;
		//this.setColor(cc.color(180, 170, 160, 255));
		
		var layerbg=new cc.LayerColor(cc.color(0,0,0,255),size.width,size.height);  	
		this.addChild(layerbg);
		
		
		this.startLabel = new cc.LabelTTF("关卡：" + this.guankaNum, "微软雅黑", 30);
		this.startLabel.setAnchorPoint(0.5, 0.5);
		this.startLabel.setColor(cc.color(255, 0, 0, 1));
		this.startLabel.setPosition(size.width/2,size.height - this.startLabel.getFontSize());
		this.addChild(this.startLabel, 1);
		
		
		
		//添加暂停按钮
		var pauseitem = new cc.MenuItemImage(
				"res/hz/pause_btn.png",
				"res/hz/pause_btn.png",
				this.onClickPause,this
		);
		pauseitem.anchorX=1;
		pauseitem.x = size.width-pauseitem.getBoundingBox().width/2-20;	
		pauseitem.y = size.height-pauseitem.getBoundingBox().height-20;

//		var pausemenu = new cc.Menu(pauseitem1);
//		pausemenu.anchorX=0;
//		pausemenu.anchorY=0;
//		pausemenu.x = 0;	
//		pausemenu.y = 0;	
//		this.addChild(pausemenu,1);
		
		
		
	//放置数字运算显示框	
	
		var showbg = new cc.Sprite("res/hz/show_bg.png");
		showbg.attr({
			x: size.width/2,
			y: size.height*2/3,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(showbg,1); 
		
		
		this.numLabel = new cc.LabelTTF("", "微软雅黑",25);
		this.numLabel  .attr({
			x: showbg.getBoundingBox().width/2,
			y: showbg.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		showbg.addChild(this.numLabel ,1);
		
		//添加保存按钮
		var saveitem = new cc.MenuItemImage(
		"res/hz/save_btn.png",
		"res/hz/save_btn.png",
		this.onClickSave,this
		);
		saveitem.anchorX=0;
		saveitem.x = showbg.x-showbg.getBoundingBox().width/2+10;	
		saveitem.y = showbg.y;
		
//		var savemenu = new cc.Menu(saveitem1);
//		savemenu.anchorX=0;
//		savemenu.anchorY=0;
//		savemenu.x = 0;	
//		savemenu.y = 0;	
//		showbg.addChild(savemenu,1);
		
		
		
		
		
		//放置提示和重来按钮

		var tipitem = new cc.MenuItemImage(
				"res/hz/tishi_btn.png",
				"res/hz/tishi_btn.png",
				this.showTip,this
		);
		tipitem.anchorY=0;
		tipitem.x = size.width/4;	
		tipitem.y = 0;

		var restartitem= new cc.MenuItemImage(
				"res/hz/rsgame_btn.png",
				"res/hz/rsgame_btn.png",
				this.restartgame,this
		);
		restartitem.anchorY=0;
		restartitem.x = size.width*3/4;	
		restartitem.y = 0;
//		var trmenu = new cc.Menu(tipitem1,restartitem2);
//		trmenu.anchorX=0;
//		trmenu.anchorY=0;
//		trmenu.x = 0;	
//		trmenu.y = 0;	
//		this.addChild(trmenu,1);
		

	    //初始化数据	
		this.initData();
		this.resetWithGuanka(this.guankaNum);
		
		
		
		
		
		//放置数字按钮以及运算符按钮
		
		var numbtn=this.numbtns=[];
		var calbtn=this.calbtns=[];

		 for(var i=0;i<4;i++)
			{
			 numbtn[i]=new Numbtn(this.onClickNum,this,this.numArr[i],i);
			 numbtn[i].x=size.width*(i+1)/5;
			 numbtn[i].y=size.height*2/5;	
			 //标记
			 numbtn[i].mytag=i;
			 
			 calbtn[i]=new cc.MenuItemImage(
					 "res/hz/yunsuanfu_bg_btn.png",
					 "res/hz/yunsuanfu_bg_btn.png",
					 this.onClickCal,this
			 );

			 calbtn[i].x=size.width*(i+1)/5;
			 calbtn[i].y=size.height/5;		 
			
			 //标记
			 calbtn[i].mytag=i;
			 
			 
			 var calLabel = new cc.LabelTTF(this.calStringArr[i], "微软雅黑",25);
			 calLabel.attr({
				 x: calbtn[i].getBoundingBox().width/2,
				 y: calbtn[i].getBoundingBox().height/2,
				 anchorX: 0.5,
				 anchorY: 0.5,
				 color: cc.color(0,0,0),
				 scale: 1
			 });
			 calbtn[i].addChild(calLabel,1);
		
			}
	
		
		 var menu = new cc.Menu(pauseitem,saveitem,tipitem,restartitem,numbtn[0],numbtn[1],numbtn[2],numbtn[3],calbtn[0],calbtn[1],calbtn[2],calbtn[3]);
		
		 menu.anchorX=0;
		 menu.anchorY=0;
		 menu.x = 0;	
		 menu.y = 0;	
		 this.addChild(menu,99);
		
		
         //提示显示
		 this.resultLabel = new cc.LabelTTF("提示：", "微软雅黑", 30);
		 this.resultLabel.setAnchorPoint(0, 0);
		 this.resultLabel.setColor(cc.color(255, 255, 0, 1));
		 this.resultLabel.anchorX=0;
		 this.resultLabel.anchorY=1;
		 
		 this.resultLabel.setPosition(size.width/6, showbg.y-showbg.getBoundingBox().height/2-15);
		 this.addChild(this.resultLabel, 1);
		 
		 
		
	/*	
		
		this.guankaNum = level;
		cc.log("level:%d", level)
		this.size = cc.winSize;;
		this.setColor(cc.color(180, 170, 160, 255));
		this.startLabel = new cc.LabelTTF("关卡：" + this.guankaNum, "微软雅黑", 30);
		this.startLabel.setAnchorPoint(0.5, 0.5);
		this.startLabel.setColor(cc.color(255, 0, 0, 1));
		this.startLabel.setPosition(this.size.width/2, this.size.height - this.startLabel.getFontSize());
		this.addChild(this.startLabel, 1);
		
		var menuMain = new cc.Menu();
		this.addChild(menuMain, 2);
		menuMain.setPosition(0, 0);
		this.tipBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "提示", null, 25);
		menuMain.addChild(this.tipBtn, 2);
		this.tipBtn.setAnchorPoint(0, 0);
		this.tipBtn.setCallback(this.showTip, this);
		this.tipBtn.setPosition(20, this.size.height - 150);
		
		this.mainBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "返回主界面", null, 25);
		menuMain.addChild(this.mainBtn, 2);
		this.mainBtn.setAnchorPoint(0, 0);
		this.mainBtn.setCallback(this.returnToMain, this);
		this.mainBtn.setPosition(this.size.width - 292, 50);
		
		this.selectBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "返回关卡页面", null, 25);
		menuMain.addChild(this.selectBtn, 2);
		this.selectBtn.setAnchorPoint(0, 0);
		this.selectBtn.setCallback(this.returnToSelect, this);
		this.selectBtn.setPosition(100, 50);
		
		this.undoBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "上一步", null, 25);
		menuMain.addChild(this.undoBtn, 2);
		this.undoBtn.setAnchorPoint(0, 0);
		this.undoBtn.setCallback(this.undoClick, this);
		this.undoBtn.setPosition(100, this.size.height - 250);
		
		this.resetBtn = createLabelImageItem(res.btn_bg_normal, res.btn_bg_click, null, cc.size(192, 61), "重来这关", null, 25);
		menuMain.addChild(this.resetBtn, 2);
		this.resetBtn.setAnchorPoint(0, 0);
		this.resetBtn.setCallback(this.resetClick, this);
		this.resetBtn.setPosition(this.size.width - 292, this.size.height - 250);
		
		this.resultLabel = new cc.LabelTTF("提示：", "微软雅黑", 30);
		this.resultLabel.setAnchorPoint(0, 0);
		this.resultLabel.setColor(cc.color(255, 255, 0, 1));
		this.resultLabel.setPosition(300, this.size.height - 150);
		this.addChild(this.resultLabel, 1);
		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this),
			onTouchesMoved: this.onToucheMoved.bind(this),
			onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
		
		var boxWidth = BOX_WIDTH;
		this.initData();
		for (var i = 0; i < 4; i++) {
			var box = new NumBox();
			this.numBoxArr.push(box);
			box.setPosition(boxWidth / 2 + 100 + (i%2)*(boxWidth + 100), 80 + boxWidth + (Math.floor(i/2)*(boxWidth + 150)));
			this.addChild(box, 0, i);
			
			var cal = new CalBox(this.calStringArr[i]);
			cal.setVisible(false);
			this.calBoxArr.push(cal);
			this.addChild(cal, 10, i);
		}
		this.resetWithGuanka(this.guankaNum);
		
		
		*/
	},
	
	onClickSave:function() {

		cc.log("test:onClickSave");

	},
	onClickPause:function() {
		if(this._PauseLayer)
		{
			if(!this._PauseLayer.Visible)
			{
				this._PauseLayer.setVisible(true);
				//暂停页面按钮功能   
				cc.eventManager.pauseTarget(this, true);
				//开启设置层按钮功能
				cc.eventManager.resumeTarget(this._PauseLayer,true);
			}
		}
		else
		{
			//暂停页面已存按钮功能
			cc.eventManager.pauseTarget(this, true);

			this._PauseLayer=new PauseLayer();
			this.addChild(this._PauseLayer,100);

		}
		
		
		
		
	},
	
	
	onClickNum:function(sender) {
		if(sender.State==2)
		return;
		
		
		switch (this.calStep)
		{
		case 0:
			//firstPic数字可选
			sender.onselect();
			this.firstPic=sender.mytag;
			this.calStep++;

			this.numLabel.setString(this.numbtns[this.firstPic].num);
			
			
		   break;
		case 1:
			//firstPic数字可取消  
			if(sender.mytag!=this.firstPic)
			return;
			
			sender.onselect();
			this.firstPic=-1;
			this.calStep--;
			this.numLabel.setString("");
			break;
		case 2:
			
			if(sender.mytag==this.firstPic)
				return;

			//secondPic数字可选
			sender.onselect();
			this.secondPic=sender.mytag;
			  
			//计算式子结果
			var calreslut="("+this.numbtns[this.firstPic].num+this.calNum+this.numbtns[this.secondPic].num+")";
			
			//var pshownum=eval(calreslut);
			//pshownum经过一定处理
			//
			
			this.numLabel.setString(calreslut);
			
			this.calStep=1;
			this.gameStep++;
			if(this.gameStep==3){
				//游戏结束
				var pnum=eval(calreslut);
				if(pnum>=23.999&&pnum<=24.001) 
					{
					//youwin
					GV.setCurrentLevel((this.guankaNum+1));
					cc.log("youwin"+pnum);
					cc.director.runScene(new WinScene());

					}else
					{
					//youlose
					cc.log("youlose"+pnum);
				    cc.director.runScene(new GameScene(this.guankaNum));
					}
				return;
			}
	
			
	
			//置secondPic为状态2  firstPic为计算结果
			this.numbtns[this.secondPic].setState(2);
			this.secondPic=-1;
			
			this.numbtns[this.firstPic].setString(calreslut);
			
		
			
			
			break;
		
		}
		
		
	},
	onClickCal:function(sender) {
		if(this.calStep==0)
		return;
		
		if(this.calStep==1)
		{
		//可选
		this.calNum=this.calStringArr[sender.mytag];
		this.calStep++;
			
		}else if(this.calStep==2)
		{
		//可替换
		this.calNum=this.calStringArr[sender.mytag];		
		}
		
		//更新显示
		this.numLabel.setString(this.numbtns[this.firstPic].num+this.calNum);
		cc.log("test:"+this.calStringArr[sender.calnum]);

	},
	
	showTip:function() {
		canCalc(this.numArr[0], this.numArr[1], this.numArr[2], this.numArr[3], TARGET_NUMBER);
		//this.resultLabel.setString(tipString);
		this.resultLabel.setString("提示："+CU.tipString);
	},
	
	restartgame:function() {
		cc.director.runScene(new GameScene(this.guankaNum));
		
	},
	
	undoClick:function() {
		if (this.gameStep > 0) {
			this.backToStep(this.gameStep - 1);
		} else {
			this.backToStep(0);
		}
	},
	
	resetClick:function() {
		this.backToStep(0);
	},
	
	returnToMain:function() {
		cc.director.runScene(new GameInitScene());
	},
	
	returnToSelect:function() {
		cc.director.runScene(new GameSelectScene());
	},
	
	onToucheMoved:function(touches, event){
		cc.log("move:")
		var touch = touches[0];
		var location = touch.getLocation();
		
		for(var i=0;i<4;i++){
			if(cc.rectContainsPoint(this.calBoxArr[i].getBoundingBox(),location))	
			{ 
				this.calNum = i;
				this.closeCalcItem();
				return;
			}
		}
		
		for(var i=0;i<4;i++){
			if(cc.rectContainsPoint(this.numBoxArr[i].getBoundingBox(),location))	
			{ 
				if(this.numBoxArr[i].State!=0) {
					return;
				}
				cc.log("move:%d", i)
				var n = 0; 
				var firstPic = -1;
				for (var j = 0; j < 4; j++) {
					if (this.numBoxArr[j].State == STATE_SELECT) {
						if (j != i) {
							firstPic = j;
						}
						n++;
					}
				}
				if (n == 0) {
					if (this.numBoxArr[i].State == STATE_INIT) {
						this.numBoxArr[i].setState(STATE_SELECT);// 选中数字变为选中状态
						this.firstPic = i;
						this.secondPic = -1;
					}
				} else if (n == 1) {
					this.showCalcItem(i);
					this.numBoxArr[i].setState(STATE_SELECT);
					this.secondPic = i;
				}
			}
		}
	},
	onTouchEnded:function(touches, event){
		cc.log("end:")
		var n = 0; 
		for (var j = 0; j < 4; j++) {
			if (this.numBoxArr[j].State == STATE_SELECT) {
				n++;
			}
		}
		if (n == 2) {
			var result = 0;
			switch(this.calNum) {
			case -1:
				return;
			case 0:
				result = this.numBoxArr[this.firstPic].num + this.numBoxArr[this.secondPic].num;
				break;
			case 1:
				result = this.numBoxArr[this.firstPic].num - this.numBoxArr[this.secondPic].num;
				break;
			case 2:
				result = this.numBoxArr[this.firstPic].num * this.numBoxArr[this.secondPic].num;
				break;
			case 3:
				result = this.numBoxArr[this.firstPic].num / this.numBoxArr[this.secondPic].num;
				break;
			}
			this.numBoxArr[this.firstPic].setState(STATE_DONE);
			this.numBoxArr[this.secondPic].setState(STATE_INIT);
			this.numBoxArr[this.secondPic].setNum(result);
			this.calNum = -1;
			
			for(var i = 0; i < 4; i++) {
				this.numArr.push(this.numBoxArr[i].getNum());
				this.stateArr.push(this.numBoxArr[i].getState());
			}
			
			if (this.gameStep == 2) {
				if (result == TARGET_NUMBER) {
					this.resultLabel.setString("恭喜你答对啦~~");
					this.resetFlag = true;
					return;
				} else {
					this.resultLabel.setString("对不起，答错了哦，再来一次吧");
					this.resetFlag = true;
					return;
				}
			}
			this.gameStep++;
		} 
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
		
		for (var i = 0; i < 4; i++) {
//			if (this.guankaNum >= 10) {
//				this.randNums();
//				this.numBoxArr[i].setNum(this.numList[i]);
//				this.numArr.push(this.numList[i]);
//				this.startLabel.setString("随机关卡，难度不定");
//			} else {
//				var result = "关卡:" + (this.guankaNum+1) +  "难度系数:" + this.guankaNum * 10;
//				this.startLabel.setString(result);
//				this.numBoxArr[i].setNum(this.numList[4 * this.guankaNum + i]);
//				this.numArr.push(this.numList[4 * this.guankaNum + i]);
//			}
			var result = "关卡:" + (this.guankaNum) +  "  难度系数:" + tempArr[0];
			this.startLabel.setString(result);
			//this.numBoxArr[i].setNum(tempArr[i+1]);
			this.numArr.push(tempArr[i+1]);
			
			this.stateArr.push(STATE_INIT);
			//this.numBoxArr[i].setState(STATE_INIT);
			//this.closeCalcItem();
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

	onTouchBegan:function(touches, event){
		cc.log("begin:")
		var touch = touches[0];
		var location = touch.getLocation();
		
		if (this.resetFlag == true) {
			this.nextGame();
			return true;
		}
		
		for(var i=0;i<4;i++){
			if(cc.rectContainsPoint(this.calBoxArr[i].getBoundingBox(),location))	
			{ 
				this.calNum = i;
				this.closeCalcItem();
				return true;
			}
		}

		for(var i=0;i<4;i++){
			if(cc.rectContainsPoint(this.numBoxArr[i].getBoundingBox(),location))	
			{ 
				cc.log("begin:%d", i)
				var n = 0; 
				var lastPic = -1;
				for (var j = 0; j < 4; j++) {
					if (this.numBoxArr[j].State == STATE_SELECT) {
						if (j != i) {
							lastPic = j;
						}
						n++;
					}
				}
				if (n == 0) {
					if (this.numBoxArr[i].State == STATE_INIT) {
						this.numBoxArr[i].setState(STATE_SELECT);// 选中数字变为选中状态
						this.firstPic = i;
					}
				} else if (lastPic == -1) {
					this.numBoxArr[i].setState(STATE_INIT);// 选中数字变为选中状态
				} else if (n == 1) {
					this.showCalcItem(i);
					this.secondPic = i;
					this.numBoxArr[i].setState(STATE_SELECT);
				}
				return true;
			}
		}
	},
	
	showCalcItem:function(index) {
		var x = this.numBoxArr[index].getBoundingBox().x + BOX_WIDTH/2;
		var y = this.numBoxArr[index].getBoundingBox().y + BOX_WIDTH/2;
		
		this.calBoxArr[0].setVisible(true);
		this.calBoxArr[0].setPosition(x + BOX_WIDTH * 3 / 4, y);
		this.calBoxArr[1].setVisible(true);
		this.calBoxArr[1].setPosition(x - BOX_WIDTH * 3 / 4, y);
		this.calBoxArr[2].setVisible(true);
		this.calBoxArr[2].setPosition(x, y + BOX_WIDTH * 3 / 4);
		this.calBoxArr[3].setVisible(true);
		this.calBoxArr[3].setPosition(x, y - BOX_WIDTH * 3 / 4);
	},
	
	closeCalcItem:function() {
		for (var i = 0; i < 4; i++) {
			this.calBoxArr[i].setVisible(false);
			this.calBoxArr[i].setPosition(-100, -100);
		}
	},
	
	nextGame:function() {
		setCurrentLevel(this.guankaNum);
		this.resetWithGuanka(this.guankaNum + 1);
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
	ctor:function (level) {
		this._super();
		this.level = level;
		cc.log("level:%d", level);
	},
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		layer.init(this.level);
		this.addChild(layer);
	}
});
