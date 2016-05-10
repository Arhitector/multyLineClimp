var multiLineClamp = function (optionsData = {}) {
	var CutTextMethod = function (options) {
		this.options = options || {};
		this.baseContent = {};
		this.dataName = optionsData.dataName || 'data-clampin';
		this.initalize();
	};
	CutTextMethod.prototype = {
		findClampinElement: function () {
			return document.querySelectorAll('['+this.dataName+']');
		},
		supportWebkitLieClimp: function () {
			return 'webkitLineClamp' in document.body.style;
		},
		addWebkitLineClamp: function (item) {
			item.style['-webkit-line-clamp'] = item.getAttribute(this.dataName);
		},
		getLineHeight: function () {
			return this.getNmberValue(getComputedStyle(this.options).lineHeight);
		},
		getCurrentHeight: function () {
			return this.getNmberValue(getComputedStyle(this.options).height);
		},
		getNmberValue: function (string) {
			return string.match(/\d+/)[0];
		},
		elSetHeight: function () {
			return this.getLineHeight() * this.options.getAttribute(this.dataName);
		},
		elGetContent: function () {
			return this.baseContent.split(' ');
		},
		elContentSplit: function (el) {
			return this.options.innerHTML.split(' ');
		},
		elCutContentSplitNum: function () {
			return Math.round(this.elContentSplit().length/2);
		},
		elCutContentSplit: function () {
			return this.elContentSplit().slice(0, this.elCutContentSplitNum());
		},
		writeContent: function (el) {
			this.options.innerHTML = el.join(' ');
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
		addItemInArray: function () {
			var writeArray = this.elContentSplit();
			if(this.checkHeightProportions() !== -1 ) {
				writeArray.push(this.elGetContent()[this.elContentSplit().length+1]);
				this.writeContent(writeArray);
				this.addItemInArray();
			}else {
				writeArray.pop();
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
				this.addItemInArray();
			}
		},
		initalize: function () {
			var array = this.findClampinElement();
			var arrayLength = array.length;
			for (var i=0;i<arrayLength;i++) {
				if (this.supportWebkitLieClimp() === true) {
					this.addWebkitLineClamp(array[i]);
				}else {
					this.options = array[i];
					this.baseContent = this.options.innerHTML;
					if (this.checkHeightProportions() === -1) {
						this.cutArray();
					}
				}
			}
		}
	};
	var cutTextMethod = new CutTextMethod();
};