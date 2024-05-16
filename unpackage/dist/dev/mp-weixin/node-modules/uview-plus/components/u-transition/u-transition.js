"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-transition",
  data() {
    return {
      inited: false,
      // 是否显示/隐藏组件
      viewStyle: {},
      // 组件内部的样式
      status: "",
      // 记录组件动画的状态
      transitionEnded: false,
      // 组件是否结束的标记
      display: false,
      // 组件是否展示
      classes: ""
      // 应用的类名
    };
  },
  emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
  computed: {
    mergeStyle() {
      const { viewStyle, customStyle } = this;
      return {
        transitionDuration: `${this.duration}ms`,
        // display: `${this.display ? '' : 'none'}`,
        transitionTimingFunction: this.timingFunction,
        // 避免自定义样式影响到动画属性，所以写在viewStyle前面
        ...common_vendor.index.$u.addStyle(customStyle),
        ...viewStyle
      };
    }
  },
  // 将mixin挂在到组件中，uni.$u.mixin实际上为一个vue格式对象
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.transition, common_vendor.props$24],
  watch: {
    show: {
      handler(newVal) {
        newVal ? this.vueEnter() : this.vueLeave();
      },
      // 表示同时监听初始化时的props的show的意思
      immediate: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.inited
  }, $data.inited ? {
    b: common_vendor.o((...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
    c: common_vendor.n($data.classes),
    d: common_vendor.s($options.mergeStyle),
    e: common_vendor.o((...args) => _ctx.noop && _ctx.noop(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0573594d"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-transition/u-transition.vue"]]);
wx.createComponent(Component);
