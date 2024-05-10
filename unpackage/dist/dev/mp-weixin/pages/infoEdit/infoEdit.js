"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      initAvatarUrl: "",
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
      fileList: [],
      showLogout: false,
      phone: ""
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
    this.phone = userInfo.phone;
  },
  methods: {
    // 删除头像
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
        url: this.app.globalData.uploadAvatarUrl,
        filePath: file.url,
        name: "file",
        success: (res) => {
          let fileList = this.fileList;
          fileList.push({
            url: this.app.globalData.httpUrl + JSON.parse(res.data).data
          });
          this.initAvatarUrl = JSON.parse(res.data).data;
          this.fileList = fileList;
          this.avatarUrl = fileList[0].url;
          this.save();
        }
      });
    },
    // 取消选择日期
    onCancel() {
      this.show = false;
    },
    // 选择生日
    chooseAge() {
      this.show = true;
    },
    // 确定选择 生日
    onConfirm(e) {
      let date = new Date(e.value);
      let year = date.getFullYear();
      let month = utils_util.formatNumber(date.getMonth() + 1);
      let day = utils_util.formatNumber(date.getDate());
      this.currentDate = e.value;
      this.dealCurrentDate = `${year}${month}${day}`;
      this.show = false;
      this.save();
    },
    // 处理生日 2020-02-08
    dealWithBirth(birthday) {
      let birth = String(birthday);
      return birth.slice(0, 4) + "-" + birth.slice(4, 6) + "-" + birth.slice(6, 8);
    },
    // 昵称失去焦点
    nickNameBlur(e) {
      this.save();
    },
    // 性别修改
    sexChange(e) {
      this.save();
    },
    // 保存
    save() {
      utils_request.request({
        url: "wx/update/user/info",
        method: "POST",
        data: {
          user_ouid: this.app.globalData.userInfo.ouid,
          name: this.nickname,
          avatar: this.initAvatarUrl,
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
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("updateInfo");
      });
    },
    // 退出登录
    logout() {
      this.showLogout = true;
    },
    // 取消退出登录
    cancel() {
      this.showLogout = false;
    },
    // 确认退出登录
    confirm() {
      this.showLogout = false;
      this.app.logout();
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_up_icon2 + _easycom_u_navbar2 + _easycom_u_icon2 + _easycom_u_upload2 + _easycom_u_cell2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_cell_group2 + _easycom_u_datetime_picker2 + _easycom_u_modal2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_datetime_picker = () => "../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_navbar + _easycom_u_icon + _easycom_u_upload + _easycom_u_cell + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_cell_group + _easycom_u_datetime_picker + _easycom_u_modal)();
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
      title: "个人信息",
      autoBack: false
    }),
    d: !$data.avatarUrl
  }, !$data.avatarUrl ? {
    e: common_vendor.p({
      name: "plus"
    })
  } : {
    f: $data.avatarUrl
  }, {
    g: common_vendor.o($options.afterRead),
    h: common_vendor.o($options.deleteImg),
    i: common_vendor.p({
      fileList: $data.fileList,
      maxCount: 1
    }),
    j: common_vendor.p({
      title: "头像",
      ["is-link"]: true
    }),
    k: common_vendor.o((...args) => $options.nickNameBlur && $options.nickNameBlur(...args)),
    l: $data.nickname,
    m: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    n: common_vendor.p({
      title: "昵称"
    }),
    o: common_vendor.p({
      name: "1",
      label: "男"
    }),
    p: common_vendor.p({
      name: "2",
      label: "女"
    }),
    q: common_vendor.o($options.sexChange),
    r: common_vendor.o(($event) => $data.sex = $event),
    s: common_vendor.p({
      modelValue: $data.sex
    }),
    t: common_vendor.p({
      title: "性别"
    }),
    v: common_vendor.t(!$data.dealCurrentDate ? "请选择" : $options.dealWithBirth($data.dealCurrentDate)),
    w: common_vendor.o($options.chooseAge),
    x: common_vendor.p({
      title: "生日",
      ["is-link"]: true
    }),
    y: common_vendor.t($data.phone),
    z: common_vendor.p({
      title: "手机"
    }),
    A: common_vendor.p({
      ["custom-class"]: "userinfo-group"
    }),
    B: common_vendor.o($options.onConfirm),
    C: common_vendor.o($options.onCancel),
    D: common_vendor.o(($event) => $data.currentDate = $event),
    E: common_vendor.p({
      show: $data.show,
      mode: "date",
      ["min-date"]: $data.minDate,
      ["max-date"]: $data.maxDate,
      modelValue: $data.currentDate
    }),
    F: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    G: common_vendor.o($options.confirm),
    H: common_vendor.o($options.cancel),
    I: common_vendor.p({
      show: $data.showLogout,
      title: "提示",
      content: "确定要退出登录吗？",
      showCancelButton: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-516de732"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/infoEdit/infoEdit.vue"]]);
wx.createPage(MiniProgramPage);
