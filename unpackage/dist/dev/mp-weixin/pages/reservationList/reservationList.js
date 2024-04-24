"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      titleList: [{
        name: "全部"
      }, {
        name: "待使用"
      }, {
        name: "已使用"
      }],
      active: 0,
      waitUsedList: [],
      alreadyUsedList: [],
      reservationList: [],
      scrollViewHeight: "",
      j: "",
      con: {
        date: "",
        timeRange: ""
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
    toDetail(e) {
      let order_no = e.currentTarget.dataset.item.order_no;
      common_vendor.index.navigateTo({
        url: "/pages/reservationInfo/reservationInfo?order_no=" + order_no
      });
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
      this.scrollViewHeight = screenHeight - 88;
    },
    initData() {
      this.app.globalData.enumInfo;
      utils_request.request({
        url: "wx/get/my/reserve/list",
        method: "POST",
        data: {
          user_ouid: this.app.globalData.userInfo.ouid
        }
      }).then((res) => {
        let enumInfo = this.app.globalData.enumInfo;
        let reservationList = res.data.reverse();
        reservationList.forEach((con) => {
          let siteNum = 0;
          let hour = 0;
          let timeList = [];
          con.site_detail = con.site_detail ? con.site_detail : [];
          con.site_detail.forEach((content) => {
            siteNum = siteNum + 1;
            hour = content.time_enum.length + hour;
            content.time_enum.forEach((contentItem) => {
              timeList.push({
                date: con.gmt_create,
                timeRange: enumInfo[contentItem]
              });
            });
          });
          con.siteNum = siteNum;
          con.hour = hour;
          con.timeList = timeList;
        });
        this.reservationList = reservationList;
        let waitUsedList = this.reservationList.filter((item) => item.status == "Y");
        let alreadyUsedList = this.reservationList.filter((item) => item.status == "finished");
        this.waitUsedList = waitUsedList;
        this.alreadyUsedList = alreadyUsedList;
      });
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_u_navbar2 + _easycom_u_tabs2 + _easycom_u_empty2)();
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
      title: "我的预约",
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
    e: $data.reservationList.length == 0
  }, $data.reservationList.length == 0 ? {
    f: common_vendor.p({
      text: "暂无预约"
    })
  } : {
    g: common_vendor.f($data.reservationList, (item, index1, i0) => {
      return common_vendor.e({
        a: item.shop_avatar,
        b: common_vendor.t(item.shop_name),
        c: common_vendor.t(item.siteNum),
        d: common_vendor.t(item.hour),
        e: common_vendor.f(item.timeList, (con, j, i1) => {
          return {
            a: common_vendor.t(con.date),
            b: common_vendor.t(con.timeRange),
            c: j
          };
        }),
        f: item.status == "finished"
      }, item.status == "finished" ? {} : item.status == "Y" ? {} : item.status == "N" ? {} : item.status == "C" ? {} : {}, {
        g: item.status == "Y",
        h: item.status == "N",
        i: item.status == "C",
        j: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        k: item,
        l: item,
        m: index1
      });
    })
  }, {
    h: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    i: common_vendor.n($data.reservationList.length == 0 ? "emptyFlex" : "")
  }) : $data.active == 1 ? common_vendor.e({
    k: $data.waitUsedList.length == 0
  }, $data.waitUsedList.length == 0 ? {
    l: common_vendor.p({
      text: "暂无待使用预约"
    })
  } : {
    m: common_vendor.f($data.waitUsedList, (item, index1, i0) => {
      return {
        a: item.shop_avatar,
        b: common_vendor.t(item.shop_name),
        c: common_vendor.t(item.siteNum),
        d: common_vendor.t(item.hour),
        e: common_vendor.f(item.timeList, (con, j, i1) => {
          return {
            a: common_vendor.t(con.date),
            b: common_vendor.t(con.timeRange),
            c: j
          };
        }),
        f: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        g: item,
        h: item,
        i: index1
      };
    })
  }, {
    n: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    o: common_vendor.n($data.waitUsedList.length == 0 ? "emptyFlex" : "")
  }) : common_vendor.e({
    p: $data.alreadyUsedList.length == 0
  }, $data.alreadyUsedList.length == 0 ? {
    q: common_vendor.p({
      text: "暂无已使用预约"
    })
  } : {
    r: common_vendor.f($data.alreadyUsedList, (item, index1, i0) => {
      return {
        a: item.shop_avatar,
        b: common_vendor.t(item.shop_name),
        c: common_vendor.t(item.siteNum),
        d: common_vendor.t(item.hour),
        e: common_vendor.t(item.reservationTime),
        f: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        g: item,
        h: item,
        i: index1
      };
    })
  }, {
    s: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    t: common_vendor.n($data.alreadyUsedList.length == 0 ? "emptyFlex" : "")
  }), {
    j: $data.active == 1
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e63185c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationList/reservationList.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
