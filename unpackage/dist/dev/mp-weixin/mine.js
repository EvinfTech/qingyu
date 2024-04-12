"use strict";
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const app = getApp();
const _sfc_main = {
  data() {
    return {
      topHeight: 0,
      userInfo: {},
      nickName: "",
      avatar: "",
      phone: "",
      statisticsList: [
        {
          title: "运动时长",
          num: 0
        },
        {
          title: "累计天数",
          num: 0
        },
        {
          title: "连续天数",
          num: 0
        }
      ],
      reservationInfo: [],
      serviceList: [
        {
          icon: "/static/images/mine/orderIcon.svg",
          title: "我的订单"
        },
        {
          icon: "/static/images/mine/orderIcon.svg",
          title: "我的预约"
        },
        {
          icon: "/static/images/mine/setIcon.svg",
          title: "设置"
        },
        {
          icon: "/static/images/mine/agreementIcon.svg",
          title: "意见反馈"
        },
        {
          icon: "/static/images/mine/contactIcon.svg",
          title: "联系客服"
        }
      ],
      num: "",
      con: {
        siteNo: "",
        startTime: "",
        endTime: "",
        title: "",
        icon: ""
      }
    };
  },
  async mounted() {
    this.$nextTick(() => this.ready());
    let userInfo = await app.getUserInfo();
    this.userInfo = userInfo;
    this.statisticsList[0].num = userInfo.total_length;
    this.statisticsList[1].num = userInfo.sport_day;
    this.statisticsList[2].num = userInfo.total_count;
  },
  methods: {
    ready() {
      this.getTopHeight();
      this.getRecentlyReserve();
    },
    // 处理日期
    dealWithDate(date) {
      const date1 = new Date(date);
      const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let day = weekdays[date1.getDay()];
      let date2 = "";
      let dateArr = date.split("-");
      if (dateArr[0] == (/* @__PURE__ */ new Date()).getFullYear()) {
        date2 = dateArr[1] + "-" + dateArr[2];
      } else {
        date2 = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
      }
      return {
        date: date2,
        day
      };
    },
    handleContact(e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    },
    // 获取最近的预约信息
    getRecentlyReserve() {
      let enumInfo = app.globalData.enumInfo;
      utils_request.request({
        url: "wx/recently/reserve",
        method: "POST",
        data: {
          user_ouid: app.globalData.userInfo.ouid
        }
      }).then((res) => {
        let data = res.data;
        let date = data.data.slice(0, 10);
        let dateInfo = this.dealWithDate(date);
        let reservationInfo = [];
        let siteList = [];
        let site_detail = data.site_detail;
        if (site_detail) {
          site_detail.forEach((item) => {
            item.time_enum.forEach((enumCon) => {
              siteList.push({
                siteNo: item.site_name,
                startTime: enumInfo[enumCon].split("~")[0],
                endTime: enumInfo[enumCon].split("~")[1]
              });
            });
          });
          reservationInfo.push({
            gymnasiumName: data.shop_name,
            date: dateInfo.date,
            day: dateInfo.day,
            order_no: data.order_no,
            siteList
          });
        } else {
          reservationInfo = [];
        }
        this.reservationInfo = reservationInfo;
      });
    },
    toDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/reservationInfo/reservationInfo?order_no=" + this.reservationInfo[0].order_no
      });
    },
    getTopHeight() {
      let res = common_vendor.index.getSystemInfoSync();
      let buttonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      let navBarHeight = (buttonInfo.top - res.statusBarHeight) * 2 + buttonInfo.height + res.statusBarHeight;
      this.topHeight = navBarHeight;
    },
    toReservationList() {
      common_vendor.index.navigateTo({
        url: "/pages/reservationList/reservationList"
      });
    },
    toInfoEdit() {
      common_vendor.index.navigateTo({
        url: "/pages/infoEdit/infoEdit"
      });
    },
    chooseServiceItem(e) {
      let url = "";
      switch (e.currentTarget.dataset.item) {
        case 0:
          url = "/pages/orderList/orderList";
          break;
        case 1:
          url = "/pages/reservationList/reservationList";
          break;
        case 2:
          url = "/pages/settings/settings";
          break;
        case 3:
          url = "/pages/feedback/feedback";
          break;
        case 4:
          common_vendor.index.openCustomerServiceChat({
            extInfo: {
              url: ""
            },
            corpId: "",
            success(res) {
            }
          });
          break;
      }
      common_vendor.index.navigateTo({
        url
      });
    },
    chooseServiceItem1(e) {
      let url = "";
      switch (e.currentTarget.dataset.item) {
        case 0:
          url = "/pages/releaseActivity/releaseActivity";
          break;
        case 1:
          url = "/pages/publicationList/publicationList";
          break;
        case 2:
          url = "/pages/income/income";
          break;
      }
      common_vendor.index.navigateTo({
        url
      });
    },
    chooseServiceItem2(e) {
      let url = "";
      switch (e.currentTarget.dataset.item) {
      }
      common_vendor.index.navigateTo({
        url
      });
    }
  },
  created: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar,
    b: common_vendor.t($data.userInfo.name),
    c: common_vendor.t($data.userInfo.phone ? "+86-" + $data.userInfo.phone : ""),
    d: common_vendor.o((...args) => $options.toInfoEdit && $options.toInfoEdit(...args)),
    e: common_vendor.o((...args) => $options.toInfoEdit && $options.toInfoEdit(...args)),
    f: common_vendor.f($data.statisticsList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.num),
        b: common_vendor.t(item.title),
        c: index
      };
    }),
    g: common_vendor.o((...args) => $options.toReservationList && $options.toReservationList(...args)),
    h: $data.reservationInfo.length > 0
  }, $data.reservationInfo.length > 0 ? {
    i: common_vendor.f($data.reservationInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.gymnasiumName),
        b: common_vendor.t(item.day),
        c: common_vendor.t(item.date),
        d: common_vendor.f(item.siteList, (con, j, i1) => {
          return {
            a: common_vendor.t(con.siteNo),
            b: common_vendor.t(con.startTime),
            c: common_vendor.t(con.endTime),
            d: j
          };
        }),
        e: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args), index),
        f: index
      };
    })
  } : {}, {
    j: common_vendor.f($data.serviceList, (con, j, i0) => {
      return common_vendor.e({
        a: con.title == "联系客服"
      }, con.title == "联系客服" ? {
        b: con.icon,
        c: common_vendor.t(con.title),
        d: common_vendor.o((...args) => $options.handleContact && $options.handleContact(...args), j)
      } : {
        e: con.icon,
        f: common_vendor.t(con.title)
      }, {
        g: j,
        h: common_vendor.o((...args) => $options.chooseServiceItem && $options.chooseServiceItem(...args), j),
        i: j
      });
    }),
    k: common_vendor.s("padding-top: " + ($data.topHeight + "px") + ";")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/mine/mine.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
