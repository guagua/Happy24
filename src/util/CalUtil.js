var CU = CU || {};
CU.tipString = "11";
CU.hardNum = 0;
CU.allNums = {};
CU.levelNum = [];

var calWith22 = function(e1, e2, e3, e4, target) {
	var i,j,k,a,b,c,d,t1,t2,t3;
	var opx=["+","-","*","/"];
	a=e1;b=e2;c=e3;d=e4;
	CU.hardNum = 0;
	calHardByNum(e1);
	calHardByNum(e2);
	calHardByNum(e3);
	calHardByNum(e4);
	for(i=0;;i++)
	{
		if(i>=4)break;
		if(i==0) {
			t1=a+b;  
		}
		if(i==1) {
			t1=a-b;   
		}
		if(i==2) {
			t1=a*b;  
		}
		if(i==3 && b != 0){
			t1=a/b;
		}
		for(j=0;;j++)
		{
			if(j>3)break;
			if(j==0){
				t2=c+d;
			}
			if(j==1){
				t2=c-d;
			}
			if(j==2){
				t2=c*d;
			}
			if(j==3 && d!= 0){
				t2=c/d;
			}
			for(k=0;;k++) {
				if(k>3)break;
				if(k==0){
					t3=t1+t2;
				}
				if(k==1){
					t3=t1-t2;
				}
				if(k==2){
					t3=t1*t2;
				}
				if(k==3 && d!=0){
					t3=t1/t2;
				}
				if(t3==target){
					var str='';
					if(k>1&&i<2){
						str="(";
					}
					str=str+a+opx[i]+b;
					if(k>1&&i<2){
						str=str+")";
					}
					str=str+opx[k];
					if(k>0&&j<2){
						str=str+"(";
					}
					str=str+c+opx[j]+d;
					if(k>0&&j<2){
						str=str+")";
					}
					calHardByOp(i);
					calHardByOp(j);
					calHardByOp(k);
					str=str+"="+target;
					CU.tipString = str;
					mergeNumByHard(e1, e2, e3, e4, CU.hardNum);
//					cc.log("cal str:%s hardNum:%d", str, CU.hardNum);
					return 1;   
				}
			}
		}
	}
};

var calWith11 = function(e1, e2, e3, e4, target) {
	var i,j,k,a,b,c,d,t1,t2,t3;
	var opx=["+","-","*","/","-","/"];
	a=e1;b=e2;c=e3;d=e4;
	CU.hardNum = 15;
	calHardByNum(e1);
	calHardByNum(e2);
	calHardByNum(e3);
	calHardByNum(e4);
	for(i=0;;)
	{
		if(i>=4)break;
		if(i==0)t1=a+b;   
		if(i==1)if(a-b>0)t1=a-b;   
		if(i==2)t1=a*b;   
		if(i==3)if(b!=0)t1=a/b;
		for(j=0;;)
		{
			if(j>5)break;
			if(j==0)t2=t1+c;
			if(j==1)t2=t1-c;
			if(j==2)t2=t1*c;
			if(j==3)if(c!=0)t2=t1/c;
			if(j==4)t2=c-t1;
			if(j==5)if(t1!=0)t2=c/t1;
			for(k=0;;k++)
			{
				if(k>5)break;
				if(k==0)t3=t2+d;
				if(k==1)t3=t2-d;
				if(k==2)t3=t2*d;
				if(k==3)if(d!=0)t3=t2/d;
				if(k==4)t3=d-t2;
				if(k==5)if(t2!=0)t2=d/t2;
				if(t3==target)
				{var str="";
				var t="";
				if((j>1||k>1)&&i<2)t="(";
				if((j<2||j==4)&&k>1&&i>1)t="(";
				str=str+a+opx[i]+b;
				if(j>1&&i<2)str=str+")";
				if(j<4)str=str+opx[j]+c;
				else if(j>3&&i<2)str=c+opx[j]+"("+str+")";
				else if(j==5&&i==3)str=c+opx[j]+"("+str+")";
				else str=c+opx[j]+str;
				if(j<2&&k>1&&i<2)str=str+")";
				str=t+str;
				if((j<2||j==4)&&k>1&&i>1)str=str+")";
				if(k<4)str=str+opx[k]+d+"="+target;
				else str=d+opx[k]+str+"="+target;
				calHardByOp(i);
				calHardByOp(j);
				calHardByOp(k);
				CU.tipString = str;
				mergeNumByHard(e1, e2, e3, e4, CU.hardNum);
//				cc.log("cal str:%s hardNum:%d", str, CU.hardNum);
				return 1;   
				}
			}
			j=j+1;
		}
		i=i+1;     
	}
};

