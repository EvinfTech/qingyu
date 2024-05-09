"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      show: false,
      order_no: "",
      code: "",
      codeImg: "",
      scrollViewHeight: 0,
      gymnasiumInfo: {
        name: "",
        address: "",
        img: "",
        sizteNo: 0,
        hour: 0,
        siteList: [],
        person: "",
        phone: "",
        createTime: "",
        status: "",
        siteNum: "",
        remark: ""
      }
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.$nextTick(() => {
      this.getNavBarHeight();
    });
    if (options.order_no) {
      this.order_no = options.order_no;
    }
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
    initData() {
      let enumInfo = this.app.globalData.enumInfo;
      utils_request.request({
        url: "wx/get/reserve/detail",
        method: "POST",
        data: {
          order_no: this.order_no
        }
      }).then((res) => {
        let data = res.data;
        let site_detail = data.site_detail ? data.site_detail : [];
        let siteList = [];
        let hour = 0;
        let siteNum = site_detail ? site_detail.length : 0;
        this.code = data.check_no;
        this.codeImg = this.app.globalData.httpUrl + data.check_qr;
        site_detail.forEach((item) => {
          item.time_enum.forEach((con) => {
            siteList.push({
              siteName: item.site_name,
              date: data.reserve_date,
              startTime: enumInfo[con].split("~")[0],
              endTime: enumInfo[con].split("~")[1]
            });
            hour = hour + 1;
          });
        });
        this.gymnasiumInfo.name = data.shop_name;
        this.gymnasiumInfo.address = data.shop_address;
        this.gymnasiumInfo.img = this.app.globalData.httpUrl + data.shop_avatar;
        this.gymnasiumInfo.person = data.user_name;
        this.gymnasiumInfo.phone = data.user_phone;
        this.gymnasiumInfo.createTime = data.gmt_creat_order;
        this.gymnasiumInfo.siteList = siteList;
        this.gymnasiumInfo.siteNum = siteNum;
        this.gymnasiumInfo.hour = hour;
        this.gymnasiumInfo.status = data.status;
        this.gymnasiumInfo.remark = data.remark;
      });
    },
    toCancel() {
      this.show = true;
    },
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    cancel() {
      this.show = false;
    },
    confirm() {
      utils_request.request({
        url: "wx/cancel/order",
        method: "POST",
        data: {
          order_no: this.order_no
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "取消成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            this.show = false;
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit("toChangeReservationState", this.order_no);
            setTimeout(() => {
              this.initData();
            }, 2e3);
          }
        });
      });
    },
    getNavBarHeight() {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var screenHeight = sysInfo.windowHeight;
      let that = this;
      let query = common_vendor.index.createSelectorQuery();
      query.select(".bottomBox").boundingClientRect((bottomRect) => {
        that.scrollViewHeight = screenHeight - 44 - bottomRect.height - sysInfo.statusBarHeight;
      }).exec();
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u_modal2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "预约信息",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: $data.codeImg,
    e: $data.gymnasiumInfo.status == "U" || $data.gymnasiumInfo.status == "C" ? "0.2" : "1",
    f: common_vendor.t($data.code),
    g: common_vendor.n($data.gymnasiumInfo.status == "U" || $data.gymnasiumInfo.status == "C" ? "disabledText" : "codeText"),
    h: $data.gymnasiumInfo.img,
    i: common_vendor.t($data.gymnasiumInfo.name),
    j: common_vendor.t($data.gymnasiumInfo.address),
    k: common_vendor.t($data.gymnasiumInfo.siteNum),
    l: common_vendor.t($data.gymnasiumInfo.hour),
    m: common_vendor.f($data.gymnasiumInfo.siteList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.siteName),
        b: common_vendor.t(item.date),
        c: common_vendor.t(item.startTime),
        d: common_vendor.t(item.endTime),
        e: index
      };
    }),
    n: common_vendor.t($data.gymnasiumInfo.person),
    o: common_vendor.t($data.gymnasiumInfo.phone),
    p: common_vendor.t($data.gymnasiumInfo.remark),
    q: common_vendor.t($data.gymnasiumInfo.createTime),
    r: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    s: $data.gymnasiumInfo.status == "C"
  }, $data.gymnasiumInfo.status == "C" ? {} : {}, {
    t: $data.gymnasiumInfo.status == "U"
  }, $data.gymnasiumInfo.status == "U" ? {} : {}, {
    v: $data.gymnasiumInfo.status != "U" && $data.gymnasiumInfo.status != "C"
  }, $data.gymnasiumInfo.status != "U" && $data.gymnasiumInfo.status != "C" ? {
    w: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args))
  } : {}, {
    x: common_vendor.o($options.confirm),
    y: common_vendor.o($options.cancel),
    z: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定要取消预约吗？",
      showCancelButton: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ba7f838c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationInfo/reservationInfo.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
