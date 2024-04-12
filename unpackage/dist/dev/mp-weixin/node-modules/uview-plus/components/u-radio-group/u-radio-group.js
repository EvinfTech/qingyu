"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-radio-group",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$8],
  computed: {
    // 这里computed的变量，都是子组件u-radio需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
    // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-radio-group)
    // 拉取父组件新的变化后的参数
    parentData() {
      return [
        this.modelValue,
        this.disabled,
        this.inactiveColor,
        this.activeColor,
        this.size,
        this.labelDisabled,
        this.shape,
        this.iconSize,
        this.borderBottom,
        this.placement
      ];
    },
    bemClass() {
      return this.bem("radio-group", ["placement"]);
    }
  },
  watch: {
    // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
    parentData() {
      if (this.children.length) {
        this.children.map((child) => {
          typeof child.init === "function" && child.init();
        });
      }
    }
  },
  data() {
    return {};
  },
  created() {
    this.children = [];
  },
  emits: ["update:modelValue", "change"],
  methods: {
    // 将其他的radio设置为未选中的状态
    unCheckedOther(childInstance) {
      this.children.map((child) => {
        if (childInstance !== child) {
          child.checked = false;
        }
      });
      const {
        name
      } = childInstance;
      this.$emit("update:modelValue", name);
      this.$emit("change", name);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($options.bemClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-272bb654"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-radio-group/u-radio-group.vue"]]);
wx.createComponent(Component);
