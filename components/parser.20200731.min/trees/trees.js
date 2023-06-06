function _defineProperty(t, e, r) { return e in t ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = r, t } var t = require("../libs/config.js").errorImg; Component({ data: { canIUse: !!wx.chooseMessageFile, placeholder: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='225'/>", ctrl: [] }, properties: { nodes: Array, lazyLoad: Boolean, loading: String }, methods: { play: function (t) { if (this.top.group && this.top.group.pause(this.top.i), this.top.videoContexts.length > 1 && this.top.data.autopause) for (var e = this.top.videoContexts.length; e--;)this.top.videoContexts[e].id != t.currentTarget.id && this.top.videoContexts[e].pause() }, imgtap: function (t) { var e = t.currentTarget.dataset.attrs; if (!e.ignore) { var r = !0; if (this.top.triggerEvent("imgtap", { id: t.currentTarget.id, src: e.src, ignore: function () { return r = !1 } }), r) { if (this.top.group) return this.top.group.preview(this.top.i, e.i); var i = this.top.imgList, a = i[e.i] ? i[e.i] : (i = [e.src], e.src); wx.previewImage({ current: a, urls: i }) } } }, loadImg: function (t) { var e = t.target.dataset.i; this.data.lazyLoad && !this.data.ctrl[e] ? this.setData(_defineProperty({}, "ctrl[" + e + "]", 1)) : this.data.loading && 2 != this.data.ctrl[e] && this.setData(_defineProperty({}, "ctrl[" + e + "]", 2)) }, linkpress: function (t) { var e = !0, r = t.currentTarget.dataset.attrs; r.ignore = function () { return e = !1 }, this.top.triggerEvent("linkpress", r), e && (r["app-id"] ? wx.navigateToMiniProgram({ appId: r["app-id"], path: r.path }) : r.href && ("#" == r.href[0] ? this.top.navigateTo({ id: r.href.substring(1) }) : 0 == r.href.indexOf("http") || 0 == r.href.indexOf("//") ? wx.setClipboardData({ data: r.href, success: function () { return wx.showToast({ title: "链接已复制" }) } }) : wx.navigateTo({ url: r.href, fail: function () { wx.switchTab({ url: r.href }) } }))) }, error: function (e) { var r = e.target.dataset.source, i = e.target.dataset.i, a = this.data.nodes[i]; if ("video" == r || "audio" == r) { var s = (a.i || 0) + 1; if (s < a.attrs.source.length) return this.setData(_defineProperty({}, "nodes[" + i + "].i", s)) } else "img" == r && t && (this.top.imgList.setItem(e.target.dataset.index, t), this.setData(_defineProperty({}, "nodes[" + i + "].attrs.src", t))); this.top && this.top.triggerEvent("error", { source: r, target: e.target, errMsg: e.detail.errMsg }) }, loadVideo: function (t) { this.setData(_defineProperty({}, "nodes[" + t.target.dataset.i + "].attrs.autoplay", !0)) } } })