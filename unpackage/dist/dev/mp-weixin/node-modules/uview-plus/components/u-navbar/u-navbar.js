"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-navbar",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$4],
  data() {
    return {};
  },
  emits: ["leftClick", "rightClick"],
  methods: {
    // 点击左侧区域
    leftClick() {
      this.$emit("leftClick");
      if (this.autoBack) {
        common_vendor.index.navigateBack();
      }
    },
    // 点击右侧区域
    rightClick() {
      this.$emit("rightClick");
    }
  }
};
if (!Array) {
  const _easycom_u_status_bar2 = common_vendor.resolveComponent("u-status-bar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_status_bar2 + _easycom_u_icon2)();
}
const _easycom_u_status_bar = () => "../u-status-bar/u-status-bar.js";
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_status_bar + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.fixed && _ctx.placeholder
  }, _ctx.fixed && _ctx.placeholder ? {
    b: _ctx.$u.addUnit(_ctx.$u.getPx(_ctx.height) + _ctx.$u.sys().statusBarHeight, "px")
  } : {}, {
    c: _ctx.safeAreaInsetTop
  }, _ctx.safeAreaInsetTop ? {
    d: common_vendor.p({
      bgColor: _ctx.bgColor
    })
  } : {}, {
    e: _ctx.leftIcon
  }, _ctx.leftIcon ? {
    f: common_vendor.p({
      name: _ctx.leftIcon,
      size: _ctx.leftIconSize,
      color: _ctx.leftIconColor
    })
  } : {}, {
    g: _ctx.leftText
  }, _ctx.leftText ? {
    h: common_vendor.t(_ctx.leftText),
    i: _ctx.leftIconColor
  } : {}, {
    j: common_vendor.o((...args) => $options.leftClick && $options.leftClick(...args)),
    k: common_vendor.t(_ctx.title),
    l: common_vendor.s({
      width: _ctx.$u.addUnit(_ctx.titleWidth)
    }),
    m: common_vendor.s(_ctx.$u.addStyle(_ctx.titleStyle)),
    n: _ctx.$slots.right || _ctx.rightIcon || _ctx.rightText
  }, _ctx.$slots.right || _ctx.rightIcon || _ctx.rightText ? common_vendor.e({
    o: _ctx.rightIcon
  }, _ctx.rightIcon ? {
    p: common_vendor.p({
      name: _ctx.rightIcon,
      size: "20"
    })
  } : {}, {
    q: _ctx.rightText
  }, _ctx.rightText ? {
    r: common_vendor.t(_ctx.rightText)
  } : {}, {
    s: common_vendor.o((...args) => $options.rightClick && $options.rightClick(...args))
  }) : {}, {
    t: common_vendor.n(_ctx.border && "u-border-bottom"),
    v: _ctx.$u.addUnit(_ctx.height),
    w: _ctx.bgColor,
    x: common_vendor.n(_ctx.fixed && "u-navbar--fixed")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d9e7ee2"], ["__file", "C:/project/轻羽开源项目/node_modules/uview-plus/components/u-navbar/u-navbar.vue"]]);
wx.createComponent(Component);
