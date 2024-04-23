"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      errorTypeList: ["信息错误", "暂停营业", "场馆不存在", "其他"],
      error: "",
      type: "",
      fileList: []
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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
    errorInput(e) {
      this.error = e.detail.value;
    },
    deleteImg(event) {
      let fileList = this.fileList;
      fileList.splice(event.detail.index, 1);
      this.fileList = fileList;
    },
    // 上传问题相关图片
    afterRead(event) {
      const {
        file
      } = event;
      file.forEach((item) => {
        common_vendor.index.uploadFile({
          url: this.app.globalData.uploadUrl,
          filePath: item.url,
          name: "file",
          success: (res) => {
            let fileList = this.fileList;
            fileList.push({
              url: JSON.parse(res.data).data
            });
            this.fileList = fileList;
          }
        });
      });
    },
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    submit() {
      if (!this.type) {
        common_vendor.index.showToast({
          title: "请选择问题类型",
          icon: "none",
          duration: 2e3
        });
        return;
      } else if (!this.error) {
        common_vendor.index.showToast({
          title: "请输入描述详情",
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
      utils_request.request({
        url: "wx/add/shop/error",
        method: "POST",
        data: {
          user_ouid: this.app.globalData.userInfo.ouid,
          type: this.type,
          detial: this.error,
          photos
        }
      }).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "提交成功",
          duration: 2e3,
          success: () => {
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  (_easycom_u_navbar2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u__textarea2 + _easycom_u_upload2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u__textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_u_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_radio + _easycom_u_radio_group + _easycom_u__textarea + _easycom_u_upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false,
      title: "场馆报错",
      autoBack: true
    }),
    b: common_vendor.f($data.errorTypeList, (item, index, i0) => {
      return {
        a: index,
        b: "b6ca8dfc-2-" + i0 + ",b6ca8dfc-1",
        c: common_vendor.p({
          name: item,
          label: item
        })
      };
    }),
    c: common_vendor.o(($event) => $data.type = $event),
    d: common_vendor.p({
      placement: "row",
      modelValue: $data.type
    }),
    e: common_vendor.o(($event) => $data.error = $event),
    f: common_vendor.p({
      placeholder: "请输入...",
      modelValue: $data.error
    }),
    g: common_vendor.o($options.afterRead),
    h: common_vendor.o($options.deleteImg),
    i: common_vendor.p({
      fileList: $data.fileList,
      name: "1",
      multiple: true,
      maxCount: 9
    }),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6ca8dfc"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/errorReport/errorReport.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
