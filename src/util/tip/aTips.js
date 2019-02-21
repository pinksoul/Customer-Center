/**
 * LBS aTips (表格定位版)
 * Date: 2015-10-25
 * ====================================================================
 * 1. 引入aTips.css aTips.js （建议js css 放在同一目录）
 * ====================================================================
 * 2. 调用方式1:
	Tips.alert(option) //显示(确定)按钮
	Tips.confirm(option) //显示(确定 取消)按钮  option.after(boolean) boolean布尔值 确定true 取消false
	Tips.open(option) //无显示按钮 可设置定时关闭 默认不自动关闭需手动关闭
	Tips.close() //手动调用关闭 (方式1/方式2都可以调用)
	* Tips.loadShow(text) // 显示加载提示框 text为弹出文本 默认加载中
 	* Tips.loadHide() // 隐藏加载提示框
 * ====================================================================
 * 3. 调用方式2:
 	Tips.alert(content,fn) //content内容 fn弹出框关闭后执行函数 相当于option.after
 	Tips.confirm(content,fn) //fn(boolean) boolean布尔值 确定true 取消false
 	Tips.open(content, time) //time自动关闭时间(单位秒) 默认不自动关闭需手动关闭
 * ====================================================================
 * 4. option选项：
 	content：内容(可带html标签自定义样式)
 	before: 点击确定按钮 关闭弹出框前 执行函数  (Tips.alert Tips.confirm中有效)
 			如果函数返回false 则不会执行(关闭弹出框)和(after) 一般用于做一些检测
 	after: 点击确定按钮 关闭弹出框后 执行函数 (Tips.alert Tips.confirm中有效)
 	time: 自动关闭时间(单位秒) time 秒后关闭 (Tips.open中有效)
 	define: 定义确定按钮的文本 (Tips.alert Tips.confirm中有效)
 	cancel: 定义取消按钮的文本 (Tips.confirm中有效)
 * ====================================================================
 * Tips.BG //弹出层
 * Tips.define //确定按钮
 * Tips.cancel //取消按钮
 * ====================================================================
**/
;(function() {
	window.Tips = {
		_create: function() {
			if (!this.BG) {
				var body = document.getElementsByTagName('body')[0],
					html = '<table style="font-size: 0.14rem"><tr><td><div id="aTips_box"><div id="aTips_content"></div><div id="aTips_foot"><a href="javascript:;" id="aTips_cancel">取消</a><a href="javascript:;" id="aTips_define">确定</a></div></div></td></tr></table>';
				this.BG = document.createElement('div');
				this.BG.id = 'aTips_wrap';
				this.BG.innerHTML = html;
				body.appendChild(this.BG);
				this.content = this.$('#aTips_content');
				this.foot = this.$('#aTips_foot');
				this.define = this.$('#aTips_define');
				this.cancel = this.$('#aTips_cancel');
			}
		},
		_show: function() {
			this._fix = true;
			this.BG.style.display = 'block';
			this._bind();
		},
		_hide: function() {
			this._fix = false;
			this.BG.style.display = 'none';
			this._unbind();
		},
		_define: function(option) {
			var _this = this;
			this.define.onclick = function(e) {
				e.stopPropagation();
				if (typeof option === 'function') {
					_this._hide();
					_this.Bool = true;
					option && option(_this.Bool);
					return;
				}
				var before = option.before && option.before();
				var bool = false;
				before === false && (bool = true);
				if (bool) {
					e.stopPropagation();
					return false;
				}
				_this._hide();
				_this.Bool = true;
				option.after && option.after(_this.Bool);
			};
		},
		_cancel: function(option) {
			var _this = this;
			this.cancel.onclick = function(e) {
				e.stopPropagation();
				_this._hide();
				_this.Bool = false;
				if (typeof option === 'function') {
					option && option(_this.Bool);
					return;
				}
				option.after && option.after(_this.Bool);
			};
		},
		_bind: function() {
			this.BG.focus();
			this._setEvent();
		},
		_unbind: function() {
			this.BG.blur();
			this.define.onclick = null;
			this.cancel.onclick = null;
			this._timer && clearTimeout(this._timer);
			this._timer = null;
		},
		_setEvent: function() {
			var _this = this;
			this.on(this.BG, 'touchmove', function(e) {
				e.preventDefault();
			});
			this.on(this.define, 'touchstart', function(e) {
				_this.define.className.indexOf('aTips_hover') < 0 && (_this.define.className += ' aTips_hover');
			});
			this.on(this.define, 'touchend', function(e) {
				_this.define.className = _this.define.className.replace('aTips_hover', '').trim();
			});
			this.on(this.cancel, 'touchstart', function(e) {
				_this.cancel.className.indexOf('aTips_hover') < 0 && (_this.cancel.className += ' aTips_hover');
			});
			this.on(this.cancel, 'touchend', function(e) {
				_this.cancel.className = _this.cancel.className.replace('aTips_hover', '').trim();
			});
		},
		_setBtn: function(n, option) {
			this.foot.style.display = 'block';
			this.define.style.display = '';
			this.cancel.style.display = '';
			switch (parseInt(n)) {
				case 1:
					this.define.className = 'aTips_define';
					this.cancel.style.display = 'none';
					if (typeof option === 'function') {
						this.define.innerText = '确定';
						this._define(function() {
							option && option();
						});
					} else {
						this.define.innerText = option.define || '确定';
						this._define(option);
					}
					break;
				case 2:
					this.define.className = '';
					if (typeof option === 'function') {
						this.define.innerText = '确定';
						this.cancel.innerText = '取消';
						this._define(function(b) {
							option && option(b);
						});
						this._cancel(function(b) {
							option && option(b);
						});
					} else {
						this.define.innerText = option.define || '确定';
						this.cancel.innerText = option.cancel || '取消';
						this._define(option);
						this._cancel(option);
					}
					break;
				case 0:
					this.foot.style.display = 'none';
					this.define.style.display = 'none';
					this.cancel.style.display = 'none';
					break;
			}
		},
		_setContent: function(html) {
			this.content.innerHTML = html + '';
		},
		_setOption: function(option, n, fn) {
			var _this = this,
				content = '';
			this._create();
			if (typeof option === 'string' || typeof option === 'number') {
				content = option || '';
				this._setBtn(n, function(b) {
					fn && fn(b);
				});
			} else {
				option = option || {},
					content = option.content || '';
				this._setBtn(n, option);
			}
			this._setContent(content);
			setTimeout(function() {
				_this._show();
			}, 0);
		},
		_setTime: function(option, t) {
			var time = 0,
				_this = this;
			time = (typeof option === 'string' ? t : option.time);
			if (parseInt(time) > 0) {
				this._timer = setTimeout(function() {
					_this._hide();
				}, time * 1000);
			}
		},
		// ----------------------------------------------
		_create2: function() {
			if (!this.loadBG) {
				var body = document.getElementsByTagName('body')[0];
				this.loadBG = document.createElement('div');
				this.loadBG.id = 'aTips_loadWrap';
				this.loadBG.innerHTML = '<table><tr><td><div id="aTips_loadBox"></div></td></tr></table>';
				body.appendChild(this.loadBG);
				this.loadBox = this.$('#aTips_loadBox');
				this._bind2();
			}
		},
		_bind2: function() {
			this.on(this.loadBG, 'touchmove', function(e) {
				e.preventDefault();
			});
		},
		_set2: function(text) {
			text = text || '加载中';
			this._create2();
			this.loadBox.innerText = text;
		},
		loadShow: function(text) {
			this._set2(text);
			this.loadBG.style.display = 'block';
		},
		loadHide: function() {
			this.loadBG.style.display = 'none';
		},
		// ----------------------------------------------
		on: function(el, type, handler) {
			el.addEventListener(type, handler, false);
		},
		off: function(el, type, handler) {
			el.removeEventListener(type, handler, false);
		},
		$: function(s) {
			return document.querySelector(s);
		},
		alert: function(option, fn) {
			this._setOption(option, 1, fn);
		},
		confirm: function(option, fn) {
			this._setOption(option, 2, function(b) {
				fn && fn(b);
			});
		},
		open: function(option, t) {
			this._setOption(option, 0);
			this._setTime(option, t);
		},
		close: function() {
			this._hide();
		}
	};
}());
