var LocalStorage = cc.Class.extend({
	ctor:function () {
	},
	getItem:function (key) {
		var val=cc.sys.localStorage.getItem("happy24_"+key);
		if(val==null||val==""||val==undefined){
			return null;
		}else{
			return val;
		}
		
	},
	setItem:function (key,val) {
		cc.sys.localStorage.setItem("happy24_"+key,val);
	}
});

LocalStorage.getInstance = function () {
	if (LocalStorage.sharedInstance == null) {
		LocalStorage.sharedInstance = new LocalStorage();
	}
	return LocalStorage.sharedInstance;
};