"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      order_no: "",
      detailType: "",
      //订单详情类型
      gymnasiumInfo: {
        name: "",
        phone: "",
        location: "",
        latitude: "",
        longitude: ""
      },
      show: false,
      sessionList: [],
      orderTime: "",
      //下单时间
      payTime: "",
      totalPrice: 0,
      //总价
      payState: "",
      code: 812356,
      //验证码
      //scrollview高度
      scrollViewHeight: 0,
      con: {
        date: "",
        timeRange: ""
      },
      type: ""
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.order_no = options.order_no;
    this.type = options.type ? options.type : "";
    this.detailType = options.type;
    this.$nextTick(() => {
      this.getNavBarHeight();
    });
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
    async initData() {
      let enumInfo = await this.app.getEnum();
      utils_request.request({
        url: "wx/get/order/detail",
        method: "POST",
        data: {
          order_no: this.order_no
        }
      }).then((res) => {
        let data = res.data;
        let site_detail = data.site_detail ? data.site_detail : [];
        let sessionList = [];
        site_detail.forEach((con) => {
          let timeList = [];
          con.time_enum.forEach((content) => {
            timeList.push({
              date: data.reserve_date,
              timeRange: enumInfo[content]
            });
          });
          sessionList.push({
            hour: con.time_enum.length,
            price: con.money,
            siteName: con.site_name,
            timeList
          });
        });
        this.gymnasiumInfo.name = data.shop_name;
        this.gymnasiumInfo.phone = data.shop_phone;
        this.gymnasiumInfo.location = data.shop_address;
        this.gymnasiumInfo.latitude = data.latitude;
        this.gymnasiumInfo.longitude = data.longitude;
        this.orderTime = data.gmt_creat_order;
        this.payTime = data.gmt_pay;
        this.totalPrice = data.money;
        this.payState = data.status;
        this.sessionList = sessionList;
      });
    },
    getNavBarHeight() {
      var screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      let that = this;
      let query = common_vendor.index.createSelectorQuery();
      query.select(".nav-bar").boundingClientRect((navRect) => {
        let query2 = common_vendor.index.createSelectorQuery();
        query2.select(".bottomBox").boundingClientRect((bottomRect) => {
          that.scrollViewHeight = screenHeight - navRect.height - bottomRect.height;
        }).exec();
      }).exec();
    },
    // 打电话
    toCall() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.gymnasiumInfo.phone
        //仅为示例，并非真实的电话号码
      });
    },
    // 地图位置
    toMap() {
      common_vendor.index.openLocation({
        latitude: this.gymnasiumInfo.latitude,
        longitude: this.gymnasiumInfo.longitude,
        scale: 18,
        name: this.gymnasiumInfo.location
      });
    },
    // 复制订单编号
    tocopy() {
      common_vendor.index.setClipboardData({
        data: this.order_no
      });
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
      }).then(() => {
        this.payState = "C";
        common_vendor.index.showToast({
          title: "取消成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            this.show = false;
            if (!this.type) {
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit("toChangeOrderState", this.order_no, "C");
            }
            setTimeout(() => {
              this.initData();
            }, 2e3);
          }
        });
      });
    },
    cancelOrder() {
      this.show = true;
    },
    // 去支付
    toPay() {
      utils_request.request({
        url: "wx/pay",
        method: "POST",
        data: {
          order_no: this.order_no
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            if (!this.type) {
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit("toChangeOrderState", this.order_no, "Y");
            }
            setTimeout(() => {
              this.initData();
            }, 2e3);
          }
        });
      });
    },
    // 去使用
    toUse() {
      common_vendor.index.navigateTo({
        url: "/pages/reservationInfo/reservationInfo?order_no=" + this.order_no
      });
    },
    onClickLeft() {
      common_vendor.index.navigateBack();
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
    a: common_vendor.o(($event) => $data.app.toBack($data.type ? 2 : 1)),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: $data.detailType == "add" ? "确认订单" : "订单详情",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o($options.confirm),
    e: common_vendor.o($options.cancel),
    f: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定要取消此订单？",
      showCancelButton: true
    }),
    g: $data.detailType == "detail" && $data.payState == "N"
  }, $data.detailType == "detail" && $data.payState == "N" ? {} : {}, {
    h: common_vendor.t($data.gymnasiumInfo.name),
    i: common_vendor.t($data.gymnasiumInfo.phone),
    j: common_vendor.o((...args) => $options.toCall && $options.toCall(...args)),
    k: common_vendor.t($data.gymnasiumInfo.location),
    l: common_vendor.o((...args) => $options.toMap && $options.toMap(...args)),
    m: common_vendor.f($data.sessionList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.siteName),
        b: common_vendor.t(item.hour),
        c: common_vendor.f(item.timeList, (con, j, i1) => {
          return {
            a: common_vendor.t(con.date),
            b: common_vendor.t(con.timeRange),
            c: j
          };
        }),
        d: common_vendor.t(item.price / 100),
        e: index
      };
    }),
    n: common_vendor.t($data.sessionList.length),
    o: common_vendor.t($data.totalPrice / 100),
    p: common_vendor.t($data.order_no),
    q: common_vendor.o((...args) => $options.tocopy && $options.tocopy(...args)),
    r: common_vendor.t($data.orderTime),
    s: $data.payState == "Y"
  }, $data.payState == "Y" ? {
    t: common_vendor.t($data.payTime)
  } : {}, {
    v: $data.payState == "N"
  }, $data.payState == "N" ? {} : {}, {
    w: common_vendor.t($data.totalPrice / 100),
    x: $data.payState == "N" || $data.payState == "Y"
  }, $data.payState == "N" || $data.payState == "Y" ? {
    y: common_vendor.o((...args) => $options.cancelOrder && $options.cancelOrder(...args))
  } : {}, {
    z: $data.payState == "Y"
  }, $data.payState == "Y" ? {
    A: common_vendor.o((...args) => $options.toUse && $options.toUse(...args))
  } : {}, {
    B: $data.payState == "N"
  }, $data.payState == "N" ? {
    C: common_vendor.o((...args) => $options.toPay && $options.toPay(...args))
  } : $data.payState == "C" ? {} : {}, {
    D: $data.payState == "C",
    E: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1353b6cf"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderDetail/orderDetail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
