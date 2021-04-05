$(document).ready(function() {
	var li = $(".layout-nav-body li");
	li.click(function() {
		$(this).siblings().attr("class", "layout-nav-body-li");
		$(this).attr("class", "layout-nav-body-li-this");
		var i = $(".layout-nav li").index(this),
			state = eval($(this).attr("layout-state")),
			item = $(".layout-nav-details-item"),
			content = $(".layout-content-body"),
			right = $(".layout-right-item"),
			details = $(".layout-nav-details");
		if (state[0] == 1) {
			details.show(0);
			item.hide(0);
			item.eq(i).show(0);
		} else {
			details.hide(0);
			item.hide(0);
		}
		if (state[1] == 1) {
			content.hide(0);
			content.eq(i).show(0);
		}
		if (state[2] == 1) {
			right.hide(0);
			right.eq(i).show(0);
		} else {
			right.hide(0);
		}
	});
});

function layout() {}
layout.lclose = function(obj) {
	var el = obj.el;
	if (obj.ico) {
		var l = obj.ico[0],
			r = obj.ico[1]
	} else {
		var l = "<i class='layui-icon layui-icon-prev'></i>",
			r = "<i class='layui-icon layui-icon-next'></i>"
	}
	if (obj.bg) {
		var bg = obj.bg
	} else {
		var bg = "-webkit-linear-gradient(40deg, #005cf978, #005cf9)"
	}
	var close = $("<div class='layout-nav-close' style='background:" + bg + "'>" + l + "</div>"),
		show = $("<div class='layout-nav-show' style='background:" + bg + "'>" + r + "</div>");
	$(el).prepend(close).prepend(show);
	close.click(function() {
		var w = $(this).parent().width();
		$(this).parent().animate({
			left: "-" + w
		}, 300, function() {
			show.show(0)
		})
	});
	show.click(function() {
		$(this).fadeOut(0);
		$(this).parent().animate({
			left: 0
		}, 300)
	})
};
layout.rclose = function(obj) {
	var el = obj.el;
	if (obj.ico) {
		var l = obj.ico[0],
			r = obj.ico[1]
	} else {
		var l = "<i class='layui-icon layui-icon-next'></i>",
			r = "<i class='layui-icon layui-icon-prev'></i>"
	}
	if (obj.bg) {
		var bg = obj.bg
	} else {
		var bg = "-webkit-linear-gradient(-40deg, #005cf9, #005cf978)"
	}
	var close = $("<div class='layout-right-close' style='background:" + bg + "'>" + l + "</div>"),
		show = $("<div class='layout-right-show' style='background:" + bg + "'>" + r + "</div>");
	$(el).prepend(close).prepend(show);
	close.click(function() {
		var w = $(this).parent().width();
		$(this).parent().animate({
			right: "-" + w
		}, 300, function() {
			show.show(0)
		})
	});
	show.click(function() {
		$(this).fadeOut(0);
		$(this).parent().animate({
			right: 0
		}, 300)
	})
};
layout.move = function(elem, f) {
	$(elem).mousedown(function(e) {
		e.preventDefault();
		var x1 = e.pageX,
			y1 = e.pageY,
			th = $(this),
			L = th.position().left,
			T = th.position().top;
		$(document).bind("mousemove", function(ev) {
			var x2 = Number(ev.pageX),
				y2 = Number(ev.pageY),
				x = Number(x2 - x1),
				y = Number(y2 - y1),
				l = L + x,
				t = T + y;
			th.css({
				left: l,
				top: t
			});
			if (f) {
				f({
					left: x,
					top: y
				})
			}
		});
		$(document).mouseup(function() {
			$(this).unbind("mousemove")
		});
	})
};
layout.movep = function(d, f) {
	$(d).mousedown(function(e) {
		e.preventDefault();
		var x1 = e.pageX,
			y1 = e.pageY,
			th = $(this),
			L = th.parent().position().left,
			T = th.parent().position().top;
		$(document).bind("mousemove", function(ev) {
			var x2 = Number(ev.pageX),
				y2 = Number(ev.pageY),
				x = Number(x2 - x1),
				y = Number(y2 - y1),
				l = L + x,
				t = T + y;
			th.parent().css({
				left: l,
				top: t
			});
			if (f) {
				f({
					left: x,
					top: y
				})
			}
		})
	});
	$(document).mouseup(function() {
		$(this).unbind("mousemove")
	})
};
layout.loading = function(obj) {
	var icon = obj.icon;
	if (icon) {
		icon = obj.icon
	} else {
		var icon = 1
	}
	var brgba = obj.brgba;
	if (brgba) {
		brgba = obj.brgba
	} else {
		var brgba = 0
	}
	var c = "<div class='layout-loading' style='background-color:rgba(0,0,0," + brgba +
		")'><div class='layout-loading-body'><img src='../layout/image/loading/" + icon + ".gif' /></div></div>";
	$("body").append(c)
};
layout.remloading = function(obj) {
	$(".layout-loading").remove()
};
layout.canvas = function(obj) {
	if (obj.el) {
		var el = obj.el
	} else {
		var el = "div"
	}
	if (obj.name) {
		var name = obj.name
	} else {
		var name = "图片"
	}
	if (obj.time) {
		var time = obj.time
	} else {
		var time = 500
	}
	if (obj.k) {
		var k = obj.k
	} else {
		var k = 0.99
	}
	if (obj.image) {
		var image = obj.image
	} else {
		var image = "jpeg"
	}
	var len = $(el).find("img").length;
	if (len > 0) {
		if (obj.begin) {
			obj.begin()
		}
		var canvas = $("<canvas style='display: none;'></canvas>"),
			Img = $("<img />"),
			degree = $("<div class='layout-header-degree'></div>");
		$("body").append(canvas).append(Img);
		$(".layout-header").prepend(degree);
		degree.fadeIn();
		for (var i = 0; i < len; i++) {
			(function(i) {
				setTimeout(function() {
					var src = $(el).find("img:eq(" + i + ")").attr("src");
					Img.attr("src", src);
					Img[0].onload = function() {
						var W = $(this).width(),
							H = $(this).height();
						canvas.attr("width", W).attr("height", H);
						var c = canvas[0],
							ctx = c.getContext("2d"),
							img = new Image();
						img.setAttribute("crossOrigin", "anonymous");
						img.src = src;
						img.onload = function() {
							ctx.drawImage(img, 0, 0, W, H);
							var data = canvas[0].toDataURL("image/" + image, k),
								a = $("<a href='" + data + "' download='" + name + (i + 1) + "'><span id='dow-span" + i +
									"'>下载</span></a>");
							$("body").append(a);
							$("#dow-span" + i).click();
							a.remove();
							var r = (Number(i) + 1) / len * 100;
							degree.width(r + "%");
							if (i == len - 1) {
								canvas.remove();
								Img.remove();
								if (obj.end) {
									obj.end()
								}
								degree.fadeOut(2000, function() {
									degree.remove()
								})
							}
						}
					}
				}, (i + 1) * time)
			})(i)
		}
	} else {
		layer.msg("暂时没有可下载的图片", function() {})
	}
};
layout.title = function(id) {
	$(id).mousemove(function() {
		var value = $(this).text();
		$(this).attr("title", value)
	})
};
layout.copy = function(v, f) {
	var t = $("<textarea></textarea>");
	$("body").append(t);
	t.val(v);
	t.select();
	document.execCommand("Copy");
	t.remove();
	if (f) {
		f()
	}
};

