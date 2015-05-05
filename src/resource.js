var res = {
		btn_bg_normal : "res/btn_bg_n.png",
		btn_bg_click : "res/btn_bg_s.png",
		select_bg : "res/selectBg.jpg",
		bg_mp3 : "res/bg.mp3",
		rank_bg_png:"res/rank_bg.png",
		//l1_bg_png:"res/hz/l1_bg.png",
		gameStartNormal_png:"res/hz/gameStartNormal.png",
		gameStartSelect_png:"res/hz/gameStartSelect.png",
		gongxi : "res/gongxi.png",
		continue_game : "res/continue_game.png",
		intro : "res/intro.png",
		backToMain : "res/back_to_map.png"
		
		
		
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

var IS_PLAY_MUSIC = 1;//1表示播放，0表示不播
var getIsPlayMusic = function() {
	IS_PLAY_MUSIC =  LocalStorage.getInstance().getItem("IS_PLAY_MUSIC");
	return IS_PLAY_MUSIC; 
}
var setIsPlayMusic = function(isPlay) {
	IS_PLAY_MUSIC = isPlay;
	LocalStorage.getInstance().setItem("IS_PLAY_MUSIC", isPlay);
}