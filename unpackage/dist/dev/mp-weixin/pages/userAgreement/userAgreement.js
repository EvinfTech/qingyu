"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      app: getApp()
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  (_easycom_up_icon2 + _easycom_u_navbar2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false,
      title: "用户协议",
      autoBack: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96203526"], ["__file", "C:/project/轻羽开源项目/pages/userAgreement/userAgreement.vue"]]);
wx.createPage(MiniProgramPage);
