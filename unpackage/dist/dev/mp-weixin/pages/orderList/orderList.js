"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const mixins_pay = require("../../mixins/pay.js");
const _sfc_main = {
  mixins: [mixins_pay.payment],
  data() {
    return {
      show: false,
      app: getApp(),
      titleList: [{
        name: "全部"
      }, {
        name: "待支付"
      }, {
        name: "待使用"
      }],
      active: 0,
      waitPayedList: [],
      //等待支付列表
      waitUsedList: [],
      //等待使用列表
      order_no: "",
      //订单号
      orderList: [],
      //全部订单列表
      scrollViewHeight: "",
      //中间内容高度
      searchInfo: {
        pageObj: {
          firstPage: 1,
          secondPage: 1,
          thirdPage: 1
        },
        size: 10,
        status: ""
      },
      //搜索条件
      triggered: false,
      //控制全部 下拉刷新
      triggered1: false,
      //控制待支付 下拉刷新
      triggered2: false
      //控制待使用 下拉刷新
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
    this.$nextTick(() => {
      this.calculate();
    });
  },
  methods: {
    // tab栏切换
    onChange(e) {
      this.active = e.index;
      switch (e.index) {
        case 0:
          this.searchInfo.status = "";
          break;
        case 1:
          this.searchInfo.status = "N";
          if (this.waitPayedList.length == 0) {
            this.initData();
          }
          break;
        case 2:
          this.searchInfo.status = "Y";
          if (this.waitUsedList.length == 0) {
            this.initData();
          }
          break;
      }
    },
    // 计算中间内容高度
    calculate() {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var screenHeight = sysInfo.windowHeight;
      this.scrollViewHeight = screenHeight - 88 - sysInfo.statusBarHeight;
    },
    // 去订单详情
    toDetail(e) {
      let order_no = e.currentTarget.dataset.item.order_no;
      common_vendor.index.navigateTo({
        url: "/pages/orderDetail/orderDetail?order_no=" + order_no,
        events: {
          toChangeOrderState: (order_no2, type) => {
            this.dealWithOrderState(order_no2, type);
          }
        }
      });
    },
    // 取消 取消订单
    cancel() {
      this.show = false;
    },
    // 确定 取消订单
    confirm() {
      utils_request.request({
        url: "wx/cancel/order",
        method: "POST",
        data: {
          order_no: this.order_no
        }
      }).then(() => {
        common_vendor.index.showToast({
          title: "取消成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            this.dealWithOrderState(this.order_no, "C");
            this.show = false;
          }
        });
      });
    },
    // 取消订单
    toCancel(e) {
      this.show = true;
      this.order_no = e.currentTarget.dataset.item.order_no;
    },
    // 支付完成 或支付取消
    payComplete(type) {
      common_vendor.index.showToast({
        title: type == "success" ? "支付成功" : "支付取消",
        icon: "none",
        duration: 2e3,
        success: () => {
          if (type == "success") {
            this.dealWithOrderState(this.order_no, "Y");
          }
        }
      });
    },
    // 去支付
    toPay(e) {
      utils_request.request({
        url: "wx/pay",
        method: "POST",
        data: {
          order_no: e.currentTarget.dataset.item.order_no,
          type: "web"
        }
      }).then((res) => {
        this.order_no = e.currentTarget.dataset.item.order_no;
        this.wxPay(res.data.per_pay, this.payComplete);
      });
    },
    // 去使用
    toUse(e) {
      common_vendor.index.navigateTo({
        url: "/pages/reservationInfo/reservationInfo?order_no=" + e.currentTarget.dataset.item.order_no
      });
    },
    // 初始化数据
    async initData(type = "") {
      let userInfo = await this.app.getUserInfo();
      utils_request.request({
        url: "wx/get/order/list",
        method: "POST",
        data: {
          user_ouid: userInfo.ouid,
          page: this.active == 0 ? this.searchInfo.pageObj.firstPage : this.active == 1 ? this.searchInfo.pageObj.secondPage : this.searchInfo.pageObj.thirdPage,
          size: this.searchInfo.size,
          status: this.searchInfo.status
        }
      }).then((res) => {
        let orderList = res.data.list ? res.data.list : [];
        orderList.forEach((con) => {
          con.siteNum = con.site_detail ? con.site_detail.length : 0;
          let hour = 0;
          con.site_detail = con.site_detail ? con.site_detail : [];
          con.site_detail.forEach((content) => {
            hour = hour + content.time_enum.length;
          });
          con.shop_avatar = this.app.globalData.httpUrl + con.shop_avatar;
          con.hour = hour;
        });
        if (orderList.length < 10 && type == "lower") {
          common_vendor.index.showToast({
            icon: "none",
            title: "没有更多数据了"
          });
        }
        switch (this.active) {
          case 0:
            this.orderList = type == "refresh" ? orderList : this.orderList.concat(
              orderList
            );
            this.triggered = false;
            break;
          case 1:
            this.waitPayedList = type == "refresh" ? orderList : this.waitPayedList.concat(orderList);
            this.triggered1 = false;
            break;
          case 2:
            this.waitUsedList = type == "refresh" ? orderList : this.waitUsedList.concat(
              orderList
            );
            this.triggered2 = false;
            break;
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      switch (this.active) {
        case 0:
          this.searchInfo.pageObj.firstPage = 1;
          this.triggered = true;
          break;
        case 1:
          this.searchInfo.pageObj.secondPage = 1;
          this.triggered1 = true;
          break;
        case 2:
          this.searchInfo.pageObj.thirdPage = 1;
          this.triggered2 = true;
          break;
      }
      this.initData("refresh");
    },
    // 上拉加载
    lower() {
      switch (this.active) {
        case 0:
          this.searchInfo.pageObj.firstPage = this.searchInfo.pageObj.firstPage + 1;
          break;
        case 1:
          this.searchInfo.pageObj.secondPage = this.searchInfo.pageObj.secondPage + 1;
          break;
        case 2:
          this.searchInfo.pageObj.thirdPage = this.searchInfo.pageObj.thirdPage + 1;
          break;
      }
      this.initData("lower");
    },
    // 处理订单  取消 或者 支付成功
    dealWithOrderState(order_no, type) {
      if (this.active == 0) {
        let index = this.orderList.findIndex((item) => {
          return item.order_no == order_no;
        });
        if (index > -1) {
          if (type == "Y") {
            this.waitUsedList.unshift(this.orderList[index]);
            let resI = this.waitPayedList.findIndex((item) => {
              return item.order_no == order_no;
            });
            if (resI > -1) {
              this.waitPayedList.splice(resI, 1);
            }
          } else {
            if (this.orderList[index].status == "N") {
              let resI = this.waitPayedList.findIndex((item) => {
                return item.order_no == order_no;
              });
              if (resI > -1) {
                this.waitPayedList.splice(resI, 1);
              }
            } else if (this.orderList[index].status == "Y") {
              let resI1 = this.waitUsedList.findIndex((item) => {
                return item.order_no == order_no;
              });
              if (resI1 > -1) {
                this.waitPayedList.splice(resI1, 1);
              }
            }
          }
          this.orderList[index].status = type;
        }
      } else if (this.active == 1) {
        let index1 = this.waitPayedList.findIndex((item) => {
          return item.order_no == order_no;
        });
        if (index1 > -1) {
          this.waitPayedList[index1].status = type;
          let deleteItem = this.waitPayedList.splice(index1, 1);
          if (type == "Y") {
            this.waitUsedList.unshift(deleteItem[0]);
          } else {
            let resI = this.orderList.findIndex((item) => {
              return item.order_no == order_no;
            });
            if (resI > -1) {
              this.orderList[resI].status = "C";
            }
          }
        }
      } else {
        let index2 = this.waitUsedList.findIndex((item) => {
          return item.order_no == order_no;
        });
        if (index2 > -1) {
          this.waitUsedList.splice(index2, 1);
          let resI = this.orderList.findIndex((item) => {
            return item.order_no == order_no;
          });
          if (resI > -1) {
            this.orderList[resI].status = "C";
          }
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u_modal2 + _easycom_u_tabs2 + _easycom_u_empty2 + _component_van_dialog)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_u_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u_modal + _easycom_u_tabs + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "我的订单",
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
    g: common_vendor.o($options.onChange),
    h: common_vendor.p({
      list: $data.titleList,
      lineColor: "#0077FF",
      lineWidth: "40"
    }),
    i: $data.active == 0
  }, $data.active == 0 ? common_vendor.e({
    j: $data.orderList.length == 0
  }, $data.orderList.length == 0 ? {
    k: common_vendor.p({
      text: "暂无订单"
    })
  } : {
    l: common_vendor.f($data.orderList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.status == "N"
      }, item.status == "N" ? {} : item.status == "Y" ? {} : item.status == "C" ? {} : item.status == "U" ? {} : {}, {
        c: item.status == "Y",
        d: item.status == "C",
        e: item.status == "U",
        f: item.shop_avatar,
        g: common_vendor.t(item.shop_name),
        h: common_vendor.t(item.siteNum),
        i: common_vendor.t(item.hour),
        j: common_vendor.t(item.money / 100),
        k: item.status == "C" || item.status == "U"
      }, item.status == "C" || item.status == "U" ? {
        l: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        m: item
      } : {}, {
        n: item.status == "N"
      }, item.status == "N" ? {
        o: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        p: item,
        q: common_vendor.o((...args) => $options.toPay && $options.toPay(...args), index1),
        r: item
      } : {}, {
        s: item.status == "Y"
      }, item.status == "Y" ? {
        t: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        v: item,
        w: common_vendor.o((...args) => $options.toUse && $options.toUse(...args), index1),
        x: item
      } : {}, {
        y: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        z: item,
        A: index1,
        B: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1)
      });
    })
  }, {
    m: common_vendor.n($data.orderList.length == 0 ? "emptyFlex" : ""),
    n: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    o: $data.triggered,
    p: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    q: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }) : $data.active == 1 ? common_vendor.e({
    s: $data.waitPayedList.length == 0
  }, $data.waitPayedList.length == 0 ? {
    t: common_vendor.p({
      text: "暂无待支付订单"
    })
  } : {
    v: common_vendor.f($data.waitPayedList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.shop_avatar,
        c: common_vendor.t(item.shop_name),
        d: common_vendor.t(item.siteNum),
        e: common_vendor.t(item.hour),
        f: common_vendor.t(item.money / 100),
        g: item.status == "N"
      }, item.status == "N" ? {
        h: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        i: item,
        j: common_vendor.o((...args) => $options.toPay && $options.toPay(...args), index1),
        k: item
      } : {}, {
        l: item.status == "Y"
      }, item.status == "Y" ? {
        m: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        n: item,
        o: common_vendor.o((...args) => $options.toUse && $options.toUse(...args), index1),
        p: item
      } : {}, {
        q: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        r: item,
        s: index1,
        t: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1)
      });
    })
  }, {
    w: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    x: common_vendor.n($data.waitPayedList.length == 0 ? "emptyFlex" : ""),
    y: $data.triggered1,
    z: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    A: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }) : common_vendor.e({
    B: $data.waitUsedList.length == 0
  }, $data.waitUsedList.length == 0 ? {
    C: common_vendor.p({
      text: "暂无待使用订单"
    })
  } : {
    D: common_vendor.f($data.waitUsedList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.shop_avatar,
        c: common_vendor.t(item.shop_name),
        d: common_vendor.t(item.siteNum),
        e: common_vendor.t(item.hour),
        f: common_vendor.t(item.money / 100),
        g: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        h: item,
        i: common_vendor.o((...args) => $options.toUse && $options.toUse(...args), index1),
        j: item,
        k: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        l: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        m: item,
        n: index1
      });
    })
  }, {
    E: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    F: common_vendor.n($data.waitUsedList.length == 0 ? "emptyFlex" : ""),
    G: $data.triggered2,
    H: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    I: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }), {
    r: $data.active == 1,
    J: common_vendor.p({
      id: "van-dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d51308d"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderList/orderList.vue"]]);
wx.createPage(MiniProgramPage);
