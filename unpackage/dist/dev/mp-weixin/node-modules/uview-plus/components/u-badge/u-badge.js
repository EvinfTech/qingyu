"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-badge",
  mixins: [common_vendor.mpMixin, common_vendor.props$17, common_vendor.mixin],
  computed: {
    // 是否将badge中心与父组件右上角重合
    boxStyle() {
      let style = {};
      return style;
    },
    // 整个组件的样式
    badgeStyle() {
      const style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.bgColor && !this.inverted) {
        style.backgroundColor = this.bgColor;
      }
      if (this.absolute) {
        style.position = "absolute";
        if (this.offset.length) {
          const top = this.offset[0];
          const right = this.offset[1] || top;
          style.top = common_vendor.index.$u.addUnit(top);
          style.right = common_vendor.index.$u.addUnit(right);
        }
      }
      return style;
    },
    showValue() {
      switch (this.numberType) {
        case "overflow":
          return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
        case "ellipsis":
          return Number(this.value) > Number(this.max) ? "..." : this.value;
        case "limit":
          return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
        default:
          return Number(this.value);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot)
  }, _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? {
    b: common_vendor.t(_ctx.isDot ? "" : $options.showValue),
    c: common_vendor.n(_ctx.isDot ? "u-badge--dot" : "u-badge--not-dot"),
    d: common_vendor.n(_ctx.inverted && "u-badge--inverted"),
    e: common_vendor.n(_ctx.shape === "horn" && "u-badge--horn"),
    f: common_vendor.n(`u-badge--${_ctx.type}${_ctx.inverted ? "--inverted" : ""}`),
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    h: common_vendor.s($options.badgeStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aa9883b1"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-badge/u-badge.vue"]]);
wx.createComponent(Component);
