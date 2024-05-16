"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-textarea",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$15],
  data() {
    return {
      // 输入框的值
      innerValue: "",
      // 是否处于获得焦点状态
      focused: false,
      // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
      firstChange: true,
      // value绑定值的变化是由内部还是外部引起的
      changeFromInner: false,
      // 过滤处理方法
      innerFormatter: (value) => value
    };
  },
  created() {
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal, oldVal) {
        this.innerValue = newVal;
        this.firstChange = false;
        this.changeFromInner = false;
      }
    }
  },
  computed: {
    // 组件的类名
    textareaClass() {
      let classes = [], { border, disabled } = this;
      border === "surround" && (classes = classes.concat(["u-border", "u-textarea--radius"]));
      border === "bottom" && (classes = classes.concat([
        "u-border-bottom",
        "u-textarea--no-radius"
      ]));
      disabled && classes.push("u-textarea--disabled");
      return classes.join(" ");
    },
    // 组件的样式
    textareaStyle() {
      const style = {};
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  emits: ["update:modelValue", "linechange", "focus", "blur", "change", "confirm", "keyboardheightchange"],
  methods: {
    // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
    setFormatter(e) {
      this.innerFormatter = e;
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
      common_vendor.index.$u.formValidate(this, "blur");
    },
    onLinechange(e) {
      this.$emit("linechange", e);
    },
    onInput(e) {
      let { value = "" } = e.detail || {};
      const formatter = this.formatter || this.innerFormatter;
      const formatValue = formatter(value);
      this.innerValue = value;
      this.$nextTick(() => {
        this.innerValue = formatValue;
        this.valueChange();
      });
    },
    // 内容发生变化，进行处理
    valueChange() {
      const value = this.innerValue;
      this.$nextTick(() => {
        this.$emit("update:modelValue", value);
        this.changeFromInner = true;
        this.$emit("change", value);
        common_vendor.index.$u.formValidate(this, "change");
      });
    },
    onConfirm(e) {
      this.$emit("confirm", e);
    },
    onKeyboardheightchange(e) {
      this.$emit("keyboardheightchange", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.innerValue,
    b: _ctx.$u.addUnit(_ctx.height),
    c: _ctx.placeholder,
    d: _ctx.$u.addStyle(_ctx.placeholderStyle, "string"),
    e: _ctx.placeholderClass,
    f: _ctx.disabled,
    g: _ctx.focus,
    h: _ctx.autoHeight,
    i: _ctx.fixed,
    j: _ctx.cursorSpacing,
    k: _ctx.cursor,
    l: _ctx.showConfirmBar,
    m: _ctx.selectionStart,
    n: _ctx.selectionEnd,
    o: _ctx.adjustPosition,
    p: _ctx.disableDefaultPadding,
    q: _ctx.holdKeyboard,
    r: _ctx.maxlength,
    s: _ctx.confirmType,
    t: _ctx.ignoreCompositionEvent,
    v: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    w: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    x: common_vendor.o((...args) => $options.onLinechange && $options.onLinechange(...args)),
    y: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    z: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    A: common_vendor.o((...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args)),
    B: _ctx.count
  }, _ctx.count ? {
    C: common_vendor.t($data.innerValue.length),
    D: common_vendor.t(_ctx.maxlength),
    E: _ctx.disabled ? "transparent" : "#fff"
  } : {}, {
    F: common_vendor.n($options.textareaClass),
    G: common_vendor.s($options.textareaStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-31706dd7"], ["__file", "C:/project/轻羽开源项目客户端/qingyu-client/node_modules/uview-plus/components/u-textarea/u-textarea.vue"]]);
wx.createComponent(Component);
