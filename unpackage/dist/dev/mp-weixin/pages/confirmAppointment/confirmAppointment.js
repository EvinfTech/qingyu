"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const mixins_pay = require("../../mixins/pay.js");
const _sfc_main = {
  mixins: [mixins_pay.payment],
  data() {
    return {
      app: getApp(),
      centerHeight: 0,
      orderInfo: {},
      gymnasiumInfo: {},
      userName: "",
      phone: "",
      remark: "",
      userInfo: {},
      sessionList: [],
      show: false,
      order_no: ""
    };
  },
  async onLoad() {
    let orderInfo = common_vendor.index.getStorageSync("orderInfo");
    orderInfo = JSON.parse(orderInfo);
    this.orderInfo = orderInfo;
    this.gymnasiumInfo = await this.app.getStoreInfo();
    this.userInfo = await this.app.getUserInfo();
    let enumInfo = await this.app.getEnum();
    this.userName = this.userInfo.name;
    this.phone = this.userInfo.phone;
    let sessionList = [];
    let site_detail = orderInfo.site_detail;
    site_detail.forEach((con) => {
      let timeList = [];
      con.time_enum.forEach((content) => {
        timeList.push({
          date: orderInfo.gmt_site_use,
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
    this.sessionList = sessionList;
  },
  onReady() {
    this.$nextTick(() => {
      this.calculate();
    });
  },
  onShow() {
  },
  methods: {
    calculate() {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var screenHeight = sysInfo.windowHeight;
      this.centerHeight = screenHeight - 122 - sysInfo.statusBarHeight;
    },
    // 确认支付
    ensurePay() {
      utils_request.request({
        url: "wx/add/order",
        method: "POST",
        data: {
          user_ouid: this.userInfo.ouid,
          //用户ouid
          site_detail: this.orderInfo.site_detail,
          gmt_site_use: this.orderInfo.gmt_site_use,
          reserve_name: this.userName,
          reserve_phone: this.phone,
          remark: this.remark
        }
      }).then((res) => {
        if (res.msg == "操作成功") {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "none",
            duration: 2e3,
            success: () => {
              setTimeout(() => {
                this.order_no = res.data.order;
                this.confirm();
              }, 2e3);
            }
          });
        } else {
          common_vendor.index.showToast({
            title: res.msg + ",请重选",
            icon: "none"
          });
          setTimeout(() => {
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit("updateSiteInfo", res.data.site);
            setTimeout(() => {
              this.app.toBack();
            }, 200);
          }, 1500);
        }
      });
    },
    // 确定支付订单
    confirm() {
      utils_request.request({
        url: "wx/pay",
        method: "POST",
        data: {
          order_no: this.order_no,
          type: "web"
        }
      }).then((res) => {
        this.wxPay(res.data.per_pay, this.payComplete);
      });
    },
    // 取消支付
    cancel() {
      this.show = false;
      common_vendor.index.removeStorageSync("orderInfo");
      common_vendor.index.redirectTo({
        url: "/pages/orderDetail/orderDetail?order_no=" + this.order_no + "&type=new"
      });
    },
    // 支付完成 或支付取消
    payComplete(type) {
      common_vendor.index.showToast({
        title: type == "success" ? "支付成功" : "支付取消",
        icon: "none",
        duration: 2e3,
        success: () => {
          setTimeout(() => {
            common_vendor.index.removeStorageSync("orderInfo");
            common_vendor.index.redirectTo({
              url: "/pages/orderDetail/orderDetail?order_no=" + this.order_no + "&type=new"
            });
          }, 2e3);
        }
      });
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
  return {
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false,
      title: "确认预约",
      autoBack: false
    }),
    d: $data.userName,
    e: common_vendor.o(($event) => $data.userName = $event.detail.value),
    f: $data.phone,
    g: common_vendor.o(($event) => $data.phone = $event.detail.value),
    h: $data.remark,
    i: common_vendor.o(($event) => $data.remark = $event.detail.value),
    j: common_vendor.t($data.gymnasiumInfo.gymnasiumName),
    k: common_vendor.t($data.gymnasiumInfo.businessHours),
    l: common_vendor.t($data.gymnasiumInfo.phone),
    m: common_vendor.t($data.gymnasiumInfo.location),
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
    p: common_vendor.t($data.orderInfo.totalPrice),
    q: common_vendor.s("height: " + ($data.centerHeight + "px") + ";"),
    r: common_vendor.t($data.orderInfo.totalPrice),
    s: common_vendor.o((...args) => $options.ensurePay && $options.ensurePay(...args)),
    t: common_vendor.o($options.confirm),
    v: common_vendor.o($options.cancel),
    w: common_vendor.p({
      show: $data.show,
      title: "提示",
      content: "确定支付订单？",
      showCancelButton: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2139706a"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/confirmAppointment/confirmAppointment.vue"]]);
wx.createPage(MiniProgramPage);
