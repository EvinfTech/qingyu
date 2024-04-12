"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentIndex: 0,
      imgList: []
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let imgList = common_vendor.index.getStorageSync("album");
    imgList = JSON.parse(imgList);
    common_vendor.index.removeStorageSync("album");
    this.imgList = imgList;
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
    onClickLeft() {
      common_vendor.index.navigateBack();
    },
    previwImg(e) {
      this.currentIndex = e.currentTarget.dataset.item;
      common_vendor.index.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.item
      });
    }
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  (_component_van_icon + _component_van_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      name: "arrow-left",
      size: "20px"
    }),
    b: common_vendor.o((...args) => $options.onClickLeft && $options.onClickLeft(...args)),
    c: common_vendor.f($data.imgList, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o((...args) => $options.previwImg && $options.previwImg(...args), index),
        c: item,
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c8b231e"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/album/album.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
