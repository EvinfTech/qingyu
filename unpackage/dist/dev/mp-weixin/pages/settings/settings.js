"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      show: false
    };
  },
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
    /**
     * 生命周期函数--监听页面加载
     */
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    toAccountSecurity() {
      common_vendor.index.navigateTo({
        url: "/pages/accountSecurity/accountSecurity"
      });
    },
    toUserAgreement() {
      common_vendor.index.navigateTo({
        url: "/pages/userAgreement/userAgreement"
      });
    },
    toAboutUs() {
      common_vendor.index.navigateTo({
        url: "/pages/aboutUs/aboutUs"
      });
    },
    toFeedBack() {
      common_vendor.index.navigateTo({
        url: "/pages/feedback/feedback"
      });
    },
    logout() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm() {
      this.show = false;
      this.app.logout();
    },
    clearCache() {
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_navbar2 + _easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_button2 + _easycom_u_modal2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_cell + _easycom_u_cell_group + _easycom_u_button + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "设置",
      safeAreaInsetTop: true,
      autoBack: true,
      fixed: false
    }),
    b: common_vendor.o($options.toAccountSecurity),
    c: common_vendor.p({
      title: "账号与安全",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    d: common_vendor.o($options.toUserAgreement),
    e: common_vendor.p({
      title: "用户协议",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    f: common_vendor.p({
      title: "隐私协议",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    g: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    h: common_vendor.p({
      title: "使用帮助",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    i: common_vendor.o($options.toAboutUs),
    j: common_vendor.p({
      title: "关于我们",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    k: common_vendor.o($options.toFeedBack),
    l: common_vendor.p({
      title: "意见反馈",
      center: true,
      ["custom-class"]: "userinfo-cell",
      ["is-link"]: true
    }),
    m: common_vendor.p({
      showMessageCard: true,
      openType: "contact",
      plain: true,
      customStyle: {
        "width": "100rpx",
        "borderWidth": "0",
        "backgroundColor": "transparent"
      }
    }),
    n: common_vendor.p({
      title: "联系客服",
      ["is-link"]: true
    }),
    o: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    p: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    q: common_vendor.o($options.confirm),
    r: common_vendor.o($options.cancel),
    s: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定要退出登录吗？",
      showCancelButton: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7fad0a1c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/settings/settings.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
