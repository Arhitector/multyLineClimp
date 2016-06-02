'use strict';
(function () {
	var CutTextMethod = function (options) {
		this.options = options ? options : {};
		this.options.dataName = 'data-clampin';
		this.content = {};
		this.baseContent = {};
		this.initalize();
	};
	CutTextMethod.prototype = {
		findClampinElement: function () {
			return document.querySelectorAll('['+this.options.dataName+']');
		},
		supportWebkitLieClimp: function () {
			return 'webkitLineClamp' in document.body.style;
		},
		addWebkitLineClamp: function (item) {
			item.style['-webkit-line-clamp'] = item.getAttribute(this.options.dataName);
		},
		getLineHeight: function () {
			return this.getNmberValue(getComputedStyle(this.content).lineHeight);
		},
		getCurrentHeight: function () {
			return this.getNmberValue(getComputedStyle(this.content).height);
		},
		getNmberValue: function (string) {
			return string.match(/\d+/)[0];
		},
		elSetHeight: function () {
			return this.getLineHeight() * this.content.getAttribute(this.options.dataName);
		},
		elGetBaseContent: function () {
			return this.baseContent.split(' ');
		},
		elContentSplit: function (el) {
			return this.content.innerHTML.split(' ');
		},
		elCutContentSplitNum: function () {
			return Math.round(this.elContentSplit().length/2);
		},
		elCutContentSplit: function () {
			return this.elContentSplit().slice(0, this.elCutContentSplitNum());
		},
		writeContent: function (el) {
			this.content.innerHTML = el.join(' ');
		},
		checkHeightProportions: function () {
			if (this.getCurrentHeight() > this.elSetHeight()) {
				return -1;
			} else if (this.getCurrentHeight() < this.elSetHeight()) {
				return 1;
			} else if (this.getCurrentHeight() === this.elSetHeight()) {
				return 0;
			}
		},
		addItemInArray: function (writeArray) {
			var writeArray = writeArray || this.elContentSplit();
			this.writeContent(writeArray);
			writeArray.pop();
			if(this.checkHeightProportions() !== -1) {
				writeArray.push(this.elGetBaseContent()[writeArray.length]);
				writeArray.push('...');
				this.writeContent(writeArray);
				this.addItemInArray(writeArray);
			}else {
				writeArray.pop();
				writeArray.push('...');
				this.writeContent(writeArray);
			}
		},
		cutArray: function () {
			if (this.checkHeightProportions() === -1) {
				this.writeContent(this.elCutContentSplit());
				this.cutArray();
			} else {
				var writeArray = this.elContentSplit();
				writeArray.push('...');
				this.addItemInArray(writeArray);
			}
		},
		initalize: function () {
			var array = this.findClampinElement();
			var arrayLength = array.length;
			for (var i=0;i<arrayLength;i++) {
				if (this.supportWebkitLieClimp() === true) {
					this.addWebkitLineClamp(array[i]);
				}else {
					this.content = array[i];
					this.baseContent = this.content.innerHTML;
					if (this.checkHeightProportions() === -1) {
						this.cutArray();
					}
				}
			}
		}
	};
	!window.cutTextMethod && (window.CutTextMethod = CutTextMethod);
})();
