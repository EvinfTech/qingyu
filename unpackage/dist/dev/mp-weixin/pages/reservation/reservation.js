"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
const _sfc_main = {
  data() {
    return {
      app: getApp(),
      active: 0,
      viewHeight: 0,
      gymnasiumList: [],
      list: [{
        name: "场馆"
      }, {
        name: "场次"
      }],
      sessionList: [
        // {
        //     timeRange:'8:00~9:00',
        //     gymnasiumList:[
        //         {
        //             shop_name:'奇点羽毛球馆',//球馆名称
        //             price:500,//球场价格
        //         }
        //     ]
        // }
      ]
    };
  },
  options: {
    addGlobalClass: true
  },
  mounted() {
    this.$nextTick(() => this.ready());
  },
  props: {
    scrollViewHeight: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tabChange(e) {
      this.active = e.index;
    },
    ready() {
      this.calculateHeight();
      this.initData();
    },
    initData() {
      utils_request.request({
        url: "wx/get/shop/list",
        method: "POST"
      }).then((res) => {
        let gymnasiumList = res.data;
        gymnasiumList.forEach((item) => {
          item.distance = utils_util.calcDistance(item.latitude, item.longitude, this.app.globalData.userInfo.latitude, this.app.globalData.userInfo.longitude);
        });
        this.gymnasiumList = gymnasiumList;
      });
    },
    onChange(event) {
    },
    onClickLeft() {
    },
    gumnasiumDetail(e) {
      let shop_id = e.currentTarget.dataset.item.id;
      common_vendor.index.navigateTo({
        url: "/pages/gymnasiumInfo/gymnasiumInfo?shop_id=" + shop_id
      });
    },
    calculateHeight() {
      var that = this;
      let query = common_vendor.index.createSelectorQuery().in(that);
      query.select(".nav-bar").boundingClientRect((navRect) => {
        that.viewHeight = that.scrollViewHeight - navRect.height - 59;
      }).exec();
    }
  },
  created: function() {
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_u_navbar2 + _easycom_u_tabs2 + _easycom_u_empty2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_navbar + _easycom_u_tabs + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "预约场地",
      safeAreaInsetTop: true,
      leftIconSize: "0",
      fixed: false
    }),
    b: common_vendor.o($options.tabChange),
    c: common_vendor.p({
      list: $data.list,
      lineWidth: "18",
      lineHeight: "3",
      lineColor: "0077FF"
    }),
    d: $data.gymnasiumList.length == 0
  }, $data.gymnasiumList.length == 0 ? {
    e: common_vendor.p({
      text: "暂无场馆",
      mode: "list",
      marginTop: "100"
    })
  } : {
    f: common_vendor.f($data.gymnasiumList, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.shop_name),
        c: common_vendor.t(item.bottom_price),
        d: common_vendor.t(item.address),
        e: common_vendor.t(item.distance),
        f: common_vendor.f(item.tag, (item2, index1, i1) => {
          return {
            a: common_vendor.t(item2),
            b: item2,
            c: index1
          };
        }),
        g: item,
        h: common_vendor.o((...args) => $options.gumnasiumDetail && $options.gumnasiumDetail(...args), index),
        i: index
      };
    })
  }, {
    g: common_vendor.s("height: " + $data.viewHeight + "px;"),
    h: $data.active == 0,
    i: $data.sessionList.length == 0
  }, $data.sessionList.length == 0 ? {
    j: common_vendor.p({
      text: "暂无场次",
      mode: "list",
      marginTop: "100"
    })
  } : {}, {
    k: common_vendor.s("height: " + $data.viewHeight + "px;"),
    l: $data.active == 1
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62da1e1c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservation/reservation.vue"]]);
wx.createPage(MiniProgramPage);
