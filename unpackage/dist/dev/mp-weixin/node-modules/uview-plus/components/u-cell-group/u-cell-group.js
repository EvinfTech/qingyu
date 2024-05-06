"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-group",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11]
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  _easycom_u_line2();
}
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  _easycom_u_line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.title
  }, _ctx.title ? {
    b: common_vendor.t(_ctx.title)
  } : {}, {
    c: _ctx.border
  }, _ctx.border ? {} : {}, {
    d: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    e: common_vendor.n(_ctx.customClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30c8e4c7"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-cell-group/u-cell-group.vue"]]);
wx.createComponent(Component);
