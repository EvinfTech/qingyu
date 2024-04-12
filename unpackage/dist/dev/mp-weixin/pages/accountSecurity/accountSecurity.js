"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      accountNo: "163987",
      phone: "13583265886",
      status: "已绑定",
      show: false
    };
  },
  methods: {
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    logOff() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm() {
      this.show = false;
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_navbar2 + _easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_modal2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_cell + _easycom_u_cell_group + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "账号与安全",
      safeAreaInsetTop: true,
      autoBack: true,
      fixed: false
    }),
    b: common_vendor.p({
      title: "氢羽号",
      center: true,
      value: $data.accountNo,
      ["custom-class"]: "userinfo-cell"
    }),
    c: common_vendor.p({
      title: "手机号",
      value: $data.phone,
      center: true,
      ["custom-class"]: "userinfo-cell"
    }),
    d: common_vendor.p({
      title: "绑定微信",
      value: $data.status,
      center: true,
      ["custom-class"]: "userinfo-cell"
    }),
    e: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    f: common_vendor.o((...args) => $options.logOff && $options.logOff(...args)),
    g: common_vendor.o($options.confirm),
    h: common_vendor.o($options.cancel),
    i: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定要注销账号吗？",
      showCancelButton: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ee0a2e80"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/accountSecurity/accountSecurity.vue"]]);
wx.createPage(MiniProgramPage);
