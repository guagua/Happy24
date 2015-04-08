var GameLayer = cc.Layer.extend({
	numBoxArr:null,//   存储数字精灵
	numArr:null,
	GameStep:0,
	calBoxArr:null,
	calStringArr:["+","-","*","/"],
	calNum:-1,
	resetMenu:null,
	numList:null,
	guankaNum:0,
	resetFlag:false,
	firstPic:-1,
	secondPic:-1,
	
	init:function () {
		this._super();
		this.size = cc.winSize;
		this.setColor(cc.color(180, 170, 160, 255));
		this.startLabel = new cc.LabelTTF("游戏开始~", "微软雅黑", 30);
		this.startLabel.setAnchorPoint(0.5, 0.5);
		this.startLabel.setColor(cc.color(255, 0, 0, 1));
		this.startLabel.setPosition(this.size.width/2, this.size.height - this.startLabel.getFontSize());
		this.addChild(this.startLabel, 1);
		
		this.numList = 
			[6, 6, 6, 6,
			 1, 2, 3, 4, 
			 1, 1, 12, 12, 
			 3, 5, 6, 8,
			 1, 3, 5, 6,
			 2, 2, 7, 13,
			 4, 5, 3, 12,
			 7, 8, 9, 4,
			 13, 8, 9, 6,
			 1, 5, 5, 5],
		
		this.resultLabel = new cc.LabelTTF("关卡:1 难度系数:0", "微软雅黑", 30);
		this.resultLabel.setAnchorPoint(0.5, 0.5);
		this.resultLabel.setColor(cc.color(255, 255, 0, 1));
		this.resultLabel.setPosition(this.size.width/2, this.size.height - 100);
		this.addChild(this.resultLabel, 1);
		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			// swallowTouches: true,
			onTouchesBegan: this.onTouchBegan.bind(this),
			onTouchesMoved: this.onToucheMoved.bind(this),
			onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
		
		var boxWidth = BOX_WIDTH;
		this.numBoxArr = [];
		this.calBoxArr = [];
		this.calNum = -1;
		this.GameStep = 0;
		this.firstPic = -1;
		this.secondPic = -1;
		this.resetFlag = false;
		for (var i = 0; i < 4; i++) {
			var box = new NumBox(this.numList[i]);
			this.numBoxArr.push(box);
			box.setPosition(boxWidth / 2 + 100 + (i%2)*(boxWidth + 100), 80 + boxWidth + (Math.floor(i/2)*(boxWidth + 150)));
			this.addChild(box, 0, i);
			
			var cal = new CalBox(this.calStringArr[i]);
			cal.setVisible(false);
			this.calBoxArr.push(cal);
			this.addChild(cal, 10, i);
		}
		
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
					if (this.numBoxArr[j].State == 1) {
						if (j != i) {
							firstPic = j;
						}
						n++;
					}
				}
				if (n == 0) {
					if (this.numBoxArr[i].State == 0) {
						this.numBoxArr[i].setState(1);// 选中数字变为选中状态
						this.firstPic = i;
						this.secondPic = -1;
//						this.showCalcItem(i);
					}
				} else if (n == 1) {
					this.showCalcItem(i);
					this.numBoxArr[i].setState(1);
					this.secondPic = i;
				}
			}
		}
	},
	onTouchEnded:function(touches, event){
		cc.log("end:")
		var n = 0; 
		for (var j = 0; j < 4; j++) {
			if (this.numBoxArr[j].State == 1) {
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
			this.numBoxArr[this.firstPic].setState(2);
			this.numBoxArr[this.secondPic].setState(0);
			this.numBoxArr[this.secondPic].setNum(result);
			this.calNum = -1

			if (this.GameStep == 2) {
				if (result == TARGET_NUM) {
					this.resultLabel.setString("恭喜你答对啦~~");
					this.resetFlag = true;
					return;
//					cc.director.runScene(new GameInitScene());
				} else {
					this.resultLabel.setString("对不起，答错了哦，再来一次吧");
					this.resetFlag = true;
					return;
//					cc.director.runScene(new GameInitScene());
				}
			}
			this.GameStep++;
		} 
		
	},

	onTouchBegan:function(touches, event){
		cc.log("begin:")
		var touch = touches[0];
		var location = touch.getLocation();
		
		if (this.resetFlag == true) {
			this.resetGame();
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
					if (this.numBoxArr[j].State == 1) {
						if (j != i) {
							lastPic = j;
						}
						n++;
					}
				}
				if (n == 0) {
					if (this.numBoxArr[i].State == 0) {
						this.numBoxArr[i].setState(1);// 选中数字变为选中状态
						this.firstPic = i;
					}
				} else if (lastPic == -1) {
					this.numBoxArr[i].setState(0);// 选中数字变为选中状态
				} else if (n == 1) {
					this.showCalcItem(i);
					this.secondPic = i;
					this.numBoxArr[i].setState(1);
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
	
	resetGame:function() {
		this.calNum = -1;
		this.guankaNum++;
		this.GameStep = 0;
		this.randNums();
		for (var i = 0; i < 4; i++) {
			if (this.guankaNum >= 10) {
				this.numBoxArr[i].setNum(this.numList[i]);
				this.resultLabel.setString("随机关卡，难度不定");
			} else {
				var result = "关卡:" + (this.guankaNum+1) +  "难度系数:" + this.guankaNum * 10;
				this.resultLabel.setString(result);
				this.numBoxArr[i].setNum(this.numList[4 * this.guankaNum + i]);
			}
			this.numBoxArr[i].setState(0);
			
			this.closeCalcItem();
		}
		
		this.resetFlag = false;
	},
	
	randNums:function() {
		for (var i = 0; i < 4; i++) {
			var num = Math.floor(Math.random() * 13) + 1;
			this.numList[i] = num;
		}
	}

})

var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		layer.init();
		this.addChild(layer);
	}
});

