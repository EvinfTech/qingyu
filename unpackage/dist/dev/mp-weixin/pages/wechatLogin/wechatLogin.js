"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      show: false
    };
  },
  methods: {
    // 微信方登录
    wechatLogin() {
      return new Promise((resolve) => {
        common_vendor.index.login({
          success: (resWxLogin) => {
            resolve(resWxLogin.code);
          }
        });
      });
    },
    // 授权手机号
    async getPhoneNumber(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        this.onWechatLogin(e.detail.code);
      } else {
        common_vendor.index.showToast({
          title: "手机号授权失败",
          icon: "none"
        });
      }
    },
    // 服务器登录
    async onWechatLogin(phone_code = "") {
      let code = await this.wechatLogin();
      utils_request.request({
        url: "wx/login",
        method: "POST",
        data: {
          code,
          phone_code
        }
      }).then(async (res) => {
        if (res.data.ouid) {
          this.app.globalData.userInfo.ouid = res.data.ouid;
          await this.app.getUserInfo("reGet");
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        } else {
          this.show = true;
        }
      });
    },
    // 弹框打开
    open() {
    },
    // 弹框关闭
    close() {
    },
    // 确定
    ensure() {
      this.show = false;
    },
    //取消
    cancelShow() {
      this.show = false;
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_up_popup2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_up_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "微信快捷登录",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o(($event) => $options.onWechatLogin("")),
    e: common_vendor.o((...args) => $options.cancelShow && $options.cancelShow(...args)),
    f: common_vendor.o((...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args)),
    g: common_vendor.o((...args) => $options.ensure && $options.ensure(...args)),
    h: common_vendor.o($options.close),
    i: common_vendor.o($options.open),
    j: common_vendor.p({
      show: $data.show,
      mode: "center",
      round: "10",
      safeAreaInsetBottom: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1a4ac2b7"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/wechatLogin/wechatLogin.vue"]]);
wx.createPage(MiniProgramPage);
