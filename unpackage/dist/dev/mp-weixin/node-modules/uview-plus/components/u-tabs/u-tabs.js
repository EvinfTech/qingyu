"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-tabs",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$13],
  data() {
    return {
      firstTime: true,
      scrollLeft: 0,
      scrollViewWidth: 0,
      lineOffsetLeft: 0,
      tabsRect: {
        left: 0
      },
      innerCurrent: 0,
      moving: false
    };
  },
  watch: {
    current: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== this.innerCurrent) {
          this.innerCurrent = newValue;
          this.$nextTick(() => {
            this.resize();
          });
        }
      }
    },
    // list变化时，重新渲染list各项信息
    list() {
      this.$nextTick(() => {
        this.resize();
      });
    }
  },
  computed: {
    textStyle() {
      return (index) => {
        const style = {};
        const customeStyle = index === this.innerCurrent ? common_vendor.index.$u.addStyle(this.activeStyle) : common_vendor.index.$u.addStyle(
          this.inactiveStyle
        );
        if (this.list[index].disabled) {
          style.color = "#c8c9cc";
        }
        return common_vendor.index.$u.deepMerge(customeStyle, style);
      };
    },
    propsBadge() {
      return common_vendor.index.$u.props.badge;
    }
  },
  async mounted() {
    this.init();
  },
  emits: ["click", "change"],
  methods: {
    setLineLeft() {
      const tabItem = this.list[this.innerCurrent];
      if (!tabItem) {
        return;
      }
      let lineOffsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => total + curr.rect.width, 0);
      const lineWidth = common_vendor.index.$u.getPx(this.lineWidth);
      this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
      if (this.firstTime) {
        setTimeout(() => {
          this.firstTime = false;
        }, 10);
      }
    },
    // nvue下设置滑块的位置
    animation(x, duration = 0) {
    },
    // 点击某一个标签
    clickHandler(item, index) {
      this.$emit("click", {
        ...item,
        index
      });
      if (item.disabled)
        return;
      this.innerCurrent = index;
      this.resize();
      this.$emit("change", {
        ...item,
        index
      });
    },
    init() {
      common_vendor.index.$u.sleep().then(() => {
        this.resize();
      });
    },
    setScrollLeft() {
      const tabRect = this.list[this.innerCurrent];
      const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
        return total + curr.rect.width;
      }, 0);
      const windowWidth = common_vendor.index.$u.sys().windowWidth;
      let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect.right) / 2 + this.tabsRect.left / 2;
      scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width);
      this.scrollLeft = Math.max(0, scrollLeft);
    },
    // 获取所有标签的尺寸
    resize() {
      if (this.list.length === 0) {
        return;
      }
      Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
        this.tabsRect = tabsRect;
        this.scrollViewWidth = 0;
        itemRect.map((item, index) => {
          this.scrollViewWidth += item.width;
          this.list[index].rect = item;
        });
        this.setLineLeft();
        this.setScrollLeft();
      });
    },
    // 获取导航菜单的尺寸
    getTabsRect() {
      return new Promise((resolve) => {
        this.queryRect("u-tabs__wrapper__scroll-view").then((size) => resolve(size));
      });
    },
    // 获取所有标签的尺寸
    getAllItemRect() {
      return new Promise((resolve) => {
        const promiseAllArr = this.list.map((item, index) => this.queryRect(
          `u-tabs__wrapper__nav__item-${index}`,
          true
        ));
        Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
      });
    },
    // 获取各个标签的尺寸
    queryRect(el, item) {
      return new Promise((resolve) => {
        this.$uGetRect(`.${el}`).then((size) => {
          resolve(size);
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  _easycom_u_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item[_ctx.keyName]),
        b: common_vendor.n(item.disabled && "u-tabs__wrapper__nav__item__text--disabled"),
        c: common_vendor.s($options.textStyle(index)),
        d: "0546c3e4-0-" + i0,
        e: common_vendor.p({
          show: !!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value)),
          isDot: item.badge && item.badge.isDot || $options.propsBadge.isDot,
          value: item.badge && item.badge.value || $options.propsBadge.value,
          max: item.badge && item.badge.max || $options.propsBadge.max,
          type: item.badge && item.badge.type || $options.propsBadge.type,
          showZero: item.badge && item.badge.showZero || $options.propsBadge.showZero,
          bgColor: item.badge && item.badge.bgColor || $options.propsBadge.bgColor,
          color: item.badge && item.badge.color || $options.propsBadge.color,
          shape: item.badge && item.badge.shape || $options.propsBadge.shape,
          numberType: item.badge && item.badge.numberType || $options.propsBadge.numberType,
          inverted: item.badge && item.badge.inverted || $options.propsBadge.inverted,
          customStyle: "margin-left: 4px;"
        }),
        f: index,
        g: common_vendor.o(($event) => $options.clickHandler(item, index), index),
        h: `u-tabs__wrapper__nav__item-${index}`,
        i: common_vendor.n(`u-tabs__wrapper__nav__item-${index}`),
        j: common_vendor.n(item.disabled && "u-tabs__wrapper__nav__item--disabled")
      };
    }),
    b: common_vendor.s(_ctx.$u.addStyle(_ctx.itemStyle)),
    c: common_vendor.s({
      flex: _ctx.scrollable ? "" : 1
    }),
    d: common_vendor.s({
      width: _ctx.$u.addUnit(_ctx.lineWidth),
      transform: `translate(${$data.lineOffsetLeft}px)`,
      transitionDuration: `${$data.firstTime ? 0 : _ctx.duration}ms`,
      height: _ctx.$u.addUnit(_ctx.lineHeight),
      background: _ctx.lineColor,
      backgroundSize: _ctx.lineBgSize
    }),
    e: _ctx.scrollable,
    f: $data.scrollLeft
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0546c3e4"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-tabs/u-tabs.vue"]]);
wx.createComponent(Component);
