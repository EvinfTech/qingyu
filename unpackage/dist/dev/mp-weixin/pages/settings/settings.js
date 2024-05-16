"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      show: false
    };
  },
  methods: {
    // 账号与安全
    toAccountSecurity() {
      common_vendor.index.navigateTo({
        url: "/pages/accountSecurity/accountSecurity"
      });
    },
    // 用户协议
    toUserAgreement() {
      common_vendor.index.navigateTo({
        url: "/pages/userAgreement/userAgreement"
      });
    },
    // 关于我们
    toAboutUs() {
      common_vendor.index.navigateTo({
        url: "/pages/aboutUs/aboutUs"
      });
    },
    // 退出登录
    logout() {
      this.show = true;
    },
    // 取消退出登录
    cancel() {
      this.show = false;
    },
    // 确认退出登录
    confirm() {
      this.show = false;
      this.app.logout();
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_modal2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u_cell + _easycom_u_cell_group + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "设置",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o($options.toAccountSecurity),
    e: common_vendor.p({
      title: "账号与安全",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    f: common_vendor.o($options.toUserAgreement),
    g: common_vendor.p({
      title: "用户协议",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    h: common_vendor.p({
      title: "隐私协议",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    i: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    j: common_vendor.p({
      title: "使用帮助",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    k: common_vendor.o($options.toAboutUs),
    l: common_vendor.p({
      title: "关于我们",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    m: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    n: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    o: common_vendor.o($options.confirm),
    p: common_vendor.o($options.cancel),
    q: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定要退出登录吗？",
      showCancelButton: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7fad0a1c"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
