var GameLayer = cc.Layer.extend({
	numBoxArr:null,		//存储数字精灵
	numArr:null,		//当前关卡数字集合，存储所有回合的，用于撤销
	stateArr:null,		//当前关卡状态集合
	gameStep:0,			//当前第几步了，一个24点需要3步
	calBoxArr:null,		//计算符号集合
	calStringArr:["+","-","*","÷"],	//计算表达式字符，打印用
	calNum:-1,			//当前的计算符号
	undoBtn:null,		//撤销按钮
	resetBtn:null,		//重置按钮
	guankaNum:0,		//当前关卡
	resetFlag:false,	//是否进入下一关
	firstPic:-1,		//第一个选择的数字
	secondPic:-1,		//第二个选择的数字
	selectBtn:null,		//进入选择关卡按钮
	mainBtn:null,		//进入主页面按钮
	tipBtn:null,		//提示按钮
	
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
	
	init:function (level) {
		this._super();
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
	},
	
	showTip:function() {
		canCalc(this.numArr[0], this.numArr[1], this.numArr[2], this.numArr[3], TARGET_NUMBER);
		this.resultLabel.setString(CU.tipString);
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
			var result = "关卡:" + (this.guankaNum) +  "  难度系数:" + tempArr[0];
			this.startLabel.setString(result);
			this.numBoxArr[i].setNum(tempArr[i+1]);
			this.numArr.push(tempArr[i+1]);
			this.stateArr.push(STATE_INIT);
			this.numBoxArr[i].setState(STATE_INIT);
			this.closeCalcItem();
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

