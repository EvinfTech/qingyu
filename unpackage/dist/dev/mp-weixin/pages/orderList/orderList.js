"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      titleList: [{
        name: "全部"
      }, {
        name: "待支付"
      }, {
        name: "待使用"
      }],
      active: 0,
      waitPayedList: [],
      waitUsedList: [],
      orderList: [],
      scrollViewHeight: ""
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
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    onChange(e) {
      this.active = e.index;
      if (this.active == 0)
        ;
      else if (this.active == 1)
        ;
      else
        ;
    },
    calculate() {
      var screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      let that = this;
      that.scrollViewHeight = screenHeight - 88;
    },
    toDetail(e) {
      let order_no = e.currentTarget.dataset.item.order_no;
      common_vendor.index.navigateTo({
        url: "/pages/orderDetail/orderDetail?order_no=" + order_no
      });
    },
    toCancel(e) {
      Dialog.confirm({
        title: "取消订单",
        message: "确定要取消此订单?"
      }).then(() => {
        utils_request.request({
          url: "wx/cancel/order",
          method: "POST",
          data: {
            order_no: e.currentTarget.dataset.item.order_no
          }
        }).then(() => {
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
    initData() {
      utils_request.request({
        url: "wx/get/order/list",
        method: "POST",
        data: {
          user_ouid: app.globalData.userInfo.ouid
        }
      }).then((res) => {
        let orderList = res.data.reverse();
        orderList.forEach((con) => {
          con.siteNum = con.site_detail ? con.site_detail.length : 0;
          let hour = 0;
          con.site_detail = con.site_detail ? con.site_detail : [];
          con.site_detail.forEach((content) => {
            hour = hour + content.time_enum.length;
          });
          con.hour = hour;
        });
        this.orderList = orderList;
        let waitPayedList = this.orderList.filter((item) => item.status == "N");
        let waitUsedList = this.orderList.filter((item) => item.state == "Y");
        this.waitPayedList = waitPayedList;
        this.waitUsedList = waitUsedList;
      });
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  (_easycom_u_navbar2 + _easycom_u_tabs2 + _easycom_u_empty2 + _component_van_dialog)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_tabs + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "我的订单",
      safeAreaInsetTop: true,
      autoBack: true,
      fixed: false
    }),
    b: common_vendor.o($options.onChange),
    c: common_vendor.p({
      list: $data.titleList,
      lineColor: "#0077FF",
      lineWidth: "40"
    }),
    d: $data.active == 0
  }, $data.active == 0 ? common_vendor.e({
    e: $data.orderList.length == 0
  }, $data.orderList.length == 0 ? {
    f: common_vendor.p({
      text: "暂无订单"
    })
  } : {
    g: common_vendor.f($data.orderList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.status == "N"
      }, item.status == "N" ? {} : item.status == "Y" ? {} : item.status == "C" ? {} : {}, {
        c: item.status == "Y",
        d: item.status == "C",
        e: item.shop_avatar,
        f: common_vendor.t(item.shop_name),
        g: common_vendor.t(item.siteNum),
        h: common_vendor.t(item.hour),
        i: common_vendor.t(item.money),
        j: item.status == "C"
      }, item.status == "C" ? {
        k: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        l: item
      } : {}, {
        m: item.status == "N"
      }, item.status == "N" ? {
        n: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        o: item,
        p: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        q: item
      } : {}, {
        r: item.status == "Y"
      }, item.status == "Y" ? {
        s: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        t: item
      } : {}, {
        v: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        w: item,
        x: index1
      });
    })
  }, {
    h: common_vendor.n($data.orderList.length == 0 ? "emptyFlex" : ""),
    i: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";")
  }) : $data.active == 1 ? common_vendor.e({
    k: $data.waitPayedList.length == 0
  }, $data.waitPayedList.length == 0 ? {
    l: common_vendor.p({
      text: "暂无待支付订单"
    })
  } : {
    m: common_vendor.f($data.waitPayedList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.status == "N"
      }, item.status == "N" ? {} : item.status == "Y" ? {} : {}, {
        c: item.status == "Y",
        d: item.shop_avatar,
        e: common_vendor.t(item.shop_name),
        f: common_vendor.t(item.siteNum),
        g: common_vendor.t(item.hour),
        h: common_vendor.t(item.money),
        i: item.status == "N"
      }, item.status == "N" ? {
        j: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        k: item,
        l: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        m: item
      } : {}, {
        n: item.status == "Y"
      }, item.status == "Y" ? {
        o: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        p: item
      } : {}, {
        q: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        r: item,
        s: index1
      });
    })
  }, {
    n: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    o: common_vendor.n($data.waitPayedList.length == 0 ? "emptyFlex" : "")
  }) : common_vendor.e({
    p: $data.waitUsedList.length == 0
  }, $data.waitUsedList.length == 0 ? {
    q: common_vendor.p({
      text: "暂无待使用订单"
    })
  } : {
    r: common_vendor.f($data.waitUsedList, (item, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_no),
        b: item.status == "N"
      }, item.status == "N" ? {} : item.status == "Y" ? {} : item.status == "finished" || item.status == "refunded" ? {
        e: common_vendor.t(item.status == "finished" ? "已完成" : "已退款")
      } : {}, {
        c: item.status == "Y",
        d: item.status == "finished" || item.status == "refunded",
        f: item.shop_avatar,
        g: common_vendor.t(item.shop_name),
        h: common_vendor.t(item.siteNum),
        i: common_vendor.t(item.hour),
        j: common_vendor.t(item.price),
        k: item.status == "N"
      }, item.status == "N" ? {
        l: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        m: item
      } : {}, {
        n: item.status == "Y"
      }, item.status == "Y" ? {
        o: common_vendor.o((...args) => $options.toCancel && $options.toCancel(...args), index1),
        p: item
      } : {}, {
        q: item.status == "finished" || item.status == "refunded"
      }, item.status == "finished" || item.status == "refunded" ? {} : {}, {
        r: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        s: item,
        t: index1
      });
    })
  }, {
    s: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    t: common_vendor.n($data.waitUsedList.length == 0 ? "emptyFlex" : "")
  }), {
    j: $data.active == 1,
    v: common_vendor.p({
      id: "van-dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d51308d"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderList/orderList.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
