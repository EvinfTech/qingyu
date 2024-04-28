"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      interval: 2e3,
      duration: 500,
      swiperList: [],
      viewHeight: 0,
      storeInfo: {}
    };
  },
  /**
   * 页面的初始数据
   */
  options: {
    addGlobalClass: true
  },
  props: {
    scrollViewHeight: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => this.ready());
  },
  watch: {
    // 监听高度
    scrollViewHeight: function(val) {
      if (val && val > 0) {
        this.calculatePageHeight();
      }
    }
  },
  methods: {
    // 打电话
    toCall() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.storeInfo.phone
      });
    },
    // 地图位置
    toMap() {
      var that = this;
      common_vendor.index.openLocation({
        latitude: that.storeInfo.latitude,
        longitude: that.storeInfo.longitude,
        scale: 18,
        name: this.storeInfo.location
      });
    },
    ready() {
      this.calculatePageHeight();
    },
    // 计算页面高度
    calculatePageHeight() {
      var that = this;
      let res = common_vendor.index.getSystemInfoSync();
      let query1 = common_vendor.index.createSelectorQuery().in(that);
      query1.select(".banner").boundingClientRect((bannerRect) => {
        let query2 = common_vendor.index.createSelectorQuery().in(that);
        query2.select(".navBox").boundingClientRect((navBoxRect) => {
          that.viewHeight = that.scrollViewHeight - bannerRect.height - navBoxRect.height - 54 - res.statusBarHeight;
        }).exec();
      }).exec();
    },
    // 去订场
    appointmentVenue() {
      common_vendor.index.navigateTo({
        url: "/pages/gymnasiumInfo/gymnasiumInfo"
      });
    },
    // 去我的
    toMine() {
      this.$emit("navigate", {
        detail: 1
      });
    }
  },
  created: async function() {
    let gymnasiumInfo = await this.app.getStoreInfo();
    if (gymnasiumInfo.facility.includes("设施:")) {
      gymnasiumInfo.facility = gymnasiumInfo.facility.split("设施:")[1];
    }
    if (gymnasiumInfo.serve.includes("服务:")) {
      gymnasiumInfo.serve = gymnasiumInfo.serve.split("服务:")[1];
    }
    this.storeInfo = gymnasiumInfo;
    this.swiperList = this.storeInfo.gymnasiumImgList;
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_navbar2 + _easycom_u_icon2)();
}
const _easycom_u_navbar = () => "./node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_icon = () => "./node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false
    }),
    b: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    c: $data.indicatorDots,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.o((...args) => $options.appointmentVenue && $options.appointmentVenue(...args)),
    h: common_vendor.o((...args) => $options.toMine && $options.toMine(...args)),
    i: common_vendor.t($data.storeInfo.gymnasiumName),
    j: common_vendor.t($data.storeInfo.location),
    k: common_vendor.t($data.storeInfo.phone),
    l: common_vendor.p({
      name: "map-fill",
      color: "#409EFF"
    }),
    m: common_vendor.o((...args) => $options.toMap && $options.toMap(...args)),
    n: common_vendor.p({
      name: "phone-fill",
      color: "#409EFF"
    }),
    o: common_vendor.o((...args) => $options.toCall && $options.toCall(...args)),
    p: common_vendor.t($data.storeInfo.facility ? $data.storeInfo.facility.replace(/\\n/, "\n") : ""),
    q: common_vendor.t($data.storeInfo.serve ? $data.storeInfo.serve.replace(/\\n/, "\n") : ""),
    r: $data.viewHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/home/home.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
