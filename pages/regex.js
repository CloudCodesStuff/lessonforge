!function (e, r) { "object" === typeof exports && "object" === typeof module ? module.exports = r() : "function" === typeof define && define.amd ? define("RegexColorize", [], r) : "object" === typeof exports ? exports.RegexColorize = r() : e.RegexColorize = r() }(window, function () { return function (e) { var r = {}; function __webpack_require__(t) { if (r[t]) return r[t].exports; var i = r[t] = { i: t, l: !1, exports: {} }; return e[t].call(i.exports, i, i.exports, __webpack_require__), i.l = !0, i.exports } return __webpack_require__.m = e, __webpack_require__.c = r, __webpack_require__.d = function (e, r, t) { __webpack_require__.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, __webpack_require__.r = function (e) { "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, __webpack_require__.t = function (e, r) { if (1 & r && (e = __webpack_require__(e)), 8 & r) return e; if (4 & r && "object" === typeof e && e && e.__esModule) return e; var t = Object.create(null); if (__webpack_require__.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var i in e) __webpack_require__.d(t, i, function (r) { return e[r] }.bind(null, i)); return t }, __webpack_require__.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return __webpack_require__.d(r, "a", r), r }, __webpack_require__.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0) }([function (e, r, t) { e.exports = t(1) }, function (e, r, t) { "use strict"; function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var i = r[t]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i) } } t.r(r); var i = function () { function RegexColorize(e) { var r, t, i; !function (e, r) { if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function") }(this, RegexColorize), i = function () { var e = document.createElement("style"), r = ".regex       {font-family: Monospace;} .regex b     {background: #aad1f7;} .regex i     {background: #e3e3e3;} .regex i b   {background: #9fb6dc;} .regex i u   {background: #c3c3c3;} .regex b.g1  {background: #b4fa50; color: #000;} .regex b.g2  {background: #8cd400; color: #000;} .regex b.g3  {background: #26b809; color: #fff;} .regex b.g4  {background: #30ea60; color: #000;} .regex b.g5  {background: #0c8d15; color: #fff;} .regex b.err {background: #e30000; color: #fff;} .regex b, .regex i, .regex u {font-weight: normal; font-style: normal; text-decoration: none;}"; e.id = "regex-colorizer-ss", document.getElementsByTagName("head")[0].appendChild(e), e.styleSheet ? e.styleSheet.cssText = r : e.innerHTML = r }, (t = "addStyleSheet") in (r = this) ? Object.defineProperty(r, t, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : r[t] = i, this.myclass = e || "regex", this.regexToken = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, this.charClassToken = /[^\\-]+|-|\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)/g, this.charClassParts = /^(\[\^?)(]?(?:[^\\\]]+|\\[\S\s]?)*)(]?)$/, this.quantifier = /^(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??$/, this.type = { NONE: 0, RANGE_HYPHEN: 1, SHORT_CLASS: 2, ALTERNATOR: 3 }, this.error = { UNCLOSED_CLASS: "Unclosed character class", INCOMPLETE_TOKEN: "Incomplete regex token", INVALID_RANGE: "Reversed or invalid range", INVALID_GROUP_TYPE: "Invalid or unsupported group type", UNBALANCED_LEFT_PAREN: "Unclosed grouping", UNBALANCED_RIGHT_PAREN: "No matching opening parenthesis", INTERVAL_OVERFLOW: "Interval quantifier cannot use value over 65,535", INTERVAL_REVERSED: "Interval quantifier range is reversed", UNQUANTIFIABLE: "Quantifiers must be preceded by a token that can be repeated", IMPROPER_EMPTY_ALTERNATIVE: "Empty alternative effectively truncates the regex here" } } var e, r, t; return e = RegexColorize, (r = [{ key: "errorize", value: function (e, r) { return '<b class="err"' + (r ? ' title="' + r + '"' : "") + ">" + e + "</b>" } }, { key: "groupize", value: function (e, r) { return '<b class="g' + r + '">' + e + "</b>" } }, { key: "expandHtmlEntities", value: function (e) { return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") } }, { key: "elsByClass", value: function (e) { if (document.getElementsByClassName) return document.body.getElementsByClassName(e); var r, t = document.body.getElementsByTagName("*"), i = new RegExp("(?:^|\\s)" + e + "(?:\\s|$)"), n = [], a = t.length; for (r = 0; r < a; r++)i.test(t[r].className) && n.push(t[r]); return n } }, { key: "getTokenCharCode", value: function (e) { if (e.length > 1 && "\\" === e.charAt(0)) { var r = e.slice(1); if (/^c[A-Za-z]$/.test(r)) return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(r.charAt(1).toUpperCase()) + 1; if (/^(?:x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})$/.test(r)) return parseInt(r.slice(1), 16); if (/^(?:[0-3][0-7]{0,2}|[4-7][0-7]?)$/.test(r)) return parseInt(r, 8); if (1 === r.length && "cuxDdSsWw".indexOf(r) > -1) return NaN; if (1 === r.length) switch (r) { case "b": return 8; case "f": return 12; case "n": return 10; case "r": return 13; case "t": return 9; case "v": return 11; default: return r.charCodeAt(0) } } return "\\" !== e ? e.charCodeAt(0) : NaN } }, { key: "parseCharClass", value: function (e) { var r, t, i = "", n = this.charClassParts.exec(e), a = { rangeable: !1, type: this.type.NONE }; for (i += (n = { opening: n[1], content: n[2], closing: n[3] }).closing ? n.opening : this.errorize(n.opening, this.error.UNCLOSED_CLASS); r = this.charClassToken.exec(n.content);)if ("\\" === (t = r[0]).charAt(0)) /^\\[cux]$/.test(t) ? (i += this.errorize(t, this.error.INCOMPLETE_TOKEN), a = { rangeable: a.type !== this.type.RANGE_HYPHEN }) : /^\\[dsw]$/i.test(t) ? (i += "<b>" + t + "</b>", a = { rangeable: a.type !== this.type.RANGE_HYPHEN, type: this.type.SHORT_CLASS }) : "\\" === t ? i += this.errorize(t, this.error.INCOMPLETE_TOKEN) : (i += "<b>" + this.expandHtmlEntities(t) + "</b>", a = { rangeable: a.type !== this.type.RANGE_HYPHEN, charCode: this.getTokenCharCode(t) }); else if ("-" === t) if (a.rangeable) { var o = this.charClassToken.lastIndex, s = this.charClassToken.exec(n.content); if (s) { var l = this.getTokenCharCode(s[0]); !isNaN(l) && a.charCode > l || a.type === this.type.SHORT_CLASS || /^\\[dsw]$/i.test(s[0]) ? i += this.errorize("-", this.error.INVALID_RANGE) : i += "<u>-</u>", a = { rangeable: !1, type: this.type.RANGE_HYPHEN } } else n.closing ? i += "-" : i += "<u>-</u>"; this.charClassToken.lastIndex = o } else i += "-", a = { rangeable: a.type !== this.type.RANGE_HYPHEN }; else i += this.expandHtmlEntities(t), a = { rangeable: t.length > 1 || a.type !== this.type.RANGE_HYPHEN, charCode: t.charCodeAt(t.length - 1) }; return i + n.closing } }, { key: "colorizeText", value: function (e) { for (var r, t, i, n, a = "", o = 0, s = 0, l = [], c = { quantifiable: !1, type: this.type.NONE }; r = this.regexToken.exec(e);)if (i = (t = r[0]).charAt(0), n = t.charAt(1), "[" === i) a += "<i>" + this.parseCharClass(t) + "</i>", c = { quantifiable: !0 }; else if ("(" === i) 2 === t.length ? a += this.errorize(t, this.error.INVALID_GROUP_TYPE) : (1 === t.length && o++, s = 5 === s ? 1 : s + 1, l.push({ index: a.length + '<b class="gN">'.length, opening: t }), a += this.groupize(t, s)), c = { quantifiable: !1 }; else if (")" === i) l.length ? (a += this.groupize(")", s), c = { quantifiable: !/^[=!]/.test(l[l.length - 1].opening.charAt(2)), style: "g" + s }, s = 1 === s ? 5 : s - 1, l.pop()) : (a += this.errorize(")", this.error.UNBALANCED_RIGHT_PAREN), c = { quantifiable: !1 }); else if ("\\" === i) if (/^[1-9]/.test(n)) { for (var u = "", f = +t.slice(1); f > o;)u = /[0-9]$/.exec(f)[0] + u, f = Math.floor(f / 10); if (f > 0) a += "<b>\\" + f + "</b>" + u; else { var _ = /^\\([0-3][0-7]{0,2}|[4-7][0-7]?|[89])([0-9]*)/.exec(t); a += "<b>\\" + _[1] + "</b>" + _[2] } c = { quantifiable: !0 } } else /^[0bBcdDfnrsStuvwWx]/.test(n) ? /^\\[cux]$/.test(t) ? (a += this.errorize(t, this.error.INCOMPLETE_TOKEN), c = { quantifiable: !1 }) : "bB".indexOf(n) > -1 ? (a += "<b>" + t + "</b>", c = { quantifiable: !1 }) : (a += "<b>" + t + "</b>", c = { quantifiable: !0 }) : "\\" === t ? a += this.errorize(t, this.error.INCOMPLETE_TOKEN) : (a += this.expandHtmlEntities(t), c = { quantifiable: !0 }); else if (this.quantifier.test(t)) { if (c.quantifiable) { var h = /^\{([0-9]+)(?:,([0-9]*))?/.exec(t); h && (+h[1] > 65535 || h[2] && +h[2] > 65535) ? a += this.errorize(t, this.error.INTERVAL_OVERFLOW) : h && h[2] && +h[1] > +h[2] ? a += this.errorize(t, this.error.INTERVAL_REVERSED) : a += (c.style ? '<b class="' + c.style + '">' : "<b>") + t + "</b>" } else a += this.errorize(t, this.error.UNQUANTIFIABLE); c = { quantifiable: !1 } } else "|" === t ? (c.type === this.type.NONE || c.type === this.type.ALTERNATOR && !l.length ? a += this.errorize(t, this.error.IMPROPER_EMPTY_ALTERNATIVE) : a += l.length ? this.groupize("|", s) : "<b>|</b>", c = { quantifiable: !1, type: this.type.ALTERNATOR }) : "^" === t || "$" === t ? (a += "<b>" + t + "</b>", c = { quantifiable: !1 }) : "." === t ? (a += "<b>.</b>", c = { quantifiable: !0 }) : (a += this.expandHtmlEntities(t), c = { quantifiable: !0 }); var b, p, g = 0; for (p = 0; p < l.length; p++)b = l[p].index + g, a = a.slice(0, b) + this.errorize(l[p].opening, this.error.UNBALANCED_LEFT_PAREN) + a.slice(b + l[p].opening.length), g += this.errorize("", this.error.UNBALANCED_LEFT_PAREN).length; return a } }, { key: "colorizeAll", value: function () { var e, r, t = this.elsByClass(this.myclass), i = t.length; for (r = 0; r < i; r++)(e = t[r]).innerHTML = this.colorizeText(e.textContent || e.innerText) } }]) && _defineProperties(e.prototype, r), t && _defineProperties(e, t), RegexColorize }(); r.default = i }]) });