function log(v, type) {
	switch (type) {
		case 0:
			console.log(v);
			break;
		case 1:
			console.error(v);
			break;
		case 2:
			console.warn(v);
			break
		default:
			console.log(v);
	}
}
layout.data = function(n, v) {
	localStorage.setItem(n, v)
};
layout.gdata = function(n) {
	return localStorage.getItem(n)
};
layout.rdata = function(n) {
	localStorage.removeItem(n)
};
layout.ralldata = function(n) {
	localStorage.clear()
};
layout.resize = function(obj, type, btn) {
	var len = $(obj).length,
		p,
		arr = Array(),
		show;
	arr[0] = "<div class='layout-pm'></div>";
	arr[1] = "<div class='layout-p1'></div>";
	arr[2] = "<div class='layout-p2'></div>";
	arr[3] = "<div class='layout-p3'></div>";
	arr[4] = "<div class='layout-p4'></div>";
	arr[5] = "<div class='layout-p5'></div>";
	arr[6] = "<div class='layout-p6'></div>";
	arr[7] = "<div class='layout-p7'></div>";
	arr[8] = "<div class='layout-p8'></div>";
	arr[9] = "<div class='layout-p9'></div>";
	for (var i = 0; i < len; i++) {
		elem = $(obj).eq(i);
		p = $("<div class='layout-p'></div>");
		elem.after(p);
		switch (type) {
			case 0:
				show = [0, 6, 7];
				break;
			case 1:
				show = [0, 1, 2, 3, 4];
				break;
			case 2:
				show = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				break;
			case 3:
				show = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				break;
			default:
				if (btn) {
					show = btn;
				}

		};
		for (var key in show) {
			p.append(arr[Number(show[key])]);
		}
		p.css({
			height: elem.height(),
			width: elem.width(),
			left: elem.position().left,
			top: elem.position().top,
			margin: elem.css("margin"),
			right: elem.css("right"),
			bottom: elem.css("bottom"),
			transform: elem.find(">*").css("transform")
		});
		var x1, x2, _this, L, T, x2, y2, x, y, m, r, b, css, int, move, end, mrb, height, width, left, top;
		int = function(e, t) {
			e.preventDefault();
			_this = $(t);
			x1 = e.pageX || e.touches[0].clientX;
			y1 = e.pageY || e.touches[0].clientY;
			L = parseInt(_this.parent().css("left"));
			T = parseInt(_this.parent().css("top"));
			H = _this.parent().prev().height();
			W = _this.parent().prev().width();
		};
		move = function() {
			m = _this.parent().prev().css("margin");
			r = _this.parent().prev().css("right");
			b = _this.parent().prev().css("bottom");
			css = {
				left: L + x,
				top: T + y,
				margin: m,
				right: r,
				bottom: b
			};
			_this.parent().prev().css(css);
			_this.parent().css(css);
		};
		end = function() {
			$(document).bind("mouseup touchend", function() {
				$(this).unbind("mousemove");
				$(this).unbind("touchmove");
			});
		};
		mrb = function() {
			m = _this.parent().prev().css("margin");
			r = _this.parent().prev().css("right");
			b = _this.parent().prev().css("bottom");
			h = _this.parent().prev().height();
		}
		p.find(".layout-pm").bind("mousedown touchstart", function(e) {
			int(e, this);
			$(document).bind("mousemove touchmove", function(e) {
				x2 = e.pageX || e.touches[0].clientX;
				y2 = e.pageY || e.touches[0].clientY;
				x = Number(x2 - x1);
				y = Number(y2 - y1);
				move();
			});
			end();
		});
		p1();
		p2();
		p3();
		p4();
		p5();
		p6();
		p7();
		p8();
		p9();

		function p1() {
			p.find(".layout-p1").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x1 - x2);
					y = Number(y1 - y2);
					height = H + y;
					width = W + x;
					if (W + x <= 0) {
						width = Math.abs(x) - W;
						x = -W;
					}
					if (H + y <= 0) {
						height = Math.abs(y) - H;
						y = -H;
					}
					mrb();
					css = {
						width: width,
						height: height,
						left: L - x,
						top: T - y,
						margin: m,
						right: r,
						bottom: b
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p2() {
			p.find(".layout-p2").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x2 - x1);
					y = Number(y1 - y2);
					height = H + y;
					width = W + x;
					left = L;
					if (W + x <= 0) {
						width = Math.abs(x) - W;
						left = L - width;
					}
					if (H + y <= 0) {
						height = Math.abs(y) - H;
						y = -H;
					}
					mrb();
					css = {
						width: width,
						height: height,
						left: left,
						top: T - y,
						margin: m,
						right: r,
						bottom: b
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p3() {
			p.find(".layout-p3").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x1 - x2);
					y = Number(y2 - y1);
					width = W + x;
					height = H + y;
					top = T;
					if (W + x <= 0) {
						width = Math.abs(x) - W;
						x = -W;
					}
					if (H + y <= 0) {
						height = Math.abs(y) - H;
						y = -H;
						top = T - height;

					}
					mrb();
					css = {
						width: width,
						height: height,
						left: L - x,
						top: top,
						margin: m,
						right: r,
						bottom: b
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p4() {
			p.find(".layout-p4").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x2 - x1);
					y = Number(y2 - y1);
					width = W + x;
					height = H + y;
					left = L;
					top = T;
					if (width < 0) {
						width = -width;
						left = L - width;
					}
					if (height < 0) {
						height = Math.abs(y) - H;
						top = T - height;
					}
					mrb();
					css = {
						width: width,
						height: height,
						margin: m,
						right: r,
						bottom: b,
						left: left,
						top: top
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p5() {
			p.find(".layout-p5").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					y2 = e.pageY || e.touches[0].clientY;
					y = Number(y1 - y2);
					height = H + y;
					if (height < 0) {
						height = Math.abs(y) - H;
						y = -H;
					}
					mrb();
					css = {
						height: height,
						top: T - y,
						margin: m,
						right: r,
						bottom: b
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p6() {
			p.find(".layout-p6").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x2 - x1);
					y = Number(y2 - y1);
					width = W + x;
					left = L;
					if (width < 0) {
						width = Math.abs(x) - W;
						left = L - width;
					}
					mrb();
					css = {
						width: width,
						margin: m,
						left: left
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			});
		}

		function p7() {
			p.find(".layout-p7").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x2 - x1);
					y = Number(y2 - y1);
					height = H + y;
					top = T;
					if (height < 0) {
						height = Math.abs(y) - H;
						top = T - height;
					}
					mrb();
					css = {
						height: height,
						margin: m,
						top: top
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			})
		}

		function p8() {
			p.find(".layout-p8").bind("mousedown touchstart", function(e) {
				int(e, this);
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					x = Number(x1 - x2);
					width = W + x;
					if (width < 0) {
						width = Math.abs(x) - W;
						x = -W;
					}
					mrb();
					css = {
						width: width,
						left: L - x,
						margin: m,
						right: r,
						bottom: b
					};
					_this.parent().prev().css(css);
					_this.parent().css(css);
				});
				end();
			})
		}

		function p9() {
			p.find(".layout-p9").bind("mousedown touchstart", function(e) {
				int(e, this);
				var angle;
				var r = _this.parent().prev().find(">*").css("transform"),
					values = r.split('(')[1].split(')')[0].split(','),
					a = values[0],
					b = values[1],
					c = values[2],
					d = values[3],
					scale = Math.sqrt(a * a + b * b),
					sin = b / scale;
				angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
				w = _this.parent().width();
				var xl = x1 - w;
				$(document).bind("mousemove touchmove", function(e) {
					x2 = e.pageX || e.touches[0].clientX;
					y2 = e.pageY || e.touches[0].clientY;
					x = Number(x2 - x1);
					y = Number(y2 - y1);
					/* _this.parent().hide(0); */
					if (x2 > xl + (w / 2 + 15)) {
						_this.parent().prev().find(">*").css("transform", "rotate(" + (y + angle) + "deg)");
						_this.parent().css("transform", "rotate(" + (y + angle) + "deg)");
					} else {
						_this.parent().prev().find(">*").css("transform", "rotate(" + (angle - y) + "deg)");
						_this.parent().css("transform", "rotate(" + (angle - y) + "deg)");
					}
				});
				$(document).mouseup(function() {
					$(this).unbind("mousemove");
					/* _this.parent().show(0); */
				});
			});
		}
	}
};
layout.scroll = function(obj) {
	var elem = obj.elem,
		up = obj.up,
		down = obj.down;
	$(elem).on("mousewheel DOMMouseScroll", function(e) {
		e.preventDefault();
		var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail,
			delta = Math.max(-1, Math.min(1, wheel));
		if (delta < 0) {
			if (down != undefined) {
				down();
			}

		} else {
			if (up != undefined) {
				up();
			}

		}
	})
};
layout.file = function(obj) {
	document.ondragover = function(e) {
		e.preventDefault()
	};
	document.ondrop = function(e) {
		e.preventDefault()
	};
	document.ondragover = function(e) {
		e.preventDefault()
	};
	var len = $(obj.elem).length;
	for (var x = 0; x < len; x++) {
		$(obj.elem)[x].ondrop = function(e) {
			var list = e.dataTransfer.files;
			for (var i = 0; i < list.length; i++) {
				var f = list[i],
					name = f.name;
				var reader = new FileReader();
				if (obj.type == "text") {
					if (obj.code != undefined) {
						reader.readAsText(f, [obj.code]);
					} else {
						reader.readAsText(f);
					}

				} else {
					reader.readAsDataURL(f);
				}
				reader.onload = function() {
					obj.success(this.result, e);
				}
			}

		}
	}
};
layout.rect = function(elem, fun) {
	var _this;
	$(elem).mousedown(function(e) {
		e.preventDefault();
		_this = $(this);
		_this.attr("data-this", "this");
		var ox = e.pageX - _this.offset().left,
			oy = e.pageY - _this.offset().top,
			x1 = e.pageX,
			y1 = e.pageY,
			div = $(
				"<div class='layout-rect' style='background-color: rgba(255, 255, 25, 0.3);position: absolute;border: 1px solid #1e9fff;'></div>"
			);
		var is = $(e.target).attr("data-this");
		if (is != undefined) {
			_this.append(div);
			$(document).bind("mousemove", function(e) {
				var x2 = Number(e.pageX),
					y2 = Number(e.pageY),
					x = Number(x2 - x1),
					y = Number(y2 - y1),
					l = ox + x,
					t = oy + y;
				div.css({
					top: oy,
					left: ox,
					height: y,
					width: x
				});
			});
			$(document).mouseup(function() {
				$(this).unbind("mousemove")
			});
		}
	});
	$(document).on("click", ".layout-rect", function(e) {
		layout.resize(this, 2);
		var w = $(this).width();
		var h = $(this).height();
		var x = parseInt($(this).css("left"));
		var y = parseInt($(this).css("top"));
		var tx = x + (w / 2);
		var ty = y + (h / 2);
		var _this = $(this);
		var canvas = "ctx.fillStyle = ' rgba(255, 255, 25, 0.3)';\nctx.fillRect(" + x + ", " + y + ", " + w + ", " +
			h +
			");\nctx.font = '30px SimHei';\nctx.fillStyle = '#000';\nctx.textAlign = 'center';\nctx.fillText('文字', " + tx +
			", " + ty + ");\nctx.textBaseline = 'middle';";
		if (fun) {
			fun({
				w: w,
				h: h,
				x: x,
				y: y,
				canvas: canvas,
				div: $(this).prop("outerHTML"),
				_this: _this
			})
		}
	});
	$(document).on("dblclick", ".layout-pm", function() {
		$(this).parent().remove();
	});
};
layout.paste = function(elem, fun) {
	var len = $(elem).length;
	for (var i = 0; i < len; i++) {
		var body = $(elem)[i];
		body.addEventListener("paste", function(e) {
			var items = (event.clipboardData || window.clipboardData).items;
			var file = null;
			if (items && items.length) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].type.indexOf('image') !== -1) {
						file = items[i].getAsFile();
						break;
					}
				}
			}
			if (!file) {
				var clipboardData = (event.clipboardData || window.clipboardData);
				var text = clipboardData.getData('text');
				fun({
					type: "text",
					data: text
				});
				return;
			} else {
				var reader = new FileReader();
				reader.onload = function(event) {
					fun({
						type: "img",
						data: event.target.result
					});
				}
				reader.readAsDataURL(file);
			}
		});
	}
};
layout.mscroll = function(id, fun) {
	$(id).mousedown(function(e) {
		e.preventDefault();
		var x1 = e.pageX,
			y1 = e.pageY,
			th = $(this),
			L = th.scrollLeft(),
			T = th.scrollTop();
		$("body").bind("mousemove", function(ev) {
			var x2 = Number(ev.pageX),
				y2 = Number(ev.pageY);
			if (y2 > y1) {
				var y = Number(y2 - y1),
					t = T + y;
				th.scrollTop(T - y)
			} else {
				var y = Number(y1 - y2),
					t = T + y;
				th.scrollTop(T + y)
			}
			if (x2 > x1) {
				var x = Number(x2 - x1),
					l = L + x;
				th.scrollLeft(L - x)
			} else {
				var x = Number(x1 - x2),
					l = L + x;
				th.scrollLeft(L + x)
			}
			if (fun) {
				fun({
					t: th.scrollTop(),
					l: th.scrollLeft()
				})
			}
		});
		$("body").mouseup(function() {
			$(this).unbind("mousemove")
		})
	})
};
layout.audio = function(elem, type) {
	var len = $(elem).length;
	for (var i = 0; i < len; i++) {
		switch (type) {
			case 0:
				$(elem)[i].play();
				break;
			case 1:
				$(elem)[i].pause()
				break;
			case 2:
				$(elem)[i].load()
				break;
			default:
				$(elem)[i].play();
		}
	}
};
layout.whmove = function(elem, type) {
	var div, d;
	switch (type) {
		case 1:
			div = $(
				"<div class='layout-whmove' style='position: absolute;height: 100%;width: 2px;right: 0;top: 0;cursor: ew-resize;'></div>"
			);
			div.mousedown(function(e) {
				e.preventDefault();
				var x1 = e.pageX,
					th = $(this),
					W = th.parent().width();
				$("body").bind("mousemove", function(ev) {
					var x2 = Number(ev.pageX),
						x = Number(x2 - x1),
						l = W + x;
					th.parent().width(l)
				});
				$("body").mouseup(function() {
					$(this).unbind("mousemove")
				})
			});
			break;
		case 2:
			div = $(
				"<div class='layout-whmove' style='position: absolute;height: 100%;width: 2px;left: 0;top: 0;cursor: ew-resize;'></div>"
			);
			div.mousedown(function(e) {
				e.preventDefault();
				var x1 = e.pageX,
					th = $(this),
					W = th.parent().width();
				$("body").bind("mousemove", function(ev) {
					var x2 = Number(ev.pageX),
						x = Number(x1 - x2),
						l = W + x;
					th.parent().width(l)
				});
				$("body").mouseup(function() {
					$(this).unbind("mousemove")
				})
			});
			break;
		case 3:
			div = $(
				"<div class='layout-whmove' style='position: absolute;width: 100%;height: 2px;bottom: 0;left: 0;cursor: ns-resize;'></div>"
			);
			div.mousedown(function(e) {
				e.preventDefault();
				var y1 = e.pageY,
					th = $(this),
					H = th.parent().height();
				$("body").bind("mousemove", function(ev) {
					var y2 = Number(ev.pageY),
						y = Number(y2 - y1),
						Y = H + y;
					th.parent().height(Y)
				});
				$("body").mouseup(function() {
					$(this).unbind("mousemove")
				})
			})
			break;
		case 4:
			div = $(
				"<div class='layout-whmove' style='position: absolute;width: 100%;height: 2px;top: 0;left: 0;cursor: ns-resize;'></div>"
			);
			div.mousedown(function(e) {
				e.preventDefault();
				var y1 = e.pageY,
					th = $(this),
					H = th.parent().height();
				$("body").bind("mousemove", function(ev) {
					var y2 = Number(ev.pageY),
						y = Number(y1 - y2),
						Y = H + y;
					th.parent().height(Y)
				});
				$("body").mouseup(function() {
					$(this).unbind("mousemove")
				})
			})
			break;
	};
	$(elem).append(div);
	var po = $(elem).css("position");
	if (po == "static") {
		$(elem).css("position", "relative")
	}
};
layout.fulls = function(e, a) {
	var e = e[0];
	if (a == 1) {
		if (e.requestFullScreen) {
			e.requestFullScreen()
		} else {
			if (e.mozRequestFullScreen) {
				e.mozRequestFullScreen()
			} else {
				if (e.webkitRequestFullScreen) {
					e.webkitRequestFullScreen()
				}
			}
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else {
			if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen()
			} else {
				if (document.msExitFullscreen) {
					document.msExiFullscreen()
				} else {
					if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen()
					} else {
						if (document.webkitExitFullscreen) {
							document.webkitExitFullscreen()
						}
					}
				}
			}
		}
	}
};
layout.strain = function(obj) {
	var str = obj.text,
		elem = obj.elem;
	if (obj.time) {
		var t = obj.time
	} else {
		var t = 300
	}
	var len = str.length;
	for (var i = 0; i < len; i++) {
		(function(i) {
			setTimeout(function() {
				var c = $(elem).text();
				$(elem).text(c + str[i]);
				if (i == len - 1) {
					if (obj.end) {
						obj.end()
					}
				}
			}, (i + 1) * t)
		})(i)
	}
};
layout.select = function(el, fun) {
	$(el).click(function() {
		if (window.getSelection) {
			fun(window.getSelection().toString())
		} else {
			fun(document.selection.createRange().text)
		}
	})
};
layout.rate = function(i, fun) {
	var c = $(
		"<div style='height: 2px;position: absolute;top: 0;left: 0;background-color: #4d7fff;pointer-events: none;z-index: 999999;' class='layout-rate'></div>"
	);
	$(".layout-rate").remove();
	c.width(i + "%");
	$("body").append(c);
	if (i == 100) {
		c.fadeOut(2000, function() {
			c.remove()
		});
		if (fun) {
			fun()
		}
	}
};
layout.menu = function(obj) {
	if (obj.type == 1) {
		$(obj.elem).bind("contextmenu", function() {
			var t = $(this);
			if (obj.f) {
				obj.f(t)
			}
			return false;
		})
	} else {
		$(obj.elem).bind("contextmenu", function() {
			var t = $(this);
			if (obj.success) {
				obj.success(t);
			}
		})
	}
};
layout.audiop = function(el, fun) {
	var elem = $(el)[0];
	elem.ontimeupdate = function() {
		var t = elem.currentTime;
		fun(t)
	}
};
layout.drop = function(obj) {
	var elem = obj.elem,
		box = obj.box,
		data = null;
	$(elem).attr("draggable", "true");
	var len = $(elem).length;
	for (var i = 0; i < len; i++) {
		$(elem)[i].ondragstart = function(e) {
			data = this;
			if (obj.begin) {
				obj.begin(data);
			}
		};
	}
	var count = $(box).length;
	for (var i = 0; i < count; i++) {
		$(box)[i].ondragover = function(e) {
			e.preventDefault();
			if (obj.to) {
				obj.to(data, this);
			}
		};
		$(box)[i].ondrop = function(e) {
			e.preventDefault();
			switch (obj.type) {
				case 0:
					$(this).html($(data));
					break;
				case 1:
					$(data).remove();
					$(this).html($(data).prop("outerHTML"));
					break;
				case 2:
					$(this).append($(data).prop("outerHTML"));
					break;
				case 3:
					$(data).appendTo(this);
					break;
				case 4:
					$(this).prepend($(data).prop("outerHTML"));
					break;
				case 5:
					$(data).prependTo(this);
					break;
			}
			if (obj.end) {
				obj.end(data, this)
			}
		}
	}
};
layout.canvash = function(obj) {
	var cw = obj.canvas.w,
		ch = obj.canvas.h,
		k = obj.canvas.k,
		bsrc = obj.img.src,
		bx = obj.img.x,
		by = obj.img.y,
		bw = obj.img.w,
		bh = obj.img.h,
		cos = obj.img.cos,
		lcos = obj.logo.cos,
		lsrc = obj.logo.src,
		lx = obj.logo.x,
		ly = obj.logo.y,
		lw = obj.logo.w,
		lh = obj.logo.h,
		canvas = $("<canvas width='" + cw + "' height='" + ch + "' style='display: none;'></canvas>");
	$("body").append(canvas);
	var c = canvas[0],
		ctx = c.getContext("2d"),
		img = new Image();
	if (cos != 0) {
		img.setAttribute("crossOrigin", "anonymous")
	}
	img.src = bsrc;
	img.onload = function() {
		ctx.drawImage(img, bx, by, bw, bh);
		var logo = new Image();
		if (lcos != 0) {
			logo.setAttribute("crossOrigin", "anonymous")
		}
		logo.src = lsrc;
		logo.onload = function() {
			ctx.drawImage(logo, lx, ly, lw, lh);
			var data = canvas[0].toDataURL("image/jpeg", k);
			if (obj.success) {
				obj.success(data)
			}
			canvas.remove()
		}
	}
};
layout.canvask = function(obj) {
	var canvas = $("<canvas width='" + obj.w + "' height='" + obj.h + "' style='display: none;'></canvas>");
	$("body").append(canvas);
	var c = canvas[0],
		ctx = c.getContext("2d");
	if (obj.content) {
		obj.content({
			c: c,
			ctx: ctx
		})
	}
};
layout.sfile = function(obj) {
	var bt = obj.bt;
	if (obj.multiple != undefined && multiple == true) {
		var multiple = "multiple='multiple'";
	} else {
		var multiple = "";
	}
	var file = $("<input type='file' style='display: none;' " + multiple + "/>");
	$(bt).after(file);
	$(bt).click(function() {
		var this_ = $(this);
		file.unbind().click();
		file.change(function() {
			var _this = $(this),
				data = _this[0].files,
				len = data.length;
			for (var i = 0; i < len; i++) {
				var reader = new FileReader();
				if (obj.type == "img") {
					reader.readAsDataURL(data[i]);
				} else {
					if (obj.code != undefined) {
						reader.readAsText(data[i], [obj.code]);
					} else {
						reader.readAsText(data[i]);
					}
				}
				reader.onload = function(e) {
					if (obj.success) {
						obj.success(this.result, this_);
					}
				}
				if (i == len - 1) {
					_this.val("");
				}
			}
		})
	})
};
layout.time = function(y, f) {
	if (y == 1) {
		var d = new Date();
		f({
			y: d.getFullYear(),
			m: d.getMonth() + 1,
			d: d.getDate(),
			w: d.getDay(),
			t: d.getHours(),
			b: d.getMinutes(),
			s: d.getSeconds(),
			ms: d.getMilliseconds()
		})
	} else {
		if (y == 2) {
			var d = new Date();
			f(d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() +
				"分" +
				d.getSeconds() + "秒")
		} else {
			if (y == 3) {
				setInterval(function() {
					var d = new Date();
					f({
						y: d.getFullYear(),
						m: d.getMonth() + 1,
						d: d.getDate(),
						w: d.getDay(),
						t: d.getHours(),
						b: d.getMinutes(),
						s: d.getSeconds(),
						ms: d.getMilliseconds()
					})
				}, 1000)
			} else {
				if (y == 4) {
					setInterval(function() {
						var d = new Date();
						f(d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() +
							"分" + d.getSeconds() + "秒")
					}, 1000)
				}
			}
		}
	}
};
layout.dfile = function(o) {
	var a = $('<a><i></i></a>');
	$("body").append(a);
	var blob = new Blob([o.content]);
	a.attr("href", URL.createObjectURL(blob));
	a.attr("download", o.name);
	a.find("i").trigger("click");
	a.remove();
};
layout.press = function(b, t, f) {
	$(b).mousedown(function(e) {
		var id = setTimeout(function() {
			f();
			clearInterval(id)
		}, t);
		$(document).bind("mousemove", function(ev) {
			clearInterval(id)
		});
		$(document).mouseup(function() {
			clearInterval(id)
		})
	})
};
layout.clip = function(o) {
	var bt = o.bt;
	layout.sfile({
		bt: bt,
		type: "img",
		success: function(data) {
			$(".layout-clip").remove();
			var div =
				"<div class='layout-clip'><div><img class='layout-clip-img' /></div><div class='layout-clip-layer'></div><div class='layout-clip-tool'><div class='layui-layer-title'>设置<span class='layui-layer-setwin'><a class='layui-layer-ico layui-layer-close layui-layer-close1' href='javascript:;'></a></span></div><div class='layui-layer-content'><div class='layui-form-item'><div class='layui-card'><div class='layui-card-body'>尺寸<input type='range' min='0' max='10000' class='layout-clip-range'></div></div><div class='layui-btn-container'><button type='button' class='layui-btn layout-clip-bt1 layui-btn-sm'>确定</button><button type='button' class='layui-btn layout-clip-bt2 layui-btn-sm'>更换</button><button type='button' class='layui-btn layout-clip-bt3 layui-btn-sm'>退出</button></div></div></div></div></div>";
			$("body").append(div);
			var canvas = $("<canvas style='display:none;'></canvas>");
			$("body").append(canvas);
			$(".layout-clip-layer").height(o.vheight).width(o.vwidth);
			canvas.attr("height", o.height).attr("width", o.width);
			$(".layout-clip-img").attr("src", data);
			$(".layout-clip-range").attr("max", o.max).attr("min", o.min);
			layout.move(".layout-clip-img");
			layout.movep(".layout-clip-tool .layui-layer-title");
			$(".layui-btn-container button").unbind();
			layout.sfile({
				bt: ".layout-clip-bt2",
				type: "img",
				success: function(data) {
					$(".layout-clip-img").attr("src", data)
				}
			});
			$(".layout-clip-range").bind("input propertychange", function() {
				var v = $(this).val();
				$(".layout-clip-img").width(v)
			});
			$(".layout-clip-bt3,.layout-clip-tool .layui-layer-setwin").click(function() {
				$(".layout-clip").remove()
			});
			layout.file({
				el: ".layout-clip",
				type: "img",
				success: function(data) {
					$(".layout-clip-img").attr("src", data)
				}
			});
			layout.scroll({
				elem: ".layout-clip",
				up: function() {
					var e = event,
						shiftKey = e.shiftKey;
					if (shiftKey) {
						$(".layout-clip-img").css("width", "+=50px");
						var width = $(".layout-clip-img").width();
						$(".layout-clip-range").val(width);
					} else {
						$(".layout-clip-img").css("width", "+=10px");
						var width = $(".layout-clip-img").width();
						$(".layout-clip-range").val(width);
					}
				},
				down: function(e) {
					var e = event,
						shiftKey = e.shiftKey;
					if (shiftKey) {
						$(".layout-clip-img").css("width", "-=50px");
						var width = $(".layout-clip-img").width();
						$(".layout-clip-range").val(width);
					} else {
						$(".layout-clip-img").css("width", "-=10px");
						var width = $(".layout-clip-img").width();
						$(".layout-clip-range").val(width);
					}
				}
			});
			document.onkeydown = function(e) {
				var keyCode = e.keyCode || e.which || e.charCode,
					ctrlKey = e.ctrlKey || e.metaKey,
					shiftKey = e.shiftKey;
				if (keyCode == 39) {
					$(".layout-clip-img").css("left", "+=1px")
				}
				if (keyCode == 39 && shiftKey) {
					$(".layout-clip-img").css("left", "+=5px")
				}
				if (keyCode == 37) {
					$(".layout-clip-img").css("left", "-=1px")
				}
				if (keyCode == 37 && shiftKey) {
					$(".layout-clip-img").css("left", "-=5px")
				}
				if (keyCode == 38) {
					$(".layout-clip-img").css("top", "-=1px")
				}
				if (keyCode == 38 && shiftKey) {
					$(".layout-clip-img").css("top", "-=5px")
				}
				if (keyCode == 40) {
					$(".layout-clip-img").css("top", "+=1px")
				}
				if (keyCode == 40 && shiftKey) {
					$(".layout-clip-img").css("top", "+=5px")
				}
			};
			$(".layout-clip").dblclick(function() {
				$(".layout-clip-bt1").trigger("click");

			});
			$(".layout-clip-bt1").click(function() {
				var c = canvas[0],
					ctx = c.getContext("2d"),
					url = $(".layout-clip-img").attr("src"),
					TH = $(".layout-clip-layer").width(),
					CH = canvas.width(),
					R = Number(CH / TH),
					W = $(".layout-clip-img").width() * R,
					H = $(".layout-clip-img").height() * R,
					L = ($(".layout-clip-img").offset().left - $(".layout-clip-layer").offset().left) * R,
					T = ($(".layout-clip-img").offset().top - $(".layout-clip-layer").offset().top) * R,
					img = new Image();
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(0, 0, 0, 0);
				img.setAttribute("crossOrigin", "anonymous");
				img.src = url;
				img.onload = function() {
					ctx.drawImage(img, L, T, W, H);
					if (o.success) {
						var type = "image/jpeg",
							k = 1;
						if (o.type != undefined) {
							type = o.type;
						}
						if (o.k != undefined) {
							k = o.k;
						}
						var g = canvas[0].toDataURL(type, k);
						o.success(g);
					}
					$(".layout-clip").remove();
					canvas.remove();
				}
			})
		}
	})
};
layout.sctrl = function(f, to) {
	$(f).mousedown(function(e) {
		var x1 = e.pageX,
			y1 = e.pageY,
			th = $(this),
			L = th.position().left,
			T = th.position().top;
		$(document).bind("mousemove", function(e) {
			var k = e.ctrlKey;
			log(e);
			if (k == true) {
				var x2 = Number(e.pageX),
					y2 = Number(e.pageY);
				if (x2 > x1) {
					var x = Number(x2 - x1),
						y = Number(y2 - y1),
						l = L + x,
						t = T + y;
					$(to).css("zoom", "+=5%");
					var zoom = $(to).css("zoom");
					$(f).css("cursor", "zoom-in");
					layer.msg(zoom + "X")
				} else {
					var x = Number(x1 - x2),
						y = Number(y1 - y2),
						l = L + x,
						t = T + y;
					$(to).css("zoom", "-=5%");
					var zoom = $(to).css("zoom");
					$(f).css("cursor", "zoom-out");
					layer.msg(zoom + "X")
				}
			}
		});
		$(document).mouseup(function() {
			$(this).unbind("mousemove");
			$(f).css("cursor", "auto")
		})
	})
};
layout.eject = function(o) {
	var div = $("<div class='layout-eject' style='position: absolute;z-index: 99999;color: " + o.color +
		";white-space: nowrap;'>" + o.text + "</div>");
	$(o.elem).append(div);
	var w = div.outerWidth(true),
		l = $(o.elem).width(),
		h = $(o.elem).height();
	if (o.top) {
		var t = o.top
	} else {
		var t = Math.ceil(Math.random() * h) + "px"
	}
	div.css({
		right: -w,
		top: t
	});
	div.animate({
		right: l
	}, o.time, function() {
		div.remove();
		if (o.end) {
			o.end()
		}
	})
};
layout.upload = function(o) {
	if (o.multiple != undefined && o.multiple == true) {
		var multiple = "multiple='multiple'";
	} else {
		var multiple = "";
	}
	var file = $("<input type='file' style='display: none;' " + multiple + "/>");
	if (o.name != undefined) {
		var name = o.name;
	} else {
		var name = "file";
	}
	$(o.bt).after(file);
	$(o.bt).click(function() {
		file.unbind().click();
		file.change(function() {
			var _this = $(this);
			var data = _this[0].files;
			var len = data.length;
			var formData = new FormData();
			for (var i = 0; i < len; i++) {
				if (o.multiple != undefined && o.multiple == true) {
					formData.append(name + [i], data[i]);
				} else {
					formData.append(name, data[i]);
				}

			}
			$.ajax({
				url: o.url,
				type: "POST",
				dataType: "json",
				data: formData,
				processData: false,
				contentType: false,
				success: function(res) {
					if (o.success != undefined) {
						o.success(res);
					}
				},
				error: function(data) {
					var obj = eval(data);
					o.success(obj)
				}
			})
		})
	})
};
layout.tips = function(o) {
	if (o.icon) {
		o.icon = o.icon
	} else {
		o.icon = "../layout/image/tips.png"
	}
	if (o.title) {
		o.title = o.title
	} else {
		o.title = "消息"
	}
	var c = '<div class="layout-tips"><div class="layout-tips-top"><img src="' + o.icon +
		'"/><span class="layout-tips-title">' + o.title +
		'</span><span class="layout-tips-close"><i class="layui-icon layui-icon-close"></i></span></div><div class="layout-tips-body">' +
		o.body + "</div></div>";
	$("body").append(c);
	$(".layout-tips-close").click(function() {
		$(this).parent().parent().fadeOut()
	});
	layout.movep(".layout-tips-top")
};
layout.movef = function(o) {
	$(o.elem).mousedown(function(e) {
		e.preventDefault();
		var x1 = e.pageX,
			y1 = e.pageY,
			th = $(this),
			L = th.position().left,
			T = th.position().top;
		if (o.down) {
			o.down({
				event: e,
				el: th,
				x: L,
				y: T,
				left: x1,
				top: y1
			})
		}
		$(document).bind("mousemove", function(ev) {
			e.preventDefault();
			var x2 = Number(ev.pageX),
				y2 = Number(ev.pageY),
				x = Number(x2 - x1),
				y = Number(y2 - y1),
				l = L + x,
				t = T + y;
			if (o.move) {
				o.move({
					event: ev,
					el: th,
					mx: l,
					my: t,
					left: x,
					top: y
				})
			}
		});
		$(document).mouseup(function(e) {
			$(this).unbind("mousemove");
			if (o.seup) {
				o.seup({
					event: e,
					el: th
				})
			}
		})
	})
};
layout.reach = function(o) {
	var elem = $(o.elem)[0];
	$.getScript("http://html2canvas.hertzen.com/dist/html2canvas.js", function() {
		html2canvas(elem).then(function(c) {
			o.success(c.toDataURL());
		})
	})
};
layout.rise = function(o) {
	var c = (o.num / 100).toFixed(0),
		c = Number(c);
	for (var i = 0; i <= 100; i++) {
		(function(i) {
			setTimeout(function() {
				$(o.elem).text(i * c);
				if (i == 100) {
					$(o.elem).text(o.num)
				}
			}, (i + 1) * o.time)
		})(i)
	}
};
layout.rotate = function(data) {
	var angle;
	layout.movef({
		elem: data.elem,
		down: function() {
			var r = $(data.box).css("transform"),
				values = r.split('(')[1].split(')')[0].split(','),
				a = values[0],
				b = values[1],
				c = values[2],
				d = values[3],
				scale = Math.sqrt(a * a + b * b),
				sin = b / scale;
			angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
		},
		move: function(res) {
			var x = angle + res.my;
			$(data.box).css("transform", "rotate(" + x + "deg)");
			if (data.move) {
				data.move({
					angle: x,
					data: res
				});
			}
		},
		seup: function(res) {
			if (data.seup) {
				data.seup(res);
			}
		}
	});
};
layout.cut = function(obj) {
	var div = $('<div class="layout-c"><div class="layout-c-v"></div></div>');
	var canvas = $(
		'<canvas style="display: none;"></canvas>');
	$(obj.elem).after(div);
	div.after(canvas);
	var v = $(".layout-c-v");
	v.width(obj.vwidth);
	v.height(obj.vheight);
	div.width($(obj.elem).width());
	div.height($(obj.elem).height());
	div.css("top", $(obj.elem).css("top"));
	div.css("left", $(obj.elem).css("left"));
	div.css("margin", $(obj.elem).css("margin"));
	div.css("right", $(obj.elem).css("right"));
	div.css("bottom", $(obj.elem).css("bottom"));
	layout.resize(v, 4, [0, 1, 2, 3, 4, 6, 8]);
	var box = obj.box || $(document);
	box.mousedown(function(e) {
		var w = v.width(),
			h = v.height(),
			r = h / w;
		box.bind("mousemove", function(e) {
			var w = v.width();
			v.height(w * r);
			$(obj.elem).next().find(".layout-p").height(w * r);
			var c = canvas[0];
			c.width = obj.width;
			c.height = obj.height;
			var ctx = c.getContext("2d"),
				img = new Image(),
				x = parseInt(v.css("left")),
				y = parseInt(v.css("top")),
				w = v.width(),
				h = v.height(),
				cw = c.width,
				ch = c.height,
				wr = cw / w,
				iw = $(obj.elem).width(),
				ih = $(obj.elem).height();
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, 0, 0);
			img.setAttribute('crossOrigin', 'anonymous');
			img.src = $(obj.elem).attr("src");
			img.onload = function() {
				ctx.drawImage(img, -x * wr, -y * wr, iw * wr, ih * wr);
				var type = "image/jpeg";
				var size = 1;
				if (obj.success) {
					if (obj.type != undefined) {
						type = obj.type;
					}
					if (obj.size != undefined) {
						size = obj.size;
					}
					obj.success(canvas[0].toDataURL(type, size));
				}
			};
		});
	});
	box.mouseup(function(e) {
		$(this).unbind("mousemove");
		var type = "image/png";
		var sizes = 1;
		if (obj.end) {
			if (obj.sizes != undefined) {
				sizes = obj.sizes;
			}
			obj.end(canvas[0].toDataURL(type, sizes));
		}
	})
};
layout.base64 = function(obj) {
	window.URL = window.URL || window.webkitURL;
	var xhr = new XMLHttpRequest();
	xhr.open("get", obj.url, true);
	xhr.responseType = "blob";
	xhr.onload = function() {
		if (this.status == 200) {
			var blob = this.response;
			let oFileReader = new FileReader();
			oFileReader.onloadend = function(e) {
				if (obj.success != undefined) {
					obj.success(e.target.result);
				}
			};
			oFileReader.readAsDataURL(blob);
		}
	}
	xhr.send();
}
layout.fluent = function(obj) {
	var elem = obj.elem || "html";
	$(elem).on("mousewheel DOMMouseScroll", function(e) {
		e.preventDefault();
		var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail,
			delta = Math.max(-1, Math.min(1, wheel)),
			num = obj.num || 200,
			time = obj.time || 10;
		if (delta < 0) {
			for (var i = 0; i < num; i++) {
				(function(i) {
					setTimeout(function() {
						var top = $(this).scrollTop();
						$(this).scrollTop(top + 1);
					}, (i + 1) * time);
				})(i);
			}
		} else {
			for (var i = 0; i < num; i++) {
				(function(i) {
					setTimeout(function() {
						var top = $(this).scrollTop();
						$(this).scrollTop(top - 1);
					}, (i + 1) * time);
				})(i);
			}
		}
	});
}
