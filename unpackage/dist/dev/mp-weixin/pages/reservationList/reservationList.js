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
      //tab数据
      active: 0,
      //tab当前选中
      waitUsedList: [],
      //待使用列表
      alreadyUsedList: [],
      //已使用列表
      reservationList: [],
      //全部列表
      scrollViewHeight: "",
      //列表页高度
      j: "",
      con: {
        date: "",
        timeRange: ""
      },
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
      //控制全部列表 下拉刷新
      triggered1: false,
      //控制待使用列表 下拉刷新
      triggered2: false
      //控制已使用列表 下拉刷新
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
          this.searchInfo.status = "Y";
          if (this.waitUsedList.length == 0) {
            this.initData();
          }
          break;
        case 2:
          this.searchInfo.status = "U";
          if (this.alreadyUsedList.length == 0) {
            this.initData();
          }
          break;
      }
    },
    // 计算scroll-view高度
    calculate() {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var screenHeight = sysInfo.windowHeight;
      this.scrollViewHeight = screenHeight - 88 - sysInfo.statusBarHeight;
    },
    // 初始化数据
    async initData(type = "") {
      let userInfo = await this.app.getUserInfo();
      utils_request.request({
        url: "wx/get/my/reserve/list",
        method: "POST",
        data: {
          user_ouid: userInfo.ouid,
          page: this.active == 0 ? this.searchInfo.pageObj.firstPage : this.active == 1 ? this.searchInfo.pageObj.secondPage : this.searchInfo.pageObj.thirdPage,
          size: this.searchInfo.size,
          status: this.searchInfo.status
        }
      }).then(async (res) => {
        let enumInfo = await this.app.getEnum();
        let reservationList = res.data.list ? res.data.list : [];
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
                date: con.reserve_date,
                timeRange: enumInfo[contentItem]
              });
            });
          });
          con.siteNum = siteNum;
          con.hour = hour;
          con.timeList = timeList;
          con.shop_avatar = this.app.globalData.httpUrl + con.shop_avatar;
        });
        if (reservationList.length < 10 && type == "lower") {
          common_vendor.index.showToast({
            icon: "none",
            title: "没有更多数据了"
          });
        }
        switch (this.active) {
          case 0:
            this.reservationList = type == "refresh" ? reservationList : this.reservationList.concat(
              reservationList
            );
            this.triggered = false;
            break;
          case 1:
            this.waitUsedList = type == "refresh" ? reservationList : this.waitUsedList.concat(reservationList);
            this.triggered1 = false;
            break;
          case 2:
            this.alreadyUsedList = type == "refresh" ? reservationList : this.alreadyUsedList.concat(
              reservationList
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
    // 修改预约状态
    dealWithOrderState(order_no) {
      if (this.active == 0) {
        let index = this.reservationList.findIndex((item) => {
          return item.order_no == order_no;
        });
        if (index > -1) {
          this.reservationList[index].status = "C";
          let resI = this.waitUsedList.findIndex((item) => {
            return item.order_no == order_no;
          });
          if (resI > -1) {
            this.waitUsedList.splice(resI, 1);
          }
        }
      } else {
        let index = this.waitUsedList.findIndex((item) => {
          return item.order_no == order_no;
        });
        if (index > -1) {
          this.waitUsedList.splice(index, 1);
          let resI = this.reservationList.findIndex((item) => {
            return item.order_no == order_no;
          });
          if (resI > -1) {
            this.reservationList[resI].status = "C";
          }
        }
      }
    },
    // 去详情页
    toDetail(e) {
      let order_no = e.currentTarget.dataset.item.order_no;
      common_vendor.index.navigateTo({
        url: "/pages/reservationInfo/reservationInfo?order_no=" + order_no,
        events: {
          toChangeReservationState: (order_no2) => {
            this.dealWithOrderState(order_no2);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u_tabs2 + _easycom_u_empty2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u_tabs + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "我的预约",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o($options.onChange),
    e: common_vendor.p({
      list: $data.titleList,
      lineColor: "#0077FF",
      lineWidth: "40"
    }),
    f: $data.active == 0
  }, $data.active == 0 ? common_vendor.e({
    g: $data.reservationList.length == 0
  }, $data.reservationList.length == 0 ? {
    h: common_vendor.p({
      text: "暂无预约"
    })
  } : {
    i: common_vendor.f($data.reservationList, (item, index1, i0) => {
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
        f: item.status == "U"
      }, item.status == "U" ? {} : item.status == "Y" ? {} : item.status == "N" ? {} : item.status == "C" ? {} : {}, {
        g: item.status == "Y",
        h: item.status == "N",
        i: item.status == "C",
        j: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        k: item,
        l: item,
        m: index1,
        n: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1)
      });
    })
  }, {
    j: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    k: common_vendor.n($data.reservationList.length == 0 ? "emptyFlex" : ""),
    l: $data.triggered,
    m: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    n: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }) : $data.active == 1 ? common_vendor.e({
    p: $data.waitUsedList.length == 0
  }, $data.waitUsedList.length == 0 ? {
    q: common_vendor.p({
      text: "暂无待使用预约"
    })
  } : {
    r: common_vendor.f($data.waitUsedList, (item, index1, i0) => {
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
        i: index1,
        j: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1)
      };
    })
  }, {
    s: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    t: common_vendor.n($data.waitUsedList.length == 0 ? "emptyFlex" : ""),
    v: $data.triggered1,
    w: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    x: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }) : common_vendor.e({
    y: $data.alreadyUsedList.length == 0
  }, $data.alreadyUsedList.length == 0 ? {
    z: common_vendor.p({
      text: "暂无已使用预约"
    })
  } : {
    A: common_vendor.f($data.alreadyUsedList, (item, index1, i0) => {
      return {
        a: item.shop_avatar,
        b: common_vendor.t(item.shop_name),
        c: common_vendor.t(item.siteNum),
        d: common_vendor.t(item.hour),
        e: common_vendor.t(item.reservationTime),
        f: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1),
        g: item,
        h: item,
        i: index1,
        j: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index1)
      };
    })
  }, {
    B: common_vendor.s("height: " + ($data.scrollViewHeight + "px") + ";"),
    C: common_vendor.n($data.alreadyUsedList.length == 0 ? "emptyFlex" : ""),
    D: $data.triggered2,
    E: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    F: common_vendor.o((...args) => $options.lower && $options.lower(...args))
  }), {
    o: $data.active == 1
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e63185c"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/pages/reservationList/reservationList.vue"]]);
wx.createPage(MiniProgramPage);
