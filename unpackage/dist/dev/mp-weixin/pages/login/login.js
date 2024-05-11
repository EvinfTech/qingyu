"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      phone: "",
      code: "",
      codeState: false,
      seconds: 60,
      timer: null
    };
  },
  methods: {
    // 校验手机号
    validatePhoneNumber(phone) {
      if (!phone) {
        return "empty";
      }
      var regExp = /^1[3456789]\d{9}$/;
      if (regExp.test(phone)) {
        return "ok";
      } else {
        return "no";
      }
    },
    // 点击获取验证码
    async getCode() {
      if (this.codeState) {
        return false;
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      let result = this.validatePhoneNumber(this.phone);
      if (result != "ok") {
        common_vendor.index.showToast({
          icon: "none",
          title: result == "no" ? "手机号格式错误" : "请输入手机号"
        });
        return false;
      }
      let res = await this.getPhoneCode();
      common_vendor.index.showToast({
        icon: "none",
        title: res
      });
      if (res == "验证码已发送") {
        this.codeState = true;
        let timer = setInterval(() => {
          this.seconds = this.seconds - 1;
          if (this.seconds == 0) {
            this.codeState = false;
            this.seconds = 60;
            clearInterval(this.timer);
          }
        }, 1e3);
        this.timer = timer;
      }
    },
    // 获取验证码
    getPhoneCode() {
      return new Promise((resolve, reject) => {
        utils_request.request({
          url: "common/get-phone-code",
          method: "POST",
          data: {
            phone: this.phone
          }
        }).then((res) => {
          if (res.code == 200) {
            resolve("验证码已发送");
          } else if (res.code == 500) {
            if (res.msg == "刚发的验证码，5分钟有效") {
              resolve("不可重复获取验证码");
            }
          }
        });
      });
    },
    // 去登录
    toLogin() {
      let result = this.validatePhoneNumber(this.phone);
      if (result != "ok") {
        common_vendor.index.showToast({
          icon: "none",
          title: result == "no" ? "手机号格式错误" : "请输入手机号"
        });
        return false;
      }
      if (!this.code) {
        common_vendor.index.showToast({
          icon: "none",
          title: "验证码不能为空"
        });
        return false;
      } else if (this.code.length != 6) {
        common_vendor.index.showToast({
          icon: "none",
          title: "验证码长度为6位"
        });
        return false;
      }
      utils_request.request({
        url: "common/phone-code-login",
        method: "POST",
        data: {
          phone: this.phone,
          code: this.code
        }
      }).then(async (res) => {
        if (res.code == 200) {
          this.app.globalData.userInfo.ouid = res.data.ouid;
          await this.app.getUserInfo();
          common_vendor.index.showToast({
            icon: "none",
            title: "登录成功",
            success: () => {
              setTimeout(() => {
                common_vendor.index.redirectTo({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          });
        } else if (res.code == 500) {
          common_vendor.index.showToast({
            icon: "none",
            title: res.msg
          });
        }
      });
    },
    // 去用户协议页
    toArrgement() {
      common_vendor.index.navigateTo({
        url: "/pages/arrgement/arrgement"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.phone,
    b: common_vendor.o(($event) => $data.phone = $event.detail.value),
    c: $data.code,
    d: common_vendor.o(($event) => $data.code = $event.detail.value),
    e: common_vendor.t($data.codeState ? $data.seconds + " s" : "获取验证码"),
    f: common_vendor.s("color:" + ($data.codeState ? "#B1B4C3" : "#0077FF") + ";padding-right: " + ($data.codeState ? "30rpx" : "") + ";"),
    g: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    h: common_vendor.o($options.toLogin),
    i: common_vendor.p({
      type: "primary",
      size: "large",
      color: "#0077FF",
      ["custom-style"]: "margin-top: 134rpx;border-radius: 12rpx;"
    }),
    j: common_vendor.o((...args) => $options.toArrgement && $options.toArrgement(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
