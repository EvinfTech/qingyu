"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp()
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  },
  methods: {
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
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
    getPhoneNumberAjax(code) {
      utils_request.request({
        url: "wx/get/phone",
        method: "POST",
        data: {
          phone_code: code,
          user_ouid: this.app.globalData.userInfo.ouid
        }
      }).then((res) => {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      });
    },
    // 获取手机号
    getPhoneNumber(e) {
      this.onWechatLogin(e.detail.code);
    },
    // 服务器登录
    async onWechatLogin(phoneCode) {
      let code = await this.wechatLogin();
      utils_request.request({
        url: "wx/login",
        method: "POST",
        data: {
          code
        }
      }).then(async (res) => {
        this.app.globalData.userInfo.ouid = res.data.ouid;
        await this.app.getUserInfo("reGet");
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      });
    }
  }
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
      title: "微信快捷登录",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o((...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1a4ac2b7"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/wechatLogin/wechatLogin.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
