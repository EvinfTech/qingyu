"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/arrgement/arrgement.js";
  "./pages/home/home.js";
  "./pages/reservation/reservation.js";
  "./pages/mine/mine.js";
  "./pages/reservationDetail/reservationDetail.js";
  "./pages/orderDetail/orderDetail.js";
  "./pages/infoEdit/infoEdit.js";
  "./pages/orderList/orderList.js";
  "./pages/feedback/feedback.js";
  "./pages/settings/settings.js";
  "./pages/aboutUs/aboutUs.js";
  "./pages/reservationList/reservationList.js";
  "./pages/reservationInfo/reservationInfo.js";
  "./pages/accountSecurity/accountSecurity.js";
  "./pages/userAgreement/userAgreement.js";
}
const _sfc_main = {
  globalData: {
    // httpUrl: 'http://172.16.7.99:8002/',
    httpUrl: "https://qingyu.evinf.cn/",
    // httpUrl: 'http://172.16.8.5:8002/',
    uploadAvatarUrl: "http://172.16.7.99:8002/common/upload/avatar",
    uploadImgUrl: "http://172.16.7.99:8002/common/upload/photo",
    iconObj: {
      "培训": "/static/images/common/training.svg",
      "停车场": "/static/images/common/park.svg",
      "VIP": "/static/images/common/VIP.svg",
      "wifi": "/static/images/common/WIFI.svg",
      "商店": "/static/images/common/shop.svg",
      "淋浴房": "/static/images/common/shower.svg",
      "储物柜": "/static/images/common/storageCabinet.svg",
      "24小时": "/static/images/common/allDay.svg",
      "茶水间": "/static/images/common/tea.svg",
      "餐饮": "/static/images/common/food.svg",
      "洗手间": "/static/images/common/toilet.svg",
      "空调": "/static/images/common/air-conditioning.svg"
    },
    userInfo: {
      longitude: "",
      //经度
      latitude: "",
      //纬度
      ouid: "",
      //用户ouid
      avatar: "",
      //头像
      birthday: "",
      //生日
      name: "",
      //昵称
      phone: "",
      //手机号
      sex: "",
      //性别
      total_count: "",
      //运动次数
      total_length: "",
      //运动时长
      sport_day: ""
      //运动天数
    },
    enumInfo: {},
    gymnasiumInfo: {}
  },
  methods: {
    getLocation() {
      var that = this;
      common_vendor.index.getLocation({
        type: "wgs84",
        success: function(res) {
          that.userInfo.latitude = res.latitude;
          that.userInfo.longitude = res.longitude;
        }
      });
    },
    checkVersion() {
      const miniProgram = common_vendor.index.getAccountInfoSync();
      var versionNumber = miniProgram.miniProgram.version;
      let storageVersionNumber = common_vendor.index.getStorageSync("version_number");
      if (!storageVersionNumber) {
        common_vendor.index.setStorageSync("version_number", versionNumber);
      }
      if (!storageVersionNumber || storageVersionNumber != versionNumber) {
        const updateManager = common_vendor.index.getUpdateManager();
        updateManager.onUpdateReady(function() {
          common_vendor.index.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onCheckForUpdate(function(res) {
          const miniProgram2 = common_vendor.index.getAccountInfoSync();
          var versionNumber2 = miniProgram2.miniProgram.version;
          common_vendor.index.setStorageSync("version_number", versionNumber2);
        });
      }
    },
    toShare() {
      common_vendor.index.onAppRoute((res) => {
        let pages = getCurrentPages();
        let view = pages[pages.length - 1];
        if (view) {
          common_vendor.index.showShareMenu({
            menus: ["shareAppMessage", "shareTimeline"],
            success(res2) {
            },
            fail(e) {
            }
          });
        }
      });
    },
    // 获取用户信息
    getUserInfo(type = "") {
      return new Promise((resolve, reject) => {
        let userInfo = common_vendor.index.getStorageSync("userInfo");
        userInfo = userInfo ? JSON.parse(userInfo) : "";
        if (userInfo && !type) {
          this.globalData.userInfo = userInfo;
          common_vendor.index.setStorageSync("userInfo", JSON.stringify(userInfo));
          resolve(userInfo);
          return;
        }
        common_vendor.index.request({
          url: this.globalData.httpUrl + "wx/get/user/info",
          method: "POST",
          data: {
            user_ouid: this.globalData.userInfo.ouid
          },
          header: {
            "content-type": "application/json"
          },
          success: (res) => {
            if (res.statusCode == 200) {
              let userInfo2 = res.data.data;
              userInfo2.avatar = this.globalData.httpUrl + userInfo2.avatar;
              this.globalData.userInfo.avatar = userInfo2.avatar;
              this.globalData.userInfo.birthday = userInfo2.birthday;
              this.globalData.userInfo.name = userInfo2.name;
              this.globalData.userInfo.phone = userInfo2.phone;
              this.globalData.userInfo.sex = userInfo2.sex;
              this.globalData.userInfo.total_count = userInfo2.total_count;
              this.globalData.userInfo.total_length = userInfo2.total_length;
              this.globalData.userInfo.sport_day = userInfo2.sport_day;
              this.globalData.userInfo.introduce = userInfo2.introduce;
              common_vendor.index.removeStorageSync("userInfo");
              common_vendor.index.setStorageSync("userInfo", JSON.stringify(this.globalData.userInfo));
              resolve(userInfo2);
            }
          }
        });
      });
    },
    // 获取门店信息
    getStoreInfo(type = "") {
      return new Promise((resolve, reject) => {
        let storeInfo = common_vendor.index.getStorageSync("gymnasiumInfo");
        if (storeInfo && !type) {
          storeInfo = JSON.parse(storeInfo);
          this.globalData.gymnasiumInfo = storeInfo;
          resolve(storeInfo);
          return false;
        }
        common_vendor.index.request({
          url: this.globalData.httpUrl + "wx/get/shop/detail",
          method: "POST"
        }).then((res) => {
          let tag = res.data.data.tag ? res.data.data.tag : [];
          let tagList = [];
          tag.forEach((item) => {
            tagList.push({
              text: item,
              icon: this.globalData.iconObj[item] ? this.globalData.iconObj[item] : ""
            });
          });
          let gymnasiumInfo = {};
          gymnasiumInfo.gymnasiumName = res.data.data.shop_name;
          gymnasiumInfo.latitude = res.data.data.latitude;
          gymnasiumInfo.longitude = res.data.data.longitude;
          gymnasiumInfo.phone = res.data.data.shop_phone;
          gymnasiumInfo.location = res.data.data.shop_address;
          gymnasiumInfo.businessHours = res.data.data.work_time;
          gymnasiumInfo.facility = res.data.data.facility;
          gymnasiumInfo.serve = res.data.data.serve;
          gymnasiumInfo.hardwareFacilities = tagList;
          gymnasiumInfo.shop_avatar = this.globalData.httpUrl + res.data.data.shop_avatar;
          gymnasiumInfo.desc = res.data.data.desc;
          let gymnasiumImgList = [];
          let list = JSON.parse(res.data.data.shop_photo);
          list.forEach((item) => {
            gymnasiumImgList.push(this.globalData.httpUrl + item);
          });
          gymnasiumInfo.gymnasiumImgList = gymnasiumImgList;
          this.globalData.gymnasiumInfo = gymnasiumInfo;
          common_vendor.index.setStorageSync("gymnasiumInfo", JSON.stringify(gymnasiumInfo));
          resolve(gymnasiumInfo);
        });
      });
    },
    // 退出登录
    logout() {
      this.globalData.userInfo = {
        longitude: "",
        latitude: "",
        ouid: ""
      };
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.removeStorageSync("gymnasiumInfo");
      common_vendor.index.removeStorageSync("tabbarIndex");
      common_vendor.index.removeStorageSync("album");
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    },
    // 获取枚举信息
    getEnum() {
      return new Promise((resolve, reject) => {
        let enumInfo = common_vendor.index.getStorageSync("enumInfo");
        enumInfo = enumInfo ? JSON.parse(enumInfo) : "";
        if (enumInfo) {
          this.globalData.enumInfo = enumInfo;
          common_vendor.index.setStorageSync("enumInfo", JSON.stringify(enumInfo));
          resolve(enumInfo);
          return false;
        }
        common_vendor.index.request({
          url: this.globalData.httpUrl + "common/get/enum",
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            if (res.statusCode == 200) {
              this.globalData.enumInfo = res.data.data.time_enum;
              common_vendor.index.setStorageSync("enumInfo", JSON.stringify(this.globalData.enumInfo));
              resolve(res.data.data.time_enum);
            }
          }
        });
      });
    },
    // 返回
    toBack() {
      let canNavBack = getCurrentPages();
      if (canNavBack && canNavBack.length > 1) {
        common_vendor.index.navigateBack();
      } else {
        history.back();
      }
    }
  },
  onLaunch: function() {
    this.getEnum();
    this.checkVersion();
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/project/轻羽项目/qingyu-client/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
