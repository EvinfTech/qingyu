"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      avatarUrl: "",
      nickname: "",
      sex: "",
      personalProfile: "",
      show: false,
      columns: [],
      currentDate: 0,
      dealCurrentDate: "",
      minDate: 0,
      maxDate: 0,
      fileList: []
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    let userInfo = await this.app.getUserInfo();
    this.maxDate = Date.now();
    this.currentDate = Date.now();
    this.nickname = userInfo.name;
    this.avatarUrl = userInfo.avatar;
    this.sex = String(userInfo.sex);
    this.dealCurrentDate = userInfo.birthday;
    this.personalProfile = userInfo.introduce;
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
    // 返回
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    deleteImg(event) {
      this.fileList = [];
      this.avatarUrl = "";
    },
    // 上传问题相关图片
    afterRead(event) {
      const {
        file
      } = event;
      common_vendor.index.uploadFile({
        url: this.app.globalData.httpUrl + "common/upload/avatar",
        filePath: file.url,
        name: "file",
        success: (res) => {
          let fileList = this.fileList;
          fileList.push({
            url: this.app.globalData.httpUrl + "avatar/" + JSON.parse(res.data).data
          });
          this.fileList = fileList;
          this.avatarUrl = fileList[0].url;
        }
      });
    },
    onCancel() {
      this.show = false;
    },
    chooseAge() {
      this.show = true;
    },
    onConfirm(e) {
      let date = new Date(e.value);
      let year = date.getFullYear();
      let month = utils_util.formatNumber(date.getMonth() + 1);
      let day = utils_util.formatNumber(date.getDate());
      this.currentDate = e.value;
      this.dealCurrentDate = `${year}${month}${day}`;
      this.show = false;
    },
    // 保存
    save() {
      utils_request.request({
        url: "wx/update/user/info",
        method: "POST",
        data: {
          user_ouid: this.app.globalData.userInfo.ouid,
          name: this.nickname,
          avatar: this.avatarUrl,
          phone: "",
          birthday: Number(this.dealCurrentDate),
          sex: Number(this.sex),
          //1男  2女
          introduce: this.personalProfile
        }
      }).then(() => {
        common_vendor.index.removeStorageSync("userInfo");
        this.app.getUserInfo();
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }, 1500);
      });
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_textarea2 = common_vendor.resolveComponent("u-textarea");
  (_easycom_u_navbar2 + _easycom_u_icon2 + _easycom_u_upload2 + _easycom_u_cell2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_cell_group2 + _easycom_u_datetime_picker2 + _easycom_u_textarea2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_datetime_picker = () => "../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_icon + _easycom_u_upload + _easycom_u_cell + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_cell_group + _easycom_u_datetime_picker + _easycom_u_textarea)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      safeAreaInsetTop: true,
      fixed: false,
      title: "个人信息",
      autoBack: true
    }),
    b: !$data.avatarUrl
  }, !$data.avatarUrl ? {
    c: common_vendor.p({
      name: "plus"
    })
  } : {
    d: $data.avatarUrl
  }, {
    e: common_vendor.o($options.afterRead),
    f: common_vendor.o($options.deleteImg),
    g: common_vendor.p({
      fileList: $data.fileList,
      maxCount: 1
    }),
    h: common_vendor.p({
      title: "头像",
      ["is-link"]: true
    }),
    i: $data.nickname,
    j: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    k: common_vendor.p({
      title: "昵称"
    }),
    l: common_vendor.p({
      name: "1",
      label: "男"
    }),
    m: common_vendor.p({
      name: "2",
      label: "女"
    }),
    n: common_vendor.o(($event) => $data.sex = $event),
    o: common_vendor.p({
      modelValue: $data.sex
    }),
    p: common_vendor.p({
      title: "性别"
    }),
    q: common_vendor.t(!$data.dealCurrentDate ? "请选择" : $data.dealCurrentDate),
    r: common_vendor.o($options.chooseAge),
    s: common_vendor.p({
      title: "生日",
      ["is-link"]: true
    }),
    t: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    v: common_vendor.o($options.onConfirm),
    w: common_vendor.o($options.onCancel),
    x: common_vendor.o(($event) => $data.currentDate = $event),
    y: common_vendor.p({
      show: $data.show,
      mode: "date",
      ["min-date"]: $data.minDate,
      ["max-date"]: $data.maxDate,
      modelValue: $data.currentDate
    }),
    z: common_vendor.o(($event) => $data.personalProfile = $event),
    A: common_vendor.p({
      placeholder: "请输入...",
      modelValue: $data.personalProfile
    }),
    B: common_vendor.o((...args) => $options.save && $options.save(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-516de732"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/infoEdit/infoEdit.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
