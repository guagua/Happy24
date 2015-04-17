var ranktag=0;
var RankLayer = cc.Layer.extend({
	pomelo:null,
	rankitem:null,
	ctor:function(){
		this._super();
		//this.retain();
		this.init();
	},
	init:function () {
		//var _this=this;
		var winSize = cc.winSize;
		this.pomelo=window.pomelo;
		var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), winSize.width, winSize.height);
		this.addChild(bgLayer, 1);

		var bg = new cc.Sprite(res.rank_bg_png);
		bg.attr({
			x: winSize.width/2,
			y: winSize.height/2,
		});
		this.addChild(bg,2);

		
		var menulabel1=new cc.MenuItemFont("关闭", this.onRankBack,this);
		menulabel1.setFontSize(15);
		menulabel1.setColor(cc.color(255,255,255));
		var menu = new cc.Menu(menulabel1);
		menu.x = bg.width-10;	
		menu.y = bg.height-10;	
		bg.addChild(menu,1);
		
		
		
		
		
		
		this.rankitem= new cc.LabelTTF("", "Arial",20,cc.size(500, 1000));
		this.rankitem.attr({
			x: 20,
			y: bg.height-40,
			anchorX: 0,
			anchorY: 1,
			color: cc.color(255,255,255),
			scale: 1
		});
		bg.addChild(this.rankitem,2);
		

		
		
		this.visible=false;	
		


		return true;
	},

	showdata:function (data,item) {
    //获取数据进行显示
		
		var showdatastring="";
		for(var i=0;i<10;i++)
		{
		showdatastring+=""+i+" "+data.msg.ranktest[i].name+" "+data.msg.ranktest[i].score+" \n";		
		}
		item.setString(showdatastring);
		
		
		
	
	},
	onRankshow:function () {
		this.visible=true;	
		this.getrank(this.showdata,this.rankitem);
		//this._gameLayer.onShopBack();		
	},

	onRankBack:function () {
		this.visible=false;		
		//this._gameLayer.onShopBack();		
	},
	onExit:function(){
		this._super();
		this.release();
	},
	getrank:function(callback,showitem) {
		var route = 'connector.entryHandler.getrank';
		this.pomelo.init({
			//host: window.location.hostname,
			host: "www.zhehekeji.com",
			//host: " 192.168.43.45",
			port: 3010,
			log: true
		}, function () {
			this.pomelo.request(route,ranktag, function (data) {
				this.pomelo.disconnect();
				
				if(ranktag==data.msg.ranktag)
					return;
					
				ranktag=data.msg.ranktag;
				
				cc.log(ranktag);
				
				callback(data,showitem);
				
				
//				var showdatastring=data.msg.ranktest[0].name;
//				this.rankitem.setString(showdatastring);
				
				
				//this.showdata(data);
			});
		});
	}
	
	
	
	
});
