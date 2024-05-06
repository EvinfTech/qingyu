"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_util = require("../../utils/util.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      active: 0,
      //当前选中的日期索引
      dateList: [],
      //日期列表
      translateDistance: 0,
      //选中底部条的滚动距离
      tabWidth: 0,
      //tab项的宽度
      widthDiff: 0,
      scrollLeft: 0,
      //滚动条x轴的滚动距离
      totalPrice: 0,
      //总价
      choosedList: [],
      //被选中的
      centerHeight: 0,
      timeList: [],
      siteList: [],
      todayDeleteIndex: 0,
      con: {
        already: false,
        checked: false,
        price: ""
      },
      j: "",
      currentDate: ""
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let date = options.date.slice(5);
    this.currentDate = date;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setAciveDate(this.currentDate);
    this.$nextTick(() => {
      setTimeout(() => {
        this.getTabItemWidth();
      }, 500);
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
    getNowTime() {
      let date = /* @__PURE__ */ new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      return [hour, minute];
    },
    initEnumInfo() {
      let enumInfo = this.app.globalData.enumInfo;
      let timeArr = [];
      let arr = [];
      let dateItemSiteList = this.dateList[this.active].siteList;
      dateItemSiteList.forEach((con) => {
        timeArr = timeArr.concat(con.store_time_enum);
      });
      timeArr = Array.from(new Set(timeArr));
      timeArr.sort(function(a, b) {
        return a - b;
      });
      timeArr.forEach((arrItem) => {
        let value = enumInfo[arrItem].split("~")[0];
        let value1 = enumInfo[arrItem].split("~")[1];
        let index1 = arr.findIndex((item) => item.value == value);
        let index2 = arr.findIndex((item) => item.value == value1);
        if (index1 < 0) {
          arr.push({
            index: arrItem,
            value
          });
        }
        if (index2 < 0) {
          arr.push({
            index: arrItem,
            value: value1
          });
        }
      });
      let index = 0;
      if (this.active == 0) {
        let nowDateList = this.getNowTime();
        index = arr.findIndex((item) => {
          let list = item.value.split(":");
          if (Number(list[0]) > nowDateList[0] || Number(list[0]) == nowDateList[0] && Number(list[1]) > nowDateList[1]) {
            return true;
          }
        });
        if (index == -1) {
          arr = [];
        } else {
          arr = arr.slice(index);
        }
      }
      this.timeList = arr;
    },
    initData(date) {
      let siteList = [];
      if (this.dateList[this.active].isRequest == false) {
        utils_request.request({
          url: "wx/get/site/reserve",
          method: "POST",
          data: {
            date
            //日期
          }
        }).then((res) => {
          let dataList = res.data;
          dataList.forEach((con, index) => {
            siteList.push({
              siteNo: index + 1,
              siteId: con.site_id,
              disableList: con.reserve_time_enum,
              siteName: con.site_name,
              store_time_enum: con.store_time_enum,
              priceList: con.price,
              timeList: []
            });
          });
          this.dateList[this.active].siteList = siteList, this.dateList[this.active].isRequest = true;
          this.siteList = siteList;
          this.initEnumInfo();
          this.setTimeList();
        });
      } else {
        siteList = this.dateList[this.active].siteList;
        this.siteList = siteList;
        this.initEnumInfo();
        this.setTimeList();
      }
    },
    setAciveDate(date) {
      this.dateList = this.et7Days();
      let index = this.dateList.findIndex((item) => item.date == date);
      this.active = index;
    },
    async submitOrder() {
      if (this.choosedList.length == 0) {
        common_vendor.index.showToast({
          title: "未选择场地",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      let userInfo = await this.app.getUserInfo();
      let site_detail = [];
      let site_obj = utils_util.groupBy(this.choosedList, "siteId");
      console.log(site_obj);
      for (var key in site_obj) {
        let time_enum = [];
        for (var item of site_obj[key]) {
          time_enum.push(Number(item.enumInfoIndex));
        }
        site_detail.push({
          site_id: Number(key),
          time_enum
        });
      }
      utils_request.request({
        url: "wx/add/order",
        method: "POST",
        data: {
          user_ouid: userInfo.ouid,
          //用户ouid
          site_detail,
          gmt_site_use: this.choosedList[0].date
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            setTimeout(() => {
              common_vendor.index.redirectTo({
                url: "/pages/orderDetail/orderDetail?type=add&order_no=" + res.data.order
              });
            }, 2e3);
          }
        });
      });
    },
    // 设置预约场地列表
    setTimeList() {
      let siteList = JSON.parse(JSON.stringify(this.siteList));
      siteList.forEach((con, index) => {
        for (var i = 1; i <= this.timeList.length - 1; i++) {
          let priceIndex = con.priceList.findIndex((content) => content.time_enum == this.timeList[i].index);
          if (priceIndex >= 0) {
            if (con.disableList.includes(this.timeList[i].index)) {
              con.timeList.push({
                price: con.priceList[priceIndex].price,
                already: true,
                checked: true
              });
            } else {
              con.timeList.push({
                price: con.priceList[priceIndex].price,
                already: false,
                checked: false
              });
            }
          } else {
            con.timeList.push({
              price: "不可订",
              already: true,
              checked: false
            });
          }
        }
      });
      this.siteList = siteList;
    },
    getTabItemWidth() {
      let that = this;
      let sysInfo = common_vendor.index.getSystemInfoSync();
      var screenHeight = sysInfo.windowHeight;
      let query = common_vendor.index.createSelectorQuery();
      query.select(".customerTabItem").boundingClientRect((navRect) => {
        let query2 = common_vendor.index.createSelectorQuery();
        query2.select(".selected").boundingClientRect((con) => {
          that.tabWidth = navRect.width;
          that.translateDistance = (navRect.width - con.width) / 2;
          that.widthDiff = (navRect.width - con.width) / 2;
          that.scrollLeft = navRect.width * (this.active - 4);
          that.chooseTab(that.active);
          let query3 = common_vendor.index.createSelectorQuery();
          query3.select(".bottomCon").boundingClientRect((item) => {
            let query4 = common_vendor.index.createSelectorQuery();
            query4.select(".nav-bar").boundingClientRect((bar) => {
              that.centerHeight = screenHeight - 44 - item.height - navRect.height - sysInfo.statusBarHeight;
            }).exec();
          }).exec();
        }).exec();
      }).exec();
    },
    chooseTab(e) {
      let index;
      if (e.hasOwnProperty("currentTarget")) {
        index = e.currentTarget.dataset.index;
      } else {
        index = e;
      }
      let distance = index * this.tabWidth + this.widthDiff;
      if (this.active != index) {
        this.choosedList = [];
        this.totalPrice = 0;
      }
      this.active = index;
      this.translateDistance = distance;
      this.initData(this.dateList[index].fullDate);
    },
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    // 选择场地
    chooseSite(e) {
      let data = e.currentTarget.dataset;
      if (data.item.already || data.item.price == "不可订") {
        return;
      }
      this.siteList[data.index].timeList[data.j].checked = !this.siteList[data.index].timeList[data.j].checked;
      if (this.siteList[data.index].timeList[data.j].checked) {
        let siteItem = this.siteList[data.index];
        let objItem = {
          siteName: siteItem.siteName,
          //场地名称
          siteId: siteItem.siteId,
          //场地id
          price: data.item.price,
          //场地价格
          date: this.dateList[this.active].fullDate,
          //场地使用时间
          startTime: this.timeList[data.j].value,
          //开始时间
          endTime: this.timeList[data.j + 1].value,
          //结束时间
          enumInfoIndex: -1,
          //在枚举中的key
          siteIndex: data.index,
          //球场的索引，方便清空功能实现
          siteTimeIndex: data.j
          //球场时间的索引，方便清空功能实现
        };
        let enumInfo = this.app.globalData.enumInfo;
        for (var key in enumInfo) {
          if (enumInfo[key] == objItem.startTime + "~" + objItem.endTime) {
            objItem.enumInfoIndex = key;
            break;
          }
        }
        let choosedList = this.choosedList;
        choosedList.push(objItem);
        this.choosedList = choosedList;
        this.totalPrice = this.totalPrice + objItem.price / 100;
      } else {
        let index = this.choosedList.findIndex((con) => con.startTime == this.timeList[data.j]);
        let dataList = this.choosedList;
        dataList.splice(index, 1);
        this.choosedList = dataList;
        this.totalPrice = this.totalPrice - data.item.price / 100;
      }
    },
    clearChoosedList() {
      this.choosedList.forEach((con) => {
        this.siteList[con.siteIndex].timeList[con.siteTimeIndex].checked = false;
      });
      this.choosedList = [];
      this.totalPrice = 0;
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
          fullDate: year + "-" + utils_util.formatNumber(month) + "-" + utils_util.formatNumber(date),
          date: utils_util.formatNumber(month) + "-" + utils_util.formatNumber(date),
          day: i == 0 ? "今日" : "周" + "日一二三四五六".charAt(myDate.getDay()),
          siteList: [],
          isRequest: false
        });
      }
      return dateList;
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  (_easycom_up_icon2 + _easycom_u_navbar2)();
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
      safeAreaInsetTop: true,
      fixed: false,
      title: "预约",
      autoBack: false
    }),
    d: common_vendor.s("transform: translateX(" + ($data.translateDistance + "px") + ");"),
    e: common_vendor.f($data.dateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.day),
        b: common_vendor.t(item.date),
        c: common_vendor.s("color: " + (index == $data.active ? "#0077FF" : "") + ";"),
        d: index,
        e: common_vendor.o((...args) => $options.chooseTab && $options.chooseTab(...args), index),
        f: index
      };
    }),
    f: $data.scrollLeft,
    g: common_vendor.f($data.timeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: index
      };
    }),
    h: common_vendor.f($data.siteList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.siteName),
        b: common_vendor.f(item.timeList, (con, j, i1) => {
          return {
            a: common_vendor.t(con.price == "不可订" ? con.price : " ￥" + con.price / 100),
            b: common_vendor.n(" " + (con.already ? "disSelected" : con.checked ? "selectable" : "freeSelect") + " selectItem"),
            c: con,
            d: j,
            e: common_vendor.o((...args) => $options.chooseSite && $options.chooseSite(...args), j),
            f: j
          };
        }),
        c: index,
        d: index
      };
    }),
    i: common_vendor.s("height: " + ($data.centerHeight + "px") + ";"),
    j: $data.totalPrice > 0
  }, $data.totalPrice > 0 ? {
    k: common_vendor.o((...args) => $options.clearChoosedList && $options.clearChoosedList(...args))
  } : {}, {
    l: $data.choosedList.length == 0
  }, $data.choosedList.length == 0 ? {} : {
    m: common_vendor.f($data.choosedList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.startTime),
        b: common_vendor.t(item.endTime),
        c: common_vendor.t(item.siteName),
        d: index
      };
    })
  }, {
    n: common_vendor.t($data.totalPrice),
    o: common_vendor.o((...args) => $options.submitOrder && $options.submitOrder(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-71ac0ae8"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationDetail/reservationDetail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
