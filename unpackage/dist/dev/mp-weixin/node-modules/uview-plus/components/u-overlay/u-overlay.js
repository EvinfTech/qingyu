"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-overlay",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$23],
  computed: {
    overlayStyle() {
      const style = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: this.zIndex,
        bottom: 0,
        "background-color": `rgba(0, 0, 0, ${this.opacity})`
      };
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  emits: ["click"],
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  _easycom_u_transition2();
}
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  _easycom_u_transition();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.clickHandler),
    b: common_vendor.p({
      show: _ctx.show,
      ["custom-class"]: "u-overlay",
      duration: _ctx.duration,
      ["custom-style"]: $options.overlayStyle
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-35f7c3e5"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-overlay/u-overlay.vue"]]);
wx.createComponent(Component);
