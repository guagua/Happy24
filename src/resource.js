var res = {
		btn_bg_normal : "res/btn_bg_n.png",
		btn_bg_click : "res/btn_bg_s.png",
		select_bg : "res/selectBg.jpg",
		bg_mp3 : "res/bg.mp3",
		rank_bg_png:"res/rank_bg.png",
		//l1_bg_png:"res/hz/l1_bg.png",
		gameStartNormal_png:"res/hz/gameStartNormal.png",
		gameStartSelect_png:"res/hz/gameStartSelect.png"
		
		
		
		
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}

var BOX_WIDTH = 170;

var TARGET_NUMBER = 24;
var MAX_NUMBER = 13;
var USED_NUMBER = 4;

var SELECT_BG_WIDTH = 640;

var SELECT_BG_HEIGHT = 960;

var STATE_INIT = 0;
var STATE_SELECT = 1;
var STATE_DONE = 2;

var CURRENT_LEVEL = 0;
var getCurrentLevel = function() {
	if (LocalStorage.getInstance().getItem("CURRENT_LEVEL")) {
		CURRENT_LEVEL = LocalStorage.getInstance().getItem("CURRENT_LEVEL");
	}
	return CURRENT_LEVEL;
}
var setCurrentLevel = function(level) {
	if (CURRENT_LEVEL < level) {
		CURRENT_LEVEL = level;
		LocalStorage.getInstance().setItem("CURRENT_LEVEL", level);
	}
}