
var GV = GV || {};


GV.BOX_WIDTH = 170;

GV.TARGET_NUMBER = 24;

GV.MAX_NUMBER = 13;

GV.USED_NUMBER = 4;

GV.SELECT_BG_WIDTH = 640;

GV.SELECT_BG_HEIGHT = 960;

GV.STATE_INIT = 0;

GV.STATE_SELECT = 1;

GV.STATE_DONE = 2;

GV.CURRENT_LEVEL = 0;

//初始化的时候取一次就可以了，下个版本可以放到初始化中去
GV.getCurrentLevel = function() {
	if (LocalStorage.getInstance().getItem("CURRENT_LEVEL")) {
		GV.CURRENT_LEVEL = LocalStorage.getInstance().getItem("CURRENT_LEVEL");
	}
	return GV.CURRENT_LEVEL;
}

GV.setCurrentLevel = function(level) {
	if (GV.CURRENT_LEVEL < level) {
		GV.CURRENT_LEVEL = level;
		LocalStorage.getInstance().setItem("CURRENT_LEVEL", level);
	}
}

//GV.IS_PLAY_MUSIC = 1;//1表示播放，0表示不播
//
//GV.getIsPlayMusic = function() {
//	GV.IS_PLAY_MUSIC =  LocalStorage.getInstance().getItem("IS_PLAY_MUSIC");
//	
//	return GV.IS_PLAY_MUSIC; 
//}
//
//GV.setIsPlayMusic = function(isPlay) {
//	GV.IS_PLAY_MUSIC = isPlay;
//	LocalStorage.getInstance().setItem("IS_PLAY_MUSIC", isPlay);
//}


