"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-divider",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$3],
  computed: {
    textStyle() {
      const style = {};
      style.fontSize = common_vendor.index.$u.addUnit(this.textSize);
      style.color = this.textColor;
      return style;
    },
    // 左边线条的的样式
    leftLineStyle() {
      const style = {};
      if (this.textPosition === "left") {
        style.width = "80rpx";
      } else {
        style.flex = 1;
      }
      return style;
    },
    // 右边线条的的样式
    rightLineStyle() {
      const style = {};
      if (this.textPosition === "right") {
        style.width = "80rpx";
      } else {
        style.flex = 1;
      }
      return style;
    }
  },
  emits: ["click"],
  methods: {
    // divider组件被点击时触发
    click() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  _easycom_u_line2();
}
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  _easycom_u_line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      color: _ctx.lineColor,
      customStyle: $options.leftLineStyle,
      hairline: _ctx.hairline,
      dashed: _ctx.dashed
    }),
    b: _ctx.dot
  }, _ctx.dot ? {} : _ctx.text ? {
    d: common_vendor.t(_ctx.text),
    e: common_vendor.s($options.textStyle)
  } : {}, {
    c: _ctx.text,
    f: common_vendor.p({
      color: _ctx.lineColor,
      customStyle: $options.rightLineStyle,
      hairline: _ctx.hairline,
      dashed: _ctx.dashed
    }),
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-363a2c1a"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-divider/u-divider.vue"]]);
wx.createComponent(Component);
