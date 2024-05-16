"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-tabbar-item",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props],
  data() {
    return {
      isActive: false,
      // 是否处于激活状态
      parentData: {
        value: null,
        activeColor: "",
        inactiveColor: ""
      }
    };
  },
  //  微信小程序中 options 选项
  options: {
    virtualHost: true
    //将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
  },
  created() {
    this.init();
  },
  emits: ["click", "change"],
  methods: {
    init() {
      this.updateParentData();
      if (!this.parent) {
        common_vendor.index.$u.error("u-tabbar-item必须搭配u-tabbar组件使用");
      }
      const index = this.parent.children.indexOf(this);
      this.isActive = (this.name || index) === this.parentData.value;
    },
    updateParentData() {
      this.getParentData("u-tabbar");
    },
    // 此方法将会被父组件u-tabbar调用
    updateFromParent() {
      this.init();
    },
    clickHandler() {
      this.$nextTick(() => {
        const index = this.parent.children.indexOf(this);
        const name = this.name || index;
        if (name !== this.parent.value) {
          this.parent.$emit("change", name);
        }
        this.$emit("click", name);
      });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  (_easycom_u_icon2 + _easycom_u_badge2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.icon
  }, _ctx.icon ? {
    b: common_vendor.p({
      name: _ctx.icon,
      color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
      size: 20
    })
  } : common_vendor.e({
    c: $data.isActive
  }, $data.isActive ? {} : {}), {
    d: common_vendor.p({
      absolute: true,
      offset: [0, _ctx.dot ? "34rpx" : _ctx.badge > 9 ? "14rpx" : "20rpx"],
      customStyle: _ctx.badgeStyle,
      isDot: _ctx.dot,
      value: _ctx.badge || (_ctx.dot ? 1 : null),
      show: _ctx.dot || _ctx.badge > 0
    }),
    e: common_vendor.t(_ctx.text),
    f: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a54be951"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-tabbar-item/u-tabbar-item.vue"]]);
wx.createComponent(Component);
