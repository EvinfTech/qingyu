"use strict";
const common_vendor = require("../../common/vendor.js");
const Home = () => "../home/home2.js";
const Mine = () => "../mine/mine2.js";
const _sfc_main = {
  components: {
    Home,
    Mine
  },
  data() {
    return {
      app: getApp(),
      active: 0,
      scrollViewHeight: 0,
      tabbarList: [
        {
          text: "首页",
          iconPath: "/static/images/index/home.svg",
          selectedIconPath: "/static/images/index/homeActive.svg"
        },
        {
          text: "我的",
          iconPath: "/static/images/index/mine.svg",
          selectedIconPath: "/static/images/index/mineActive.svg"
        }
      ],
      gymnasiumInfo: {}
    };
  },
  onLoad() {
    this.getTabbarIndex();
    this.calculatePageHeight();
    this.checkLoginState();
  },
  onShow() {
  },
  onReady() {
  },
  methods: {
    getTabbarIndex() {
      let tabbarIndex = common_vendor.index.getStorageSync("tabbarIndex");
      if (tabbarIndex) {
        this.active = Number(tabbarIndex);
      }
    },
    navigate(index) {
      this.active = index.detail;
    },
    // 计算页面高度
    calculatePageHeight() {
      var screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      let that = this;
      let info = common_vendor.index.getSystemInfoSync();
      let saveBottom = info.safeArea.bottom;
      that.scrollViewHeight = screenHeight - 50 - (screenHeight - saveBottom);
    },
    // 验证登录状态 然后跳转
    checkLoginState() {
      let userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo) {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
      }
    },
    // tabbar切换
    tabbarChange(name) {
      this.active = name;
      common_vendor.index.setStorageSync("tabbarIndex", name);
    }
  }
};
if (!Array) {
  const _component_Home = common_vendor.resolveComponent("Home");
  const _component_Mine = common_vendor.resolveComponent("Mine");
  const _easycom_u_tabbar_item2 = common_vendor.resolveComponent("u-tabbar-item");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_component_Home + _component_Mine + _easycom_u_tabbar_item2 + _easycom_u_tabbar2)();
}
const _easycom_u_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_u_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_tabbar_item + _easycom_u_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.active == 0
  }, $data.active == 0 ? {
    b: common_vendor.o($options.navigate),
    c: common_vendor.p({
      scrollViewHeight: $data.scrollViewHeight
    })
  } : {
    d: common_vendor.sr("mine", "1cf27b2a-1"),
    e: common_vendor.p({
      id: "mine"
    })
  }, {
    f: common_vendor.s("height: " + $data.scrollViewHeight + "px;"),
    g: common_vendor.f($data.tabbarList, (item, index, i0) => {
      return {
        a: item.selectedIconPath,
        b: item.iconPath,
        c: index,
        d: "1cf27b2a-3-" + i0 + ",1cf27b2a-2",
        e: common_vendor.p({
          text: item.text
        })
      };
    }),
    h: common_vendor.o($options.tabbarChange),
    i: common_vendor.p({
      value: $data.active,
      border: true,
      fixed: false,
      placeholder: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/project/轻羽开源项目/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
