"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-empty",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$13],
  data() {
    return {
      icons: {
        car: "购物车为空",
        page: "页面不存在",
        search: "没有搜索结果",
        address: "没有收货地址",
        wifi: "没有WiFi",
        order: "订单为空",
        coupon: "没有优惠券",
        favor: "暂无收藏",
        permission: "无权限",
        history: "无历史记录",
        news: "无新闻列表",
        message: "消息列表为空",
        list: "列表为空",
        data: "数据为空",
        comment: "暂无评论"
      }
    };
  },
  computed: {
    // 组件样式
    emptyStyle() {
      const style = {};
      style.marginTop = common_vendor.index.$u.addUnit(this.marginTop);
      return common_vendor.index.$u.deepMerge(common_vendor.index.$u.addStyle(this.customStyle), style);
    },
    // 文本样式
    textStyle() {
      const style = {};
      style.color = this.textColor;
      style.fontSize = common_vendor.index.$u.addUnit(this.textSize);
      return style;
    },
    // 判断icon是否图片路径
    isSrc() {
      return this.icon.indexOf("/") >= 0;
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? common_vendor.e({
    b: !$options.isSrc
  }, !$options.isSrc ? {
    c: common_vendor.p({
      name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
      size: _ctx.iconSize,
      color: _ctx.iconColor,
      ["margin-top"]: "14"
    })
  } : {
    d: _ctx.$u.addUnit(_ctx.width),
    e: _ctx.$u.addUnit(_ctx.height),
    f: _ctx.icon
  }, {
    g: common_vendor.t(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
    h: common_vendor.s($options.textStyle),
    i: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : {}, {
    j: common_vendor.s($options.emptyStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bd84101d"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-empty/u-empty.vue"]]);
wx.createComponent(Component);
