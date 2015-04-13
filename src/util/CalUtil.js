var tipString = "";
var calWith22 = function(e1, e2, e3, e4, target) {
	var i,j,k,a,b,c,d,t1,t2,t3;
	var opx=["+","-","*","/"];
	a=e1;b=e2;c=e3;d=e4;
	for(i=0;;)
	{
		if(i>=4)break;
		if(i==0)t1=a+b;   
		if(i==1)t1=a-b;   
		if(i==2)t1=a*b;   
		if(i==3)if(b!=0)t1=a/b;
		for(j=0;;)
		{
			if(j>3)break;
			if(j==0)t2=c+d;
			if(j==1)t2=c-d;
			if(j==2)t2=c*d;
			if(j==3)if(d!=0)t2=c/d;
			for(k=0;;k++)
			{
				if(k>3)break;
				if(k==0)t3=t1+t2;
				if(k==1)t3=t1-t2;
				if(k==2)t3=t1*t2;
				if(k==3)if(d!=0)t3=t1/t2;
				if(t3==target)
				{var str='';
				if(k>1&&i<2)str="(";
				str=str+a+opx[i]+b;
				if(k>1&&i<2)str=str+")";
				str=str+opx[k];
				if(k>0&&j<2)str=str+"(";
				str=str+c+opx[j]+d;
				if(k>0&&j<2)str=str+")";
				str=str+"="+target;
				tipString = str;
				cc.log("cal str:%s", str);
				return 1;   
				}
			}
			j=j+1;
		}
		i=i+1;     
	}
};

var calWith11 = function(e1, e2, e3, e4, target) {
	var i,j,k,a,b,c,d,t1,t2,t3;
	var opx=["+","-","*","/","-","/"];
	a=e1;b=e2;c=e3;d=e4;
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
				tipString = str;
				cc.log("cal str:%s", str);
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
						tipString = calStr;
						cc.log("cal str:%s", calStr);
						return true;
					}
					flg=calWith11(arr[i],arr[j],arr[k],arr[l], TARGET_NUMBER);
					if(flg==1) {
						return true
					};
					flg=calWith22(arr[i],arr[j],arr[k],arr[l], TARGET_NUMBER);
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

var calcTarget = function () {
	for (var i = 0; i < USED_NUMBER; i++) {
		if (i == 0) {
			for (var j = 1; j <= MAX_NUMBER; j++) {
				for (var k = 1; k <= MAX_NUMBER && k != j; k++) {
					for (var l = 1; l <= MAX_NUMBER && (l != j && l != i); l++) {
						for (var m = 1; m <= MAX_NUMBER && ((m != j && m != k) && m != l); m++) {
							canCalc(j, k, l, m, TARGET_NUMBER);
						}
					}
				}
			}
		} else if (i == 1) {
			for (var j = 1; j <= MAX_NUMBER; j++) {
				for (var k = 1; k <= MAX_NUMBER && k != j; k++) {
					for (var l = 1; l <= MAX_NUMBER && (l != j); l++) {
						canCalc(j, j, k, l, TARGET_NUMBER);
					}
				}
			}
		} else if (i == 2) {
			for (var j = 1; j <= MAX_NUMBER; j++) {
				for (var k = 1; k <= MAX_NUMBER && k != j; k++) {
					canCalc(j, j, j, k, TARGET_NUMBER);
				}
			}
		} else if (i == 3) {
			for (var j = 1; j <= MAX_NUMBER; j++) {
				canCalc(j, j, j, j, TARGET_NUMBER);
			}
		}
	}
};