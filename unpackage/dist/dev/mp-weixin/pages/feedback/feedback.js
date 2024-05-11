"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      error: "",
      fileList: []
    };
  },
  methods: {
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    // 上传问题相关图片
    afterRead(event) {
      const {
        file
      } = event;
      file.forEach((item) => {
        common_vendor.index.uploadFile({
          url: this.app.globalData.uploadImgUrl,
          filePath: item.url,
          name: "file",
          success: (res) => {
            let fileList = this.fileList;
            fileList.push({
              url: this.app.globalData.httpUrl + JSON.parse(res.data).data
            });
            this.fileList = fileList;
          }
        });
      });
    },
    async submit() {
      if (!this.error) {
        common_vendor.index.showToast({
          title: "请输入反馈问题",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      let list = this.fileList;
      let photos = [];
      list.forEach((item) => {
        photos.push(item.url);
      });
      let userInfo = await this.app.getUserInfo();
      utils_request.request({
        url: "wx/add/feedback",
        method: "POST",
        data: {
          user_ouid: userInfo.ouid,
          content: this.error,
          //反馈内容
          photo: photos
          //照片
        }
      }).then(() => {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "none",
          duration: 2e3,
          success: () => {
            setTimeout(() => {
              this.app.toBack();
            }, 2e3);
          }
        });
      });
    },
    deleteImg(event) {
      let fileList = this.fileList;
      fileList.splice(event.index, 1);
      this.fileList = fileList;
    },
    toFeedbackList() {
      common_vendor.index.navigateTo({
        url: "/pages/feedbackList/feedbackList"
      });
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u__textarea2 + _easycom_u_upload2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u__textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_u_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u__textarea + _easycom_u_upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($data.app.toBack),
    b: common_vendor.p({
      name: "arrow-left"
    }),
    c: common_vendor.p({
      title: "意见反馈",
      safeAreaInsetTop: true,
      autoBack: false,
      fixed: false
    }),
    d: common_vendor.o(($event) => $data.error = $event),
    e: common_vendor.p({
      placeholder: "请输入...",
      modelValue: $data.error
    }),
    f: common_vendor.o($options.afterRead),
    g: common_vendor.o($options.deleteImg),
    h: common_vendor.p({
      fileList: $data.fileList,
      name: "1",
      multiple: true,
      maxCount: 9
    }),
    i: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a24b82f2"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
