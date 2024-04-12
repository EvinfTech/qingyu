"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      gymnasiumInfo: {
        gymnasiumImg: "/static/images/home/gymnasiumPhoto.png",
        gymnasiumName: "我看看怎么个事",
        latitude: "",
        longitude: "",
        phone: "0532-8186886",
        location: "青岛市黄岛区金石国际北楼1611",
        businessHours: "周一至周日 07:00-22:00",
        distance: 200,
        siteNum: 10,
        floor: "木龙骨地板",
        facilities: ["停车场", "空调", "更衣室"],
        currentImgIndex: -1,
        gymnasiumImgList: [
          "https://img1.baidu.com/it/u=1087984015,2094611444&fm=253&fmt=auto&app=138&f=JPEG?w=707&h=500",
          "https://img2.baidu.com/it/u=2663528246,3127026870&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff775610c-310c-4f5a-9ae4-94bdc145c7e6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701845453&t=9030131f1e5a2ea40630a08433886371"
        ],
        hardwareFacilities: [],
        venueReservationList: []
      }
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
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
    // 初始化数据
    async initData() {
      this.gymnasiumInfo = await app.getStoreInfo();
      this.getReservationInfo();
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
          item.basicPrice = obj[`${item.date}`].money;
        });
        this.gymnasiumInfo.venueReservationList = list;
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
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    // 预览图片
    previewImg(e) {
      this.gymnasiumInfo.currentImgIndex = e.currentTarget.dataset.item;
      common_vendor.index.previewImage({
        urls: this.gymnasiumInfo.gymnasiumImgList,
        current: e.currentTarget.dataset.item
      });
    },
    // 去相册
    toAlbum() {
      common_vendor.index.setStorageSync("album", JSON.stringify(this.gymnasiumInfo.gymnasiumImgList));
      common_vendor.index.navigateTo({
        url: "/pages/album/album"
      });
    },
    // 打电话
    toCall() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.gymnasiumInfo.phone
      });
    },
    // 地图位置
    toMap() {
      var that = this;
      common_vendor.index.openLocation({
        latitude: that.gymnasiumInfo.latitude,
        longitude: that.gymnasiumInfo.longitude,
        scale: 18,
        name: this.gymnasiumInfo.location
      });
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
    // 去报错
    toErrorReport() {
      common_vendor.index.navigateTo({
        url: "/pages/errorReport/errorReport"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_navbar2 + _component_van_icon + _easycom_u_icon2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false,
      title: "球馆信息",
      autoBack: true
    }),
    b: common_vendor.t($data.gymnasiumInfo.gymnasiumName),
    c: common_vendor.f($data.gymnasiumInfo.gymnasiumImgList, (item, index, i0) => {
      return {
        a: item,
        b: index,
        c: common_vendor.o((...args) => $options.previewImg && $options.previewImg(...args), index),
        d: index
      };
    }),
    d: common_vendor.p({
      name: "arrow"
    }),
    e: common_vendor.o((...args) => $options.toAlbum && $options.toAlbum(...args)),
    f: common_vendor.t($data.gymnasiumInfo.phone),
    g: common_vendor.o((...args) => $options.toCall && $options.toCall(...args)),
    h: common_vendor.t($data.gymnasiumInfo.businessHours),
    i: common_vendor.t($data.gymnasiumInfo.location),
    j: common_vendor.o((...args) => $options.toMap && $options.toMap(...args)),
    k: common_vendor.f($data.gymnasiumInfo.hardwareFacilities, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: item.icon
      } : {}, {
        c: common_vendor.t(item.text),
        d: index
      });
    }),
    l: common_vendor.f($data.gymnasiumInfo.venueReservationList, (item, index, i0) => {
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
    m: common_vendor.p({
      name: "arrow-right",
      size: "16px"
    }),
    n: common_vendor.o((...args) => $options.toErrorReport && $options.toErrorReport(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-de38ef79"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/gymnasiumInfo/gymnasiumInfo.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
