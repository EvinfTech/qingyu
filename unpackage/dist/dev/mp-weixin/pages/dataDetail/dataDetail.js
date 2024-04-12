"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      scrollViewHeight: 0,
      pv: 0,
      uv: 0,
      registrationList: [
        {
          name: "昵称1",
          sex: 2,
          man_amount: 1,
          woman_amount: 2,
          state: 0
        },
        {
          name: "昵称1",
          sex: 1,
          man_amount: 1,
          woman_amount: 2,
          state: 0
        }
      ],
      waitingList: [{
        name: "昵称1",
        sex: 1,
        state: 0
      }]
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculate();
    this.initData(options.id);
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
    calculate() {
      var that = this;
      var screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      let query = common_vendor.index.createSelectorQuery();
      query.select(".nav-bar").boundingClientRect((res) => {
        that.scrollViewHeight = screenHeight - res.height - 20;
      }).exec();
    },
    initData(id) {
      utils_request.request({
        url: "wx/get/activity/apply/list",
        method: "POST",
        data: {
          activity_id: Number(id)
        }
      }).then((res) => {
        this.pv = res.data.browse;
        this.uv = res.data.independent;
        this.registrationList = res.data.success;
        this.waitingList = res.data.wait ? res.data.wait : [];
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
  return common_vendor.e({
    a: common_vendor.p({
      name: "arrow-left",
      size: "20px"
    }),
    b: common_vendor.o((...args) => $options.onClickLeft && $options.onClickLeft(...args)),
    c: common_vendor.t($data.pv),
    d: common_vendor.t($data.uv),
    e: $data.registrationList.length > 0
  }, $data.registrationList.length > 0 ? {
    f: common_vendor.f($data.registrationList, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: item.sex == 1 ? "../../static/images/mine/boyIcon.svg" : "../../static/images/mine/girlIcon.svg",
        d: common_vendor.t(item.man_count),
        e: common_vendor.t(item.woman_count),
        f: index
      };
    })
  } : {}, {
    g: $data.waitingList.length > 0
  }, $data.waitingList.length > 0 ? {
    h: common_vendor.f($data.waitingList, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: item.sex == 1 ? "../../static/images/mine/boyIcon.svg" : "../../static/images/mine/girlIcon.svg",
        d: index
      };
    })
  } : {}, {
    i: common_vendor.s("height: " + $data.scrollViewHeight + "px;")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3b44c5b1"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/dataDetail/dataDetail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
