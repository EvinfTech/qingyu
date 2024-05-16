"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-radio",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$9],
  data() {
    return {
      checked: false,
      // 当你看到这段代码的时候，
      // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
      // 故只能使用如此方法
      parentData: {
        iconSize: 12,
        labelDisabled: null,
        disabled: null,
        shape: null,
        activeColor: null,
        inactiveColor: null,
        size: 18,
        value: null,
        modelValue: null,
        iconColor: null,
        placement: "row",
        borderBottom: false,
        iconPlacement: "left"
      }
    };
  },
  computed: {
    // 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
    elDisabled() {
      return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
    },
    // 是否禁用label点击
    elLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
    },
    // 组件尺寸，对应size的值，默认值为21px
    elSize() {
      return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
    },
    // 组件的勾选图标的尺寸，默认12px
    elIconSize() {
      return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
    },
    // 组件选中激活时的颜色
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
    },
    // 组件选未中激活时的颜色
    elInactiveColor() {
      return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
    },
    // label的颜色
    elLabelColor() {
      return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
    },
    // 组件的形状
    elShape() {
      return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
    },
    // label大小
    elLabelSize() {
      return common_vendor.index.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
    },
    elIconColor() {
      const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
      if (this.elDisabled) {
        return this.checked ? this.elInactiveColor : "transparent";
      } else {
        return this.checked ? iconColor : "transparent";
      }
    },
    iconClasses() {
      let classes = [];
      classes.push("u-radio__icon-wrap--" + this.elShape);
      if (this.elDisabled) {
        classes.push("u-radio__icon-wrap--disabled");
      }
      if (this.checked && this.elDisabled) {
        classes.push("u-radio__icon-wrap--disabled--checked");
      }
      return classes;
    },
    iconWrapStyle() {
      const style = {};
      style.backgroundColor = this.checked && !this.elDisabled ? this.elActiveColor : "#ffffff";
      style.borderColor = this.checked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
      style.width = common_vendor.index.$u.addUnit(this.elSize);
      style.height = common_vendor.index.$u.addUnit(this.elSize);
      if (this.parentData.iconPlacement === "right") {
        style.marginRight = 0;
      }
      return style;
    },
    radioStyle() {
      const style = {};
      if (this.parentData.borderBottom && this.parentData.placement === "row") {
        common_vendor.index.$u.error("检测到您将borderBottom设置为true，需要同时将u-radio-group的placement设置为column才有效");
      }
      if (this.parentData.borderBottom && this.parentData.placement === "column") {
        style.paddingBottom = common_vendor.index.$u.os() === "ios" ? "12px" : "8px";
      }
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  mounted() {
    this.init();
  },
  emits: ["change"],
  methods: {
    init() {
      this.updateParentData();
      if (!this.parent) {
        common_vendor.index.$u.error("u-radio必须搭配u-radio-group组件使用");
      }
      this.checked = this.name === this.parentData.modelValue;
    },
    updateParentData() {
      this.getParentData("u-radio-group");
    },
    // 点击图标
    iconClickHandler(e) {
      this.preventEvent(e);
      if (!this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    // 横向两端排列时，点击组件即可触发选中事件
    wrapperClickHandler(e) {
      this.parentData.iconPlacement === "right" && this.iconClickHandler(e);
    },
    // 点击label
    labelClickHandler(e) {
      this.preventEvent(e);
      if (!this.elLabelDisabled && !this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    emitEvent() {
      if (!this.checked) {
        this.$emit("change", this.name);
        this.$nextTick(() => {
          common_vendor.index.$u.formValidate(this, "change");
        });
      }
    },
    // 改变组件选中状态
    // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-radio实例
    // 将本组件外的其他u-radio的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
    setRadioCheckedStatus() {
      this.emitEvent();
      this.checked = true;
      typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
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
  return {
    a: common_vendor.p({
      name: "checkbox-mark",
      size: $options.elIconSize,
      color: $options.elIconColor
    }),
    b: common_vendor.o((...args) => $options.iconClickHandler && $options.iconClickHandler(...args)),
    c: common_vendor.n($options.iconClasses),
    d: common_vendor.s($options.iconWrapStyle),
    e: common_vendor.t(_ctx.label),
    f: common_vendor.o((...args) => $options.labelClickHandler && $options.labelClickHandler(...args)),
    g: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
    h: $options.elLabelSize,
    i: $options.elLabelSize,
    j: common_vendor.o((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args)),
    k: common_vendor.s($options.radioStyle),
    l: common_vendor.n(`u-radio-label--${$data.parentData.iconPlacement}`),
    m: common_vendor.n($data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-edf95844"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-radio/u-radio.vue"]]);
wx.createComponent(Component);