var canCalc = function(n1, n2, n3, n4, targetN) {
	var i,j,k,str,flg;
	var calStr;
	var arr=[n1, n2, n3, n4];
	for(i=0;;)
	{
		if(i>3)break;
		for(j=0;;)
		{
			if(j>3)break;
			if(j==i){j=j+1;continue;}
			for(k=0;;)
			{
				if(k>3)break;
				if(k==i||k==j){k=k+1;continue;}
				for(l=0;;)
				{
					if(l>3)break;
					if(l==i||l==j||l==k){l=l+1;continue;}
					if(arr[i]==3&&arr[j]==3&&arr[k]==8&&arr[l]==8){
						calStr="8/(3-8/3)=24";
						CU.tipString = calStr;
						CU.hardNum = 95;
//						cc.log("cal str:%s hardNum:%d", calStr, CU.hardNum);
						return true;
					}
					flg=calWith11(arr[i],arr[j],arr[k],arr[l], GV.TARGET_NUMBER);
					if(flg==1) {
						return true
					};
					flg=calWith22(arr[i],arr[j],arr[k],arr[l], GV.TARGET_NUMBER);
					if(flg==1) {
						return true;
					}
					l=l+1;
				}
				k+=1;
			}
			j=j+1;
		}
		i=i+1;   
	}
	return false;
};

var initLevelNum = function () {
	for (var i = 0; i < GV.USED_NUMBER; i++) {
		if (i == 0) {
			for (var j = 1; j <= GV.MAX_NUMBER; j++) {
				for (var k = 1; k <= GV.MAX_NUMBER && k != j; k++) {
					for (var l = 1; l <= GV.MAX_NUMBER && (l != j && l != i); l++) {
						for (var m = 1; m <= GV.MAX_NUMBER && ((m != j && m != k) && m != l); m++) {
							canCalc(j, k, l, m, GV.TARGET_NUMBER);
						}
					}
				}
			}
		} else if (i == 1) {
			for (var j = 1; j <= GV.MAX_NUMBER; j++) {
				for (var k = 1; k <= GV.MAX_NUMBER && k != j; k++) {
					for (var l = 1; l <= GV.MAX_NUMBER && (l != j); l++) {
						canCalc(j, j, k, l, GV.TARGET_NUMBER);
					}
				}
			}
		} else if (i == 2) {
			for (var j = 1; j <= GV.MAX_NUMBER; j++) {
				for (var k = 1; k <= GV.MAX_NUMBER && k != j; k++) {
					canCalc(j, j, j, k, GV.TARGET_NUMBER);
				} 
			}
		} else if (i == 3) {
			for (var j = 1; j <= GV.MAX_NUMBER; j++) {
				canCalc(j, j, j, j, GV.TARGET_NUMBER);
			}
		}
	}
	CU.levelNum.push([0, 6, 6, 6, 6]);
	CU.levelNum.push([1, 4, 2, 2, 1]);
	CU.levelNum.push([1, 5, 2, 3, 1]);
	CU.levelNum.push([1, 4, 4, 1, 2]);
	for(var key in CU.allNums) {
		if (key >= 0) {
//			cc.log("all key:%s", key);
			for(var key2 in CU.allNums[key]) {
//				cc.log("          all key2222:%s", key2);
				var arr = [];
				arr.push(key);
				for(var key3 in CU.allNums[key][key2]) {
//					cc.log("                   all key3333333:%s", CU.allNums[key][key2][key3]);
					arr.push(CU.allNums[key][key2][key3]);
				} 
				CU.levelNum.push(arr);
			}
		}
	}
	//cc.log("total nums:%d", CU.levelNum.length);
};

var calHardByOp = function(opIndex) {
	if (opIndex == 1) {
		CU.hardNum += 5;
	} else if (opIndex == 2) {
		CU.hardNum += 10;
	} else if (opIndex == 3) {
		CU.hardNum += 15;
	} else if (opIndex == 4) {
		CU.hardNum += 5;
	} else if (opIndex == 5) {
		CU.hardNum += 15;
	}
};

var calHardByNum = function(num) {
	if (num == 1 || num == 2) {
		CU.hardNum -= 10;
	}
	if (num >= 6 && num <= 10) {
		CU.hardNum += 10;
	}
	if (num > 10) {
		CU.hardNum += 15;
	}
};

var mergeNumByHard = function (e1, e2, e3, e4, hardNum) {
	if (CU.allNums[hardNum] == null) {
		CU.allNums[hardNum] = [];
	}	
	CU.allNums[hardNum].push([e1, e2, e3, e4]);
};