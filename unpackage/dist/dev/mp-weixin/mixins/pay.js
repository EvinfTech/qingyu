"use strict";
const common_vendor = require("../common/vendor.js");
const payment = {
  data() {
    getApp();
  },
  methods: {
    // 判断是微信浏览器打开 还是 外部浏览器打开
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 微信小程序支付
    wxPay(data, callback) {
      common_vendor.wx$1.requestPayment({
        "timeStamp": data.timeStamp,
        "nonceStr": data.nonceStr,
        "package": data.package,
        "signType": data.signType,
        "paySign": data.paySign,
        "success": (res) => {
          callback("success");
        },
        "fail": (res) => {
          callback("fail");
        },
        "complete": (res) => {
        }
      });
    },
    // 微信内置浏览器授权获取code
    // 网页授权 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
    wechatGetCode() {
      const appId = this.app.globalData.officialAppId;
      const local = window.location.href;
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(local) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    },
    // 内置浏览器获取页面code方法
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = window.location.href;
      let search = url.split("?")[1];
      if (search) {
        var r = search.substr(0).match(reg);
        if (r !== null)
          return unescape(r[2]);
        return null;
      } else
        return null;
    },
    // 微信内置浏览器支付
    weChatInside() {
      const code = this.getUrlParam("code");
      if (code == null || code == "") {
        this.wechatGetCode();
      } else {
        this.toPayInside();
      }
    },
    // 微信内置浏览器支付方法
    toPayInside(prepay_id) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          "appId": "wx14f6a5a5933aca21",
          //公众号ID，由商户传入    
          "timeStamp": "1395712654",
          //时间戳，自1970年以来的秒数    
          "nonceStr": "e61463f8efa94090b1f366cccfbbb444",
          //随机串    
          "package": "prepay_id=" + prepay_id,
          "signType": "RSA",
          //微信签名方式：    
          "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq/xDg=="
          //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok")
            ;
        }
      );
    },
    // 外置浏览器支付方法
    toPayOutside() {
    }
  }
};
exports.payment = payment;
