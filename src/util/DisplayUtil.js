var createLabelImageItem = function(normalRes, clickRes, disableRes, contentSize, labelStr, labelFont, labelSize, labelColor) {
	var normalSpr = createSprite(normalRes);
	var clickSpr = createSprite(clickRes);
	var disableSpr;
	if (disableRes != null) {
		disableSpr = createSprite(disableRes);
		disableSpr.setAnchorPoint(0.5, 0.5);
		disableSpr.setContentSize(contentSize);
	}
	normalSpr.setAnchorPoint(0.5, 0.5);
	normalSpr.setContentSize(contentSize);
	clickSpr.setAnchorPoint(0.5, 0.5);
	clickSpr.setContentSize(contentSize);
	var normalLabel = createLabelTTF(labelStr, labelFont, labelSize, labelColor);
	var clickLabel = createLabelTTF(labelStr, labelFont, labelSize, labelColor);
	normalLabel.setPosition(cc.p(contentSize.width*0.5,contentSize.height*0.5));
	clickLabel.setPosition(cc.p(contentSize.width*0.5,contentSize.height*0.5));
	clickLabel.setAnchorPoint(0.5, 0.5);
	normalLabel.setAnchorPoint(0.5, 0.5);
	normalSpr.addChild(normalLabel);
	clickSpr.addChild(clickLabel);
	
	var menuItem = new cc.MenuItemSprite(normalSpr, clickSpr, disableSpr);
	return menuItem;
}

var createLabelTTF = function(str, font, size, color) {
	if (str == null) str = "";
	if (size == null) size = 10;
	if (font == null) font = "微软雅黑";
	if (color == null) color = cc.color(255, 255, 255, 1);
	var label = new cc.LabelTTF(str, font, size);
	label.setColor(color);
	return label
}

var createSprite = function(resPath) {
	var sprite = null;
	if (resPath != null) {
		sprite = new cc.Sprite(resPath);
	} else {
		cc.log("can not find res");
	}
	return sprite;
}

