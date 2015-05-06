var Sound = cc.Class.extend({
		_Silence1:0,
		_Silence2:0,
		_spin:0,
		_remove:0,
		_close:0,
		ctor:function () {
		   var Silence1=LocalStorage.getInstance().getItem("IS_PLAY_MUSIC");
			    if(Silence1==1)
				{
				this._Silence1=1;
				}	    
	
	    },
		playBg:function(){
			//cc.sys.os!=cc.sys.OS_ANDROID
			if(!this._Silence1)
				cc.audioEngine.playMusic(res.bg_mp3, true);
		},
//		playSpin:function(){
//			if(!Sound._Silence2){
//				if(Sound._spin){
//					cc.audioEngine.stopEffect(Sound._spin);
//
//				}
//				Sound._spin = cc.audioEngine.playEffect(res.spin_mp3, false);
//			}
//		},
//		playClose:function(){
//			if(!Sound._Silence2){
//				if(Sound._close){
//					cc.audioEngine.stopEffect(Sound._close);
//
//				}
//				Sound._close = cc.audioEngine.playEffect(res.close_mp3, false);
//			}
//		},
//		playRemove:function(){
//			if(!Sound._Silence2){
//				if(Sound._remove){
//					cc.audioEngine.stopEffect(Sound._remove);
//
//				}
//				Sound._remove = cc.audioEngine.playEffect(res.remove_mp3, false);
//			}
//		},
//		playLvup:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.lvup_mp3, false);
//			}
//		},
//		playBtn:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.btn_mp3, false);
//			}
//		},
//		playFail:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.fail_mp3, false);
//			}
//		},
//		playBomb:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.bomb_mp3, false);
//			}
//		},
//		playGold:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.gold_mp3, false);
//			}
//		},
//		playReborn:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.reborn_mp3, false);
//			}
//		},
//		playWrong:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.wrong_mp3, false);
//			}
//		},
//		playDangrous:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.dangrous_mp3, false);
//			}
//		},
//		stopDangrous:function(){
//			//cc.audioEngine.stopEffect(this._dangrous);
//		},
		bgOnOff:function(){
			if(this._Silence1){
				this._Silence1 = 0;
				LocalStorage.getInstance().setItem("IS_PLAY_MUSIC", 0);
				//cc.audioEngine.setMusicVolume(1);
				this.playBg();
				
			}else{
				this._Silence1 = 1;
				LocalStorage.getInstance().setItem("IS_PLAY_MUSIC", 1);
				//cc.audioEngine.setMusicVolume(0);
				cc.audioEngine.stopMusic(true);
			}
		}
//		effectOnOff:function(){
//			if(Sound._Silence2){
//				Sound._Silence2 = false;
//				cc.audioEngine.setEffectsVolume(1);
//			}
//			else{
//				Sound._Silence2 = true;
//				cc.audioEngine.setEffectsVolume(0);
//			}
//		}
});

Sound.getInstance = function () {
	if (Sound.sharedInstance == null) {
		Sound.sharedInstance = new Sound();
	}
	return Sound.sharedInstance;
};