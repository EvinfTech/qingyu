"use strict";
const common_vendor = require("../common/vendor.js");
const request = (parmas) => {
  common_vendor.index.showLoading({
    title: "加载中"
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: getApp().globalData.httpUrl + parmas.url,
      method: parmas.method,
      data: JSON.stringify(parmas.data),
      header: parmas.method === "POST" ? {
        "content-type": "application/x-www-form-urlencoded"
      } : {
        "content-type": "application/json"
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          resolve(res.data);
          common_vendor.index.hideLoading();
        } else {
          resolve(res.data);
          common_vendor.index.hideLoading();
        }
      },
      fail: (err) => {
        reject(err);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          icon: "none",
          title: "网络错误",
          duration: 2e3
        });
      }
    });
  });
};
exports.request = request;
