"use strict";
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const utils_util = require("./utils/util.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      swiperList: [],
      viewHeight: 0,
      storeInfo: {},
      venueReservationList: [],
      currentImgIndex: -1
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
      common_vendor.index.getSystemInfoSync();
      let query1 = common_vendor.index.createSelectorQuery().in(that);
      query1.select(".banner").boundingClientRect((bannerRect) => {
        let query2 = common_vendor.index.createSelectorQuery().in(that);
        query2.select(".navBox").boundingClientRect((navBoxRect) => {
          that.viewHeight = that.scrollViewHeight - bannerRect.height;
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
    },
    // 获取近7天可约场地
    getReservationInfo() {
      utils_request.request({
        url: "wx/get/shop/surplus/count",
        method: "POST",
        data: {
          date: utils_util.getNowDate("-")
        }
      }).then((res) => {
        let list = this.et7Days();
        let obj = res.data;
        list.forEach((item) => {
          item.residue = obj[`${item.date}`].count;
          item.basicPrice = obj[`${item.date}`].money / 100;
        });
        this.venueReservationList = list;
      });
    },
    et7Days() {
      let dateList = [];
      var now = /* @__PURE__ */ new Date();
      var nowTime = now.getTime();
      var oneDayTime = 86400 * 1e3;
      for (var i = 0; i < 7; i++) {
        var ShowTime = nowTime + i * oneDayTime;
        var myDate = new Date(ShowTime);
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        dateList.push({
          year,
          fullDate: year + "-" + utils_util.formatNumber(month) + "-" + utils_util.formatNumber(date),
          date: utils_util.formatNumber(month) + "-" + utils_util.formatNumber(date),
          day: i == 0 ? "今日" : "周" + "日一二三四五六".charAt(myDate.getDay()),
          residue: 5,
          basicPrice: 20
        });
      }
      return dateList;
    },
    // 去场地预约详情
    toDetail(e) {
      let date = e.fullDate;
      if (e.residue == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "暂无场地"
        });
        return false;
      }
      common_vendor.index.navigateTo({
        url: "/pages/reservationDetail/reservationDetail?date=" + date
      });
    },
    // 预览图片
    previewImg(e) {
      this.currentImgIndex = e;
      common_vendor.index.previewImage({
        urls: this.swiperList,
        current: e
      });
    }
  },
  created: async function() {
    let gymnasiumInfo = await this.app.getStoreInfo("reGet");
    if (gymnasiumInfo.facility.includes("设施:")) {
      gymnasiumInfo.facility = gymnasiumInfo.facility.split("设施:")[1];
    }
    if (gymnasiumInfo.serve.includes("服务:")) {
      gymnasiumInfo.serve = gymnasiumInfo.serve.split("服务:")[1];
    }
    this.storeInfo = gymnasiumInfo;
    this.swiperList = this.storeInfo.gymnasiumImgList;
    this.getReservationInfo();
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "./node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o(($event) => $options.previewImg(item), index),
        c: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: $data.storeInfo.shop_avatar,
    g: common_vendor.t($data.storeInfo.gymnasiumName),
    h: common_vendor.t($data.storeInfo.businessHours),
    i: common_vendor.p({
      name: "phone-fill"
    }),
    j: common_vendor.t($data.storeInfo.phone),
    k: common_vendor.o((...args) => $options.toCall && $options.toCall(...args)),
    l: common_vendor.p({
      name: "map-fill"
    }),
    m: common_vendor.t($data.storeInfo.location),
    n: common_vendor.o((...args) => $options.toMap && $options.toMap(...args)),
    o: $data.storeInfo.desc
  }, $data.storeInfo.desc ? {
    p: common_vendor.t($data.storeInfo.desc)
  } : {}, {
    q: $data.storeInfo.facility
  }, $data.storeInfo.facility ? {
    r: common_vendor.t($data.storeInfo.facility ? $data.storeInfo.facility.replace(/\\n/, "\n") : "")
  } : {}, {
    s: $data.storeInfo.serve
  }, $data.storeInfo.serve ? {
    t: common_vendor.t($data.storeInfo.serve ? $data.storeInfo.serve.replace(/\\n/, "\n") : "")
  } : {}, {
    v: common_vendor.f($data.venueReservationList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.day),
        b: common_vendor.t(item.date),
        c: common_vendor.n("venueReservationItemTop flex flex-direction align-center justify-center " + (item.residue == 0 ? "isFullBg" : "")),
        d: common_vendor.t(item.residue),
        e: common_vendor.s("margin-bottom: 12rpx;color: " + (item.residue == 0 ? "#5F5F5F" : "#0077FF")),
        f: common_vendor.t(item.basicPrice),
        g: common_vendor.n("venueReservationItem " + (item.residue == 0 ? "isFullBorder" : "")),
        h: common_vendor.o(($event) => $options.toDetail(item), index),
        i: index
      };
    }),
    w: $data.viewHeight + "px"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/home/home.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
