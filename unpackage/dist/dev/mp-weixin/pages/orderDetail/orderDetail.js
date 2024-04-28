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
        name: "我看看怎么个事",
        phone: "0532-8186886",
        location: "青岛市黄岛区金石国际北楼1611",
        latitude: "",
        longitude: ""
      },
      sessionList: [
        {
          siteNo: 1,
          date: "2023-08-08",
          timeRange: "11:00-12:00",
          hour: 3,
          price: 300
        },
        {
          siteNo: 3,
          date: "2023-08-08",
          timeRange: "11:00-12:00",
          hour: 3,
          price: 300
        }
      ],
      orderTime: "2023-08-08 00:12:56",
      //下单时间
      payTime: "2023-08-08 00:12:56",
      totalPrice: 500,
      //总价
      payState: "",
      //支付状态 wait 等待支付  payed 已支付 justPayed 刚刚支付
      code: 812356,
      //验证码
      //scrollview高度
      scrollViewHeight: 0,
      con: {
        date: "",
        timeRange: ""
      }
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.order_no = options.order_no;
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
    initData() {
      let enumInfo = this.app.globalData.enumInfo;
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
              date: data.gmt_create,
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
        if (this.payState != "payed" && this.payState != "justPayed") {
          let query2 = common_vendor.index.createSelectorQuery();
          query2.select(".bottomBox").boundingClientRect((bottomRect) => {
            that.scrollViewHeight = screenHeight - navRect.height - bottomRect.height;
          }).exec();
        } else {
          that.scrollViewHeight = screenHeight - navRect.height;
        }
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
    cancelOrder() {
      Dialog.confirm({
        title: "取消订单",
        message: "确定要取消此订单?"
      }).then(() => {
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
              setTimeout(() => {
                this.initData();
              }, 2e3);
            }
          });
        });
      }).catch(() => {
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
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _component_van_dialog)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: $data.detailType == "add" ? "确认订单" : "订单详情",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: $data.detailType == "detail" && $data.payState == "wait"
  }, $data.detailType == "detail" && $data.payState == "wait" ? {} : {}, {
    e: $data.payState == "payed" || $data.payState == "justPayed"
  }, $data.payState == "payed" || $data.payState == "justPayed" ? common_vendor.e({
    f: $data.payState == "justPayed"
  }, $data.payState == "justPayed" ? {} : {}, {
    g: common_vendor.t($data.code),
    h: common_vendor.s("height: " + ($data.payState == "payed" ? "400rpx" : "484rpx") + ";")
  }) : {}, {
    i: common_vendor.t($data.gymnasiumInfo.name),
    j: common_vendor.t($data.gymnasiumInfo.phone),
    k: common_vendor.o((...args) => $options.toCall && $options.toCall(...args)),
    l: common_vendor.t($data.gymnasiumInfo.location),
    m: common_vendor.o((...args) => $options.toMap && $options.toMap(...args)),
    n: common_vendor.f($data.sessionList, (item, index, i0) => {
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
    o: common_vendor.t($data.sessionList.length),
    p: common_vendor.t($data.totalPrice / 100),
    q: common_vendor.t($data.order_no),
    r: common_vendor.o((...args) => $options.tocopy && $options.tocopy(...args)),
    s: common_vendor.t($data.orderTime),
    t: $data.payState == "payed"
  }, $data.payState == "payed" ? {
    v: common_vendor.t($data.orderTime)
  } : {}, {
    w: $data.payState != "payed" && $data.payState != "justPayed"
  }, $data.payState != "payed" && $data.payState != "justPayed" ? {} : {}, {
    x: $data.payState != "payed" && $data.payState != "justPayed"
  }, $data.payState != "payed" && $data.payState != "justPayed" ? common_vendor.e({
    y: common_vendor.t($data.totalPrice / 100),
    z: $data.payState == "N"
  }, $data.payState == "N" ? {
    A: common_vendor.o((...args) => $options.cancelOrder && $options.cancelOrder(...args))
  } : {}, {
    B: $data.payState == "N"
  }, $data.payState == "N" ? {} : $data.payState == "C" ? {} : {}, {
    C: $data.payState == "C"
  }) : {}, {
    D: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    E: common_vendor.p({
      id: "van-dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1353b6cf"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderDetail/orderDetail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
