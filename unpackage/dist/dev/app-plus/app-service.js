if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const icons = {
    "uicon-level": "",
    "uicon-column-line": "",
    "uicon-checkbox-mark": "",
    "uicon-folder": "",
    "uicon-movie": "",
    "uicon-star-fill": "",
    "uicon-star": "",
    "uicon-phone-fill": "",
    "uicon-phone": "",
    "uicon-apple-fill": "",
    "uicon-chrome-circle-fill": "",
    "uicon-backspace": "",
    "uicon-attach": "",
    "uicon-cut": "",
    "uicon-empty-car": "",
    "uicon-empty-coupon": "",
    "uicon-empty-address": "",
    "uicon-empty-favor": "",
    "uicon-empty-permission": "",
    "uicon-empty-news": "",
    "uicon-empty-search": "",
    "uicon-github-circle-fill": "",
    "uicon-rmb": "",
    "uicon-person-delete-fill": "",
    "uicon-reload": "",
    "uicon-order": "",
    "uicon-server-man": "",
    "uicon-search": "",
    "uicon-fingerprint": "",
    "uicon-more-dot-fill": "",
    "uicon-scan": "",
    "uicon-share-square": "",
    "uicon-map": "",
    "uicon-map-fill": "",
    "uicon-tags": "",
    "uicon-tags-fill": "",
    "uicon-bookmark-fill": "",
    "uicon-bookmark": "",
    "uicon-eye": "",
    "uicon-eye-fill": "",
    "uicon-mic": "",
    "uicon-mic-off": "",
    "uicon-calendar": "",
    "uicon-calendar-fill": "",
    "uicon-trash": "",
    "uicon-trash-fill": "",
    "uicon-play-left": "",
    "uicon-play-right": "",
    "uicon-minus": "",
    "uicon-plus": "",
    "uicon-info": "",
    "uicon-info-circle": "",
    "uicon-info-circle-fill": "",
    "uicon-question": "",
    "uicon-error": "",
    "uicon-close": "",
    "uicon-checkmark": "",
    "uicon-android-circle-fill": "",
    "uicon-android-fill": "",
    "uicon-ie": "",
    "uicon-IE-circle-fill": "",
    "uicon-google": "",
    "uicon-google-circle-fill": "",
    "uicon-setting-fill": "",
    "uicon-setting": "",
    "uicon-minus-square-fill": "",
    "uicon-plus-square-fill": "",
    "uicon-heart": "",
    "uicon-heart-fill": "",
    "uicon-camera": "",
    "uicon-camera-fill": "",
    "uicon-more-circle": "",
    "uicon-more-circle-fill": "",
    "uicon-chat": "",
    "uicon-chat-fill": "",
    "uicon-bag-fill": "",
    "uicon-bag": "",
    "uicon-error-circle-fill": "",
    "uicon-error-circle": "",
    "uicon-close-circle": "",
    "uicon-close-circle-fill": "",
    "uicon-checkmark-circle": "",
    "uicon-checkmark-circle-fill": "",
    "uicon-question-circle-fill": "",
    "uicon-question-circle": "",
    "uicon-share": "",
    "uicon-share-fill": "",
    "uicon-shopping-cart": "",
    "uicon-shopping-cart-fill": "",
    "uicon-bell": "",
    "uicon-bell-fill": "",
    "uicon-list": "",
    "uicon-list-dot": "",
    "uicon-zhihu": "",
    "uicon-zhihu-circle-fill": "",
    "uicon-zhifubao": "",
    "uicon-zhifubao-circle-fill": "",
    "uicon-weixin-circle-fill": "",
    "uicon-weixin-fill": "",
    "uicon-twitter-circle-fill": "",
    "uicon-twitter": "",
    "uicon-taobao-circle-fill": "",
    "uicon-taobao": "",
    "uicon-weibo-circle-fill": "",
    "uicon-weibo": "",
    "uicon-qq-fill": "",
    "uicon-qq-circle-fill": "",
    "uicon-moments-circel-fill": "",
    "uicon-moments": "",
    "uicon-qzone": "",
    "uicon-qzone-circle-fill": "",
    "uicon-baidu-circle-fill": "",
    "uicon-baidu": "",
    "uicon-facebook-circle-fill": "",
    "uicon-facebook": "",
    "uicon-car": "",
    "uicon-car-fill": "",
    "uicon-warning-fill": "",
    "uicon-warning": "",
    "uicon-clock-fill": "",
    "uicon-clock": "",
    "uicon-edit-pen": "",
    "uicon-edit-pen-fill": "",
    "uicon-email": "",
    "uicon-email-fill": "",
    "uicon-minus-circle": "",
    "uicon-minus-circle-fill": "",
    "uicon-plus-circle": "",
    "uicon-plus-circle-fill": "",
    "uicon-file-text": "",
    "uicon-file-text-fill": "",
    "uicon-pushpin": "",
    "uicon-pushpin-fill": "",
    "uicon-grid": "",
    "uicon-grid-fill": "",
    "uicon-play-circle": "",
    "uicon-play-circle-fill": "",
    "uicon-pause-circle-fill": "",
    "uicon-pause": "",
    "uicon-pause-circle": "",
    "uicon-eye-off": "",
    "uicon-eye-off-outline": "",
    "uicon-gift-fill": "",
    "uicon-gift": "",
    "uicon-rmb-circle-fill": "",
    "uicon-rmb-circle": "",
    "uicon-kefu-ermai": "",
    "uicon-server-fill": "",
    "uicon-coupon-fill": "",
    "uicon-coupon": "",
    "uicon-integral": "",
    "uicon-integral-fill": "",
    "uicon-home-fill": "",
    "uicon-home": "",
    "uicon-hourglass-half-fill": "",
    "uicon-hourglass": "",
    "uicon-account": "",
    "uicon-plus-people-fill": "",
    "uicon-minus-people-fill": "",
    "uicon-account-fill": "",
    "uicon-thumb-down-fill": "",
    "uicon-thumb-down": "",
    "uicon-thumb-up": "",
    "uicon-thumb-up-fill": "",
    "uicon-lock-fill": "",
    "uicon-lock-open": "",
    "uicon-lock-opened-fill": "",
    "uicon-lock": "",
    "uicon-red-packet-fill": "",
    "uicon-photo-fill": "",
    "uicon-photo": "",
    "uicon-volume-off-fill": "",
    "uicon-volume-off": "",
    "uicon-volume-fill": "",
    "uicon-volume": "",
    "uicon-red-packet": "",
    "uicon-download": "",
    "uicon-arrow-up-fill": "",
    "uicon-arrow-down-fill": "",
    "uicon-play-left-fill": "",
    "uicon-play-right-fill": "",
    "uicon-rewind-left-fill": "",
    "uicon-rewind-right-fill": "",
    "uicon-arrow-downward": "",
    "uicon-arrow-leftward": "",
    "uicon-arrow-rightward": "",
    "uicon-arrow-upward": "",
    "uicon-arrow-down": "",
    "uicon-arrow-right": "",
    "uicon-arrow-left": "",
    "uicon-arrow-up": "",
    "uicon-skip-back-left": "",
    "uicon-skip-forward-right": "",
    "uicon-rewind-right": "",
    "uicon-rewind-left": "",
    "uicon-arrow-right-double": "",
    "uicon-arrow-left-double": "",
    "uicon-wifi-off": "",
    "uicon-wifi": "",
    "uicon-empty-data": "",
    "uicon-empty-history": "",
    "uicon-empty-list": "",
    "uicon-empty-page": "",
    "uicon-empty-order": "",
    "uicon-man": "",
    "uicon-woman": "",
    "uicon-man-add": "",
    "uicon-man-add-fill": "",
    "uicon-man-delete": "",
    "uicon-man-delete-fill": "",
    "uicon-zh": "",
    "uicon-en": ""
  };
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const version = "3";
  {
    formatAppLog("log", "at node_modules/uview-plus/libs/config/config.js:5", `
 %c uview-plus V${version} %c https://ijry.github.io/uview-plus/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
  }
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ],
    // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
    color: {
      "u-primary": "#2979ff",
      "u-warning": "#ff9900",
      "u-success": "#19be6b",
      "u-error": "#fa3534",
      "u-info": "#909399",
      "u-main-color": "#303133",
      "u-content-color": "#606266",
      "u-tips-color": "#909399",
      "u-light-color": "#c0c4cc"
    },
    // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
    unit: "px"
  };
  const ActionSheet = {
    // action-sheet组件
    actionSheet: {
      show: false,
      title: "",
      description: "",
      actions: () => [],
      index: "",
      cancelText: "",
      closeOnClickAction: true,
      safeAreaInsetBottom: true,
      openType: "",
      closeOnClickOverlay: true,
      round: 0
    }
  };
  const Album = {
    // album 组件
    album: {
      urls: () => [],
      keyName: "",
      singleSize: 180,
      multipleSize: 70,
      space: 6,
      singleMode: "scaleToFill",
      multipleMode: "aspectFill",
      maxCount: 9,
      previewFullImage: true,
      rowCount: 3,
      showMore: true
    }
  };
  const Alert = {
    // alert警告组件
    alert: {
      title: "",
      type: "warning",
      description: "",
      closable: false,
      showIcon: false,
      effect: "light",
      center: false,
      fontSize: 14
    }
  };
  const Avatar = {
    // avatar 组件
    avatar: {
      src: "",
      shape: "circle",
      size: 40,
      mode: "scaleToFill",
      text: "",
      bgColor: "#c0c4cc",
      color: "#ffffff",
      fontSize: 18,
      icon: "",
      mpAvatar: false,
      randomBgColor: false,
      defaultUrl: "",
      colorIndex: "",
      name: ""
    }
  };
  const AvatarGroup = {
    // avatarGroup 组件
    avatarGroup: {
      urls: () => [],
      maxCount: 5,
      shape: "circle",
      mode: "scaleToFill",
      showMore: true,
      size: 40,
      keyName: "",
      gap: 0.5,
      extraValue: 0
    }
  };
  const Backtop = {
    // backtop组件
    backtop: {
      mode: "circle",
      icon: "arrow-upward",
      text: "",
      duration: 100,
      scrollTop: 0,
      top: 400,
      bottom: 100,
      right: 20,
      zIndex: 9,
      iconStyle: () => ({
        color: "#909399",
        fontSize: "19px"
      })
    }
  };
  const Badge = {
    // 徽标数组件
    badge: {
      isDot: false,
      value: "",
      show: true,
      max: 999,
      type: "error",
      showZero: false,
      bgColor: null,
      color: null,
      shape: "circle",
      numberType: "overflow",
      offset: () => [],
      inverted: false,
      absolute: false
    }
  };
  const Button = {
    // button组件
    button: {
      hairline: false,
      type: "info",
      size: "normal",
      shape: "square",
      plain: false,
      disabled: false,
      loading: false,
      loadingText: "",
      loadingMode: "spinner",
      loadingSize: 15,
      openType: "",
      formType: "",
      appParameter: "",
      hoverStopPropagation: true,
      lang: "en",
      sessionFrom: "",
      sendMessageTitle: "",
      sendMessagePath: "",
      sendMessageImg: "",
      showMessageCard: false,
      dataName: "",
      throttleTime: 0,
      hoverStartTime: 0,
      hoverStayTime: 200,
      text: "",
      icon: "",
      iconColor: "",
      color: ""
    }
  };
  const Calendar = {
    // calendar 组件
    calendar: {
      title: "日期选择",
      showTitle: true,
      showSubtitle: true,
      mode: "single",
      startText: "开始",
      endText: "结束",
      customList: () => [],
      color: "#3c9cff",
      minDate: 0,
      maxDate: 0,
      defaultDate: null,
      maxCount: Number.MAX_SAFE_INTEGER,
      // Infinity
      rowHeight: 56,
      formatter: null,
      showLunar: false,
      showMark: true,
      confirmText: "确定",
      confirmDisabledText: "确定",
      show: false,
      closeOnClickOverlay: false,
      readonly: false,
      showConfirm: true,
      maxRange: Number.MAX_SAFE_INTEGER,
      // Infinity
      rangePrompt: "",
      showRangePrompt: true,
      allowSameDay: false,
      round: 0,
      monthNum: 3
    }
  };
  const CarKeyboard = {
    // 车牌号键盘
    carKeyboard: {
      random: false
    }
  };
  const Cell = {
    // cell组件的props
    cell: {
      customClass: "",
      title: "",
      label: "",
      value: "",
      icon: "",
      disabled: false,
      border: true,
      center: false,
      url: "",
      linkType: "navigateTo",
      clickable: false,
      isLink: false,
      required: false,
      arrowDirection: "",
      iconStyle: {},
      rightIconStyle: {},
      rightIcon: "arrow-right",
      titleStyle: {},
      size: "",
      stop: true,
      name: ""
    }
  };
  const CellGroup = {
    // cell-group组件的props
    cellGroup: {
      title: "",
      border: true,
      customStyle: {}
    }
  };
  const Checkbox = {
    // checkbox组件
    checkbox: {
      name: "",
      shape: "",
      size: "",
      checkbox: false,
      disabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      iconColor: "",
      label: "",
      labelSize: "",
      labelColor: "",
      labelDisabled: ""
    }
  };
  const CheckboxGroup = {
    // checkbox-group组件
    checkboxGroup: {
      name: "",
      value: () => [],
      shape: "square",
      disabled: false,
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      size: 18,
      placement: "row",
      labelSize: 14,
      labelColor: "#303133",
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      iconPlacement: "left",
      borderBottom: false
    }
  };
  const CircleProgress = {
    // circleProgress 组件
    circleProgress: {
      percentage: 30
    }
  };
  const Code = {
    // code 组件
    code: {
      seconds: 60,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
      keepRunning: false,
      uniqueKey: ""
    }
  };
  const CodeInput = {
    // codeInput 组件
    codeInput: {
      adjustPosition: true,
      maxlength: 6,
      dot: false,
      mode: "box",
      hairline: false,
      space: 10,
      value: "",
      focus: false,
      bold: false,
      color: "#606266",
      fontSize: 18,
      size: 35,
      disabledKeyboard: false,
      borderColor: "#c9cacc",
      disabledDot: true
    }
  };
  const Col = {
    // col 组件
    col: {
      span: 12,
      offset: 0,
      justify: "start",
      align: "stretch",
      textAlign: "left"
    }
  };
  const Collapse = {
    // collapse 组件
    collapse: {
      value: null,
      accordion: false,
      border: true
    }
  };
  const CollapseItem = {
    // collapseItem 组件
    collapseItem: {
      title: "",
      value: "",
      label: "",
      disabled: false,
      isLink: true,
      clickable: true,
      border: true,
      align: "left",
      name: "",
      icon: "",
      duration: 300
    }
  };
  const ColumnNotice = {
    // columnNotice 组件
    columnNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80,
      step: false,
      duration: 1500,
      disableTouch: true
    }
  };
  const CountDown = {
    // u-count-down 计时器组件
    countDown: {
      time: 0,
      format: "HH:mm:ss",
      autoStart: true,
      millisecond: false
    }
  };
  const CountTo = {
    // countTo 组件
    countTo: {
      startVal: 0,
      endVal: 0,
      duration: 2e3,
      autoplay: true,
      decimals: 0,
      useEasing: true,
      decimal: ".",
      color: "#606266",
      fontSize: 22,
      bold: false,
      separator: ""
    }
  };
  const DatetimePicker = {
    // datetimePicker 组件
    datetimePicker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      closeOnClickOverlay: false,
      defaultIndex: () => []
    }
  };
  const Divider = {
    // divider组件
    divider: {
      dashed: false,
      hairline: true,
      dot: false,
      textPosition: "center",
      text: "",
      textSize: 14,
      textColor: "#909399",
      lineColor: "#dcdfe6"
    }
  };
  const Empty = {
    // empty组件
    empty: {
      icon: "",
      text: "",
      textColor: "#c0c4cc",
      textSize: 14,
      iconColor: "#c0c4cc",
      iconSize: 90,
      mode: "data",
      width: 160,
      height: 160,
      show: true,
      marginTop: 0
    }
  };
  const Form = {
    // form 组件
    form: {
      model: () => ({}),
      rules: () => ({}),
      errorType: "message",
      borderBottom: true,
      labelPosition: "left",
      labelWidth: 45,
      labelAlign: "left",
      labelStyle: () => ({})
    }
  };
  const GormItem = {
    // formItem 组件
    formItem: {
      label: "",
      prop: "",
      borderBottom: "",
      labelWidth: "",
      rightIcon: "",
      leftIcon: "",
      required: false,
      leftIconStyle: ""
    }
  };
  const Gap = {
    // gap组件
    gap: {
      bgColor: "transparent",
      height: 20,
      marginTop: 0,
      marginBottom: 0,
      customStyle: {}
    }
  };
  const Grid = {
    // grid组件
    grid: {
      col: 3,
      border: false,
      align: "left"
    }
  };
  const GridItem = {
    // grid-item组件
    gridItem: {
      name: null,
      bgColor: "transparent"
    }
  };
  const {
    color: color$3
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$3["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$3["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image = {
    // image组件
    image: {
      src: "",
      mode: "aspectFill",
      width: "300",
      height: "225",
      shape: "square",
      radius: 0,
      lazyLoad: true,
      showMenuByLongpress: true,
      loadingIcon: "photo",
      errorIcon: "error-circle",
      showLoading: true,
      showError: true,
      fade: true,
      webp: false,
      duration: 500,
      bgColor: "#f3f4f6"
    }
  };
  const IndexAnchor = {
    // indexAnchor 组件
    indexAnchor: {
      text: "",
      color: "#606266",
      size: 14,
      bgColor: "#dedede",
      height: 32
    }
  };
  const IndexList = {
    // indexList 组件
    indexList: {
      inactiveColor: "#606266",
      activeColor: "#5677fc",
      indexList: () => [],
      sticky: true,
      customNavHeight: 0
    }
  };
  const Input = {
    // index 组件
    input: {
      value: "",
      type: "text",
      fixed: false,
      disabled: false,
      disabledColor: "#f5f7fa",
      clearable: false,
      password: false,
      maxlength: -1,
      placeholder: null,
      placeholderClass: "input-placeholder",
      placeholderStyle: "color: #c0c4cc",
      showWordLimit: false,
      confirmType: "done",
      confirmHold: false,
      holdKeyboard: false,
      focus: false,
      autoBlur: false,
      disableDefaultPadding: false,
      cursor: -1,
      cursorSpacing: 30,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      inputAlign: "left",
      fontSize: "15px",
      color: "#303133",
      prefixIcon: "",
      prefixIconStyle: "",
      suffixIcon: "",
      suffixIconStyle: "",
      border: "surround",
      readonly: false,
      shape: "square",
      formatter: null
    }
  };
  const Keyboard = {
    // 键盘组件
    keyboard: {
      mode: "number",
      dotDisabled: false,
      tooltip: true,
      showTips: true,
      tips: "",
      showCancel: true,
      showConfirm: true,
      random: false,
      safeAreaInsetBottom: true,
      closeOnClickOverlay: true,
      show: false,
      overlay: true,
      zIndex: 10075,
      cancelText: "取消",
      confirmText: "确定",
      autoChange: false
    }
  };
  const Line = {
    // line组件
    line: {
      color: "#d6d7d9",
      length: "100%",
      direction: "row",
      hairline: true,
      margin: 0,
      dashed: false
    }
  };
  const LineProgress = {
    // lineProgress 组件
    lineProgress: {
      activeColor: "#19be6b",
      inactiveColor: "#ececec",
      percentage: 0,
      showText: true,
      height: 12
    }
  };
  const {
    color: color$2
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$2["u-primary"],
      fontSize: 15,
      underLine: false,
      href: "",
      mpTips: "链接已复制，请在浏览器打开",
      lineColor: "",
      text: ""
    }
  };
  const List = {
    // list 组件
    list: {
      showScrollbar: false,
      lowerThreshold: 50,
      upperThreshold: 0,
      scrollTop: 0,
      offsetAccuracy: 10,
      enableFlex: false,
      pagingEnabled: false,
      scrollable: true,
      scrollIntoView: "",
      scrollWithAnimation: false,
      enableBackToTop: false,
      height: 0,
      width: 0,
      preLoadScreen: 1
    }
  };
  const ListItem = {
    // listItem 组件
    listItem: {
      anchor: ""
    }
  };
  const {
    color: color$1
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$1["u-tips-color"],
      textColor: color$1["u-tips-color"],
      vertical: false,
      mode: "spinner",
      size: 24,
      textSize: 15,
      text: "",
      timingFunction: "ease-in-out",
      duration: 1200,
      inactiveColor: ""
    }
  };
  const LoadingPage = {
    // loading-page组件
    loadingPage: {
      loadingText: "正在加载",
      image: "",
      loadingMode: "circle",
      loading: false,
      bgColor: "#ffffff",
      color: "#C8C8C8",
      fontSize: 19,
      iconSize: 28,
      loadingColor: "#C8C8C8"
    }
  };
  const Loadmore = {
    // loadmore 组件
    loadmore: {
      status: "loadmore",
      bgColor: "transparent",
      icon: true,
      fontSize: 14,
      iconSize: 17,
      color: "#606266",
      loadingIcon: "spinner",
      loadmoreText: "加载更多",
      loadingText: "正在加载...",
      nomoreText: "没有更多了",
      isDot: false,
      iconColor: "#b7b7b7",
      marginTop: 10,
      marginBottom: 10,
      height: "auto",
      line: false,
      lineColor: "#E6E8EB",
      dashed: false
    }
  };
  const Modal = {
    // modal 组件
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "确认",
      cancelText: "取消",
      showConfirmButton: true,
      showCancelButton: false,
      confirmColor: "#2979ff",
      cancelColor: "#606266",
      buttonReverse: false,
      zoom: true,
      asyncClose: false,
      closeOnClickOverlay: false,
      negativeTop: 0,
      width: "650rpx",
      confirmButtonShape: ""
    }
  };
  const color = {
    primary: "#3c9cff",
    info: "#909399",
    default: "#909399",
    warning: "#f9ae3d",
    error: "#f56c6c",
    success: "#5ac725",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  const Navbar = {
    // navbar 组件
    navbar: {
      safeAreaInsetTop: true,
      placeholder: false,
      fixed: true,
      border: false,
      leftIcon: "arrow-left",
      leftText: "",
      rightText: "",
      rightIcon: "",
      title: "",
      bgColor: "#ffffff",
      titleWidth: "400rpx",
      height: "44px",
      leftIconSize: 20,
      leftIconColor: color.mainColor,
      autoBack: false,
      titleStyle: ""
    }
  };
  const NoNetwork = {
    // noNetwork
    noNetwork: {
      tips: "哎呀，网络信号丢失",
      zIndex: "",
      image: "data:image/png;base64,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"
    }
  };
  const NoticeBar = {
    // noticeBar
    noticeBar: {
      text: () => [],
      direction: "row",
      step: false,
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      speed: 80,
      fontSize: 14,
      duration: 2e3,
      disableTouch: true,
      url: "",
      linkType: "navigateTo"
    }
  };
  const Notify = {
    // notify组件
    notify: {
      top: 0,
      type: "primary",
      color: "#ffffff",
      bgColor: "",
      message: "",
      duration: 3e3,
      fontSize: 15,
      safeAreaInsetTop: false
    }
  };
  const NumberBox = {
    // 步进器组件
    numberBox: {
      name: "",
      value: 0,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      integer: false,
      disabled: false,
      disabledInput: false,
      asyncChange: false,
      inputWidth: 35,
      showMinus: true,
      showPlus: true,
      decimalLength: null,
      longPress: true,
      color: "#323233",
      buttonSize: 30,
      bgColor: "#EBECEE",
      cursorSpacing: 100,
      disableMinus: false,
      disablePlus: false,
      iconStyle: ""
    }
  };
  const NumberKeyboard = {
    // 数字键盘
    numberKeyboard: {
      mode: "number",
      dotDisabled: false,
      random: false
    }
  };
  const Overlay = {
    // overlay组件
    overlay: {
      show: false,
      zIndex: 10070,
      duration: 300,
      opacity: 0.5
    }
  };
  const Parse = {
    // parse
    parse: {
      copyLink: true,
      errorImg: "",
      lazyLoad: false,
      loadingImg: "",
      pauseVideo: true,
      previewImg: true,
      setTitle: true,
      showImgMenu: true
    }
  };
  const Picker = {
    // picker
    picker: {
      show: false,
      popupMode: "bottom",
      showToolbar: true,
      title: "",
      columns: () => [],
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确定",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      keyName: "text",
      closeOnClickOverlay: false,
      defaultIndex: () => [],
      immediateChange: false
    }
  };
  const Popup = {
    // popup组件
    popup: {
      show: false,
      overlay: true,
      mode: "bottom",
      duration: 300,
      closeable: false,
      overlayStyle: () => {
      },
      closeOnClickOverlay: true,
      zIndex: 10075,
      safeAreaInsetBottom: true,
      safeAreaInsetTop: false,
      closeIconPos: "top-right",
      round: 0,
      zoom: true,
      bgColor: "",
      overlayOpacity: 0.5
    }
  };
  const Radio = {
    // radio组件
    radio: {
      name: "",
      shape: "",
      disabled: "",
      labelDisabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      labelSize: "",
      label: "",
      labelColor: "",
      size: "",
      iconColor: "",
      placement: ""
    }
  };
  const RadioGroup = {
    // radio-group组件
    radioGroup: {
      value: "",
      disabled: false,
      shape: "circle",
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      name: "",
      size: 18,
      placement: "row",
      label: "",
      labelColor: "#303133",
      labelSize: 14,
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      borderBottom: false,
      iconPlacement: "left"
    }
  };
  const Rate = {
    // rate组件
    rate: {
      value: 1,
      count: 5,
      disabled: false,
      size: 18,
      inactiveColor: "#b2b2b2",
      activeColor: "#FA3534",
      gutter: 4,
      minCount: 1,
      allowHalf: false,
      activeIcon: "star-fill",
      inactiveIcon: "star",
      touchable: true
    }
  };
  const ReadMore = {
    // readMore
    readMore: {
      showHeight: 400,
      toggle: false,
      closeText: "展开阅读全文",
      openText: "收起",
      color: "#2979ff",
      fontSize: 14,
      textIndent: "2em",
      name: ""
    }
  };
  const Row = {
    // row
    row: {
      gutter: 0,
      justify: "start",
      align: "center"
    }
  };
  const RowNotice = {
    // rowNotice
    rowNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80
    }
  };
  const ScrollList = {
    // scrollList
    scrollList: {
      indicatorWidth: 50,
      indicatorBarWidth: 20,
      indicator: true,
      indicatorColor: "#f2f2f2",
      indicatorActiveColor: "#3c9cff",
      indicatorStyle: ""
    }
  };
  const Search = {
    // search
    search: {
      shape: "round",
      bgColor: "#f2f2f2",
      placeholder: "请输入关键字",
      clearabled: true,
      focus: false,
      showAction: true,
      actionStyle: () => ({}),
      actionText: "搜索",
      inputAlign: "left",
      inputStyle: () => ({}),
      disabled: false,
      borderColor: "transparent",
      searchIconColor: "#909399",
      searchIconSize: 22,
      color: "#606266",
      placeholderColor: "#909399",
      searchIcon: "search",
      margin: "0",
      animation: false,
      value: "",
      maxlength: "-1",
      height: 32,
      label: null
    }
  };
  const Section = {
    // u-section组件
    section: {
      title: "",
      subTitle: "更多",
      right: true,
      fontSize: 15,
      bold: true,
      color: "#303133",
      subColor: "#909399",
      showLine: true,
      lineColor: "",
      arrow: true
    }
  };
  const Skeleton = {
    // skeleton
    skeleton: {
      loading: true,
      animate: true,
      rows: 0,
      rowsWidth: "100%",
      rowsHeight: 18,
      title: true,
      titleWidth: "50%",
      titleHeight: 18,
      avatar: false,
      avatarSize: 32,
      avatarShape: "circle"
    }
  };
  const Slider = {
    // slider组件
    slider: {
      value: 0,
      blockSize: 18,
      min: 0,
      max: 100,
      step: 1,
      activeColor: "#2979ff",
      inactiveColor: "#c0c4cc",
      blockColor: "#ffffff",
      showValue: false,
      disabled: false,
      blockStyle: () => {
      }
    }
  };
  const StatusBar = {
    // statusBar
    statusBar: {
      bgColor: "transparent"
    }
  };
  const Steps = {
    // steps组件
    steps: {
      direction: "row",
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#969799",
      activeIcon: "",
      inactiveIcon: "",
      dot: false
    }
  };
  const StepsItem = {
    // steps-item组件
    stepsItem: {
      title: "",
      desc: "",
      iconSize: 17,
      error: false
    }
  };
  const Sticky = {
    // sticky组件
    sticky: {
      offsetTop: 0,
      customNavHeight: 0,
      disabled: false,
      bgColor: "transparent",
      zIndex: "",
      index: ""
    }
  };
  const Subsection = {
    // subsection组件
    subsection: {
      list: [],
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#303133",
      mode: "button",
      fontSize: 12,
      bold: true,
      bgColor: "#eeeeef",
      keyName: "name"
    }
  };
  const SwipeAction = {
    // swipe-action组件
    swipeAction: {
      autoClose: true
    }
  };
  const SwipeActionItem = {
    // swipeActionItem 组件
    swipeActionItem: {
      show: false,
      name: "",
      disabled: false,
      threshold: 20,
      autoClose: true,
      options: [],
      duration: 300
    }
  };
  const Swiper = {
    // swiper 组件
    swiper: {
      list: () => [],
      indicator: false,
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      indicatorStyle: "",
      indicatorMode: "line",
      autoplay: true,
      current: 0,
      currentItemId: "",
      interval: 3e3,
      duration: 300,
      circular: false,
      previousMargin: 0,
      nextMargin: 0,
      acceleration: false,
      displayMultipleItems: 1,
      easingFunction: "default",
      keyName: "url",
      imgMode: "aspectFill",
      height: 130,
      bgColor: "#f3f4f6",
      radius: 4,
      loading: false,
      showTitle: false
    }
  };
  const SwipterIndicator = {
    // swiperIndicator 组件
    swiperIndicator: {
      length: 0,
      current: 0,
      indicatorActiveColor: "",
      indicatorInactiveColor: "",
      indicatorMode: "line"
    }
  };
  const Switch = {
    // switch
    switch: {
      loading: false,
      disabled: false,
      size: 25,
      activeColor: "#2979ff",
      inactiveColor: "#ffffff",
      value: false,
      activeValue: true,
      inactiveValue: false,
      asyncChange: false,
      space: 0
    }
  };
  const Tabbar = {
    // tabbar
    tabbar: {
      value: null,
      safeAreaInsetBottom: true,
      border: true,
      zIndex: 1,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      fixed: true,
      placeholder: true
    }
  };
  const TabbarItem = {
    //
    tabbarItem: {
      name: null,
      icon: "",
      badge: null,
      dot: false,
      text: "",
      badgeStyle: "top: 6px;right:2px;"
    }
  };
  const Tabs = {
    //
    tabs: {
      duration: 300,
      list: () => [],
      lineColor: "#3c9cff",
      activeStyle: () => ({
        color: "#303133"
      }),
      inactiveStyle: () => ({
        color: "#606266"
      }),
      lineWidth: 20,
      lineHeight: 3,
      lineBgSize: "cover",
      itemStyle: () => ({
        height: "44px"
      }),
      scrollable: true,
      current: 0,
      keyName: "name"
    }
  };
  const Tag = {
    // tag 组件
    tag: {
      type: "primary",
      disabled: false,
      size: "medium",
      shape: "square",
      text: "",
      bgColor: "",
      color: "",
      borderColor: "",
      closeColor: "#C6C7CB",
      name: "",
      plainFill: false,
      plain: false,
      closable: false,
      show: true,
      icon: ""
    }
  };
  const Text = {
    // text 组件
    text: {
      type: "",
      show: true,
      text: "",
      prefixIcon: "",
      suffixIcon: "",
      mode: "",
      href: "",
      format: "",
      call: false,
      openType: "",
      bold: false,
      block: false,
      lines: "",
      color: "#303133",
      size: 15,
      iconStyle: () => ({
        fontSize: "15px"
      }),
      decoration: "none",
      margin: 0,
      lineHeight: "",
      align: "left",
      wordWrap: "normal"
    }
  };
  const Textarea = {
    // textarea 组件
    textarea: {
      value: "",
      placeholder: "",
      placeholderClass: "textarea-placeholder",
      placeholderStyle: "color: #c0c4cc",
      height: 70,
      confirmType: "done",
      disabled: false,
      count: false,
      focus: false,
      autoHeight: false,
      fixed: false,
      cursorSpacing: 0,
      cursor: "",
      showConfirmBar: true,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      disableDefaultPadding: false,
      holdKeyboard: false,
      maxlength: 140,
      border: "surround",
      formatter: null
    }
  };
  const Toast = {
    // toast组件
    toast: {
      zIndex: 10090,
      loading: false,
      text: "",
      icon: "",
      type: "",
      loadingMode: "",
      show: "",
      overlay: false,
      position: "center",
      params: () => {
      },
      duration: 2e3,
      isTab: false,
      url: "",
      callback: null,
      back: false
    }
  };
  const Toolbar = {
    // toolbar 组件
    toolbar: {
      show: true,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      title: ""
    }
  };
  const Tooltip = {
    // tooltip 组件
    tooltip: {
      text: "",
      copyText: "",
      size: 14,
      color: "#606266",
      bgColor: "transparent",
      direction: "top",
      zIndex: 10071,
      showCopy: true,
      buttons: () => [],
      overlay: true,
      showToast: true
    }
  };
  const Transition = {
    // transition动画组件的props
    transition: {
      show: false,
      mode: "fade",
      duration: "300",
      timingFunction: "ease-out"
    }
  };
  const Upload = {
    // upload组件
    upload: {
      accept: "image",
      capture: () => ["album", "camera"],
      compressed: true,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: false,
      previewFullImage: true,
      maxCount: 52,
      disabled: false,
      imageMode: "aspectFill",
      name: "",
      sizeType: () => ["original", "compressed"],
      multiple: false,
      deletable: true,
      maxSize: Number.MAX_VALUE,
      fileList: () => [],
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: true
    }
  };
  const props$p = {
    ...ActionSheet,
    ...Album,
    ...Alert,
    ...Avatar,
    ...AvatarGroup,
    ...Backtop,
    ...Badge,
    ...Button,
    ...Calendar,
    ...CarKeyboard,
    ...Cell,
    ...CellGroup,
    ...Checkbox,
    ...CheckboxGroup,
    ...CircleProgress,
    ...Code,
    ...CodeInput,
    ...Col,
    ...Collapse,
    ...CollapseItem,
    ...ColumnNotice,
    ...CountDown,
    ...CountTo,
    ...DatetimePicker,
    ...Divider,
    ...Empty,
    ...Form,
    ...GormItem,
    ...Gap,
    ...Grid,
    ...GridItem,
    ...Icon,
    ...Image,
    ...IndexAnchor,
    ...IndexList,
    ...Input,
    ...Keyboard,
    ...Line,
    ...LineProgress,
    ...Link,
    ...List,
    ...ListItem,
    ...LoadingIcon,
    ...LoadingPage,
    ...Loadmore,
    ...Modal,
    ...Navbar,
    ...NoNetwork,
    ...NoticeBar,
    ...Notify,
    ...NumberBox,
    ...NumberKeyboard,
    ...Overlay,
    ...Parse,
    ...Picker,
    ...Popup,
    ...Radio,
    ...RadioGroup,
    ...Rate,
    ...ReadMore,
    ...Row,
    ...RowNotice,
    ...ScrollList,
    ...Search,
    ...Section,
    ...Skeleton,
    ...Slider,
    ...StatusBar,
    ...Steps,
    ...StepsItem,
    ...Sticky,
    ...Subsection,
    ...SwipeAction,
    ...SwipeActionItem,
    ...Swiper,
    ...SwipterIndicator,
    ...Switch,
    ...Tabbar,
    ...TabbarItem,
    ...Tabs,
    ...Tag,
    ...Text,
    ...Textarea,
    ...Toast,
    ...Toolbar,
    ...Tooltip,
    ...Transition,
    ...Upload
  };
  const props$o = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: props$p.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: props$p.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: props$p.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: props$p.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: props$p.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: props$p.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: props$p.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: props$p.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: props$p.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: props$p.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$p.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: props$p.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: props$p.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: props$p.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: props$p.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: props$p.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: props$p.icon.stop
      }
    }
  };
  const mpMixin = {};
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return uni.$u.deepMerge(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          this.$u.route({ type: this.linkType, url: url2 });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = uni.$u.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$K = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$o],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && uni.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: uni.$u.addUnit(this.size),
          lineHeight: uni.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: uni.$u.addUnit(this.top)
        };
        if (this.color && !uni.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? uni.$u.addUnit(this.width) : uni.$u.addUnit(this.size);
        style.height = this.height ? uni.$u.addUnit(this.height) : uni.$u.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        return icons["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-icon", ["u-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$u.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$u.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$u.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$u.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__scopeId", "data-v-1c933a9a"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-icon/u-icon.vue"]]);
  const props$n = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: props$p.badge.isDot
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: props$p.badge.value
      },
      // 显示的内容
      modelValue: {
        type: [Number, String],
        default: props$p.badge.modelValue
      },
      // 是否显示
      show: {
        type: Boolean,
        default: props$p.badge.show
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: props$p.badge.max
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: String,
        default: props$p.badge.type
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: props$p.badge.showZero
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: props$p.badge.bgColor
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: props$p.badge.color
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: String,
        default: props$p.badge.shape
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: String,
        default: props$p.badge.numberType
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: props$p.badge.offset
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: props$p.badge.inverted
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: props$p.badge.absolute
      }
    }
  };
  const _sfc_main$J = {
    name: "u-badge",
    mixins: [mpMixin, props$n, mixin],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = uni.$u.addUnit(top);
            style.right = uni.$u.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      }
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "u-badge--dot" : "u-badge--not-dot", _ctx.inverted && "u-badge--inverted", _ctx.shape === "horn" && "u-badge--horn", `u-badge--${_ctx.type}${_ctx.inverted ? "--inverted" : ""}`], "u-badge"]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-aa9883b1"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-badge/u-badge.vue"]]);
  const props$m = {
    props: {
      // item标签的名称，作为与u-tabbar的value参数匹配的标识符
      name: {
        type: [String, Number, null],
        default: props$p.tabbarItem.name
      },
      // uView内置图标或者绝对路径的图片
      icon: {
        icon: String,
        default: props$p.tabbarItem.icon
      },
      // 右上角的角标提示信息
      badge: {
        type: [String, Number, null],
        default: props$p.tabbarItem.badge
      },
      // 是否显示圆点，将会覆盖badge参数
      dot: {
        type: Boolean,
        default: props$p.tabbarItem.dot
      },
      // 描述文本
      text: {
        type: String,
        default: props$p.tabbarItem.text
      },
      // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
      badgeStyle: {
        type: [Object, String],
        default: props$p.tabbarItem.badgeStyle
      }
    }
  };
  const _sfc_main$I = {
    name: "u-tabbar-item",
    mixins: [mpMixin, mixin, props$m],
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
          uni.$u.error("u-tabbar-item必须搭配u-tabbar组件使用");
        }
        const index2 = this.parent.children.indexOf(this);
        this.isActive = (this.name || index2) === this.parentData.value;
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
          const index2 = this.parent.children.indexOf(this);
          const name = this.name || index2;
          if (name !== this.parent.value) {
            this.parent.$emit("change", name);
          }
          this.$emit("click", name);
        });
      }
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-tabbar-item",
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode("view", { class: "u-tabbar-item__icon" }, [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            name: _ctx.icon,
            color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
            size: 20
          }, null, 8, ["name", "color"])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              $data.isActive ? vue.renderSlot(_ctx.$slots, "active-icon", { key: 0 }, void 0, true) : vue.renderSlot(_ctx.$slots, "inactive-icon", { key: 1 }, void 0, true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createVNode(_component_u_badge, {
            absolute: "",
            offset: [0, _ctx.dot ? "34rpx" : _ctx.badge > 9 ? "14rpx" : "20rpx"],
            customStyle: _ctx.badgeStyle,
            isDot: _ctx.dot,
            value: _ctx.badge || (_ctx.dot ? 1 : null),
            show: _ctx.dot || _ctx.badge > 0
          }, null, 8, ["offset", "customStyle", "isDot", "value", "show"])
        ]),
        vue.renderSlot(_ctx.$slots, "text", {}, () => [
          vue.createElementVNode(
            "text",
            {
              class: "u-tabbar-item__text",
              style: vue.normalizeStyle({
                color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor
              })
            },
            vue.toDisplayString(_ctx.text),
            5
            /* TEXT, STYLE */
          )
        ], true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-a54be951"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-tabbar-item/u-tabbar-item.vue"]]);
  const props$l = {
    props: {}
  };
  const _sfc_main$H = {
    name: "u-safe-bottom",
    mixins: [mpMixin, mixin, props$l],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-safe-bottom", [!$data.isNvue && "u-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3$3 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-3ec581de"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-safe-bottom/u-safe-bottom.vue"]]);
  const props$k = {
    props: {
      // 当前匹配项的name
      value: {
        type: [String, Number, null],
        default: props$p.tabbar.value
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: props$p.tabbar.safeAreaInsetBottom
      },
      // 是否显示上方边框
      border: {
        type: Boolean,
        default: props$p.tabbar.border
      },
      // 元素层级z-index
      zIndex: {
        type: [String, Number],
        default: props$p.tabbar.zIndex
      },
      // 选中标签的颜色
      activeColor: {
        type: String,
        default: props$p.tabbar.activeColor
      },
      // 未选中标签的颜色
      inactiveColor: {
        type: String,
        default: props$p.tabbar.inactiveColor
      },
      // 是否固定在底部
      fixed: {
        type: Boolean,
        default: props$p.tabbar.fixed
      },
      // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
      placeholder: {
        type: Boolean,
        default: props$p.tabbar.placeholder
      }
    }
  };
  const _sfc_main$G = {
    name: "u-tabbar",
    mixins: [mpMixin, mixin, props$k],
    data() {
      return {
        placeholderHeight: 0
      };
    },
    computed: {
      tabbarStyle() {
        const style = {
          zIndex: this.zIndex
        };
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      },
      // 监听多个参数的变化，通过在computed执行对应的操作
      updateChild() {
        return [this.value, this.activeColor, this.inactiveColor];
      },
      updatePlaceholder() {
        return [this.fixed, this.placeholder];
      }
    },
    watch: {
      updateChild() {
        this.updateChildren();
      },
      updatePlaceholder() {
        this.setPlaceholderHeight();
      }
    },
    created() {
      this.children = [];
    },
    mounted() {
      this.setPlaceholderHeight();
    },
    methods: {
      updateChildren() {
        this.children.length && this.children.map((child) => child.updateFromParent());
      },
      // 设置用于防止塌陷元素的高度
      async setPlaceholderHeight() {
        if (!this.fixed || !this.placeholder)
          return;
        await uni.$u.sleep(20);
        this.$uGetRect(".u-tabbar__content").then(({ height = 50 }) => {
          this.placeholderHeight = height;
        });
      }
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("u-safe-bottom"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-tabbar" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-tabbar__content", [_ctx.border && "u-border-top", _ctx.fixed && "u-tabbar--fixed"]]),
          ref: "u-tabbar__content",
          onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"])),
          style: vue.normalizeStyle([$options.tabbarStyle])
        },
        [
          vue.createElementVNode("view", { class: "u-tabbar__content__item-wrapper" }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_u_safe_bottom, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ),
      _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "u-tabbar__placeholder",
          style: vue.normalizeStyle({
            height: $data.placeholderHeight + "px"
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-d5be2d5d"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-tabbar/u-tabbar.vue"]]);
  const props$j = {
    props: {
      bgColor: {
        type: String,
        default: props$p.statusBar.bgColor
      }
    }
  };
  const _sfc_main$F = {
    name: "u-status-bar",
    mixins: [mpMixin, mixin, props$j],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = uni.$u.addUnit(uni.$u.sys().statusBarHeight, "px");
        style.backgroundColor = this.bgColor;
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "u-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__scopeId", "data-v-c0b45a48"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-status-bar/u-status-bar.vue"]]);
  const props$i = {
    props: {
      // 是否开启顶部安全区适配
      safeAreaInsetTop: {
        type: Boolean,
        default: props$p.navbar.safeAreaInsetTop
      },
      // 固定在顶部时，是否生成一个等高元素，以防止塌陷
      placeholder: {
        type: Boolean,
        default: props$p.navbar.placeholder
      },
      // 是否固定在顶部
      fixed: {
        type: Boolean,
        default: props$p.navbar.fixed
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: props$p.navbar.border
      },
      // 左边的图标
      leftIcon: {
        type: String,
        default: props$p.navbar.leftIcon
      },
      // 左边的提示文字
      leftText: {
        type: String,
        default: props$p.navbar.leftText
      },
      // 左右的提示文字
      rightText: {
        type: String,
        default: props$p.navbar.rightText
      },
      // 右边的图标
      rightIcon: {
        type: String,
        default: props$p.navbar.rightIcon
      },
      // 标题
      title: {
        type: [String, Number],
        default: props$p.navbar.title
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: props$p.navbar.bgColor
      },
      // 标题的宽度
      titleWidth: {
        type: [String, Number],
        default: props$p.navbar.titleWidth
      },
      // 导航栏高度
      height: {
        type: [String, Number],
        default: props$p.navbar.height
      },
      // 左侧返回图标的大小
      leftIconSize: {
        type: [String, Number],
        default: props$p.navbar.leftIconSize
      },
      // 左侧返回图标的颜色
      leftIconColor: {
        type: String,
        default: props$p.navbar.leftIconColor
      },
      // 点击左侧区域(返回图标)，是否自动返回上一页
      autoBack: {
        type: Boolean,
        default: props$p.navbar.autoBack
      },
      // 标题的样式，对象或字符串
      titleStyle: {
        type: [String, Object],
        default: props$p.navbar.titleStyle
      }
    }
  };
  const _sfc_main$E = {
    name: "u-navbar",
    mixins: [mpMixin, mixin, props$i],
    data() {
      return {};
    },
    emits: ["leftClick", "rightClick"],
    methods: {
      // 点击左侧区域
      leftClick() {
        this.$emit("leftClick");
        if (this.autoBack) {
          uni.navigateBack();
        }
      },
      // 点击右侧区域
      rightClick() {
        this.$emit("rightClick");
      }
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$2);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-navbar" }, [
      _ctx.fixed && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "u-navbar__placeholder",
          style: vue.normalizeStyle({
            height: _ctx.$u.addUnit(_ctx.$u.getPx(_ctx.height) + _ctx.$u.sys().statusBarHeight, "px")
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([_ctx.fixed && "u-navbar--fixed"])
        },
        [
          _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, {
            key: 0,
            bgColor: _ctx.bgColor
          }, null, 8, ["bgColor"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["u-navbar__content", [_ctx.border && "u-border-bottom"]]),
              style: vue.normalizeStyle({
                height: _ctx.$u.addUnit(_ctx.height),
                backgroundColor: _ctx.bgColor
              })
            },
            [
              vue.createElementVNode("view", {
                class: "u-navbar__content__left",
                "hover-class": "u-navbar__content__left--hover",
                "hover-start-time": "150",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "left", {}, () => [
                  _ctx.leftIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    name: _ctx.leftIcon,
                    size: _ctx.leftIconSize,
                    color: _ctx.leftIconColor
                  }, null, 8, ["name", "size", "color"])) : vue.createCommentVNode("v-if", true),
                  _ctx.leftText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      style: vue.normalizeStyle({
                        color: _ctx.leftIconColor
                      }),
                      class: "u-navbar__content__left__text"
                    },
                    vue.toDisplayString(_ctx.leftText),
                    5
                    /* TEXT, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ]),
              vue.renderSlot(_ctx.$slots, "center", {}, () => [
                vue.createElementVNode(
                  "text",
                  {
                    class: "u-line-1 u-navbar__content__title",
                    style: vue.normalizeStyle([{
                      width: _ctx.$u.addUnit(_ctx.titleWidth)
                    }, _ctx.$u.addStyle(_ctx.titleStyle)])
                  },
                  vue.toDisplayString(_ctx.title),
                  5
                  /* TEXT, STYLE */
                )
              ], true),
              _ctx.$slots.right || _ctx.rightIcon || _ctx.rightText ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "u-navbar__content__right",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.rightClick && $options.rightClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "right", {}, () => [
                  _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    name: _ctx.rightIcon,
                    size: "20"
                  }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true),
                  _ctx.rightText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      class: "u-navbar__content__right__text"
                    },
                    vue.toDisplayString(_ctx.rightText),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ])) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-9d9e7ee2"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-navbar/u-navbar.vue"]]);
  const request = (parmas) => {
    uni.showLoading({
      title: "加载中"
    });
    return new Promise((resolve, reject) => {
      uni.request({
        url: getApp().globalData.httpUrl + parmas.url,
        method: parmas.method,
        data: JSON.stringify(parmas.data),
        header: parmas.method === "POST" ? {
          "content-type": "application/x-www-form-urlencoded"
        } : {
          "content-type": "application/json"
        },
        success: (res) => {
          if (res.statusCode !== 200) {
            resolve(res.data);
            uni.hideLoading();
          } else {
            resolve(res.data);
            uni.hideLoading();
          }
        },
        fail: (err) => {
          reject(err);
          uni.hideLoading();
          uni.showToast({
            icon: "none",
            title: "网络错误",
            duration: 2e3
          });
        }
      });
    });
  };
  const formatNumber = (n) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
  };
  const Rad = (d) => {
    return d * Math.PI / 180;
  };
  const calcDistance = (lat1, lng1, lat2, lng2) => {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 1e4) / 1e4;
    if (s < 1) {
      s = s.toFixed(3) * 1e3 + " m";
      return s;
    } else {
      s = s.toFixed(1) + " km";
      return s;
    }
  };
  const getNowDate = (devide) => {
    let date2 = /* @__PURE__ */ new Date();
    let year = date2.getFullYear();
    let month = formatNumber(date2.getMonth() + 1);
    let day = formatNumber(date2.getDate());
    return `${year}${devide}${month}${devide}${day}`;
  };
  const groupBy = (arr, property) => {
    return arr.reduce(function(cur, obj) {
      var key = obj[property];
      if (!cur[key]) {
        cur[key] = [];
      }
      cur[key].push(obj);
      return cur;
    }, {});
  };
  const _sfc_main$D = {
    data() {
      return {
        app: getApp(),
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2e3,
        duration: 500,
        swiperList: [],
        viewHeight: 0,
        storeInfo: {}
      };
    },
    /**
     * 页面的初始数据
     */
    options: {
      addGlobalClass: true
    },
    props: {
      scrollViewHeight: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.$nextTick(() => this.ready());
    },
    watch: {
      // 监听高度
      scrollViewHeight: function(val) {
        if (val && val > 0) {
          this.calculatePageHeight();
        }
      }
    },
    methods: {
      // 打电话
      toCall() {
        uni.makePhoneCall({
          phoneNumber: this.storeInfo.phone
        });
      },
      // 地图位置
      toMap() {
        var that = this;
        uni.openLocation({
          latitude: that.storeInfo.latitude,
          longitude: that.storeInfo.longitude,
          scale: 18,
          name: this.storeInfo.location
        });
      },
      ready() {
        this.calculatePageHeight();
      },
      // 计算页面高度
      calculatePageHeight() {
        var that = this;
        let res = uni.getSystemInfoSync();
        let query1 = uni.createSelectorQuery().in(that);
        query1.select(".banner").boundingClientRect((bannerRect) => {
          let query2 = uni.createSelectorQuery().in(that);
          query2.select(".navBox").boundingClientRect((navBoxRect) => {
            that.viewHeight = that.scrollViewHeight - bannerRect.height - navBoxRect.height - 54 - res.statusBarHeight;
          }).exec();
        }).exec();
      },
      // 去订场
      appointmentVenue() {
        uni.navigateTo({
          url: "/pages/gymnasiumInfo/gymnasiumInfo"
        });
      },
      // 去我的
      toMine() {
        this.$emit("navigate", {
          detail: 1
        });
      }
    },
    created: async function() {
      let gymnasiumInfo = await this.app.getStoreInfo("reGet");
      if (gymnasiumInfo.facility.includes("设施:")) {
        gymnasiumInfo.facility = gymnasiumInfo.facility.split("设施:")[1];
      }
      if (gymnasiumInfo.serve.includes("服务:")) {
        gymnasiumInfo.serve = gymnasiumInfo.serve.split("服务:")[1];
      }
      this.storeInfo = gymnasiumInfo;
      this.swiperList = this.storeInfo.gymnasiumImgList;
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_u_navbar, {
        class: "nav-bar",
        safeAreaInsetTop: true,
        fixed: false
      }, {
        left: vue.withCtx(() => [
          vue.createElementVNode("image", {
            src: "/static/images/home/qingyu.svg",
            mode: "",
            style: { "width": "180px" }
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "banner" }, [
        vue.createElementVNode("swiper", {
          "indicator-dots": $data.indicatorDots,
          class: "h-full",
          autoplay: $data.autoplay,
          interval: $data.interval,
          duration: $data.duration
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.swiperList, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index2 }, [
                vue.createElementVNode("view", { class: "swiper-item h-full" }, [
                  vue.createElementVNode("image", {
                    src: item,
                    class: "w-full h-full",
                    mode: ""
                  }, null, 8, ["src"])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 8, ["indicator-dots", "autoplay", "interval", "duration"])
      ]),
      vue.createElementVNode("view", { class: "flex align-center navBox justify-center" }, [
        vue.createElementVNode("view", {
          class: "navLeft",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.appointmentVenue && $options.appointmentVenue(...args))
        }, [
          vue.createElementVNode("image", {
            src: "/static/images/home/appointment.svg",
            mode: "",
            class: "leftText"
          }),
          vue.createElementVNode("image", {
            src: "/static/images/home/predetermine.svg",
            mode: "",
            class: "rightIcon"
          }),
          vue.createElementVNode("view", { class: "leftSubText" }, "包场通场")
        ]),
        vue.createElementVNode("view", {
          class: "navRight flex align-center justify-center",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toMine && $options.toMine(...args))
        }, [
          vue.createElementVNode("image", {
            src: "/static/images/home/mine.svg",
            mode: "",
            class: "leftText"
          }),
          vue.createElementVNode("image", {
            src: "/static/images/home/infoIcon.svg",
            mode: "",
            class: "rightIcon"
          }),
          vue.createElementVNode("view", { class: "leftSubText" }, "个人信息")
        ])
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "indexInfo",
          style: vue.normalizeStyle({ "height": $data.viewHeight + "px" })
        },
        [
          vue.createElementVNode("view", { class: "commonInfo" }, [
            vue.createElementVNode(
              "view",
              { class: "gymnasiumName" },
              vue.toDisplayString($data.storeInfo.gymnasiumName),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "location" },
              vue.toDisplayString($data.storeInfo.location),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "location" },
              vue.toDisplayString($data.storeInfo.phone),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
              vue.createElementVNode("view", {
                class: "flex align-center operateItem1",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toMap && $options.toMap(...args))
              }, [
                vue.createVNode(_component_u_icon, {
                  name: "map-fill",
                  color: "#409EFF"
                }),
                vue.createElementVNode("view", { class: "operateItem" }, " 地图/导航 ")
              ]),
              vue.createElementVNode("view", {
                class: "flex align-center operateItem2",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.toCall && $options.toCall(...args))
              }, [
                vue.createVNode(_component_u_icon, {
                  name: "phone-fill",
                  color: "#409EFF"
                }),
                vue.createElementVNode("view", { class: "operateItem" }, " 联系商家 ")
              ])
            ])
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { class: "commonTitle" }, " 场馆设施 "),
            vue.createElementVNode("view", { class: "commonValue" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($data.storeInfo.facility ? $data.storeInfo.facility.replace(/\\n/, "\n") : ""),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { class: "commonTitle" }, " 场馆服务 "),
            vue.createElementVNode("view", { class: "commonValue" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($data.storeInfo.serve ? $data.storeInfo.serve.replace(/\\n/, "\n") : ""),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-07e72d3c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/home/home.vue"]]);
  const _sfc_main$C = {
    data() {
      return {
        app: getApp(),
        topHeight: 0,
        userInfo: {},
        nickName: "",
        avatar: "",
        phone: "",
        statisticsList: [
          {
            title: "运动时长",
            num: 0
          },
          {
            title: "累计天数",
            num: 0
          },
          {
            title: "连续天数",
            num: 0
          }
        ],
        reservationInfo: [],
        serviceList: [
          {
            icon: "/static/images/mine/orderIcon.svg",
            title: "我的订单"
          },
          {
            icon: "/static/images/mine/orderIcon.svg",
            title: "我的预约"
          },
          {
            icon: "/static/images/mine/setIcon.svg",
            title: "设置"
          },
          {
            icon: "/static/images/mine/agreementIcon.svg",
            title: "意见反馈"
          },
          {
            icon: "/static/images/mine/contactIcon.svg",
            title: "联系客服"
          }
        ],
        num: "",
        con: {
          siteNo: "",
          startTime: "",
          endTime: "",
          title: "",
          icon: ""
        }
      };
    },
    async mounted() {
      this.$nextTick(() => this.ready());
      let userInfo = await getApp().getUserInfo();
      this.userInfo = userInfo;
      this.statisticsList[0].num = userInfo.total_length;
      this.statisticsList[1].num = userInfo.sport_day;
      this.statisticsList[2].num = userInfo.total_count;
      this.serviceList.pop();
    },
    methods: {
      ready() {
        this.getTopHeight();
        this.getRecentlyReserve();
      },
      // 处理日期
      dealWithDate(date2) {
        const date1 = new Date(date2);
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let day = weekdays[date1.getDay()];
        let date22 = "";
        let dateArr = date2.split("-");
        if (dateArr[0] == (/* @__PURE__ */ new Date()).getFullYear()) {
          date22 = dateArr[1] + "-" + dateArr[2];
        } else {
          date22 = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
        }
        return {
          date: date22,
          day
        };
      },
      handleContact(e) {
        formatAppLog("log", "at pages/mine/mine.vue:181", e.detail.path);
        formatAppLog("log", "at pages/mine/mine.vue:182", e.detail.query);
      },
      // 获取最近的预约信息
      getRecentlyReserve() {
        let enumInfo = this.app.globalData.enumInfo;
        request({
          url: "wx/recently/reserve",
          method: "POST",
          data: {
            user_ouid: this.app.globalData.userInfo.ouid
          }
        }).then((res) => {
          let data = res.data;
          let date2 = data.data.slice(0, 10);
          let dateInfo = this.dealWithDate(date2);
          let reservationInfo = [];
          let siteList = [];
          let site_detail = data.site_detail;
          if (site_detail) {
            site_detail.forEach((item) => {
              item.time_enum.forEach((enumCon) => {
                var _a, _b;
                siteList.push({
                  siteNo: item.site_name,
                  startTime: (_a = enumInfo[enumCon]) == null ? void 0 : _a.split("~")[0],
                  endTime: (_b = enumInfo[enumCon]) == null ? void 0 : _b.split("~")[1]
                });
              });
            });
            reservationInfo.push({
              gymnasiumName: data.shop_name,
              date: dateInfo.date,
              day: dateInfo.day,
              order_no: data.order_no,
              siteList
            });
          } else {
            reservationInfo = [];
          }
          this.reservationInfo = reservationInfo;
        });
      },
      toDetail() {
        uni.navigateTo({
          url: "/pages/reservationInfo/reservationInfo?order_no=" + this.reservationInfo[0].order_no
        });
      },
      getTopHeight() {
        let res = uni.getSystemInfoSync();
        this.topHeight = res.statusBarHeight + 30;
      },
      toReservationList() {
        uni.navigateTo({
          url: "/pages/reservationList/reservationList"
        });
      },
      toInfoEdit() {
        uni.navigateTo({
          url: "/pages/infoEdit/infoEdit"
        });
      },
      chooseServiceItem(e) {
        let url2 = "";
        switch (e.currentTarget.dataset.item) {
          case 0:
            url2 = "/pages/orderList/orderList";
            break;
          case 1:
            url2 = "/pages/reservationList/reservationList";
            break;
          case 2:
            url2 = "/pages/settings/settings";
            break;
          case 3:
            url2 = "/pages/feedback/feedback";
            break;
          case 4:
            uni.openCustomerServiceChat({
              extInfo: {
                url: ""
              },
              corpId: "",
              success(res) {
              }
            });
            break;
        }
        uni.navigateTo({
          url: url2
        });
      },
      chooseServiceItem1(e) {
        let url2 = "";
        switch (e.currentTarget.dataset.item) {
          case 0:
            url2 = "/pages/releaseActivity/releaseActivity";
            break;
          case 1:
            url2 = "/pages/publicationList/publicationList";
            break;
          case 2:
            url2 = "/pages/income/income";
            break;
        }
        uni.navigateTo({
          url: url2
        });
      },
      chooseServiceItem2(e) {
        let url2 = "";
        switch (e.currentTarget.dataset.item) {
        }
        uni.navigateTo({
          url: url2
        });
      }
    },
    created: function() {
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/mine/mine.wxml "),
        vue.createElementVNode(
          "view",
          {
            class: "page",
            style: vue.normalizeStyle("padding-top: " + ($data.topHeight + "px") + ";")
          },
          [
            vue.createElementVNode("view", { class: "basicTop flex align-center justify-between" }, [
              vue.createElementVNode("view", { class: "flex align-center" }, [
                vue.createElementVNode("image", {
                  src: $data.userInfo.avatar,
                  style: { "width": "128rpx", "height": "128rpx", "border-radius": "50%" },
                  mode: ""
                }, null, 8, ["src"]),
                vue.createElementVNode("view", {
                  class: "flex flex-direction align-start",
                  style: { "margin-left": "26rpx" },
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.toInfoEdit && $options.toInfoEdit(...args))
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "nickName" },
                    vue.toDisplayString($data.userInfo.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "phone" },
                    vue.toDisplayString($data.userInfo.phone ? "+86-" + $data.userInfo.phone : ""),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[1] || (_cache[1] = (...args) => $options.toInfoEdit && $options.toInfoEdit(...args))
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/mine/editIcon.svg",
                  style: { "width": "40rpx", "height": "40rpx" },
                  mode: ""
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "flex align-center statisticsBox" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.statisticsList, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "statisticsItem flex flex-direction align-center justify-center",
                    key: index2
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "numBox" },
                      vue.toDisplayString(item.num),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "titleBox" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", { class: "myReservation" }, [
              vue.createElementVNode("view", {
                class: "flex align-center justify-between",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toReservationList && $options.toReservationList(...args))
              }, [
                vue.createElementVNode("view", { class: "myReservationTitle" }, "我的预约"),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("image", {
                    src: "/static/images/mine/editIcon.svg",
                    style: { "width": "32rpx", "height": "32rpx" },
                    mode: ""
                  })
                ])
              ]),
              $data.reservationInfo.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "reservationBox"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.reservationInfo, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      onClick: _cache[3] || (_cache[3] = (...args) => $options.toDetail && $options.toDetail(...args)),
                      key: index2
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "gymnasiumName" },
                          vue.toDisplayString(item.gymnasiumName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          { class: "reservationDate" },
                          vue.toDisplayString(item.day) + " " + vue.toDisplayString(item.date),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "flex align-start flex-wrap",
                        style: { "margin-top": "8rpx" }
                      }, [
                        vue.createElementVNode("view", { class: "siteText" }, "预约场次:"),
                        vue.createElementVNode("view", { class: "flex-1 flex flex-wrap" }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(item.siteList, (con, j) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "view",
                                {
                                  class: "siteItem",
                                  key: j
                                },
                                vue.toDisplayString(con.siteNo) + " " + vue.toDisplayString(con.startTime) + " - " + vue.toDisplayString(con.endTime),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "myReservation" }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("view", {
                  class: "myReservationTitle",
                  style: { "margin-bottom": "28rpx" }
                }, "我的服务"),
                vue.createElementVNode("view", { class: "flex align-center flex-wrap specialServiceList" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.serviceList, (con, j) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "serviceItem flex flex-direction align-center",
                        "data-item": j,
                        onClick: _cache[5] || (_cache[5] = (...args) => $options.chooseServiceItem && $options.chooseServiceItem(...args)),
                        key: j
                      }, [
                        con.title == "联系客服" ? (vue.openBlock(), vue.createElementBlock(
                          "button",
                          {
                            key: 0,
                            "show-message-card": true,
                            "open-type": "contact",
                            onContact: _cache[4] || (_cache[4] = (...args) => $options.handleContact && $options.handleContact(...args)),
                            class: "specialBtn"
                          },
                          [
                            vue.createElementVNode("image", {
                              src: con.icon,
                              style: { "width": "42rpx", "height": "42rpx" },
                              mode: ""
                            }, null, 8, ["src"]),
                            vue.createElementVNode(
                              "view",
                              { class: "serviceItemTitle" },
                              vue.toDisplayString(con.title),
                              1
                              /* TEXT */
                            )
                          ],
                          32
                          /* HYDRATE_EVENTS */
                        )) : (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "flex flex-direction align-center"
                        }, [
                          vue.createElementVNode("image", {
                            src: con.icon,
                            style: { "width": "42rpx", "height": "42rpx" },
                            mode: ""
                          }, null, 8, ["src"]),
                          vue.createElementVNode(
                            "view",
                            { class: "serviceItemTitle" },
                            vue.toDisplayString(con.title),
                            1
                            /* TEXT */
                          )
                        ]))
                      ], 8, ["data-item"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])
          ],
          4
          /* STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/mine/mine.vue"]]);
  const _sfc_main$B = {
    components: {
      Home: PagesHomeHome,
      Mine: PagesMineMine
    },
    data() {
      return {
        app: getApp(),
        active: 0,
        scrollViewHeight: 0,
        tabbarList: [
          {
            text: "首页",
            iconPath: "/static/images/index/home.svg",
            selectedIconPath: "/static/images/index/homeActive.svg"
          },
          {
            text: "我的",
            iconPath: "/static/images/index/mine.svg",
            selectedIconPath: "/static/images/index/mineActive.svg"
          }
        ],
        gymnasiumInfo: {}
      };
    },
    onLoad() {
      this.getTabbarIndex();
      this.calculatePageHeight();
      this.checkLoginState();
    },
    onShow() {
    },
    onReady() {
    },
    methods: {
      getTabbarIndex() {
        let tabbarIndex = uni.getStorageSync("tabbarIndex");
        if (tabbarIndex) {
          this.active = Number(tabbarIndex);
        }
      },
      navigate(index2) {
        this.active = index2.detail;
      },
      // 计算页面高度
      calculatePageHeight() {
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let that = this;
        let info = uni.getSystemInfoSync();
        let saveBottom = info.safeArea.bottom;
        that.scrollViewHeight = screenHeight - 50 - (screenHeight - saveBottom);
      },
      async checkLoginState() {
        this.app.getUserInfo();
        if (!this.app.globalData.userInfo.ouid) {
          uni.reLaunch({
            url: "/pages/login/login"
          });
        }
      },
      tabbarChange(name) {
        this.active = name;
        uni.setStorageSync("tabbarIndex", name);
      }
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Home = vue.resolveComponent("Home");
    const _component_Mine = vue.resolveComponent("Mine");
    const _component_u_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("u-tabbar-item"), __easycom_0$5);
    const _component_u_tabbar = resolveEasycom(vue.resolveDynamicComponent("u-tabbar"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" index.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createElementVNode(
            "scroll-view",
            {
              class: "content",
              "scroll-y": true,
              style: vue.normalizeStyle("height: " + $data.scrollViewHeight + "px;")
            },
            [
              $data.active == 0 ? (vue.openBlock(), vue.createBlock(_component_Home, {
                key: 0,
                scrollViewHeight: $data.scrollViewHeight,
                onNavigate: $options.navigate
              }, null, 8, ["scrollViewHeight", "onNavigate"])) : (vue.openBlock(), vue.createBlock(
                _component_Mine,
                {
                  key: 1,
                  ref: "mine",
                  id: "mine"
                },
                null,
                512
                /* NEED_PATCH */
              ))
            ],
            4
            /* STYLE */
          ),
          vue.createVNode(_component_u_tabbar, {
            value: $data.active,
            onChange: $options.tabbarChange,
            border: false,
            fixed: false,
            placeholder: false
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.tabbarList, (item, index2) => {
                  return vue.openBlock(), vue.createBlock(_component_u_tabbar_item, {
                    text: item.text,
                    key: index2
                  }, {
                    "active-icon": vue.withCtx(() => [
                      vue.createElementVNode("image", {
                        class: "u-page__item__slot-icon",
                        src: item.selectedIconPath,
                        style: { "width": "48rpx", "height": "60rpx" }
                      }, null, 8, ["src"])
                    ]),
                    "inactive-icon": vue.withCtx(() => [
                      vue.createElementVNode("image", {
                        class: "u-page__item__slot-icon",
                        src: item.iconPath,
                        style: { "width": "48rpx", "height": "60rpx" }
                      }, null, 8, ["src"])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["text"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value", "onChange"])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/index/index.vue"]]);
  const props$h = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: props$p.loadingIcon.show
      },
      // 颜色
      color: {
        type: String,
        default: props$p.loadingIcon.color
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: props$p.loadingIcon.textColor
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: props$p.loadingIcon.vertical
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: props$p.loadingIcon.mode
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: props$p.loadingIcon.size
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: props$p.loadingIcon.textSize
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: props$p.loadingIcon.text
      },
      // 动画模式
      timingFunction: {
        type: String,
        default: props$p.loadingIcon.timingFunction
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: props$p.loadingIcon.duration
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: props$p.loadingIcon.inactiveColor
      }
    }
  };
  const _sfc_main$A = {
    name: "u-loading-icon",
    mixins: [mpMixin, mixin, props$h],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = uni.$u.colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading-icon", [_ctx.vertical && "u-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["u-loading-icon__spinner", [`u-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$u.addUnit(_ctx.size),
              height: _ctx.$u.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "u-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$u.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__scopeId", "data-v-00752c6d"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-loading-icon/u-loading-icon.vue"]]);
  const props$g = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: props$p.button.hairline
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: props$p.button.type
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: props$p.button.size
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: props$p.button.shape
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: props$p.button.plain
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: props$p.button.disabled
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: props$p.button.loading
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: props$p.button.loadingText
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: props$p.button.loadingMode
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: props$p.button.loadingSize
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: props$p.button.openType
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: props$p.button.formType
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: props$p.button.appParameter
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: props$p.button.hoverStopPropagation
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: props$p.button.lang
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: props$p.button.sessionFrom
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: props$p.button.sendMessageTitle
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: props$p.button.sendMessagePath
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: props$p.button.sendMessageImg
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: props$p.button.showMessageCard
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: props$p.button.dataName
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: props$p.button.throttleTime
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: props$p.button.hoverStartTime
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: props$p.button.hoverStayTime
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: props$p.button.text
      },
      // 按钮图标
      icon: {
        type: String,
        default: props$p.button.icon
      },
      // 按钮图标
      iconColor: {
        type: String,
        default: props$p.button.icon
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: props$p.button.color
      }
    }
  };
  const _sfc_main$z = {
    name: "u-button",
    mixins: [mpMixin, mixin, props$g],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : uni.$u.config.color[`u-${this.type}`];
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      }
    },
    emits: [
      "click",
      "getphonenumber",
      "getuserinfo",
      "error",
      "opensetting",
      "launchapp"
    ],
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          uni.$u.throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("button", {
      "hover-start-time": Number(_ctx.hoverStartTime),
      "hover-stay-time": Number(_ctx.hoverStayTime),
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      "app-parameter": _ctx.appParameter,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      lang: _ctx.lang,
      "data-name": _ctx.dataName,
      "session-from": _ctx.sessionFrom,
      "send-message-img": _ctx.sendMessageImg,
      "show-message-card": _ctx.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      "hover-class": !_ctx.disabled && !_ctx.loading ? "u-button--active" : "",
      class: vue.normalizeClass(["u-button u-reset-button", $options.bemClass]),
      style: vue.normalizeStyle([$options.baseColor, _ctx.$u.addStyle(_ctx.customStyle)]),
      onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createVNode(_component_u_loading_icon, {
            mode: _ctx.loadingMode,
            size: _ctx.loadingSize * 1.15,
            color: $options.loadingColor
          }, null, 8, ["mode", "size", "color"]),
          vue.createElementVNode(
            "text",
            {
              class: "u-button__loading-text",
              style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
            },
            vue.toDisplayString(_ctx.loadingText || _ctx.text),
            5
            /* TEXT, STYLE */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            name: _ctx.icon,
            color: $options.iconColorCom,
            size: $options.textSize * 1.35,
            customStyle: { marginRight: "2px" }
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "u-button__text",
                style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
              },
              vue.toDisplayString(_ctx.text),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ], 46, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-461e713c"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-button/u-button.vue"]]);
  const _sfc_main$y = {
    data() {
      return {
        app: getApp(),
        phone: "",
        code: "",
        codeState: false,
        seconds: 60,
        timer: null
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
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
      validatePhoneNumber(phone) {
        if (!phone) {
          return "empty";
        }
        var regExp2 = /^1[3456789]\d{9}$/;
        if (regExp2.test(phone)) {
          return "ok";
        } else {
          return "no";
        }
      },
      async getCode() {
        if (this.codeState) {
          return false;
        }
        if (this.timer) {
          clearInterval(this.timer);
        }
        let result = this.validatePhoneNumber(this.phone);
        if (result != "ok") {
          uni.showToast({
            icon: "none",
            title: result == "no" ? "手机号格式错误" : "请输入手机号"
          });
          return false;
        }
        let res = await this.getPhoneCode();
        uni.showToast({
          icon: "none",
          title: res
        });
        if (res == "验证码已发送") {
          this.codeState = true;
          let timer = setInterval(() => {
            this.seconds = this.seconds - 1;
            if (this.seconds == 0) {
              this.codeState = false;
              this.seconds = 60;
              clearInterval(this.timer);
            }
          }, 1e3);
          this.timer = timer;
        }
      },
      // 获取验证码
      getPhoneCode() {
        return new Promise((resolve, reject) => {
          request({
            url: "common/get-phone-code",
            method: "POST",
            data: {
              phone: this.phone
            }
          }).then((res) => {
            if (res.code == 200) {
              resolve("验证码已发送");
            } else if (res.code == 500) {
              if (res.msg == "刚发的验证码，5分钟有效") {
                resolve("不可重复获取验证码");
              }
            }
          });
        });
      },
      toLogin() {
        let result = this.validatePhoneNumber(this.phone);
        if (result != "ok") {
          uni.showToast({
            icon: "none",
            title: result == "no" ? "手机号格式错误" : "请输入手机号"
          });
          return false;
        }
        if (!this.code) {
          uni.showToast({
            icon: "none",
            title: "验证码不能为空"
          });
          return false;
        } else if (this.code.length != 6) {
          uni.showToast({
            icon: "none",
            title: "验证码长度为6位"
          });
          return false;
        }
        request({
          url: "common/phone-code-login",
          method: "POST",
          data: {
            phone: this.phone,
            code: this.code
          }
        }).then((res) => {
          if (res.code == 200) {
            this.app.globalData.userInfo.ouid = res.data.ouid;
            this.app.getUserInfo();
            uni.showToast({
              icon: "none",
              title: "登录成功",
              success: () => {
                setTimeout(() => {
                  uni.redirectTo({
                    url: "/pages/index/index"
                  });
                }, 1e3);
              }
            });
          } else if (res.code == 500) {
            uni.showToast({
              icon: "none",
              title: res.msg
            });
          }
        });
      },
      toArrgement() {
        uni.navigateTo({
          url: "/pages/arrgement/arrgement"
        });
      },
      wechatLogin() {
        uni.navigateTo({
          url: "/pages/wechatLogin/wechatLogin"
        });
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/login.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createElementVNode("view", { class: "topBg" }),
          vue.createElementVNode("view", { class: "loginBox" }, [
            vue.createElementVNode("view", { class: "topTitle" }, "手机号登录"),
            vue.createElementVNode("view", { class: "flex align-center phoneInput solid-bottom" }, [
              vue.createElementVNode("view", { class: "phoneInputLeft" }, "+86"),
              vue.createElementVNode("view", { class: "rightDivide" }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  style: { "padding-left": "26rpx" },
                  "placeholder-style": "color:#B1B4C3;font-size:32rpx",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
                  placeholder: "请输入手机号码"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "codeInput flex align-center solid-bottom" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "flex-1",
                  "placeholder-style": "color:#B1B4C3;font-size:32rpx",
                  type: "text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.code = $event),
                  placeholder: "请输入验证码"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.code]
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "codeRight",
                  style: vue.normalizeStyle("color:" + ($data.codeState ? "#B1B4C3" : "#0077FF") + ";padding-right: " + ($data.codeState ? "30rpx" : "") + ";"),
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.getCode && $options.getCode(...args))
                },
                vue.toDisplayString($data.codeState ? $data.seconds + " s" : "获取验证码"),
                5
                /* TEXT, STYLE */
              )
            ]),
            vue.createVNode(_component_u_button, {
              onClick: $options.toLogin,
              type: "primary",
              size: "large",
              color: "#0077FF",
              "custom-style": "margin-top: 134rpx;border-radius: 12rpx;"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("登录")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["onClick"])
          ]),
          vue.createElementVNode("view", { class: "bottomTitle flex flex-direction align-center" }, [
            vue.createElementVNode("view", null, "未注册手机号登录后将自动生成账号且代表您"),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "已阅读并同意"),
              vue.createElementVNode("text", {
                class: "agreement",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.toArrgement && $options.toArrgement(...args))
              }, "《用户协议》")
            ])
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/login/login.vue"]]);
  const _sfc_main$x = {
    data() {
      return {
        app: getApp()
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
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
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/arrgement/arrgement.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "用户协议",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "arrgementBox" }, "欢迎您使用服务（以下简称：本服务）请您仔细阅读下方条款，若您对本协议的任何条款有异议，您可以第一时间选择不进入。")
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesArrgementArrgement = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-bec3e8f7"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/arrgement/arrgement.vue"]]);
  const props$f = {
    props: {
      // 滑块的移动过渡时间，单位ms
      duration: {
        type: Number,
        default: props$p.tabs.duration
      },
      // tabs标签数组
      list: {
        type: Array,
        default: props$p.tabs.list
      },
      // 滑块颜色
      lineColor: {
        type: String,
        default: props$p.tabs.lineColor
      },
      // 菜单选择中时的样式
      activeStyle: {
        type: [String, Object],
        default: props$p.tabs.activeStyle
      },
      // 菜单非选中时的样式
      inactiveStyle: {
        type: [String, Object],
        default: props$p.tabs.inactiveStyle
      },
      // 滑块长度
      lineWidth: {
        type: [String, Number],
        default: props$p.tabs.lineWidth
      },
      // 滑块高度
      lineHeight: {
        type: [String, Number],
        default: props$p.tabs.lineHeight
      },
      // 滑块背景显示大小，当滑块背景设置为图片时使用
      lineBgSize: {
        type: String,
        default: props$p.tabs.lineBgSize
      },
      // 菜单item的样式
      itemStyle: {
        type: [String, Object],
        default: props$p.tabs.itemStyle
      },
      // 菜单是否可滚动
      scrollable: {
        type: Boolean,
        default: props$p.tabs.scrollable
      },
      // 当前选中标签的索引
      current: {
        type: [Number, String],
        default: props$p.tabs.current
      },
      // 默认读取的键名
      keyName: {
        type: String,
        default: props$p.tabs.keyName
      }
    }
  };
  const _sfc_main$w = {
    name: "u-tabs",
    mixins: [mpMixin, mixin, props$f],
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
        return (index2) => {
          const style = {};
          const customeStyle = index2 === this.innerCurrent ? uni.$u.addStyle(this.activeStyle) : uni.$u.addStyle(
            this.inactiveStyle
          );
          if (this.list[index2].disabled) {
            style.color = "#c8c9cc";
          }
          return uni.$u.deepMerge(customeStyle, style);
        };
      },
      propsBadge() {
        return uni.$u.props.badge;
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
        const lineWidth = uni.$u.getPx(this.lineWidth);
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
      clickHandler(item, index2) {
        this.$emit("click", {
          ...item,
          index: index2
        });
        if (item.disabled)
          return;
        this.innerCurrent = index2;
        this.resize();
        this.$emit("change", {
          ...item,
          index: index2
        });
      },
      init() {
        uni.$u.sleep().then(() => {
          this.resize();
        });
      },
      setScrollLeft() {
        const tabRect = this.list[this.innerCurrent];
        const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
          return total + curr.rect.width;
        }, 0);
        const windowWidth = uni.$u.sys().windowWidth;
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
          itemRect.map((item, index2) => {
            this.scrollViewWidth += item.width;
            this.list[index2].rect = item;
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
          const promiseAllArr = this.list.map((item, index2) => this.queryRect(
            `u-tabs__wrapper__nav__item-${index2}`,
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
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-tabs" }, [
      vue.createElementVNode("view", { class: "u-tabs__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
        vue.createElementVNode("view", { class: "u-tabs__wrapper__scroll-view-wrapper" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": _ctx.scrollable,
            "scroll-left": $data.scrollLeft,
            "scroll-with-animation": "",
            class: "u-tabs__wrapper__scroll-view",
            "show-scrollbar": false,
            ref: "u-tabs__wrapper__scroll-view"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "u-tabs__wrapper__nav",
                ref: "u-tabs__wrapper__nav"
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.list, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["u-tabs__wrapper__nav__item", [`u-tabs__wrapper__nav__item-${index2}`, item.disabled && "u-tabs__wrapper__nav__item--disabled"]]),
                      key: index2,
                      onClick: ($event) => $options.clickHandler(item, index2),
                      ref_for: true,
                      ref: `u-tabs__wrapper__nav__item-${index2}`,
                      style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.itemStyle), { flex: _ctx.scrollable ? "" : 1 }])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass([[item.disabled && "u-tabs__wrapper__nav__item__text--disabled"], "u-tabs__wrapper__nav__item__text"]),
                          style: vue.normalizeStyle([$options.textStyle(index2)])
                        },
                        vue.toDisplayString(item[_ctx.keyName]),
                        7
                        /* TEXT, CLASS, STYLE */
                      ),
                      vue.createVNode(_component_u_badge, {
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
                      }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])
                    ], 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-tabs__wrapper__nav__line",
                    ref: "u-tabs__wrapper__nav__line",
                    style: vue.normalizeStyle([{
                      width: _ctx.$u.addUnit(_ctx.lineWidth),
                      transform: `translate(${$data.lineOffsetLeft}px)`,
                      transitionDuration: `${$data.firstTime ? 0 : _ctx.duration}ms`,
                      height: _ctx.$u.addUnit(_ctx.lineHeight),
                      background: _ctx.lineColor,
                      backgroundSize: _ctx.lineBgSize
                    }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              512
              /* NEED_PATCH */
            )
          ], 8, ["scroll-x", "scroll-left"])
        ]),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-0546c3e4"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-tabs/u-tabs.vue"]]);
  const props$e = {
    props: {
      // 内置图标名称，或图片路径，建议绝对路径
      icon: {
        type: String,
        default: props$p.empty.icon
      },
      // 提示文字
      text: {
        type: String,
        default: props$p.empty.text
      },
      // 文字颜色
      textColor: {
        type: String,
        default: props$p.empty.textColor
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: props$p.empty.textSize
      },
      // 图标的颜色
      iconColor: {
        type: String,
        default: props$p.empty.iconColor
      },
      // 图标的大小
      iconSize: {
        type: [String, Number],
        default: props$p.empty.iconSize
      },
      // 选择预置的图标类型
      mode: {
        type: String,
        default: props$p.empty.mode
      },
      //  图标宽度，单位px
      width: {
        type: [String, Number],
        default: props$p.empty.width
      },
      // 图标高度，单位px
      height: {
        type: [String, Number],
        default: props$p.empty.height
      },
      // 是否显示组件
      show: {
        type: Boolean,
        default: props$p.empty.show
      },
      // 组件距离上一个元素之间的距离，默认px单位
      marginTop: {
        type: [String, Number],
        default: props$p.empty.marginTop
      }
    }
  };
  const _sfc_main$v = {
    name: "u-empty",
    mixins: [mpMixin, mixin, props$e],
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
        style.marginTop = uni.$u.addUnit(this.marginTop);
        return uni.$u.deepMerge(uni.$u.addStyle(this.customStyle), style);
      },
      // 文本样式
      textStyle() {
        const style = {};
        style.color = this.textColor;
        style.fontSize = uni.$u.addUnit(this.textSize);
        return style;
      },
      // 判断icon是否图片路径
      isSrc() {
        return this.icon.indexOf("/") >= 0;
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-empty",
        style: vue.normalizeStyle([$options.emptyStyle])
      },
      [
        !$options.isSrc ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
          key: 0,
          name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
          size: _ctx.iconSize,
          color: _ctx.iconColor,
          "margin-top": "14"
        }, null, 8, ["name", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          style: vue.normalizeStyle({
            width: _ctx.$u.addUnit(_ctx.width),
            height: _ctx.$u.addUnit(_ctx.height)
          }),
          src: _ctx.icon,
          mode: "widthFix"
        }, null, 12, ["src"])),
        vue.createElementVNode(
          "text",
          {
            class: "u-empty__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
          5
          /* TEXT, STYLE */
        ),
        _ctx.$slots.default || _ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "u-empty__wrap"
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-bd84101d"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-empty/u-empty.vue"]]);
  const _sfc_main$u = {
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
        request({
          url: "wx/get/shop/list",
          method: "POST"
        }).then((res) => {
          let gymnasiumList = res.data;
          gymnasiumList.forEach((item) => {
            item.distance = calcDistance(item.latitude, item.longitude, this.app.globalData.userInfo.latitude, this.app.globalData.userInfo.longitude);
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
        uni.navigateTo({
          url: "/pages/gymnasiumInfo/gymnasiumInfo?shop_id=" + shop_id
        });
      },
      calculateHeight() {
        var that = this;
        let query = uni.createSelectorQuery().in(that);
        query.select(".nav-bar").boundingClientRect((navRect) => {
          that.viewHeight = that.scrollViewHeight - navRect.height - 59;
        }).exec();
      }
    },
    created: function() {
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_2$3);
    const _component_u_empty = resolveEasycom(vue.resolveDynamicComponent("u-empty"), __easycom_3$2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/reservation/reservation.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "预约场地",
            safeAreaInsetTop: true,
            leftIconSize: "0",
            fixed: false
          }),
          vue.createVNode(_component_u_tabs, {
            list: $data.list,
            lineWidth: "18",
            lineHeight: "3",
            lineColor: "0077FF",
            onChange: $options.tabChange
          }, null, 8, ["list", "onChange"]),
          vue.withDirectives(vue.createElementVNode(
            "scroll-view",
            {
              class: "content",
              "scroll-y": true,
              style: vue.normalizeStyle("height: " + $data.viewHeight + "px;")
            },
            [
              $data.gymnasiumList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无场馆",
                mode: "list",
                marginTop: "100"
              })) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "recommendBox"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.gymnasiumList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "recommendBoxItem",
                      "wx-for-item": "item",
                      "data-item": item,
                      onClick: _cache[0] || (_cache[0] = (...args) => $options.gumnasiumDetail && $options.gumnasiumDetail(...args)),
                      key: index2
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center h-full" }, [
                        vue.createElementVNode("image", {
                          src: item.avatar,
                          class: "gymnasiumImg",
                          mode: ""
                        }, null, 8, ["src"]),
                        vue.createElementVNode("view", {
                          class: "flex flex-direction justify-between h-full flex-1",
                          style: { "margin-left": "20rpx", "height": "200rpx" }
                        }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "flex align-center" }, [
                              vue.createElementVNode("view", {
                                class: "commonTitleBox",
                                style: { "background-color": "#29cc65" }
                              }, "订"),
                              vue.createElementVNode("view", {
                                class: "commonTitleBox",
                                style: { "background-color": "#ff5634" }
                              }, "惠"),
                              vue.createElementVNode("view", {
                                class: "commonTitleBox",
                                style: { "background-color": "#5f2aff" }
                              }, "赛"),
                              vue.createElementVNode("view", {
                                class: "commonTitleBox",
                                style: { "background-color": "#e3c377" }
                              }, "活"),
                              vue.createElementVNode("view", {
                                class: "commonTitleBox",
                                style: { "background-color": "#fa3e3e" }
                              }, "爆")
                            ])
                          ]),
                          vue.createElementVNode("view", { class: "w-full" }, [
                            vue.createElementVNode("view", { class: "flex align-end" }, [
                              vue.createElementVNode("view", { style: { "font-family": "Alibaba PuHuiTi 2", "font-weight": "400", "font-size": "28rpx", "color": "#ff5634", "margin-bottom": "2rpx" } }, " ￥"),
                              vue.createElementVNode(
                                "text",
                                { style: { "font-family": "Alibaba PuHuiTi 2", "font-weight": "700", "font-size": "40rpx", "color": "#ff5634" } },
                                vue.toDisplayString(item.bottom_price),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { style: { "font-family": "Alibaba PuHuiTi 2", "font-weight": "400", "font-size": "20rpx", "color": "#b1b4c3", "margin-left": "4rpx", "margin-bottom": "4rpx" } }, " 起 ")
                            ]),
                            vue.createElementVNode("view", { class: "flex align-center flex-1 justify-between" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "location" },
                                vue.toDisplayString(item.address),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "view",
                                { class: "distance" },
                                vue.toDisplayString(item.distance),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", {
                        class: "flex align-center w-full",
                        style: { "margin-top": "24rpx" }
                      }, [
                        vue.createCommentVNode(' <view class="commonBtn">\r\n                                {{item.siteNum}}片\r\n                            </view>\r\n                            <view class="commonBtn">\r\n                                {{item.floor}}\r\n                            </view> '),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.tag, (item2, index1) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "plainBtn",
                              "data-item": item2,
                              key: index1
                            }, vue.toDisplayString(item2), 9, ["data-item"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            4
            /* STYLE */
          ), [
            [vue.vShow, $data.active == 0]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "scroll-view",
            {
              class: "content",
              "scroll-y": true,
              style: vue.normalizeStyle("height: " + $data.viewHeight + "px;")
            },
            [
              $data.sessionList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无场次",
                mode: "list",
                marginTop: "100"
              })) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "recommendBox"
              }))
            ],
            4
            /* STYLE */
          ), [
            [vue.vShow, $data.active == 1]
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesReservationReservation = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-62da1e1c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservation/reservation.vue"]]);
  const _sfc_main$t = {
    data() {
      return {
        app: getApp(),
        gymnasiumInfo: {
          gymnasiumImg: "/static/images/home/gymnasiumPhoto.png",
          gymnasiumName: "我看看怎么个事",
          latitude: "",
          longitude: "",
          phone: "0532-8186886",
          location: "青岛市黄岛区金石国际北楼1611",
          businessHours: "周一至周日 07:00-22:00",
          distance: 200,
          siteNum: 10,
          floor: "木龙骨地板",
          facilities: ["停车场", "空调", "更衣室"],
          currentImgIndex: -1,
          gymnasiumImgList: [
            "https://img1.baidu.com/it/u=1087984015,2094611444&fm=253&fmt=auto&app=138&f=JPEG?w=707&h=500",
            "https://img2.baidu.com/it/u=2663528246,3127026870&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff775610c-310c-4f5a-9ae4-94bdc145c7e6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701845453&t=9030131f1e5a2ea40630a08433886371"
          ],
          hardwareFacilities: [],
          venueReservationList: []
        }
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.initData();
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
      // 初始化数据
      async initData() {
        this.gymnasiumInfo = await this.app.getStoreInfo();
        this.getReservationInfo();
      },
      // 获取近7天可约场地
      getReservationInfo() {
        request({
          url: "wx/get/shop/surplus/count",
          method: "POST",
          data: {
            date: getNowDate("-")
          }
        }).then((res) => {
          let list = this.et7Days();
          let obj = res.data;
          list.forEach((item) => {
            item.residue = obj[`${item.date}`].count;
            item.basicPrice = obj[`${item.date}`].money / 100;
          });
          this.gymnasiumInfo.venueReservationList = list;
        });
      },
      et7Days() {
        let dateList = [];
        var now = /* @__PURE__ */ new Date();
        var nowTime = now.getTime();
        var oneDayTime = 86400 * 1e3;
        for (var i = 0; i < 7; i++) {
          var ShowTime = nowTime + i * oneDayTime;
          var myDate = new Date(ShowTime);
          var year = myDate.getFullYear();
          var month = myDate.getMonth() + 1;
          var date2 = myDate.getDate();
          dateList.push({
            year,
            fullDate: year + "-" + formatNumber(month) + "-" + formatNumber(date2),
            date: formatNumber(month) + "-" + formatNumber(date2),
            day: i == 0 ? "今日" : "周" + "日一二三四五六".charAt(myDate.getDay()),
            residue: 5,
            basicPrice: 20
          });
        }
        return dateList;
      },
      onClickLeft() {
        uni.navigateBack();
      },
      // 预览图片
      previewImg(e) {
        this.gymnasiumInfo.currentImgIndex = e.currentTarget.dataset.item;
        uni.previewImage({
          urls: this.gymnasiumInfo.gymnasiumImgList,
          current: e.currentTarget.dataset.item
        });
      },
      // 去相册
      toAlbum() {
        uni.setStorageSync("album", JSON.stringify(this.gymnasiumInfo.gymnasiumImgList));
        uni.navigateTo({
          url: "/pages/album/album"
        });
      },
      // 打电话
      toCall() {
        uni.makePhoneCall({
          phoneNumber: this.gymnasiumInfo.phone
        });
      },
      // 地图位置
      toMap() {
        var that = this;
        uni.openLocation({
          latitude: that.gymnasiumInfo.latitude,
          longitude: that.gymnasiumInfo.longitude,
          scale: 18,
          name: this.gymnasiumInfo.location
        });
      },
      // 去场地预约详情
      toDetail(e) {
        let date2 = e.fullDate;
        if (e.residue == 0) {
          uni.showToast({
            icon: "none",
            title: "暂无场地"
          });
          return false;
        }
        uni.navigateTo({
          url: "/pages/reservationDetail/reservationDetail?date=" + date2
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_van_icon = vue.resolveComponent("van-icon");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/gymnasiumInfo/gymnasiumInfo.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            safeAreaInsetTop: true,
            fixed: false,
            title: "球馆信息",
            autoBack: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { style: { "margin-top": "28rpx", "padding": "0 20rpx 30rpx", "background-color": "#fff" } }, [
            vue.createElementVNode("view", { class: "flex align-center justify-between w-full" }, [
              vue.createElementVNode(
                "view",
                { class: "gymnasiumName" },
                vue.toDisplayString($data.gymnasiumInfo.gymnasiumName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "imgScroll w-full" }, [
              vue.createElementVNode("view", {
                class: "w-full",
                style: { "position": "relative" }
              }, [
                vue.createElementVNode("scroll-view", {
                  "scroll-x": true,
                  class: "w-full h-full"
                }, [
                  vue.createElementVNode("view", {
                    class: "flex align-center",
                    style: { "position": "relative" }
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.gymnasiumInfo.gymnasiumImgList, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "imgScrollItem",
                          "data-item": index2,
                          onClick: _cache[0] || (_cache[0] = (...args) => $options.previewImg && $options.previewImg(...args)),
                          key: index2
                        }, [
                          vue.createElementVNode("image", {
                            src: item,
                            mode: "",
                            style: { "width": "260rpx", "height": "164rpx" }
                          }, null, 8, ["src"])
                        ], 8, ["data-item"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]),
                vue.createElementVNode("view", {
                  class: "album flex align-center justify-center",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.toAlbum && $options.toAlbum(...args))
                }, [
                  vue.createElementVNode("view", { style: { "margin-left": "8rpx", "margin-right": "2rpx" } }, "相册"),
                  vue.createElementVNode("view", null, [
                    vue.createVNode(_component_van_icon, { name: "arrow" })
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", {
              class: "flex align-center justify-between",
              style: { "margin-bottom": "20rpx" }
            }, [
              vue.createElementVNode("view", { class: "commonLeftLabel" }, [
                vue.createElementVNode("text", null, "场馆电话："),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($data.gymnasiumInfo.phone),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "commonRightOpe",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.toCall && $options.toCall(...args))
              }, "拨打")
            ]),
            vue.createElementVNode("view", {
              class: "flex align-center",
              style: { "margin-bottom": "20rpx" }
            }, [
              vue.createElementVNode("view", { class: "commonLeftLabel" }, [
                vue.createElementVNode("text", null, "营业时间："),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($data.gymnasiumInfo.businessHours),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
              vue.createElementVNode("view", { class: "commonLeftLabel" }, [
                vue.createElementVNode("text", null, "场馆地址："),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($data.gymnasiumInfo.location),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "commonRightOpe flex-shirnk",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.toMap && $options.toMap(...args))
              }, "查看")
            ]),
            vue.createElementVNode("view", { class: "hardwareBox flex align-center flex-wrap justify-start" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.gymnasiumInfo.hardwareFacilities, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "hardwareItem flex align-center",
                    key: index2
                  }, [
                    vue.createElementVNode("view", { class: "flex align-center w-full h-full justify-center" }, [
                      item.icon ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: item.icon,
                        mode: "",
                        style: { "width": "25px", "height": "25px", "margin-right": "4px" }
                      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                        key: 1,
                        src: "/static/static/images/common/wifi.svg",
                        mode: "",
                        style: { "width": "25px", "height": "25px", "margin-right": "4px" }
                      })),
                      vue.createElementVNode(
                        "text",
                        { class: "iconText" },
                        vue.toDisplayString(item.text),
                        1
                        /* TEXT */
                      )
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "venueReservation" }, [
            vue.createElementVNode("view", { class: "venueReservationTitle" }, "场地预定"),
            vue.createElementVNode("view", { class: "venueReservationList w-full" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-x": true,
                class: "h-full w-full"
              }, [
                vue.createElementVNode("view", {
                  class: "w-full",
                  style: { "white-space": "nowrap" }
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.gymnasiumInfo.venueReservationList, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: vue.normalizeClass("venueReservationItem " + (item.residue == 0 ? "isFullBorder" : "")),
                        onClick: ($event) => $options.toDetail(item),
                        key: index2
                      }, [
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass("venueReservationItemTop flex flex-direction align-center justify-center " + (item.residue == 0 ? "isFullBg" : ""))
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              null,
                              vue.toDisplayString(item.day),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              null,
                              "(" + vue.toDisplayString(item.date) + ")",
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        vue.createElementVNode("view", { class: "venueReservationItemBottom" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: "w-full flex align-center justify-between",
                              style: vue.normalizeStyle("margin-bottom: 12rpx;color: " + (item.residue == 0 ? "#5F5F5F" : "#0077FF"))
                            },
                            [
                              vue.createElementVNode("text", null, "剩余"),
                              vue.createElementVNode(
                                "text",
                                null,
                                vue.toDisplayString(item.residue),
                                1
                                /* TEXT */
                              )
                            ],
                            4
                            /* STYLE */
                          ),
                          vue.createElementVNode("view", { class: "w-full flex align-center justify-between" }, [
                            vue.createElementVNode("text", null, "起订"),
                            vue.createElementVNode(
                              "text",
                              null,
                              "￥" + vue.toDisplayString(item.basicPrice),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ], 10, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesGymnasiumInfoGymnasiumInfo = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-de38ef79"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/gymnasiumInfo/gymnasiumInfo.vue"]]);
  const _sfc_main$s = {
    data() {
      return {
        app: getApp(),
        currentIndex: 0,
        imgList: []
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      let imgList = uni.getStorageSync("album");
      imgList = JSON.parse(imgList);
      this.imgList = imgList;
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
        uni.navigateBack();
      },
      previwImg(e) {
        this.currentIndex = e.currentTarget.dataset.item;
        uni.previewImage({
          urls: this.imgList,
          current: e.currentTarget.dataset.item
        });
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/album/album.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "相册",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(' <van-nav-bar>\r\n            <view slot="left" @tap="onClickLeft">\r\n                <van-icon name="arrow-left" size="20px" />\r\n            </view>\r\n            <view slot="title" class="pageTitle">相册</view>\r\n        </van-nav-bar> '),
          vue.createElementVNode("view", {
            class: "w-full flex flex-wrap",
            style: { "padding": "20rpx", "box-sizing": "border-box" }
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.imgList, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "imgBox",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.previwImg && $options.previwImg(...args)),
                  "data-item": item,
                  key: index2
                }, [
                  vue.createElementVNode("image", {
                    src: item,
                    mode: "",
                    class: "w-full h-full"
                  }, null, 8, ["src"])
                ], 8, ["data-item"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesAlbumAlbum = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-7c8b231e"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/album/album.vue"]]);
  const props$d = {
    props: {
      // radio的名称
      name: {
        type: [String, Number, Boolean],
        default: props$p.radio.name
      },
      // 形状，square为方形，circle为圆型
      shape: {
        type: String,
        default: props$p.radio.shape
      },
      // 是否禁用
      disabled: {
        type: [String, Boolean],
        default: props$p.radio.disabled
      },
      // 是否禁止点击提示语选中单选框
      labelDisabled: {
        type: [String, Boolean],
        default: props$p.radio.labelDisabled
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$p.radio.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$p.radio.inactiveColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$p.radio.iconSize
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$p.radio.labelSize
      },
      // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
      label: {
        type: [String, Number],
        default: props$p.radio.label
      },
      // 整体的大小
      size: {
        type: [String, Number],
        default: props$p.radio.size
      },
      // 图标颜色
      color: {
        type: String,
        default: props$p.radio.color
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$p.radio.labelColor
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$p.radio.iconColor
      }
    }
  };
  const _sfc_main$r = {
    name: "u-radio",
    mixins: [mpMixin, mixin, props$d],
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
        return uni.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
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
        style.width = uni.$u.addUnit(this.elSize);
        style.height = uni.$u.addUnit(this.elSize);
        if (this.parentData.iconPlacement === "right") {
          style.marginRight = 0;
        }
        return style;
      },
      radioStyle() {
        const style = {};
        if (this.parentData.borderBottom && this.parentData.placement === "row") {
          uni.$u.error("检测到您将borderBottom设置为true，需要同时将u-radio-group的placement设置为column才有效");
        }
        if (this.parentData.borderBottom && this.parentData.placement === "column") {
          style.paddingBottom = uni.$u.os() === "ios" ? "12px" : "8px";
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
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
          uni.$u.error("u-radio必须搭配u-radio-group组件使用");
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
            uni.$u.formValidate(this, "change");
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
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-radio", [`u-radio-label--${$data.parentData.iconPlacement}`, $data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom"]]),
        onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args), ["stop"])),
        style: vue.normalizeStyle([$options.radioStyle])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-radio__icon-wrap", $options.iconClasses]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.iconClickHandler && $options.iconClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle([$options.iconWrapStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              vue.createVNode(_component_u_icon, {
                class: "u-radio__icon-wrap__icon",
                name: "checkbox-mark",
                size: $options.elIconSize,
                color: $options.elIconColor
              }, null, 8, ["size", "color"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            class: "u-radio__text",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.labelClickHandler && $options.labelClickHandler(...args), ["stop"])),
            style: vue.normalizeStyle({
              color: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
              fontSize: $options.elLabelSize,
              lineHeight: $options.elLabelSize
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-edf95844"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-radio/u-radio.vue"]]);
  const props$c = {
    props: {
      // 绑定的值
      modelValue: {
        type: [String, Number, Boolean],
        default: props$p.radioGroup.value
      },
      // 是否禁用全部radio
      disabled: {
        type: Boolean,
        default: props$p.radioGroup.disabled
      },
      // 形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: props$p.radioGroup.shape
      },
      // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
      activeColor: {
        type: String,
        default: props$p.radioGroup.activeColor
      },
      // 未选中的颜色
      inactiveColor: {
        type: String,
        default: props$p.radioGroup.inactiveColor
      },
      // 标识符
      name: {
        type: String,
        default: props$p.radioGroup.name
      },
      // 整个组件的尺寸，默认px
      size: {
        type: [String, Number],
        default: props$p.radioGroup.size
      },
      // 布局方式，row-横向，column-纵向
      placement: {
        type: String,
        default: props$p.radioGroup.placement
      },
      // label的文本
      label: {
        type: [String],
        default: props$p.radioGroup.label
      },
      // label的颜色 （默认 '#303133' ）
      labelColor: {
        type: [String],
        default: props$p.radioGroup.labelColor
      },
      // label的字体大小，px单位
      labelSize: {
        type: [String, Number],
        default: props$p.radioGroup.labelSize
      },
      // 是否禁止点击文本操作checkbox(默认 false )
      labelDisabled: {
        type: Boolean,
        default: props$p.radioGroup.labelDisabled
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: props$p.radioGroup.iconColor
      },
      // 图标的大小，单位px
      iconSize: {
        type: [String, Number],
        default: props$p.radioGroup.iconSize
      },
      // 竖向配列时，是否显示下划线
      borderBottom: {
        type: Boolean,
        default: props$p.radioGroup.borderBottom
      },
      // 图标与文字的对齐方式
      iconPlacement: {
        type: String,
        default: props$p.radio.iconPlacement
      }
    }
  };
  const _sfc_main$q = {
    name: "u-radio-group",
    mixins: [mpMixin, mixin, props$c],
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
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-radio-group", $options.bemClass])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-272bb654"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-radio-group/u-radio-group.vue"]]);
  const props$b = {
    props: {
      // 输入框的内容
      value: {
        type: [String, Number],
        default: props$p.textarea.value
      },
      // 输入框的内容
      modelValue: {
        type: [String, Number],
        default: props$p.textarea.value
      },
      // 输入框为空时占位符
      placeholder: {
        type: [String, Number],
        default: props$p.textarea.placeholder
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: props$p.input.placeholderClass
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: props$p.input.placeholderStyle
      },
      // 输入框高度
      height: {
        type: [String, Number],
        default: props$p.textarea.height
      },
      // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
      confirmType: {
        type: String,
        default: props$p.textarea.confirmType
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: props$p.textarea.disabled
      },
      // 是否显示统计字数
      count: {
        type: Boolean,
        default: props$p.textarea.count
      },
      // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
      focus: {
        type: Boolean,
        default: props$p.textarea.focus
      },
      // 是否自动增加高度
      autoHeight: {
        type: Boolean,
        default: props$p.textarea.autoHeight
      },
      // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
      fixed: {
        type: Boolean,
        default: props$p.textarea.fixed
      },
      // 指定光标与键盘的距离
      cursorSpacing: {
        type: Number,
        default: props$p.textarea.cursorSpacing
      },
      // 指定focus时的光标位置
      cursor: {
        type: [String, Number],
        default: props$p.textarea.cursor
      },
      // 是否显示键盘上方带有”完成“按钮那一栏，
      showConfirmBar: {
        type: Boolean,
        default: props$p.textarea.showConfirmBar
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: Number,
        default: props$p.textarea.selectionStart
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: Number,
        default: props$p.textarea.selectionEnd
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: props$p.textarea.adjustPosition
      },
      // 是否去掉 iOS 下的默认内边距，只微信小程序有效
      disableDefaultPadding: {
        type: Boolean,
        default: props$p.textarea.disableDefaultPadding
      },
      // focus时，点击页面的时候不收起键盘，只微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: props$p.textarea.holdKeyboard
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: props$p.textarea.maxlength
      },
      // 边框类型，surround-四周边框，bottom-底部边框
      border: {
        type: String,
        default: props$p.textarea.border
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: props$p.textarea.formatter
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      }
    }
  };
  const _sfc_main$p = {
    name: "u-textarea",
    mixins: [mpMixin, mixin, props$b],
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
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
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
        uni.$u.formValidate(this, "blur");
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
          uni.$u.formValidate(this, "change");
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
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-textarea", $options.textareaClass]),
        style: vue.normalizeStyle([$options.textareaStyle])
      },
      [
        vue.createElementVNode("textarea", {
          class: "u-textarea__field",
          value: $data.innerValue,
          style: vue.normalizeStyle({ height: _ctx.$u.addUnit(_ctx.height) }),
          placeholder: _ctx.placeholder,
          "placeholder-style": _ctx.$u.addStyle(_ctx.placeholderStyle, "string"),
          "placeholder-class": _ctx.placeholderClass,
          disabled: _ctx.disabled,
          focus: _ctx.focus,
          autoHeight: _ctx.autoHeight,
          fixed: _ctx.fixed,
          cursorSpacing: _ctx.cursorSpacing,
          cursor: _ctx.cursor,
          showConfirmBar: _ctx.showConfirmBar,
          selectionStart: _ctx.selectionStart,
          selectionEnd: _ctx.selectionEnd,
          adjustPosition: _ctx.adjustPosition,
          disableDefaultPadding: _ctx.disableDefaultPadding,
          holdKeyboard: _ctx.holdKeyboard,
          maxlength: _ctx.maxlength,
          "confirm-type": _ctx.confirmType,
          ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
          onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onLinechange: _cache[2] || (_cache[2] = (...args) => $options.onLinechange && $options.onLinechange(...args)),
          onInput: _cache[3] || (_cache[3] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args))
        }, null, 44, ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "focus", "autoHeight", "fixed", "cursorSpacing", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "adjustPosition", "disableDefaultPadding", "holdKeyboard", "maxlength", "confirm-type", "ignoreCompositionEvent"]),
        _ctx.count ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "u-textarea__count",
            style: vue.normalizeStyle({
              "background-color": _ctx.disabled ? "transparent" : "#fff"
            })
          },
          vue.toDisplayString($data.innerValue.length) + "/" + vue.toDisplayString(_ctx.maxlength),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-31706dd7"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-textarea/u-textarea.vue"]]);
  function pickExclude(obj, keys) {
    if (!["[object Object]", "[object File]"].includes(Object.prototype.toString.call(obj))) {
      return {};
    }
    return Object.keys(obj).reduce((prev, key) => {
      if (!keys.includes(key)) {
        prev[key] = obj[key];
      }
      return prev;
    }, {});
  }
  function formatImage(res) {
    return res.tempFiles.map((item) => ({
      ...pickExclude(item, ["path"]),
      type: "image",
      url: item.path,
      thumb: item.path,
      size: item.size
    }));
  }
  function formatVideo(res) {
    return [
      {
        ...pickExclude(res, ["tempFilePath", "thumbTempFilePath", "errMsg"]),
        type: "video",
        url: res.tempFilePath,
        thumb: res.thumbTempFilePath,
        size: res.size
      }
    ];
  }
  function chooseFile({
    accept,
    multiple,
    capture,
    compressed,
    maxDuration,
    sizeType,
    camera,
    maxCount
  }) {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case "image":
          uni.chooseImage({
            count: multiple ? Math.min(maxCount, 9) : 1,
            sourceType: capture,
            sizeType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
          break;
        case "video":
          uni.chooseVideo({
            sourceType: capture,
            compressed,
            maxDuration,
            camera,
            success: (res) => resolve(formatVideo(res)),
            fail: reject
          });
          break;
      }
    });
  }
  const mixinUp = {
    watch: {
      // 监听accept的变化，判断是否符合个平台要求
      // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
      accept: {
        immediate: true,
        handler(val) {
          if (val === "all" || val === "media") {
            uni.$u.error("只有微信小程序才支持把accept配置为all、media之一");
          }
          if (val === "file") {
            uni.$u.error("只有微信小程序和H5(HX2.9.9)才支持把accept配置为file");
          }
        }
      }
    }
  };
  const props$a = {
    props: {
      // 接受的文件类型, 可选值为all media image file video
      accept: {
        type: String,
        default: props$p.upload.accept
      },
      // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
      capture: {
        type: [String, Array],
        default: props$p.upload.capture
      },
      // 当accept为video时生效，是否压缩视频，默认为true
      compressed: {
        type: Boolean,
        default: props$p.upload.compressed
      },
      // 当accept为video时生效，可选值为back或front
      camera: {
        type: String,
        default: props$p.upload.camera
      },
      // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
      maxDuration: {
        type: Number,
        default: props$p.upload.maxDuration
      },
      // 上传区域的图标，只能内置图标
      uploadIcon: {
        type: String,
        default: props$p.upload.uploadIcon
      },
      // 上传区域的图标的颜色，默认
      uploadIconColor: {
        type: String,
        default: props$p.upload.uploadIconColor
      },
      // 是否开启文件读取前事件
      useBeforeRead: {
        type: Boolean,
        default: props$p.upload.useBeforeRead
      },
      // 读取后的处理函数
      afterRead: {
        type: Function,
        default: null
      },
      // 读取前的处理函数
      beforeRead: {
        type: Function,
        default: null
      },
      // 是否显示组件自带的图片预览功能
      previewFullImage: {
        type: Boolean,
        default: props$p.upload.previewFullImage
      },
      // 最大上传数量
      maxCount: {
        type: [String, Number],
        default: props$p.upload.maxCount
      },
      // 是否启用
      disabled: {
        type: Boolean,
        default: props$p.upload.disabled
      },
      // 预览上传的图片时的裁剪模式，和image组件mode属性一致
      imageMode: {
        type: String,
        default: props$p.upload.imageMode
      },
      // 标识符，可以在回调函数的第二项参数中获取
      name: {
        type: String,
        default: props$p.upload.name
      },
      // 所选的图片的尺寸, 可选值为original compressed
      sizeType: {
        type: Array,
        default: props$p.upload.sizeType
      },
      // 是否开启图片多选，部分安卓机型不支持
      multiple: {
        type: Boolean,
        default: props$p.upload.multiple
      },
      // 是否展示删除按钮
      deletable: {
        type: Boolean,
        default: props$p.upload.deletable
      },
      // 文件大小限制，单位为byte
      maxSize: {
        type: [String, Number],
        default: props$p.upload.maxSize
      },
      // 显示已上传的文件列表
      fileList: {
        type: Array,
        default: props$p.upload.fileList
      },
      // 上传区域的提示文字
      uploadText: {
        type: String,
        default: props$p.upload.uploadText
      },
      // 内部预览图片区域和选择图片按钮的区域宽度
      width: {
        type: [String, Number],
        default: props$p.upload.width
      },
      // 内部预览图片区域和选择图片按钮的区域高度
      height: {
        type: [String, Number],
        default: props$p.upload.height
      },
      // 是否在上传完成后展示预览图
      previewImage: {
        type: Boolean,
        default: props$p.upload.previewImage
      }
    }
  };
  const _sfc_main$o = {
    name: "u-upload",
    mixins: [mpMixin, mixin, mixinUp, props$a],
    data() {
      return {
        lists: [],
        isInCount: true
      };
    },
    watch: {
      // 监听文件列表的变化，重新整理内部数据
      fileList: {
        handler() {
          this.formatFileList();
        },
        immediate: true,
        deep: true
      }
    },
    emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
    methods: {
      formatFileList() {
        const {
          fileList = [],
          maxCount
        } = this;
        const lists = fileList.map(
          (item) => Object.assign(Object.assign({}, item), {
            // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
            isImage: this.accept === "image" || uni.$u.test.image(item.url || item.thumb),
            isVideo: this.accept === "video" || uni.$u.test.video(item.url || item.thumb),
            deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
          })
        );
        this.lists = lists;
        this.isInCount = lists.length < maxCount;
      },
      chooseFile() {
        const {
          maxCount,
          multiple,
          lists,
          disabled
        } = this;
        if (disabled)
          return;
        let capture;
        try {
          capture = uni.$u.test.array(this.capture) ? this.capture : this.capture.split(",");
        } catch (e) {
          capture = [];
        }
        chooseFile(
          Object.assign({
            accept: this.accept,
            multiple: this.multiple,
            capture,
            compressed: this.compressed,
            maxDuration: this.maxDuration,
            sizeType: this.sizeType,
            camera: this.camera
          }, {
            maxCount: maxCount - lists.length
          })
        ).then((res) => {
          this.onBeforeRead(multiple ? res : res[0]);
        }).catch((error2) => {
          this.$emit("error", error2);
        });
      },
      // 文件读取之前
      onBeforeRead(file) {
        const {
          beforeRead,
          useBeforeRead
        } = this;
        let res = true;
        if (uni.$u.test.func(beforeRead)) {
          res = beforeRead(file, this.getDetail());
        }
        if (useBeforeRead) {
          res = new Promise((resolve, reject) => {
            this.$emit(
              "beforeRead",
              Object.assign(Object.assign({
                file
              }, this.getDetail()), {
                callback: (ok) => {
                  ok ? resolve() : reject();
                }
              })
            );
          });
        }
        if (!res) {
          return;
        }
        if (uni.$u.test.promise(res)) {
          res.then((data) => this.onAfterRead(data || file));
        } else {
          this.onAfterRead(file);
        }
      },
      getDetail(index2) {
        return {
          name: this.name,
          index: index2 == null ? this.fileList.length : index2
        };
      },
      onAfterRead(file) {
        const {
          maxSize,
          afterRead
        } = this;
        const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
        if (oversize) {
          this.$emit("oversize", Object.assign({
            file
          }, this.getDetail()));
          return;
        }
        if (typeof afterRead === "function") {
          afterRead(file, this.getDetail());
        }
        this.$emit("afterRead", Object.assign({
          file
        }, this.getDetail()));
      },
      deleteItem(index2) {
        this.$emit(
          "delete",
          Object.assign(Object.assign({}, this.getDetail(index2)), {
            file: this.fileList[index2]
          })
        );
      },
      // 预览图片
      onPreviewImage(item) {
        if (!item.isImage || !this.previewFullImage)
          return;
        uni.previewImage({
          // 先filter找出为图片的item，再返回filter结果中的图片url
          urls: this.lists.filter((item2) => this.accept === "image" || uni.$u.test.image(item2.url || item2.thumb)).map((item2) => item2.url || item2.thumb),
          current: item.url || item.thumb,
          fail() {
            uni.$u.toast("预览图片失败");
          }
        });
      },
      onPreviewVideo(event) {
        if (!this.data.previewFullImage)
          return;
        const {
          index: index2
        } = event.currentTarget.dataset;
        const {
          lists
        } = this.data;
        wx.previewMedia({
          sources: lists.filter((item) => isVideoFile(item)).map(
            (item) => Object.assign(Object.assign({}, item), {
              type: "video"
            })
          ),
          current: index2,
          fail() {
            uni.$u.toast("预览视频失败");
          }
        });
      },
      onClickPreview(event) {
        const {
          index: index2
        } = event.currentTarget.dataset;
        const item = this.data.lists[index2];
        this.$emit(
          "clickPreview",
          Object.assign(Object.assign({}, item), this.getDetail(index2))
        );
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-upload",
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode("view", { class: "u-upload__wrap" }, [
          _ctx.previewImage ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList($data.lists, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "u-upload__wrap__preview",
                key: index2
              }, [
                item.isImage || item.type && item.type === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: item.thumb || item.url,
                  mode: _ctx.imageMode,
                  class: "u-upload__wrap__preview__image",
                  onClick: ($event) => $options.onPreviewImage(item),
                  style: vue.normalizeStyle([{
                    width: _ctx.$u.addUnit(_ctx.width),
                    height: _ctx.$u.addUnit(_ctx.height)
                  }])
                }, null, 12, ["src", "mode", "onClick"])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "u-upload__wrap__preview__other"
                }, [
                  vue.createVNode(_component_u_icon, {
                    color: "#80CBF9",
                    size: "26",
                    name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
                  }, null, 8, ["name"]),
                  vue.createElementVNode(
                    "text",
                    { class: "u-upload__wrap__preview__other__text" },
                    vue.toDisplayString(item.isVideo || item.type && item.type === "video" ? "视频" : "文件"),
                    1
                    /* TEXT */
                  )
                ])),
                item.status === "uploading" || item.status === "failed" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "u-upload__status"
                }, [
                  vue.createElementVNode("view", { class: "u-upload__status__icon" }, [
                    item.status === "failed" ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                      key: 0,
                      name: "close-circle",
                      color: "#ffffff",
                      size: "25"
                    })) : (vue.openBlock(), vue.createBlock(_component_u_loading_icon, {
                      key: 1,
                      size: "22",
                      mode: "circle",
                      color: "#ffffff"
                    }))
                  ]),
                  item.message ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "u-upload__status__message"
                    },
                    vue.toDisplayString(item.message),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ])) : vue.createCommentVNode("v-if", true),
                item.status !== "uploading" && (_ctx.deletable || item.deletable) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 3,
                  class: "u-upload__deletable",
                  onClick: vue.withModifiers(($event) => $options.deleteItem(index2), ["stop"])
                }, [
                  vue.createElementVNode("view", { class: "u-upload__deletable__icon" }, [
                    vue.createVNode(_component_u_icon, {
                      name: "close",
                      color: "#ffffff",
                      size: "10"
                    })
                  ])
                ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                item.status === "success" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 4,
                  class: "u-upload__success"
                }, [
                  vue.createElementVNode("view", { class: "u-upload__success__icon" }, [
                    vue.createVNode(_component_u_icon, {
                      name: "checkmark",
                      color: "#ffffff",
                      size: "12"
                    })
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          $data.isInCount ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.$slots.default || _ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseFile && $options.chooseFile(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: vue.normalizeClass(["u-upload__button", [_ctx.disabled && "u-upload__button--disabled"]]),
                "hover-class": !_ctx.disabled ? "u-upload__button--hover" : "",
                "hover-stay-time": "150",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.chooseFile && $options.chooseFile(...args)),
                style: vue.normalizeStyle([{
                  width: _ctx.$u.addUnit(_ctx.width),
                  height: _ctx.$u.addUnit(_ctx.height)
                }])
              }, [
                vue.createVNode(_component_u_icon, {
                  name: _ctx.uploadIcon,
                  size: "26",
                  color: _ctx.uploadIconColor
                }, null, 8, ["name", "color"]),
                _ctx.uploadText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "u-upload__button__text"
                  },
                  vue.toDisplayString(_ctx.uploadText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ], 14, ["hover-class"]))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-cafe0b2a"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-upload/u-upload.vue"]]);
  const _sfc_main$n = {
    data() {
      return {
        app: getApp(),
        errorTypeList: ["信息错误", "暂停营业", "场馆不存在", "其他"],
        error: "",
        type: "",
        fileList: []
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
      errorInput(e) {
        this.error = e.detail.value;
      },
      deleteImg(event) {
        let fileList = this.fileList;
        fileList.splice(event.detail.index, 1);
        this.fileList = fileList;
      },
      // 上传问题相关图片
      afterRead(event) {
        const {
          file
        } = event;
        file.forEach((item) => {
          uni.uploadFile({
            url: this.app.globalData.uploadImgUrl,
            filePath: item.url,
            name: "file",
            success: (res) => {
              let fileList = this.fileList;
              fileList.push({
                url: this.app.globalData.httpUrl + JSON.parse(res.data).data
              });
              this.fileList = fileList;
            }
          });
        });
      },
      onClickLeft() {
        uni.navigateBack();
      },
      submit() {
        if (!this.type) {
          uni.showToast({
            title: "请选择问题类型",
            icon: "none",
            duration: 2e3
          });
          return;
        } else if (!this.error) {
          uni.showToast({
            title: "请输入描述详情",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        let list = this.fileList;
        let photos = [];
        list.forEach((item) => {
          photos.push(item.url);
        });
        request({
          url: "wx/add/shop/error",
          method: "POST",
          data: {
            user_ouid: this.app.globalData.userInfo.ouid,
            type: this.type,
            detial: this.error,
            photos
          }
        }).then((res) => {
          uni.showToast({
            icon: "none",
            title: "提交成功",
            duration: 2e3,
            success: () => {
              setTimeout(() => {
                uni.navigateBack();
              }, 2e3);
            }
          });
        });
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_radio = resolveEasycom(vue.resolveDynamicComponent("u-radio"), __easycom_5);
    const _component_u_radio_group = resolveEasycom(vue.resolveDynamicComponent("u-radio-group"), __easycom_6);
    const _component_u__textarea = resolveEasycom(vue.resolveDynamicComponent("u--textarea"), __easycom_2$2);
    const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/errorReport/errorReport.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            safeAreaInsetTop: true,
            fixed: false,
            title: "场馆报错",
            autoBack: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "errorBox" }, [
            vue.createElementVNode("view", { class: "title" }, "场馆出错了？"),
            vue.createElementVNode("view", {
              class: "flex align-center flex-wrap",
              style: { "margin-top": "36rpx" }
            }, [
              vue.createVNode(_component_u_radio_group, {
                modelValue: $data.type,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.type = $event),
                placement: "row"
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.errorTypeList, (item, index2) => {
                      return vue.openBlock(), vue.createBlock(_component_u_radio, {
                        name: item,
                        class: "radioRight",
                        label: item,
                        key: index2
                      }, null, 8, ["name", "label"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
            ]),
            vue.createElementVNode("view", { class: "describeBox" }, [
              vue.createElementVNode("view", { style: { "margin-bottom": "20rpx" } }, "描述详情"),
              vue.createVNode(_component_u__textarea, {
                modelValue: $data.error,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.error = $event),
                placeholder: "请输入..."
              }, null, 8, ["modelValue"])
            ]),
            vue.createElementVNode("view", { class: "uploadBox" }, [
              vue.createElementVNode("view", null, "上传图片"),
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_u_upload, {
                  fileList: $data.fileList,
                  onAfterRead: $options.afterRead,
                  onDelete: $options.deleteImg,
                  name: "1",
                  multiple: "",
                  maxCount: 9
                }, null, 8, ["fileList", "onAfterRead", "onDelete"])
              ]),
              vue.createElementVNode("view", { style: { "font-family": "Alibaba PuHuiTi 2", "font-size": "24rpx", "margin-top": "20rpx", "color": "#b1b4c3" } }, "最多9张 ")
            ]),
            vue.createElementVNode("button", {
              type: "info",
              class: "submitBtn",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.submit && $options.submit(...args))
            }, "提交")
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesErrorReportErrorReport = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-b6ca8dfc"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/errorReport/errorReport.vue"]]);
  const _sfc_main$m = {
    data() {
      return {
        app: getApp(),
        active: 0,
        //当前选中的日期索引
        dateList: [],
        //日期列表
        translateDistance: 0,
        //选中底部条的滚动距离
        tabWidth: 0,
        //tab项的宽度
        widthDiff: 0,
        scrollLeft: 0,
        //滚动条x轴的滚动距离
        totalPrice: 0,
        //总价
        choosedList: [],
        //被选中的
        centerHeight: 0,
        timeList: [],
        siteList: [],
        todayDeleteIndex: 0,
        top: 0,
        con: {
          already: false,
          checked: false,
          price: ""
        },
        j: "",
        currentDate: ""
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let date2 = options.date.slice(5);
      this.currentDate = date2;
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      this.setAciveDate(this.currentDate);
      this.$nextTick(() => {
        setTimeout(() => {
          this.getTabItemWidth();
        }, 500);
      });
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
      getNowTime() {
        let date2 = /* @__PURE__ */ new Date();
        let hour = date2.getHours();
        let minute = date2.getMinutes();
        return [hour, minute];
      },
      initEnumInfo() {
        let enumInfo = this.app.globalData.enumInfo;
        let timeArr = [];
        let arr = [];
        let dateItemSiteList = this.dateList[this.active].siteList;
        dateItemSiteList.forEach((con) => {
          timeArr = timeArr.concat(con.store_time_enum);
        });
        timeArr = Array.from(new Set(timeArr));
        timeArr.sort(function(a, b) {
          return a - b;
        });
        timeArr.forEach((arrItem) => {
          let value = enumInfo[arrItem].split("~")[0];
          let value1 = enumInfo[arrItem].split("~")[1];
          let index1 = arr.findIndex((item) => item.value == value);
          let index22 = arr.findIndex((item) => item.value == value1);
          if (index1 < 0) {
            arr.push({
              index: arrItem,
              value
            });
          }
          if (index22 < 0) {
            arr.push({
              index: arrItem,
              value: value1
            });
          }
        });
        let index2 = 0;
        if (this.active == 0) {
          let nowDateList = this.getNowTime();
          index2 = arr.findIndex((item) => {
            let list = item.value.split(":");
            if (Number(list[0]) > nowDateList[0] || Number(list[0]) == nowDateList[0] && Number(list[1]) > nowDateList[1]) {
              return true;
            }
          });
          if (index2 == -1) {
            arr = [];
          } else {
            arr = arr.slice(index2);
          }
        }
        this.timeList = arr;
      },
      initData(date2) {
        let siteList = [];
        if (this.dateList[this.active].isRequest == false) {
          request({
            url: "wx/get/site/reserve",
            method: "POST",
            data: {
              date: date2
              //日期
            }
          }).then((res) => {
            let dataList = res.data;
            dataList.forEach((con, index2) => {
              siteList.push({
                siteNo: index2 + 1,
                siteId: con.site_id,
                disableList: con.reserve_time_enum,
                siteName: con.site_name,
                store_time_enum: con.store_time_enum,
                priceList: con.price,
                timeList: []
              });
            });
            this.dateList[this.active].siteList = siteList, this.dateList[this.active].isRequest = true;
            this.siteList = siteList;
            this.initEnumInfo();
            this.setTimeList();
          });
        } else {
          siteList = this.dateList[this.active].siteList;
          this.siteList = siteList;
          this.initEnumInfo();
          this.setTimeList();
        }
      },
      setAciveDate(date2) {
        this.dateList = this.et7Days();
        let index2 = this.dateList.findIndex((item) => item.date == date2);
        this.active = index2;
      },
      async submitOrder() {
        if (this.choosedList.length == 0) {
          uni.showToast({
            title: "未选择场地",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        let userInfo = await this.app.getUserInfo();
        let site_detail = [];
        let site_obj = groupBy(this.choosedList, "siteId");
        formatAppLog("log", "at pages/reservationDetail/reservationDetail.vue:295", site_obj);
        for (var key in site_obj) {
          let time_enum = [];
          for (var item of site_obj[key]) {
            time_enum.push(Number(item.enumInfoIndex));
          }
          site_detail.push({
            site_id: Number(key),
            time_enum
          });
        }
        request({
          url: "wx/add/order",
          method: "POST",
          data: {
            user_ouid: userInfo.ouid,
            //用户ouid
            site_detail,
            gmt_site_use: this.choosedList[0].date
          }
        }).then((res) => {
          uni.showToast({
            title: "提交成功",
            icon: "none",
            duration: 2e3,
            success: () => {
              setTimeout(() => {
                uni.redirectTo({
                  url: "/pages/orderDetail/orderDetail?type=add&order_no=" + res.data.order
                });
              }, 2e3);
            }
          });
        });
      },
      // 设置预约场地列表
      setTimeList() {
        let siteList = JSON.parse(JSON.stringify(this.siteList));
        siteList.forEach((con, index2) => {
          for (var i = 1; i <= this.timeList.length - 1; i++) {
            let priceIndex = con.priceList.findIndex((content) => content.time_enum == this.timeList[i].index);
            if (priceIndex >= 0) {
              if (con.disableList.includes(this.timeList[i].index)) {
                con.timeList.push({
                  price: con.priceList[priceIndex].price,
                  already: true,
                  checked: true
                });
              } else {
                con.timeList.push({
                  price: con.priceList[priceIndex].price,
                  already: false,
                  checked: false
                });
              }
            } else {
              con.timeList.push({
                price: "不可订",
                already: true,
                checked: false
              });
            }
          }
        });
        this.siteList = siteList;
      },
      getTabItemWidth() {
        let that = this;
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let query = uni.createSelectorQuery();
        query.select(".customerTabItem").boundingClientRect((navRect) => {
          let query2 = uni.createSelectorQuery();
          query2.select(".selected").boundingClientRect((con) => {
            that.tabWidth = navRect.width;
            that.translateDistance = (navRect.width - con.width) / 2;
            that.widthDiff = (navRect.width - con.width) / 2;
            that.scrollLeft = navRect.width * (this.active - 4);
            that.chooseTab(that.active);
            let query3 = uni.createSelectorQuery();
            query3.select(".bottomCon").boundingClientRect((item) => {
              let query4 = uni.createSelectorQuery();
              query4.select(".nav-bar").boundingClientRect((bar) => {
                that.centerHeight = screenHeight - bar.height - item.height - navRect.height;
                that.top = bar.height + navRect.height + 40;
              }).exec();
            }).exec();
          }).exec();
        }).exec();
      },
      chooseTab(e) {
        let index2;
        if (e.hasOwnProperty("currentTarget")) {
          index2 = e.currentTarget.dataset.index;
        } else {
          index2 = e;
        }
        let distance = index2 * this.tabWidth + this.widthDiff;
        if (this.active != index2) {
          this.choosedList = [];
          this.totalPrice = 0;
        }
        this.active = index2;
        this.translateDistance = distance;
        this.initData(this.dateList[index2].fullDate);
      },
      onClickLeft() {
        uni.navigateBack();
      },
      // 选择场地
      chooseSite(e) {
        let data = e.currentTarget.dataset;
        if (data.item.already || data.item.price == "不可订") {
          return;
        }
        this.siteList[data.index].timeList[data.j].checked = !this.siteList[data.index].timeList[data.j].checked;
        if (this.siteList[data.index].timeList[data.j].checked) {
          let siteItem = this.siteList[data.index];
          let objItem = {
            siteName: siteItem.siteName,
            //场地名称
            siteId: siteItem.siteId,
            //场地id
            price: data.item.price,
            //场地价格
            date: this.dateList[this.active].fullDate,
            //场地使用时间
            startTime: this.timeList[data.j].value,
            //开始时间
            endTime: this.timeList[data.j + 1].value,
            //结束时间
            enumInfoIndex: -1,
            //在枚举中的key
            siteIndex: data.index,
            //球场的索引，方便清空功能实现
            siteTimeIndex: data.j
            //球场时间的索引，方便清空功能实现
          };
          let enumInfo = this.app.globalData.enumInfo;
          for (var key in enumInfo) {
            if (enumInfo[key] == objItem.startTime + "~" + objItem.endTime) {
              objItem.enumInfoIndex = key;
              break;
            }
          }
          let choosedList = this.choosedList;
          choosedList.push(objItem);
          this.choosedList = choosedList;
          this.totalPrice = this.totalPrice + objItem.price / 100;
        } else {
          let index2 = this.choosedList.findIndex((con) => con.startTime == this.timeList[data.j]);
          let dataList = this.choosedList;
          dataList.splice(index2, 1);
          this.choosedList = dataList;
          this.totalPrice = this.totalPrice - data.item.price / 100;
        }
      },
      clearChoosedList() {
        this.choosedList.forEach((con) => {
          this.siteList[con.siteIndex].timeList[con.siteTimeIndex].checked = false;
        });
        this.choosedList = [];
        this.totalPrice = 0;
      },
      et7Days() {
        let dateList = [];
        var now = /* @__PURE__ */ new Date();
        var nowTime = now.getTime();
        var oneDayTime = 86400 * 1e3;
        for (var i = 0; i < 7; i++) {
          var ShowTime = nowTime + i * oneDayTime;
          var myDate = new Date(ShowTime);
          var year = myDate.getFullYear();
          var month = myDate.getMonth() + 1;
          var date2 = myDate.getDate();
          dateList.push({
            fullDate: year + "-" + formatNumber(month) + "-" + formatNumber(date2),
            date: formatNumber(month) + "-" + formatNumber(date2),
            day: i == 0 ? "今日" : "周" + "日一二三四五六".charAt(myDate.getDay()),
            siteList: [],
            isRequest: false
          });
        }
        return dateList;
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/reservationDetail/reservationDetail.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            safeAreaInsetTop: true,
            fixed: false,
            title: "预约",
            autoBack: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "customerTab" }, [
            vue.createElementVNode("scroll-view", {
              "scroll-x": true,
              class: "h-full w-full",
              "scroll-left": $data.scrollLeft
            }, [
              vue.createElementVNode("view", {
                class: "flex align-center w-full h-full",
                style: { "padding": "10rpx 0 0rpx", "box-sizing": "border-box", "position": "relative" }
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "selected",
                    style: vue.normalizeStyle("transform: translateX(" + ($data.translateDistance + "px") + ");")
                  },
                  null,
                  4
                  /* STYLE */
                ),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dateList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "customerTabItem h-full",
                      "data-index": index2,
                      onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseTab && $options.chooseTab(...args)),
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "flex flex-direction align-center w-full topItem",
                          style: vue.normalizeStyle("color: " + (index2 == $data.active ? "#0077FF" : "") + ";")
                        },
                        [
                          vue.createElementVNode(
                            "view",
                            null,
                            vue.toDisplayString(item.day),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "view",
                            { style: { "line-height": "50rpx" } },
                            vue.toDisplayString(item.date),
                            1
                            /* TEXT */
                          )
                        ],
                        4
                        /* STYLE */
                      )
                    ], 8, ["data-index"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 8, ["scroll-left"])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "scrollViewBox",
              style: vue.normalizeStyle("height: " + ($data.centerHeight + "px") + ";")
            },
            [
              vue.createElementVNode("scroll-view", {
                "scroll-y": true,
                "scroll-x": true,
                class: "w-full h-full",
                style: { "padding": "10rpx 0 10rpx 0rpx", "box-sizing": "border-box" }
              }, [
                vue.createElementVNode("view", {
                  class: "flex",
                  style: { "margin-left": "10rpx", "position": "relative" }
                }, [
                  vue.createElementVNode("view", { class: "leftTimeBox" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.timeList, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            class: "timeItem",
                            key: index2
                          },
                          vue.toDisplayString(item.value),
                          1
                          /* TEXT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  vue.createElementVNode("view", {
                    class: "rightSiteBox",
                    style: { "padding-right": "20rpx" }
                  }, [
                    vue.createElementVNode("view", { class: "flex align-center" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.siteList, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "siteBox",
                            key: index2
                          }, [
                            vue.createTextVNode(
                              vue.toDisplayString(item.siteName) + " ",
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { style: { "margin-top": "9px" } }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(item.timeList, (con, j) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    "data-item": con,
                                    "data-index": index2,
                                    "data-j": j,
                                    onClick: _cache[1] || (_cache[1] = (...args) => $options.chooseSite && $options.chooseSite(...args)),
                                    key: j
                                  }, [
                                    vue.createElementVNode(
                                      "view",
                                      {
                                        class: vue.normalizeClass(" " + (con.already ? "disSelected" : con.checked ? "selectable" : "freeSelect") + " selectItem")
                                      },
                                      vue.toDisplayString(con.price == "不可订" ? con.price : " ￥" + con.price / 100),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ], 8, ["data-item", "data-index", "data-j"]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ])
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "bottomCon" }, [
            $data.totalPrice > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "clearBox",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.clearChoosedList && $options.clearChoosedList(...args))
            }, "清空")) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "choosedListBox w-full" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-x": true,
                class: "w-full h-full"
              }, [
                vue.createElementVNode("view", { class: "w-full flex align-center" }, [
                  $data.choosedList.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "color": "#ccc", "padding-left": "20rpx" }
                  }, "暂未选择场地")) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "w-full flex align-center"
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.choosedList, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "choosedItem flex flex-direction",
                          key: index2
                        }, [
                          vue.createElementVNode("view", { class: "itemTop" }, [
                            vue.createElementVNode(
                              "text",
                              null,
                              vue.toDisplayString(item.startTime) + "-" + vue.toDisplayString(item.endTime),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode(
                            "view",
                            { class: "itemBottom flex align-center justify-center" },
                            vue.toDisplayString(item.siteName),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]))
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", null, [
                  vue.createElementVNode("text", { class: "rmbBox" }, "￥"),
                  vue.createElementVNode(
                    "text",
                    { class: "priceBox" },
                    vue.toDisplayString($data.totalPrice),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", {
                class: "submitBtn flex align-center justify-center",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.submitOrder && $options.submitOrder(...args))
              }, "提交订单")
            ])
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesReservationDetailReservationDetail = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-71ac0ae8"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationDetail/reservationDetail.vue"]]);
  const _sfc_main$l = {
    data() {
      return {
        app: getApp(),
        order_no: "",
        detailType: "",
        //订单详情类型
        gymnasiumInfo: {
          name: "我看看怎么个事",
          phone: "0532-8186886",
          location: "青岛市黄岛区金石国际北楼1611",
          latitude: "",
          longitude: ""
        },
        sessionList: [
          {
            siteNo: 1,
            date: "2023-08-08",
            timeRange: "11:00-12:00",
            hour: 3,
            price: 300
          },
          {
            siteNo: 3,
            date: "2023-08-08",
            timeRange: "11:00-12:00",
            hour: 3,
            price: 300
          }
        ],
        orderTime: "2023-08-08 00:12:56",
        //下单时间
        payTime: "2023-08-08 00:12:56",
        totalPrice: 500,
        //总价
        payState: "",
        //支付状态 wait 等待支付  payed 已支付 justPayed 刚刚支付
        code: 812356,
        //验证码
        //scrollview高度
        scrollViewHeight: 0,
        con: {
          date: "",
          timeRange: ""
        }
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.order_no = options.order_no;
      this.$nextTick(() => {
        this.getNavBarHeight();
      });
      this.initData();
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
      initData() {
        let enumInfo = this.app.globalData.enumInfo;
        request({
          url: "wx/get/order/detail",
          method: "POST",
          data: {
            order_no: this.order_no
          }
        }).then((res) => {
          let data = res.data;
          let site_detail = data.site_detail ? data.site_detail : [];
          let sessionList = [];
          site_detail.forEach((con) => {
            let timeList = [];
            con.time_enum.forEach((content) => {
              timeList.push({
                date: data.gmt_create,
                timeRange: enumInfo[content]
              });
            });
            sessionList.push({
              hour: con.time_enum.length,
              price: con.money,
              siteName: con.site_name,
              timeList
            });
          });
          this.gymnasiumInfo.name = data.shop_name;
          this.gymnasiumInfo.phone = data.shop_phone;
          this.gymnasiumInfo.location = data.shop_address;
          this.gymnasiumInfo.latitude = data.latitude;
          this.gymnasiumInfo.longitude = data.longitude;
          this.orderTime = data.gmt_creat_order;
          this.payTime = data.gmt_pay;
          this.totalPrice = data.money;
          this.payState = data.status;
          this.sessionList = sessionList;
        });
      },
      getNavBarHeight() {
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let that = this;
        let query = uni.createSelectorQuery();
        query.select(".nav-bar").boundingClientRect((navRect) => {
          if (this.payState != "payed" && this.payState != "justPayed") {
            let query2 = uni.createSelectorQuery();
            query2.select(".bottomBox").boundingClientRect((bottomRect) => {
              that.scrollViewHeight = screenHeight - navRect.height - bottomRect.height;
            }).exec();
          } else {
            that.scrollViewHeight = screenHeight - navRect.height;
          }
        }).exec();
      },
      // 打电话
      toCall() {
        uni.makePhoneCall({
          phoneNumber: this.gymnasiumInfo.phone
          //仅为示例，并非真实的电话号码
        });
      },
      // 地图位置
      toMap() {
        uni.openLocation({
          latitude: this.gymnasiumInfo.latitude,
          longitude: this.gymnasiumInfo.longitude,
          scale: 18,
          name: this.gymnasiumInfo.location
        });
      },
      // 复制订单编号
      tocopy() {
        uni.setClipboardData({
          data: this.order_no
        });
      },
      cancelOrder() {
        Dialog.confirm({
          title: "取消订单",
          message: "确定要取消此订单?"
        }).then(() => {
          request({
            url: "wx/cancel/order",
            method: "POST",
            data: {
              order_no: this.order_no
            }
          }).then(() => {
            this.payState = "C";
            uni.showToast({
              title: "取消成功",
              icon: "none",
              duration: 2e3,
              success: () => {
                setTimeout(() => {
                  this.initData();
                }, 2e3);
              }
            });
          });
        }).catch(() => {
        });
      },
      onClickLeft() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_van_dialog = vue.resolveComponent("van-dialog");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/orderDetail/orderDetail.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: $data.detailType == "add" ? "确认订单" : "订单详情",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"]),
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-y": true,
              class: "w-full",
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.detailType == "detail" && $data.payState == "wait" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "payStateBox flex align-center justify-center"
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/order/timeLine.svg",
                  mode: "",
                  style: { "width": "94rpx", "height": "94rpx", "margin-right": "20rpx" }
                }),
                vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                  vue.createElementVNode("view", { class: "waitPayText" }, "等待支付"),
                  vue.createElementVNode("view", { class: "waitPayTitle" }, "订单已生成，请在15分钟之内支付完成")
                ])
              ])) : vue.createCommentVNode("v-if", true),
              $data.payState == "payed" || $data.payState == "justPayed" ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "codeBox flex flex-direction align-center",
                  style: vue.normalizeStyle("height: " + ($data.payState == "payed" ? "400rpx" : "484rpx") + ";")
                },
                [
                  $data.payState == "justPayed" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "paySuccessText"
                  }, "支付成功")) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "codeImgBox" }, [
                    vue.createElementVNode("image", {
                      src: "/static/images/order/codeDemo.png",
                      style: { "width": "296rpx", "height": "296rpx" },
                      mode: ""
                    })
                  ]),
                  vue.createElementVNode("view", { class: "codeTextBox" }, [
                    vue.createElementVNode("text", {
                      class: "codeLabel",
                      style: { "color": "#333333 !important" }
                    }, "验证码:"),
                    vue.createTextVNode(
                      " " + vue.toDisplayString($data.code),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "topBox" }, [
                vue.createElementVNode(
                  "view",
                  { class: "topName" },
                  vue.toDisplayString($data.gymnasiumInfo.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "flex align-center justify-between",
                  style: { "margin-bottom": "8rpx", "height": "38rpx" }
                }, [
                  vue.createElementVNode("view", { class: "commonLeftLabel" }, [
                    vue.createElementVNode("text", null, "场馆电话："),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.gymnasiumInfo.phone),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    class: "commonRightOpe",
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.toCall && $options.toCall(...args))
                  }, "拨打")
                ]),
                vue.createElementVNode("view", {
                  class: "flex align-center justify-between",
                  style: { "height": "38rpx" }
                }, [
                  vue.createElementVNode("view", { class: "commonLeftLabel" }, [
                    vue.createElementVNode("text", null, "场馆地址："),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.gymnasiumInfo.location),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    class: "commonRightOpe",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.toMap && $options.toMap(...args))
                  }, "查看")
                ])
              ]),
              vue.createElementVNode("view", { class: "siteList" }, [
                vue.createElementVNode("view", { class: "siteListTitle" }, "预约场次"),
                vue.createElementVNode("view", { style: { "padding": "0 30rpx" } }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.sessionList, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "siteListItem",
                        key: index2
                      }, [
                        vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                          vue.createElementVNode(
                            "view",
                            { class: "blackText" },
                            vue.toDisplayString(item.siteName),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "view",
                            { class: "grayText" },
                            vue.toDisplayString(item.hour) + "小时",
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", {
                          class: "flex align-center justify-between",
                          style: { "margin-top": "12rpx" }
                        }, [
                          vue.createElementVNode("view", { class: "flex flex-direction" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item.timeList, (con, j) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "grayText",
                                  key: j
                                }, [
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(con.date) + " " + vue.toDisplayString(con.timeRange),
                                    1
                                    /* TEXT */
                                  )
                                ]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ]),
                          vue.createElementVNode(
                            "view",
                            { class: "blackText" },
                            "￥ " + vue.toDisplayString(item.price / 100),
                            1
                            /* TEXT */
                          )
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                vue.createElementVNode("view", {
                  class: "flex align-center justify-between",
                  style: { "padding": "24rpx 20rpx 16rpx" }
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "methodText" },
                    "小计(共" + vue.toDisplayString($data.sessionList.length) + "场)",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "priceText" },
                    "￥" + vue.toDisplayString($data.totalPrice / 100),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "orderInfoBox flex flex-direction justify-center" }, [
                vue.createElementVNode("view", { class: "flex align-center" }, [
                  vue.createElementVNode("view", { class: "leftLabel" }, "订单编号："),
                  vue.createElementVNode("view", { class: "leftLabel flex align-center" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.order_no),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", {
                      class: "copyText",
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.tocopy && $options.tocopy(...args))
                    }, "复制")
                  ])
                ]),
                vue.createElementVNode("view", {
                  class: "flex align-center",
                  style: { "margin-top": "12rpx" }
                }, [
                  vue.createElementVNode("view", { class: "leftLabel" }, "下单时间："),
                  vue.createElementVNode("view", { class: "leftLabel flex align-center" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.orderTime),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                $data.payState == "payed" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "flex align-center",
                  style: { "margin-top": "12rpx" }
                }, [
                  vue.createElementVNode("view", { class: "leftLabel" }, "支付时间："),
                  vue.createElementVNode("view", { class: "leftLabel flex align-center" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($data.orderTime),
                      1
                      /* TEXT */
                    )
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              $data.payState != "payed" && $data.payState != "justPayed" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "flex align-center justify-between payMethodBox"
              }, [
                vue.createElementVNode("view", { class: "methodText" }, "支付方式"),
                vue.createElementVNode("view", { class: "flex align-center" }, [
                  vue.createElementVNode("image", {
                    src: "/static/images/order/wechatIcon.svg",
                    mode: "",
                    style: { "width": "36rpx", "height": "36rpx", "margin-right": "8rpx" }
                  }),
                  vue.createElementVNode("text", { class: "wechatText" }, "微信支付")
                ])
              ])) : vue.createCommentVNode("v-if", true),
              $data.payState != "payed" && $data.payState != "justPayed" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 3,
                class: "bottomBox w-full"
              }, [
                vue.createElementVNode("view", { class: "flex align-center justify-between h-full" }, [
                  vue.createElementVNode("view", { class: "flex align-center" }, [
                    vue.createElementVNode("view", { class: "totalText" }, "总计："),
                    vue.createElementVNode("view", { class: "priceText" }, [
                      vue.createElementVNode("text", null, "￥"),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($data.totalPrice / 100),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "flex align-center justify-end" }, [
                    $data.payState == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "cancelBtn",
                      onClick: _cache[3] || (_cache[3] = (...args) => $options.cancelOrder && $options.cancelOrder(...args))
                    }, "取消订单")) : vue.createCommentVNode("v-if", true),
                    $data.payState == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "payBtn"
                    }, "确认支付")) : $data.payState == "C" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "grayText",
                      style: { "font-size": "32rpx" }
                    }, "已取消")) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ),
          vue.createVNode(_component_van_dialog, { id: "van-dialog" })
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesOrderDetailOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-1353b6cf"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderDetail/orderDetail.vue"]]);
  const props$9 = {
    props: {
      color: {
        type: String,
        default: props$p.line.color
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: props$p.line.length
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: props$p.line.direction
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: props$p.line.hairline
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: props$p.line.margin
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: props$p.line.dashed
      }
    }
  };
  const _sfc_main$k = {
    name: "u-line",
    mixins: [mpMixin, mixin, props$9],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = uni.$u.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = uni.$u.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-bbd9963c"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-line/u-line.vue"]]);
  const props$8 = {
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: props$p.cell.title
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: props$p.cell.label
      },
      // 右侧的内容
      value: {
        type: [String, Number],
        default: props$p.cell.value
      },
      // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
      icon: {
        type: String,
        default: props$p.cell.icon
      },
      // 是否禁用cell
      disabled: {
        type: Boolean,
        default: props$p.cell.disabled
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: props$p.cell.border
      },
      // 内容是否垂直居中(主要是针对右侧的value部分)
      center: {
        type: Boolean,
        default: props$p.cell.center
      },
      // 点击后跳转的URL地址
      url: {
        type: String,
        default: props$p.cell.url
      },
      // 链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作
      linkType: {
        type: String,
        default: props$p.cell.linkType
      },
      // 是否开启点击反馈(表现为点击时加上灰色背景)
      clickable: {
        type: Boolean,
        default: props$p.cell.clickable
      },
      // 是否展示右侧箭头并开启点击反馈
      isLink: {
        type: Boolean,
        default: props$p.cell.isLink
      },
      // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
      required: {
        type: Boolean,
        default: props$p.cell.required
      },
      // 右侧的图标箭头
      rightIcon: {
        type: String,
        default: props$p.cell.rightIcon
      },
      // 右侧箭头的方向，可选值为：left，up，down
      arrowDirection: {
        type: String,
        default: props$p.cell.arrowDirection
      },
      // 左侧图标样式
      iconStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.iconStyle;
        }
      },
      // 右侧箭头图标的样式
      rightIconStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.rightIconStyle;
        }
      },
      // 标题的样式
      titleStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.titleStyle;
        }
      },
      // 单位元的大小，可选值为large
      size: {
        type: String,
        default: props$p.cell.size
      },
      // 点击cell是否阻止事件传播
      stop: {
        type: Boolean,
        default: props$p.cell.stop
      },
      // 标识符，cell被点击时返回
      name: {
        type: [Number, String],
        default: props$p.cell.name
      }
    }
  };
  const _sfc_main$j = {
    name: "u-cell",
    data() {
      return {};
    },
    mixins: [mpMixin, mixin, props$8],
    computed: {
      titleTextStyle() {
        return uni.$u.addStyle(this.titleStyle);
      }
    },
    emits: ["click"],
    methods: {
      // 点击cell
      clickHandler(e) {
        if (this.disabled)
          return;
        this.$emit("click", {
          name: this.name
        });
        this.openPage();
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-cell", [_ctx.customClass]]),
      style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
      "hover-class": !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "u-cell--clickable" : "",
      "hover-stay-time": 250,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell__body", [_ctx.center && "u-cell--center", _ctx.size === "large" && "u-cell__body--large"]])
        },
        [
          vue.createElementVNode("view", { class: "u-cell__body__content" }, [
            _ctx.$slots.icon || _ctx.icon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-cell__left-icon-wrap"
            }, [
              _ctx.$slots.icon ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
                key: 1,
                name: _ctx.icon,
                "custom-style": _ctx.iconStyle,
                size: _ctx.size === "large" ? 22 : 18
              }, null, 8, ["name", "custom-style", "size"]))
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-cell__title" }, [
              _ctx.$slots.title || !_ctx.title ? vue.renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 1,
                  class: vue.normalizeClass(["u-cell__title-text", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__title-text--large"]]),
                  style: vue.normalizeStyle([$options.titleTextStyle])
                },
                vue.toDisplayString(_ctx.title),
                7
                /* TEXT, CLASS, STYLE */
              )),
              vue.renderSlot(_ctx.$slots, "label", {}, () => [
                _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["u-cell__label", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__label--large"]])
                  },
                  vue.toDisplayString(_ctx.label),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "value", {}, () => [
            !_ctx.$u.test.empty(_ctx.value) ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["u-cell__value", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__value--large"]])
              },
              vue.toDisplayString(_ctx.value),
              3
              /* TEXT, CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          _ctx.$slots["right-icon"] || _ctx.isLink ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass(["u-cell__right-icon-wrap", [`u-cell__right-icon-wrap--${_ctx.arrowDirection}`]])
            },
            [
              vue.renderSlot(_ctx.$slots, "right-icon", {}, () => [
                _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: _ctx.rightIcon,
                  "custom-style": _ctx.rightIconStyle,
                  color: _ctx.disabled ? "#c8c9cc" : "info",
                  size: _ctx.size === "large" ? 18 : 16
                }, null, 8, ["name", "custom-style", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _ctx.border ? (vue.openBlock(), vue.createBlock(_component_u_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-b4243719"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-cell/u-cell.vue"]]);
  const props$7 = {
    props: {
      // 分组标题
      title: {
        type: String,
        default: props$p.cellGroup.title
      },
      // 是否显示外边框
      border: {
        type: Boolean,
        default: props$p.cellGroup.border
      }
    }
  };
  const _sfc_main$i = {
    name: "u-cell-group",
    mixins: [mpMixin, mixin, props$7]
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
        class: vue.normalizeClass([[_ctx.customClass], "u-cell-group"])
      },
      [
        _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-cell-group__title"
        }, [
          vue.renderSlot(_ctx.$slots, "title", {}, () => [
            vue.createElementVNode(
              "text",
              { class: "u-cell-group__title__text" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ], true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "u-cell-group__wrapper" }, [
          _ctx.border ? (vue.openBlock(), vue.createBlock(_component_u_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-30c8e4c7"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-cell-group/u-cell-group.vue"]]);
  const props$6 = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: props$p.toolbar.show
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$p.toolbar.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$p.toolbar.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$p.toolbar.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$p.toolbar.confirmColor
      },
      // 标题文字
      title: {
        type: String,
        default: props$p.toolbar.title
      }
    }
  };
  const _sfc_main$h = {
    name: "u-toolbar",
    mixins: [mpMixin, mixin, props$6],
    emits: ["confirm", "cancel"],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-toolbar",
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "u-toolbar__cancel__wrapper",
          "hover-class": "u-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "u-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "u-toolbar__title u-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "u-toolbar__confirm__wrapper",
          "hover-class": "u-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "u-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      32
      /* HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-3fd495d6"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-toolbar/u-toolbar.vue"]]);
  const props$5 = {
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: props$p.transition.show
      },
      // 使用的动画模式
      mode: {
        type: String,
        default: props$p.transition.mode
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: props$p.transition.duration
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: props$p.transition.timingFunction
      }
    }
  };
  const getClassNames = (name) => ({
    enter: `u-${name}-enter u-${name}-enter-active`,
    "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
    leave: `u-${name}-leave u-${name}-leave-active`,
    "leave-to": `u-${name}-leave-to u-${name}-leave-active`
  });
  const transition = {
    methods: {
      // 组件被点击发出事件
      clickHandler() {
        this.$emit("click");
      },
      // vue版本的组件进场处理
      async vueEnter() {
        const classNames = getClassNames(this.mode);
        this.status = "enter";
        this.$emit("beforeEnter");
        this.inited = true;
        this.display = true;
        this.classes = classNames.enter;
        await vue.nextTick();
        {
          this.$emit("enter");
          this.transitionEnded = false;
          this.$emit("afterEnter");
          this.classes = classNames["enter-to"];
        }
      },
      // 动画离场处理
      async vueLeave() {
        if (!this.display)
          return;
        const classNames = getClassNames(this.mode);
        this.status = "leave";
        this.$emit("beforeLeave");
        this.classes = classNames.leave;
        await vue.nextTick();
        {
          this.transitionEnded = false;
          this.$emit("leave");
          setTimeout(this.onTransitionEnd, this.duration);
          this.classes = classNames["leave-to"];
        }
      },
      // 完成过渡后触发
      onTransitionEnd() {
        if (this.transitionEnded)
          return;
        this.transitionEnded = true;
        this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
        if (!this.show && this.display) {
          this.display = false;
          this.inited = false;
        }
      }
    }
  };
  const _sfc_main$g = {
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
          ...uni.$u.addStyle(customStyle),
          ...viewStyle
        };
      }
    },
    // 将mixin挂在到组件中，uni.$u.mixin实际上为一个vue格式对象
    mixins: [mpMixin, mixin, transition, props$5],
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
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-transition", $data.classes]),
        ref: "u-transition",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
        style: vue.normalizeStyle([$options.mergeStyle]),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.noop && _ctx.noop(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-0573594d"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-transition/u-transition.vue"]]);
  const props$4 = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: props$p.overlay.show
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: props$p.overlay.zIndex
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: props$p.overlay.duration
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: props$p.overlay.opacity
      }
    }
  };
  const _sfc_main$f = {
    name: "u-overlay",
    mixins: [mpMixin, mixin, props$4],
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    emits: ["click"],
    methods: {
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4$1);
    return vue.openBlock(), vue.createBlock(_component_u_transition, {
      show: _ctx.show,
      "custom-class": "u-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick"]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-35f7c3e5"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-overlay/u-overlay.vue"]]);
  const props$3 = {
    props: {
      // 是否展示弹窗
      show: {
        type: Boolean,
        default: props$p.popup.show
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: props$p.popup.overlay
      },
      // 弹出的方向，可选值为 top bottom right left center
      mode: {
        type: String,
        default: props$p.popup.mode
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: props$p.popup.duration
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: props$p.popup.closeable
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: props$p.popup.overlayStyle
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: props$p.popup.closeOnClickOverlay
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: props$p.popup.zIndex
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: props$p.popup.safeAreaInsetBottom
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: props$p.popup.safeAreaInsetTop
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: props$p.popup.closeIconPos
      },
      // 是否显示圆角
      round: {
        type: [Boolean, String, Number],
        default: props$p.popup.round
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: props$p.popup.zoom
      },
      // 弹窗背景色，设置为transparent可去除白色背景
      bgColor: {
        type: String,
        default: props$p.popup.bgColor
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: props$p.popup.overlayOpacity
      }
    }
  };
  const _sfc_main$e = {
    name: "u-popup",
    mixins: [mpMixin, mixin, props$3],
    data() {
      return {
        overlayDuration: this.duration + 50
      };
    },
    watch: {
      show(newValue, oldValue) {
      }
    },
    computed: {
      transitionStyle() {
        const style = {
          zIndex: this.zIndex,
          position: "fixed",
          display: "flex"
        };
        style[this.mode] = 0;
        if (this.mode === "left") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "right") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "top") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "bottom") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "center") {
          return uni.$u.deepMerge(style, {
            alignItems: "center",
            "justify-content": "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          });
        }
      },
      contentStyle() {
        const style = {};
        uni.$u.sys();
        if (this.mode !== "center") {
          style.flex = 1;
        }
        if (this.bgColor) {
          style.backgroundColor = this.bgColor;
        }
        if (this.round) {
          const value = uni.$u.addUnit(this.round);
          if (this.mode === "top") {
            style.borderBottomLeftRadius = value;
            style.borderBottomRightRadius = value;
          } else if (this.mode === "bottom") {
            style.borderTopLeftRadius = value;
            style.borderTopRightRadius = value;
          } else if (this.mode === "center") {
            style.borderRadius = value;
          }
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      },
      position() {
        if (this.mode === "center") {
          return this.zoom ? "fade-zoom" : "fade";
        }
        if (this.mode === "left") {
          return "slide-left";
        }
        if (this.mode === "right") {
          return "slide-right";
        }
        if (this.mode === "bottom") {
          return "slide-up";
        }
        if (this.mode === "top") {
          return "slide-down";
        }
      }
    },
    emits: ["open", "close", "click"],
    methods: {
      // 点击遮罩
      overlayClick() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      close(e) {
        this.$emit("close");
      },
      afterEnter() {
        this.$emit("open");
      },
      clickHandler() {
        if (this.mode === "center") {
          this.overlayClick();
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_overlay = resolveEasycom(vue.resolveDynamicComponent("u-overlay"), __easycom_0$1);
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$2);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("u-safe-bottom"), __easycom_3$3);
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-popup" }, [
      _ctx.overlay ? (vue.openBlock(), vue.createBlock(_component_u_overlay, {
        key: 0,
        show: _ctx.show,
        onClick: $options.overlayClick,
        duration: $data.overlayDuration,
        customStyle: _ctx.overlayStyle,
        opacity: _ctx.overlayOpacity
      }, null, 8, ["show", "onClick", "duration", "customStyle", "opacity"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_u_transition, {
        show: _ctx.show,
        customStyle: $options.transitionStyle,
        mode: $options.position,
        duration: _ctx.duration,
        onAfterEnter: $options.afterEnter,
        onClick: $options.clickHandler
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: "u-popup__content",
              style: vue.normalizeStyle([$options.contentStyle]),
              onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop"]))
            },
            [
              _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
              _ctx.closeable ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                  class: vue.normalizeClass(["u-popup__content__close", ["u-popup__content__close--" + _ctx.closeIconPos]]),
                  "hover-class": "u-popup__content__close--hover",
                  "hover-stay-time": "150"
                },
                [
                  vue.createVNode(_component_u_icon, {
                    name: "close",
                    color: "#909399",
                    size: "18",
                    bold: ""
                  })
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_u_safe_bottom, { key: 2 })) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["show", "customStyle", "mode", "duration", "onAfterEnter", "onClick"])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-74921bef"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-popup/u-popup.vue"]]);
  const props$2 = {
    props: {
      // 是否展示picker弹窗
      show: {
        type: Boolean,
        default: props$p.picker.show
      },
      // 弹出的方向，可选值为 top bottom right left center
      popupMode: {
        type: String,
        default: props$p.picker.popupMode
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: props$p.picker.showToolbar
      },
      // 顶部标题
      title: {
        type: String,
        default: props$p.picker.title
      },
      // 对象数组，设置每一列的数据
      columns: {
        type: Array,
        default: props$p.picker.columns
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: props$p.picker.loading
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: props$p.picker.itemHeight
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$p.picker.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$p.picker.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$p.picker.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$p.picker.confirmColor
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: props$p.picker.visibleItemCount
      },
      // 选项对象中，需要展示的属性键名
      keyName: {
        type: String,
        default: props$p.picker.keyName
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: props$p.picker.closeOnClickOverlay
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: props$p.picker.defaultIndex
      },
      // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
      immediateChange: {
        type: Boolean,
        default: props$p.picker.immediateChange
      }
    }
  };
  const _sfc_main$d = {
    name: "u-picker",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        // 上一次选择的列索引
        lastIndex: [],
        // 索引值 ，对应picker-view的value
        innerIndex: [],
        // 各列的值
        innerColumns: [],
        // 上一次的变化列索引
        columnIndex: 0
      };
    },
    watch: {
      // 监听默认索引的变化，重新设置对应的值
      defaultIndex: {
        immediate: true,
        handler(n) {
          this.setIndexs(n, true);
        }
      },
      // 监听columns参数的变化
      columns: {
        immediate: true,
        deep: true,
        handler(n) {
          this.setColumns(n);
        }
      }
    },
    emits: ["close", "cancel", "confirm", "change"],
    methods: {
      // 获取item需要显示的文字，判别为对象还是文本
      getItemText(item) {
        if (uni.$u.test.object(item)) {
          return item[this.keyName];
        } else {
          return item;
        }
      },
      // 关闭选择器
      closeHandler() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          indexs: this.innerIndex,
          value: this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]),
          values: this.innerColumns
        });
      },
      // 选择器某一列的数据发生变化时触发
      changeHandler(e) {
        const {
          value
        } = e.detail;
        let index2 = 0, columnIndex = 0;
        for (let i = 0; i < value.length; i++) {
          let item = value[i];
          if (item !== (this.lastIndex[i] || 0)) {
            columnIndex = i;
            index2 = item;
            break;
          }
        }
        this.columnIndex = columnIndex;
        const values = this.innerColumns;
        this.setLastIndex(value);
        this.setIndexs(value);
        this.$emit("change", {
          // 微信小程序不能传递this，会因为循环引用而报错
          picker: this,
          value: this.innerColumns.map((item, index3) => item[value[index3]]),
          index: index2,
          indexs: value,
          // values为当前变化列的数组内容
          values,
          columnIndex
        });
      },
      // 设置index索引，此方法可被外部调用设置
      setIndexs(index2, setLastIndex) {
        this.innerIndex = uni.$u.deepClone(index2);
        if (setLastIndex) {
          this.setLastIndex(index2);
        }
      },
      // 记录上一次的各列索引位置
      setLastIndex(index2) {
        this.lastIndex = uni.$u.deepClone(index2);
      },
      // 设置对应列选项的所有值
      setColumnValues(columnIndex, values) {
        this.innerColumns.splice(columnIndex, 1, values);
        let tmpIndex = uni.$u.deepClone(this.innerIndex);
        for (let i = 0; i < this.innerColumns.length; i++) {
          if (i > this.columnIndex) {
            tmpIndex[i] = 0;
          }
        }
        this.setIndexs(tmpIndex);
      },
      // 获取对应列的所有选项
      getColumnValues(columnIndex) {
        (async () => {
          await uni.$u.sleep();
        })();
        return this.innerColumns[columnIndex];
      },
      // 设置整体各列的columns的值
      setColumns(columns) {
        this.innerColumns = uni.$u.deepClone(columns);
        if (this.innerIndex.length === 0) {
          this.innerIndex = new Array(columns.length).fill(0);
        }
      },
      // 获取各列选中值对应的索引
      getIndexs() {
        return this.innerIndex;
      },
      // 获取各列选中的值
      getValues() {
        (async () => {
          await uni.$u.sleep();
        })();
        return this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_toolbar = resolveEasycom(vue.resolveDynamicComponent("u-toolbar"), __easycom_0$2);
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_2);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      show: _ctx.show,
      mode: _ctx.popupMode,
      onClose: $options.closeHandler
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-picker" }, [
          _ctx.showToolbar ? (vue.openBlock(), vue.createBlock(_component_u_toolbar, {
            key: 0,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            onCancel: $options.cancel,
            onConfirm: $options.confirm
          }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("picker-view", {
            class: "u-picker__view",
            indicatorStyle: `height: ${_ctx.$u.addUnit(_ctx.itemHeight)}`,
            value: $data.innerIndex,
            immediateChange: true,
            style: vue.normalizeStyle({
              height: `${_ctx.$u.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`
            }),
            onChange: _cache[0] || (_cache[0] = (...args) => $options.changeHandler && $options.changeHandler(...args))
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.innerColumns, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", {
                  key: index2,
                  class: "u-picker__view__column"
                }, [
                  _ctx.$u.test.array(item) ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(item, (item1, index1) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          class: "u-picker__view__column__item u-line-1",
                          key: index1,
                          style: vue.normalizeStyle({
                            height: _ctx.$u.addUnit(_ctx.itemHeight),
                            lineHeight: _ctx.$u.addUnit(_ctx.itemHeight),
                            fontWeight: index1 === $data.innerIndex[index2] ? "bold" : "normal"
                          })
                        },
                        vue.toDisplayString($options.getItemText(item1)),
                        5
                        /* TEXT, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["indicatorStyle", "value"]),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-picker--loading"
          }, [
            vue.createVNode(_component_u_loading_icon, { mode: "circle" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["show", "mode", "onClose"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-1500ce68"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-picker/u-picker.vue"]]);
  const props$1 = {
    props: {
      // 是否打开组件
      show: {
        type: Boolean,
        default: props$p.datetimePicker.show
      },
      // 弹出的方向，可选值为 top bottom right left center
      popupMode: {
        type: String,
        default: props$p.picker.popupMode
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: props$p.datetimePicker.showToolbar
      },
      // 绑定值
      modelValue: {
        type: [String, Number],
        default: props$p.datetimePicker.value
      },
      // 顶部标题
      title: {
        type: String,
        default: props$p.datetimePicker.title
      },
      // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
      mode: {
        type: String,
        default: props$p.datetimePicker.mode
      },
      // 可选的最大时间
      maxDate: {
        type: Number,
        // 最大默认值为后10年
        default: props$p.datetimePicker.maxDate
      },
      // 可选的最小时间
      minDate: {
        type: Number,
        // 最小默认值为前10年
        default: props$p.datetimePicker.minDate
      },
      // 可选的最小小时，仅mode=time有效
      minHour: {
        type: Number,
        default: props$p.datetimePicker.minHour
      },
      // 可选的最大小时，仅mode=time有效
      maxHour: {
        type: Number,
        default: props$p.datetimePicker.maxHour
      },
      // 可选的最小分钟，仅mode=time有效
      minMinute: {
        type: Number,
        default: props$p.datetimePicker.minMinute
      },
      // 可选的最大分钟，仅mode=time有效
      maxMinute: {
        type: Number,
        default: props$p.datetimePicker.maxMinute
      },
      // 选项过滤函数
      filter: {
        type: [Function, null],
        default: props$p.datetimePicker.filter
      },
      // 选项格式化函数
      formatter: {
        type: [Function, null],
        default: props$p.datetimePicker.formatter
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: props$p.datetimePicker.loading
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: props$p.datetimePicker.itemHeight
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: props$p.datetimePicker.cancelText
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: props$p.datetimePicker.confirmText
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: props$p.datetimePicker.cancelColor
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: props$p.datetimePicker.confirmColor
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: props$p.datetimePicker.visibleItemCount
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: props$p.datetimePicker.closeOnClickOverlay
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: props$p.datetimePicker.defaultIndex
      }
    }
  };
  var SECONDS_A_MINUTE = 60;
  var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  var MILLISECONDS_A_SECOND = 1e3;
  var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  var MS = "millisecond";
  var S = "second";
  var MIN = "minute";
  var H = "hour";
  var D = "day";
  var W = "week";
  var M = "month";
  var Q = "quarter";
  var Y = "year";
  var DATE = "date";
  var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
  var INVALID_DATE_STRING = "Invalid Date";
  var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  const en = {
    name: "en",
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    ordinal: function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n % 100;
      return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
    }
  };
  var padStart = function padStart2(string2, length, pad) {
    var s = String(string2);
    if (!s || s.length >= length)
      return string2;
    return "" + Array(length + 1 - s.length).join(pad) + string2;
  };
  var padZoneStr = function padZoneStr2(instance) {
    var negMinutes = -instance.utcOffset();
    var minutes = Math.abs(negMinutes);
    var hourOffset = Math.floor(minutes / 60);
    var minuteOffset = minutes % 60;
    return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
  };
  var monthDiff = function monthDiff2(a, b) {
    if (a.date() < b.date())
      return -monthDiff2(b, a);
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    var anchor = a.clone().add(wholeMonthDiff, M);
    var c = b - anchor < 0;
    var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
    return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
  };
  var absFloor = function absFloor2(n) {
    return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
  };
  var prettyUnit = function prettyUnit2(u) {
    var special = {
      M,
      y: Y,
      w: W,
      d: D,
      D: DATE,
      h: H,
      m: MIN,
      s: S,
      ms: MS,
      Q
    };
    return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
  };
  var isUndefined$1 = function isUndefined2(s) {
    return s === void 0;
  };
  const U = {
    s: padStart,
    z: padZoneStr,
    m: monthDiff,
    a: absFloor,
    p: prettyUnit,
    u: isUndefined$1
  };
  var L = "en";
  var Ls = {};
  Ls[L] = en;
  var IS_DAYJS = "$isDayjsObject";
  var isDayjs = function isDayjs2(d) {
    return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
  };
  var parseLocale = function parseLocale2(preset, object2, isLocal) {
    var l;
    if (!preset)
      return L;
    if (typeof preset === "string") {
      var presetLower = preset.toLowerCase();
      if (Ls[presetLower]) {
        l = presetLower;
      }
      if (object2) {
        Ls[presetLower] = object2;
        l = presetLower;
      }
      var presetSplit = preset.split("-");
      if (!l && presetSplit.length > 1) {
        return parseLocale2(presetSplit[0]);
      }
    } else {
      var name = preset.name;
      Ls[name] = preset;
      l = name;
    }
    if (!isLocal && l)
      L = l;
    return l || !isLocal && L;
  };
  var dayjs = function dayjs2(date2, c) {
    if (isDayjs(date2)) {
      return date2.clone();
    }
    var cfg = typeof c === "object" ? c : {};
    cfg.date = date2;
    cfg.args = arguments;
    return new Dayjs(cfg);
  };
  var wrapper = function wrapper2(date2, instance) {
    return dayjs(date2, {
      locale: instance.$L,
      utc: instance.$u,
      x: instance.$x,
      $offset: instance.$offset
      // todo: refactor; do not use this.$offset in you code
    });
  };
  var Utils = U;
  Utils.l = parseLocale;
  Utils.i = isDayjs;
  Utils.w = wrapper;
  var parseDate = function parseDate2(cfg) {
    var date2 = cfg.date, utc = cfg.utc;
    if (date2 === null)
      return /* @__PURE__ */ new Date(NaN);
    if (Utils.u(date2))
      return /* @__PURE__ */ new Date();
    if (date2 instanceof Date)
      return new Date(date2);
    if (typeof date2 === "string" && !/Z$/i.test(date2)) {
      var d = date2.match(REGEX_PARSE);
      if (d) {
        var m = d[2] - 1 || 0;
        var ms = (d[7] || "0").substring(0, 3);
        if (utc) {
          return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
        }
        return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
      }
    }
    return new Date(date2);
  };
  var Dayjs = /* @__PURE__ */ function() {
    function Dayjs2(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.parse(cfg);
      this.$x = this.$x || cfg.x || {};
      this[IS_DAYJS] = true;
    }
    var _proto = Dayjs2.prototype;
    _proto.parse = function parse(cfg) {
      this.$d = parseDate(cfg);
      this.init();
    };
    _proto.init = function init() {
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    };
    _proto.$utils = function $utils() {
      return Utils;
    };
    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };
    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };
    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };
    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
    };
    _proto.$g = function $g(input, get, set) {
      if (Utils.u(input))
        return this[get];
      return this.set(set, input);
    };
    _proto.unix = function unix() {
      return Math.floor(this.valueOf() / 1e3);
    };
    _proto.valueOf = function valueOf() {
      return this.$d.getTime();
    };
    _proto.startOf = function startOf(units, _startOf) {
      var _this = this;
      var isStartOf = !Utils.u(_startOf) ? _startOf : true;
      var unit = Utils.p(units);
      var instanceFactory = function instanceFactory2(d, m) {
        var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
        return isStartOf ? ins : ins.endOf(D);
      };
      var instanceFactorySet = function instanceFactorySet2(method, slice) {
        var argumentStart = [0, 0, 0, 0];
        var argumentEnd = [23, 59, 59, 999];
        return Utils.w(_this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          _this.toDate("s"),
          (isStartOf ? argumentStart : argumentEnd).slice(slice)
        ), _this);
      };
      var $W = this.$W, $M = this.$M, $D = this.$D;
      var utcPad = "set" + (this.$u ? "UTC" : "");
      switch (unit) {
        case Y:
          return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
        case M:
          return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
        case W: {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }
        case D:
        case DATE:
          return instanceFactorySet(utcPad + "Hours", 0);
        case H:
          return instanceFactorySet(utcPad + "Minutes", 1);
        case MIN:
          return instanceFactorySet(utcPad + "Seconds", 2);
        case S:
          return instanceFactorySet(utcPad + "Milliseconds", 3);
        default:
          return this.clone();
      }
    };
    _proto.endOf = function endOf(arg) {
      return this.startOf(arg, false);
    };
    _proto.$set = function $set(units, _int) {
      var _C$D$C$DATE$C$M$C$Y$C;
      var unit = Utils.p(units);
      var utcPad = "set" + (this.$u ? "UTC" : "");
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (_int - this.$W) : _int;
      if (unit === M || unit === Y) {
        var date2 = this.clone().set(DATE, 1);
        date2.$d[name](arg);
        date2.init();
        this.$d = date2.set(DATE, Math.min(this.$D, date2.daysInMonth())).$d;
      } else if (name)
        this.$d[name](arg);
      this.init();
      return this;
    };
    _proto.set = function set(string2, _int2) {
      return this.clone().$set(string2, _int2);
    };
    _proto.get = function get(unit) {
      return this[Utils.p(unit)]();
    };
    _proto.add = function add(number2, units) {
      var _this2 = this, _C$MIN$C$H$C$S$unit;
      number2 = Number(number2);
      var unit = Utils.p(units);
      var instanceFactorySet = function instanceFactorySet2(n) {
        var d = dayjs(_this2);
        return Utils.w(d.date(d.date() + Math.round(n * number2)), _this2);
      };
      if (unit === M) {
        return this.set(M, this.$M + number2);
      }
      if (unit === Y) {
        return this.set(Y, this.$y + number2);
      }
      if (unit === D) {
        return instanceFactorySet(1);
      }
      if (unit === W) {
        return instanceFactorySet(7);
      }
      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
      var nextTimeStamp = this.$d.getTime() + number2 * step;
      return Utils.w(nextTimeStamp, this);
    };
    _proto.subtract = function subtract(number2, string2) {
      return this.add(number2 * -1, string2);
    };
    _proto.format = function format(formatStr) {
      var _this3 = this;
      var locale = this.$locale();
      if (!this.isValid())
        return locale.invalidDate || INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.z(this);
      var $H = this.$H, $m = this.$m, $M = this.$M;
      var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
      var getShort = function getShort2(arr, index2, full, length) {
        return arr && (arr[index2] || arr(_this3, str)) || full[index2].slice(0, length);
      };
      var get$H = function get$H2(num) {
        return Utils.s($H % 12 || 12, num, "0");
      };
      var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
        var m = hour < 12 ? "AM" : "PM";
        return isLowercase ? m.toLowerCase() : m;
      };
      var matches = function matches2(match) {
        switch (match) {
          case "YY":
            return String(_this3.$y).slice(-2);
          case "YYYY":
            return Utils.s(_this3.$y, 4, "0");
          case "M":
            return $M + 1;
          case "MM":
            return Utils.s($M + 1, 2, "0");
          case "MMM":
            return getShort(locale.monthsShort, $M, months, 3);
          case "MMMM":
            return getShort(months, $M);
          case "D":
            return _this3.$D;
          case "DD":
            return Utils.s(_this3.$D, 2, "0");
          case "d":
            return String(_this3.$W);
          case "dd":
            return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);
          case "ddd":
            return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);
          case "dddd":
            return weekdays[_this3.$W];
          case "H":
            return String($H);
          case "HH":
            return Utils.s($H, 2, "0");
          case "h":
            return get$H(1);
          case "hh":
            return get$H(2);
          case "a":
            return meridiemFunc($H, $m, true);
          case "A":
            return meridiemFunc($H, $m, false);
          case "m":
            return String($m);
          case "mm":
            return Utils.s($m, 2, "0");
          case "s":
            return String(_this3.$s);
          case "ss":
            return Utils.s(_this3.$s, 2, "0");
          case "SSS":
            return Utils.s(_this3.$ms, 3, "0");
          case "Z":
            return zoneStr;
        }
        return null;
      };
      return str.replace(REGEX_FORMAT, function(match, $1) {
        return $1 || matches(match) || zoneStr.replace(":", "");
      });
    };
    _proto.utcOffset = function utcOffset() {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
    };
    _proto.diff = function diff(input, units, _float) {
      var _this4 = this;
      var unit = Utils.p(units);
      var that = dayjs(input);
      var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      var diff2 = this - that;
      var getMonth = function getMonth2() {
        return Utils.m(_this4, that);
      };
      var result;
      switch (unit) {
        case Y:
          result = getMonth() / 12;
          break;
        case M:
          result = getMonth();
          break;
        case Q:
          result = getMonth() / 3;
          break;
        case W:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK;
          break;
        case D:
          result = (diff2 - zoneDelta) / MILLISECONDS_A_DAY;
          break;
        case H:
          result = diff2 / MILLISECONDS_A_HOUR;
          break;
        case MIN:
          result = diff2 / MILLISECONDS_A_MINUTE;
          break;
        case S:
          result = diff2 / MILLISECONDS_A_SECOND;
          break;
        default:
          result = diff2;
          break;
      }
      return _float ? result : Utils.a(result);
    };
    _proto.daysInMonth = function daysInMonth() {
      return this.endOf(M).$D;
    };
    _proto.$locale = function $locale() {
      return Ls[this.$L];
    };
    _proto.locale = function locale(preset, object2) {
      if (!preset)
        return this.$L;
      var that = this.clone();
      var nextLocaleName = parseLocale(preset, object2, true);
      if (nextLocaleName)
        that.$L = nextLocaleName;
      return that;
    };
    _proto.clone = function clone2() {
      return Utils.w(this.$d, this);
    };
    _proto.toDate = function toDate() {
      return new Date(this.valueOf());
    };
    _proto.toJSON = function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    };
    _proto.toISOString = function toISOString() {
      return this.$d.toISOString();
    };
    _proto.toString = function toString2() {
      return this.$d.toUTCString();
    };
    return Dayjs2;
  }();
  var proto = Dayjs.prototype;
  dayjs.prototype = proto;
  [["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
    proto[g[1]] = function(input) {
      return this.$g(input, g[0], g[1]);
    };
  });
  dayjs.extend = function(plugin, option) {
    if (!plugin.$i) {
      plugin(option, Dayjs, dayjs);
      plugin.$i = true;
    }
    return dayjs;
  };
  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;
  dayjs.unix = function(timestamp) {
    return dayjs(timestamp * 1e3);
  };
  dayjs.en = Ls[L];
  dayjs.Ls = Ls;
  dayjs.p = {};
  function times$1(n, iteratee) {
    let index2 = -1;
    const result = Array(n < 0 ? 0 : n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  const _sfc_main$c = {
    name: "datetime-picker",
    mixins: [mpMixin, mixin, props$1],
    data() {
      return {
        columns: [],
        innerDefaultIndex: [],
        innerFormatter: (type, value) => value
      };
    },
    watch: {
      show(newValue, oldValue) {
        if (newValue) {
          this.updateColumnValue(this.innerValue);
        }
      },
      modelValue(newValue) {
        this.init();
      },
      propsChange() {
        this.init();
      }
    },
    computed: {
      // 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
      propsChange() {
        return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter];
      }
    },
    mounted() {
      this.init();
    },
    emits: ["close", "cancel", "confirm", "change", "update:modelValue"],
    methods: {
      init() {
        this.innerValue = this.correctValue(this.modelValue);
        this.updateColumnValue(this.innerValue);
      },
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // 关闭选择器
      close() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          value: this.innerValue,
          mode: this.mode
        });
        this.$emit("update:modelValue", this.innerValue);
      },
      //用正则截取输出值,当出现多组数字时,抛出错误
      intercept(e, type) {
        let judge = e.match(/\d+/g);
        if (judge.length > 1) {
          uni.$u.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else if (type && judge[0].length == 4) {
          return judge[0];
        } else if (judge[0].length > 2) {
          uni.$u.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else {
          return judge[0];
        }
      },
      // 列发生变化时触发
      change(e) {
        const { indexs, values } = e;
        let selectValue = "";
        if (this.mode === "time") {
          selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
        } else {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          const month = parseInt(this.intercept(values[1][indexs[1]]));
          let date2 = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
          let hour = 0, minute = 0;
          const maxDate = dayjs(`${year}-${month}`).daysInMonth();
          if (this.mode === "year-month") {
            date2 = 1;
          }
          date2 = Math.min(maxDate, date2);
          if (this.mode === "datetime") {
            hour = parseInt(this.intercept(values[3][indexs[3]]));
            minute = parseInt(this.intercept(values[4][indexs[4]]));
          }
          selectValue = Number(new Date(year, month - 1, date2, hour, minute));
        }
        selectValue = this.correctValue(selectValue);
        this.innerValue = selectValue;
        this.updateColumnValue(selectValue);
        this.$emit("change", {
          value: selectValue,
          // 微信小程序不能传递this实例，会因为循环引用而报错
          picker: this.$refs.picker,
          mode: this.mode
        });
      },
      // 更新各列的值，进行补0、格式化等操作
      updateColumnValue(value) {
        this.innerValue = value;
        this.updateColumns();
        setTimeout(() => {
          this.updateIndexs(value);
        }, 0);
      },
      // 更新索引
      updateIndexs(value) {
        let values = [];
        const formatter = this.formatter || this.innerFormatter;
        const padZero2 = uni.$u.padZero;
        if (this.mode === "time") {
          const timeArr = value.split(":");
          values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
        } else {
          values = [
            formatter("year", `${dayjs(value).year()}`),
            // 月份补0
            formatter("month", padZero2(dayjs(value).month() + 1))
          ];
          if (this.mode === "date") {
            values.push(formatter("day", padZero2(dayjs(value).date())));
          }
          if (this.mode === "datetime") {
            values.push(formatter("day", padZero2(dayjs(value).date())), formatter("hour", padZero2(dayjs(value).hour())), formatter("minute", padZero2(dayjs(value).minute())));
          }
        }
        const indexs = this.columns.map((column, index2) => {
          return Math.max(0, column.findIndex((item) => item === values[index2]));
        });
        this.innerDefaultIndex = indexs;
      },
      // 更新各列的值
      updateColumns() {
        const formatter = this.formatter || this.innerFormatter;
        const results = this.getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)));
        this.columns = results;
      },
      getOriginColumns() {
        const results = this.getRanges().map(({ type, range: range2 }) => {
          let values = times$1(range2[1] - range2[0] + 1, (index2) => {
            let value = range2[0] + index2;
            value = type === "year" ? `${value}` : uni.$u.padZero(value);
            return value;
          });
          if (this.filter) {
            values = this.filter(type, values);
          }
          return { type, values };
        });
        return results;
      },
      // 通过最大值和最小值生成数组
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start);
      },
      // 得出合法的时间
      correctValue(value) {
        const isDateMode = this.mode !== "time";
        if (isDateMode && !uni.$u.test.date(value)) {
          value = this.minDate;
        } else if (!isDateMode && !value) {
          value = `${uni.$u.padZero(this.minHour)}:${uni.$u.padZero(this.minMinute)}`;
        }
        if (!isDateMode) {
          if (String(value).indexOf(":") === -1)
            return uni.$u.error("时间错误，请传递如12:24的格式");
          let [hour, minute] = value.split(":");
          hour = uni.$u.padZero(uni.$u.range(this.minHour, this.maxHour, Number(hour)));
          minute = uni.$u.padZero(uni.$u.range(this.minMinute, this.maxMinute, Number(minute)));
          return `${hour}:${minute}`;
        } else {
          value = dayjs(value).isBefore(dayjs(this.minDate)) ? this.minDate : value;
          value = dayjs(value).isAfter(dayjs(this.maxDate)) ? this.maxDate : value;
          return value;
        }
      },
      // 获取每列的最大和最小值
      getRanges() {
        if (this.mode === "time") {
          return [
            {
              type: "hour",
              range: [this.minHour, this.maxHour]
            },
            {
              type: "minute",
              range: [this.minMinute, this.maxMinute]
            }
          ];
        }
        const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
        const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
        const result = [
          {
            type: "year",
            range: [minYear, maxYear]
          },
          {
            type: "month",
            range: [minMonth, maxMonth]
          },
          {
            type: "day",
            range: [minDate, maxDate]
          },
          {
            type: "hour",
            range: [minHour, maxHour]
          },
          {
            type: "minute",
            range: [minMinute, maxMinute]
          }
        ];
        if (this.mode === "date")
          result.splice(3, 2);
        if (this.mode === "year-month")
          result.splice(2, 3);
        return result;
      },
      // 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
      getBoundary(type, innerValue) {
        const value = new Date(innerValue);
        const boundary = new Date(this[`${type}Date`]);
        const year = dayjs(boundary).year();
        let month = 1;
        let date2 = 1;
        let hour = 0;
        let minute = 0;
        if (type === "max") {
          month = 12;
          date2 = dayjs(value).daysInMonth();
          hour = 23;
          minute = 59;
        }
        if (dayjs(value).year() === year) {
          month = dayjs(boundary).month() + 1;
          if (dayjs(value).month() + 1 === month) {
            date2 = dayjs(boundary).date();
            if (dayjs(value).date() === date2) {
              hour = dayjs(boundary).hour();
              if (dayjs(value).hour() === hour) {
                minute = dayjs(boundary).minute();
              }
            }
          }
        }
        return {
          [`${type}Year`]: year,
          [`${type}Month`]: month,
          [`${type}Date`]: date2,
          [`${type}Hour`]: hour,
          [`${type}Minute`]: minute
        };
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_0);
    return vue.openBlock(), vue.createBlock(_component_u_picker, {
      ref: "picker",
      show: _ctx.show,
      popupMode: _ctx.popupMode,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      onClose: $options.close,
      onCancel: $options.cancel,
      onConfirm: $options.confirm,
      onChange: $options.change
    }, null, 8, ["show", "popupMode", "closeOnClickOverlay", "columns", "title", "itemHeight", "showToolbar", "visibleItemCount", "defaultIndex", "cancelText", "confirmText", "cancelColor", "confirmColor", "onClose", "onCancel", "onConfirm", "onChange"]);
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-e39cc2d0"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        app: getApp(),
        avatarUrl: "",
        nickname: "",
        sex: "",
        personalProfile: "",
        show: false,
        columns: [],
        currentDate: 0,
        dealCurrentDate: "",
        minDate: 0,
        maxDate: 0,
        fileList: []
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
      let userInfo = await this.app.getUserInfo();
      this.maxDate = Date.now();
      this.currentDate = Date.now();
      this.nickname = userInfo.name;
      this.avatarUrl = userInfo.avatar;
      this.sex = String(userInfo.sex);
      this.dealCurrentDate = userInfo.birthday;
      this.personalProfile = userInfo.introduce;
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
      // 返回
      onClickLeft() {
        uni.navigateBack();
      },
      deleteImg(event) {
        this.fileList = [];
        this.avatarUrl = "";
      },
      // 上传问题相关图片
      afterRead(event) {
        const {
          file
        } = event;
        uni.uploadFile({
          url: this.app.globalData.uploadAvatarUrl,
          filePath: file.url,
          name: "file",
          success: (res) => {
            let fileList = this.fileList;
            fileList.push({
              url: this.app.globalData.httpUrl + JSON.parse(res.data).data
            });
            this.fileList = fileList;
            this.avatarUrl = fileList[0].url;
          }
        });
      },
      onCancel() {
        this.show = false;
      },
      chooseAge() {
        this.show = true;
      },
      onConfirm(e) {
        let date2 = new Date(e.value);
        let year = date2.getFullYear();
        let month = formatNumber(date2.getMonth() + 1);
        let day = formatNumber(date2.getDate());
        this.currentDate = e.value;
        this.dealCurrentDate = `${year}${month}${day}`;
        this.show = false;
      },
      // 保存
      save() {
        request({
          url: "wx/update/user/info",
          method: "POST",
          data: {
            user_ouid: this.app.globalData.userInfo.ouid,
            name: this.nickname,
            avatar: this.avatarUrl,
            phone: "",
            birthday: Number(this.dealCurrentDate),
            sex: Number(this.sex),
            //1男  2女
            introduce: this.personalProfile
          }
        }).then(() => {
          uni.removeStorageSync("userInfo");
          this.app.getUserInfo();
          uni.showToast({
            title: "保存成功",
            icon: "none",
            duration: 2e3
          });
          setTimeout(() => {
            uni.redirectTo({
              url: "/pages/index/index"
            });
          }, 1500);
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_3$1);
    const _component_u_cell = resolveEasycom(vue.resolveDynamicComponent("u-cell"), __easycom_2$1);
    const _component_u_radio = resolveEasycom(vue.resolveDynamicComponent("u-radio"), __easycom_5);
    const _component_u_radio_group = resolveEasycom(vue.resolveDynamicComponent("u-radio-group"), __easycom_6);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3);
    const _component_u_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("u-datetime-picker"), __easycom_8);
    const _component_u_textarea = resolveEasycom(vue.resolveDynamicComponent("u-textarea"), __easycom_2$2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/infoEdit/infoEdit.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            safeAreaInsetTop: true,
            fixed: false,
            title: "个人信息",
            autoBack: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_cell_group, { "custom-class": "userinfo-group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_cell, {
                title: "头像",
                "is-link": ""
              }, {
                value: vue.withCtx(() => [
                  vue.createVNode(_component_u_upload, {
                    fileList: $data.fileList,
                    onAfterRead: $options.afterRead,
                    onDelete: $options.deleteImg,
                    maxCount: 1
                  }, {
                    default: vue.withCtx(() => [
                      !$data.avatarUrl ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "flex align-center justify-center",
                        style: { "background-color": "#f4f5f7", "width": "40px", "height": "40px" }
                      }, [
                        vue.createVNode(_component_u_icon, { name: "plus" })
                      ])) : (vue.openBlock(), vue.createElementBlock("image", {
                        key: 1,
                        src: $data.avatarUrl,
                        class: "avatarBox"
                      }, null, 8, ["src"]))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["fileList", "onAfterRead", "onDelete"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_cell, { title: "昵称" }, {
                value: vue.withCtx(() => [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.nickname = $event),
                      placeholder: "请输入8个字以内的昵称",
                      style: { "text-align": "right" },
                      "placeholder-style": "font-size:28rpx;color: #B1B4C3;"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.nickname]
                  ])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_cell, { title: "性别" }, {
                value: vue.withCtx(() => [
                  vue.createVNode(_component_u_radio_group, {
                    modelValue: $data.sex,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.sex = $event)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_radio, {
                        name: "1",
                        label: "男",
                        style: { "margin-right": "48rpx" }
                      }),
                      vue.createVNode(_component_u_radio, {
                        name: "2",
                        label: "女"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_u_cell, {
                title: "生日",
                "is-link": "",
                onClick: $options.chooseAge
              }, {
                value: vue.withCtx(() => [
                  vue.createElementVNode(
                    "view",
                    { style: { "font-size": "28rpx", "color": "#b1b4c3" } },
                    vue.toDisplayString(!$data.dealCurrentDate ? "请选择" : $data.dealCurrentDate),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_datetime_picker, {
            show: $data.show,
            mode: "date",
            "min-date": $data.minDate,
            "max-date": $data.maxDate,
            modelValue: $data.currentDate,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.currentDate = $event),
            onConfirm: $options.onConfirm,
            onCancel: $options.onCancel
          }, null, 8, ["show", "min-date", "max-date", "modelValue", "onConfirm", "onCancel"]),
          vue.createElementVNode("view", { class: "devide" }),
          vue.createElementVNode("view", { class: "personalProfile" }, [
            vue.createElementVNode("view", { class: "personalProfileTitle" }, "个人简介"),
            vue.createVNode(_component_u_textarea, {
              modelValue: $data.personalProfile,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.personalProfile = $event),
              placeholder: "请输入..."
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("view", {
            class: "saveBtn flex align-center justify-center",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.save && $options.save(...args))
          }, "保存")
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesInfoEditInfoEdit = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-516de732"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/infoEdit/infoEdit.vue"]]);
  const props = {
    props: {
      // 是否展示modal
      show: {
        type: Boolean,
        default: props$p.modal.show
      },
      // 标题
      title: {
        type: [String],
        default: props$p.modal.title
      },
      // 弹窗内容
      content: {
        type: String,
        default: props$p.modal.content
      },
      // 确认文案
      confirmText: {
        type: String,
        default: props$p.modal.confirmText
      },
      // 取消文案
      cancelText: {
        type: String,
        default: props$p.modal.cancelText
      },
      // 是否显示确认按钮
      showConfirmButton: {
        type: Boolean,
        default: props$p.modal.showConfirmButton
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: props$p.modal.showCancelButton
      },
      // 确认按钮颜色
      confirmColor: {
        type: String,
        default: props$p.modal.confirmColor
      },
      // 取消文字颜色
      cancelColor: {
        type: String,
        default: props$p.modal.cancelColor
      },
      // 对调确认和取消的位置
      buttonReverse: {
        type: Boolean,
        default: props$p.modal.buttonReverse
      },
      // 是否开启缩放效果
      zoom: {
        type: Boolean,
        default: props$p.modal.zoom
      },
      // 是否异步关闭，只对确定按钮有效
      asyncClose: {
        type: Boolean,
        default: props$p.modal.asyncClose
      },
      // 是否允许点击遮罩关闭modal
      closeOnClickOverlay: {
        type: Boolean,
        default: props$p.modal.closeOnClickOverlay
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
      negativeTop: {
        type: [String, Number],
        default: props$p.modal.negativeTop
      },
      // modal宽度，不支持百分比，可以数值，px，rpx单位
      width: {
        type: [String, Number],
        default: props$p.modal.width
      },
      // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
      confirmButtonShape: {
        type: String,
        default: props$p.modal.confirmButtonShape
      }
    }
  };
  const _sfc_main$a = {
    name: "u-modal",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        loading: false
      };
    },
    watch: {
      show(n) {
        if (n && this.loading)
          this.loading = false;
      }
    },
    emits: ["confirm", "cancel", "close"],
    methods: {
      // 点击确定按钮
      confirmHandler() {
        if (this.asyncClose) {
          this.loading = true;
        }
        this.$emit("confirm");
      },
      // 点击取消按钮
      cancelHandler() {
        this.$emit("cancel");
      },
      // 点击遮罩
      // 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
      // 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽有然遮罩，但是为了让弹窗内容能flex居中
      // 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
      // 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
      clickHandler() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$3);
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_2);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      mode: "center",
      zoom: _ctx.zoom,
      show: _ctx.show,
      customStyle: {
        borderRadius: "6px",
        overflow: "hidden",
        marginTop: `-${_ctx.$u.addUnit(_ctx.negativeTop)}`
      },
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      safeAreaInsetBottom: false,
      duration: 400,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: "u-modal",
            style: vue.normalizeStyle({
              width: _ctx.$u.addUnit(_ctx.width)
            })
          },
          [
            _ctx.title ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "u-modal__title"
              },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: "u-modal__content",
                style: vue.normalizeStyle({
                  paddingTop: `${_ctx.title ? 12 : 25}px`
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createElementVNode(
                    "text",
                    { class: "u-modal__content__text" },
                    vue.toDisplayString(_ctx.content),
                    1
                    /* TEXT */
                  )
                ], true)
              ],
              4
              /* STYLE */
            ),
            _ctx.$slots.confirmButton ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-modal__button-group--confirm-button"
            }, [
              vue.renderSlot(_ctx.$slots, "confirmButton", {}, void 0, true)
            ])) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createVNode(_component_u_line),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-modal__button-group",
                    style: vue.normalizeStyle({
                      flexDirection: _ctx.buttonReverse ? "row-reverse" : "row"
                    })
                  },
                  [
                    _ctx.showCancelButton ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: vue.normalizeClass(["u-modal__button-group__wrapper u-modal__button-group__wrapper--cancel", [_ctx.showCancelButton && !_ctx.showConfirmButton && "u-modal__button-group__wrapper--only-cancel"]]),
                        "hover-stay-time": 150,
                        "hover-class": "u-modal__button-group__wrapper--hover",
                        onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelHandler && $options.cancelHandler(...args))
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "u-modal__button-group__wrapper__text",
                            style: vue.normalizeStyle({
                              color: _ctx.cancelColor
                            })
                          },
                          vue.toDisplayString(_ctx.cancelText),
                          5
                          /* TEXT, STYLE */
                        )
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    _ctx.showConfirmButton && _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_u_line, {
                      key: 1,
                      direction: "column"
                    })) : vue.createCommentVNode("v-if", true),
                    _ctx.showConfirmButton ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        class: vue.normalizeClass(["u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm", [!_ctx.showCancelButton && _ctx.showConfirmButton && "u-modal__button-group__wrapper--only-confirm"]]),
                        "hover-stay-time": 150,
                        "hover-class": "u-modal__button-group__wrapper--hover",
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmHandler && $options.confirmHandler(...args))
                      },
                      [
                        $data.loading ? (vue.openBlock(), vue.createBlock(_component_u_loading_icon, { key: 0 })) : (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            class: "u-modal__button-group__wrapper__text",
                            style: vue.normalizeStyle({
                              color: _ctx.confirmColor
                            })
                          },
                          vue.toDisplayString(_ctx.confirmText),
                          5
                          /* TEXT, STYLE */
                        ))
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["zoom", "show", "customStyle", "closeOnClickOverlay", "onClick"]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-12b77a26"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-modal/u-modal.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        show: false,
        app: getApp(),
        titleList: [{
          name: "全部"
        }, {
          name: "待支付"
        }, {
          name: "待使用"
        }],
        active: 0,
        waitPayedList: [],
        waitUsedList: [],
        order_no: "",
        orderList: [],
        scrollViewHeight: ""
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.initData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      this.$nextTick(() => {
        this.calculate();
      });
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
        uni.navigateBack();
      },
      onChange(e) {
        this.active = e.index;
        if (this.active == 0)
          ;
        else if (this.active == 1)
          ;
        else
          ;
      },
      calculate() {
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let that = this;
        that.scrollViewHeight = screenHeight - 88;
      },
      toDetail(e) {
        let order_no = e.currentTarget.dataset.item.order_no;
        uni.navigateTo({
          url: "/pages/orderDetail/orderDetail?order_no=" + order_no
        });
      },
      cancel() {
        this.show = false;
      },
      confirm() {
        request({
          url: "wx/cancel/order",
          method: "POST",
          data: {
            order_no: this.order_no
          }
        }).then(() => {
          uni.showToast({
            title: "取消成功",
            icon: "none",
            duration: 2e3,
            success: () => {
              this.show = false;
              setTimeout(() => {
                this.initData();
              }, 2e3);
            }
          });
        });
      },
      toCancel(e) {
        this.show = true;
        this.order_no = e.currentTarget.dataset.item.order_no;
      },
      async initData() {
        let userInfo = await this.app.getUserInfo();
        request({
          url: "wx/get/order/list",
          method: "POST",
          data: {
            user_ouid: userInfo.ouid
          }
        }).then((res) => {
          let orderList = res.data.reverse();
          orderList.forEach((con) => {
            con.siteNum = con.site_detail ? con.site_detail.length : 0;
            let hour = 0;
            con.site_detail = con.site_detail ? con.site_detail : [];
            con.site_detail.forEach((content) => {
              hour = hour + content.time_enum.length;
            });
            con.hour = hour;
          });
          this.orderList = orderList;
          let waitPayedList = this.orderList.filter((item) => item.status == "N");
          let waitUsedList = this.orderList.filter((item) => item.status == "Y");
          this.waitPayedList = waitPayedList;
          this.waitUsedList = waitUsedList;
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_4);
    const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_2$3);
    const _component_u_empty = resolveEasycom(vue.resolveDynamicComponent("u-empty"), __easycom_3$2);
    const _component_van_dialog = vue.resolveComponent("van-dialog");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/orderList/orderList.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "我的订单",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_modal, {
            show: $data.show,
            title: "提示",
            content: "确定要取消此订单？",
            showCancelButton: true,
            onConfirm: $options.confirm,
            onCancel: $options.cancel
          }, null, 8, ["show", "onConfirm", "onCancel"]),
          vue.createVNode(_component_u_tabs, {
            class: "tabs",
            list: $data.titleList,
            onChange: $options.onChange,
            lineColor: "#0077FF",
            lineWidth: "40"
          }, null, 8, ["list", "onChange"]),
          $data.active == 0 ? (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 0,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.orderList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.orderList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无订单"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.orderList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "orderNoText" },
                          "订单编号： " + vue.toDisplayString(item.order_no),
                          1
                          /* TEXT */
                        ),
                        item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "redText"
                        }, "待支付")) : item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "blueText"
                        }, "待使用")) : item.status == "C" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 2,
                          class: "grayText"
                        }, "已取消")) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(` <view wx:elif="{{item.status == 'finished' || item.status == 'refunded'}}" class="grayText">\r
                            {{item.status == 'finished'?'已完成':'已退款'}}\r
                        </view> `)
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              src: item.shop_avatar,
                              mode: "",
                              class: "w-full h-full"
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "reservationInfo" },
                              "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode(
                          "view",
                          { class: "priceText" },
                          "￥ " + vue.toDisplayString(item.money / 100),
                          1
                          /* TEXT */
                        )
                      ]),
                      item.status == "C" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[0] || (_cache[0] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "查看详情", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[1] || (_cache[1] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", {
                          class: "payBtn",
                          onClick: _cache[2] || (_cache[2] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "去支付", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[3] || (_cache[3] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", {
                          class: "useBtn",
                          onClick: _cache[4] || (_cache[4] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "去使用", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "finished" || item.status == "refunded" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 3,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", { class: "borderBtn" }, "再次预定")
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          )) : $data.active == 1 ? (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 1,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.waitPayedList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.waitPayedList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无待支付订单"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.waitPayedList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "orderNoText" },
                          "订单编号： " + vue.toDisplayString(item.order_no),
                          1
                          /* TEXT */
                        ),
                        item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "redText"
                        }, "待支付")) : item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "blueText"
                        }, "待使用")) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(` <view wx:elif="{{item.status == 'finished' || item.status == 'refunded'}}" class="grayText">\r
                            {{item.status == 'finished'?'已完成':'已退款'}}\r
                        </view> `)
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              src: item.shop_avatar,
                              mode: "",
                              class: "w-full h-full"
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "reservationInfo" },
                              "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode(
                          "view",
                          { class: "priceText" },
                          "￥ " + vue.toDisplayString(item.money / 100),
                          1
                          /* TEXT */
                        )
                      ]),
                      item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[5] || (_cache[5] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", {
                          class: "payBtn",
                          onClick: _cache[6] || (_cache[6] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "去支付", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[7] || (_cache[7] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", {
                          class: "useBtn",
                          onClick: _cache[8] || (_cache[8] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "去使用", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "finished" || item.status == "refunded" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", { class: "borderBtn" }, "再次预定")
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 2,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.waitUsedList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.waitUsedList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无待使用订单"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.waitUsedList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      onClick: _cache[12] || (_cache[12] = (...args) => $options.toDetail && $options.toDetail(...args)),
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "orderNoText" },
                          "订单编号： " + vue.toDisplayString(item.order_no),
                          1
                          /* TEXT */
                        ),
                        item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "redText"
                        }, "待支付")) : item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "blueText"
                        }, "待使用")) : item.status == "finished" || item.status == "refunded" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 2,
                            class: "grayText"
                          },
                          vue.toDisplayString(item.status == "finished" ? "已完成" : "已退款"),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true)
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              src: item.shop_avatar,
                              mode: "",
                              class: "w-full h-full"
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "reservationInfo" },
                              "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        vue.createElementVNode(
                          "view",
                          { class: "priceText" },
                          "￥ " + vue.toDisplayString(item.money / 100),
                          1
                          /* TEXT */
                        )
                      ]),
                      item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[9] || (_cache[9] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", { class: "payBtn" }, "去支付")
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", {
                          class: "borderBtn",
                          onClick: _cache[10] || (_cache[10] = (...args) => $options.toCancel && $options.toCancel(...args)),
                          "data-item": item
                        }, "取消订单", 8, ["data-item"]),
                        vue.createElementVNode("view", {
                          class: "useBtn",
                          onClick: _cache[11] || (_cache[11] = (...args) => $options.toDetail && $options.toDetail(...args)),
                          "data-item": item
                        }, "去使用", 8, ["data-item"])
                      ])) : vue.createCommentVNode("v-if", true),
                      item.status == "finished" || item.status == "refunded" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "w-full flex align-center",
                        style: { "justify-content": "flex-end" }
                      }, [
                        vue.createElementVNode("view", { class: "borderBtn" }, "再次预定")
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          )),
          vue.createVNode(_component_van_dialog, { id: "van-dialog" })
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesOrderListOrderList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-1d51308d"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/orderList/orderList.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        app: getApp(),
        error: "",
        fileList: []
      };
    },
    methods: {
      onClickLeft() {
        uni.navigateBack();
      },
      // 上传问题相关图片
      afterRead(event) {
        const {
          file
        } = event;
        file.forEach((item) => {
          uni.uploadFile({
            url: this.app.globalData.uploadImgUrl,
            filePath: item.url,
            name: "file",
            success: (res) => {
              let fileList = this.fileList;
              fileList.push({
                url: this.app.globalData.httpUrl + JSON.parse(res.data).data
              });
              this.fileList = fileList;
            }
          });
        });
      },
      submit() {
        if (!this.error) {
          uni.showToast({
            title: "请输入反馈问题",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        let list = this.fileList;
        let photos = [];
        list.forEach((item) => {
          photos.push(item.url);
        });
        request({
          url: "wx/add/feedback",
          method: "POST",
          data: {
            user_ouid: this.app.globalData.userInfo.ouid,
            content: this.error,
            //反馈内容
            photo: photos
            //照片
          }
        }).then(() => {
          uni.showToast({
            title: "提交成功",
            icon: "none",
            duration: 2e3,
            success: () => {
              setTimeout(() => {
                uni.navigateBack();
              }, 2e3);
            }
          });
        });
      },
      deleteImg(event) {
        let fileList = this.fileList;
        fileList.splice(event.index, 1);
        this.fileList = fileList;
      },
      toFeedbackList() {
        uni.navigateTo({
          url: "/pages/feedbackList/feedbackList"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u__textarea = resolveEasycom(vue.resolveDynamicComponent("u--textarea"), __easycom_2$2);
    const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/errorReport/errorReport.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "意见反馈",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "errorBox" }, [
            vue.createElementVNode("view", { class: "describeBox" }, [
              vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                vue.createElementVNode("view", { style: { "margin-bottom": "20rpx" } }, "反馈问题"),
                vue.createCommentVNode(' <image src="../../static/images/mine/feedbackIcon.svg" bindtap="toFeedbackList"  style="width: 36rpx;height: 36rpx;" mode=""/> ')
              ]),
              vue.createVNode(_component_u__textarea, {
                modelValue: $data.error,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.error = $event),
                placeholder: "请输入..."
              }, null, 8, ["modelValue"])
            ]),
            vue.createElementVNode("view", { class: "uploadBox" }, [
              vue.createElementVNode("view", null, "上传问题相关图片"),
              vue.createElementVNode("view", { style: { "margin-top": "24rpx" } }, [
                vue.createVNode(_component_u_upload, {
                  fileList: $data.fileList,
                  onAfterRead: $options.afterRead,
                  onDelete: $options.deleteImg,
                  name: "1",
                  multiple: "",
                  maxCount: 9
                }, null, 8, ["fileList", "onAfterRead", "onDelete"])
              ]),
              vue.createElementVNode("view", { style: { "font-family": "Alibaba PuHuiTi 2", "font-size": "24rpx", "margin-top": "20rpx", "color": "#b1b4c3" } }, "最多9张 ")
            ]),
            vue.createElementVNode("button", {
              type: "info",
              class: "submitBtn",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.submit && $options.submit(...args))
            }, "提交")
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesFeedbackFeedback = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-a24b82f2"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/feedback/feedback.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        app: getApp(),
        show: false
      };
    },
    onLoad() {
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
      /**
       * 生命周期函数--监听页面加载
       */
      onClickLeft() {
        uni.navigateBack();
      },
      toAccountSecurity() {
        uni.navigateTo({
          url: "/pages/accountSecurity/accountSecurity"
        });
      },
      toUserAgreement() {
        uni.navigateTo({
          url: "/pages/userAgreement/userAgreement"
        });
      },
      toAboutUs() {
        uni.navigateTo({
          url: "/pages/aboutUs/aboutUs"
        });
      },
      toFeedBack() {
        uni.navigateTo({
          url: "/pages/feedback/feedback"
        });
      },
      logout() {
        this.show = true;
      },
      cancel() {
        this.show = false;
      },
      confirm() {
        this.show = false;
        this.app.logout();
      },
      clearCache() {
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_cell = resolveEasycom(vue.resolveDynamicComponent("u-cell"), __easycom_2$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/settings/settings.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "设置",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_cell_group, { "custom-class": "userinfo-group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_cell, {
                title: "账号与安全",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": "",
                onClick: $options.toAccountSecurity
              }, null, 8, ["onClick"]),
              vue.createVNode(_component_u_cell, {
                title: "用户协议",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": "",
                onClick: $options.toUserAgreement
              }, null, 8, ["onClick"]),
              vue.createVNode(_component_u_cell, {
                title: "隐私协议",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": ""
              })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "devide" }),
          vue.createVNode(_component_u_cell_group, { "custom-class": "userinfo-group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_cell, {
                title: "使用帮助",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": ""
              }),
              vue.createVNode(_component_u_cell, {
                title: "关于我们",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": "",
                onClick: $options.toAboutUs
              }, null, 8, ["onClick"]),
              vue.createVNode(_component_u_cell, {
                title: "意见反馈",
                center: "",
                "custom-class": "userinfo-cell",
                "is-link": "",
                onClick: $options.toFeedBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(' <view class="devide"></view>\r\n		<u-cell-group>\r\n			<u-cell title="清除缓存" center custom-class="userinfo-cell" @tap.native="clearCache">\r\n				<view class="clearRight">立即清除</view>\r\n			</u-cell>\r\n		</u-cell-group> '),
          vue.createElementVNode("view", {
            class: "logoutBtn flex align-center justify-center",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.logout && $options.logout(...args))
          }, "退出登录"),
          vue.createVNode(_component_u_modal, {
            show: $data.show,
            title: "提示",
            content: "确定要退出登录吗？",
            showCancelButton: true,
            onConfirm: $options.confirm,
            onCancel: $options.cancel
          }, null, 8, ["show", "onConfirm", "onCancel"])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesSettingsSettings = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-7fad0a1c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/settings/settings.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        app: getApp()
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
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
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/aboutUs/aboutUs.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "关于我们",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, " 我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。 ")
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesAboutUsAboutUs = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-d8855c81"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/aboutUs/aboutUs.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        app: getApp(),
        titleList: [{
          name: "全部"
        }, {
          name: "待使用"
        }, {
          name: "已使用"
        }],
        active: 0,
        waitUsedList: [],
        alreadyUsedList: [],
        reservationList: [],
        scrollViewHeight: "",
        j: "",
        con: {
          date: "",
          timeRange: ""
        }
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.initData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      this.$nextTick(() => {
        this.calculate();
      });
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
        uni.navigateBack();
      },
      toDetail(e) {
        let order_no = e.currentTarget.dataset.item.order_no;
        uni.navigateTo({
          url: "/pages/reservationInfo/reservationInfo?order_no=" + order_no
        });
      },
      onChange(e) {
        this.active = e.index;
        if (this.active == 0)
          ;
        else if (this.active == 1)
          ;
        else
          ;
      },
      calculate() {
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        this.scrollViewHeight = screenHeight - 88;
      },
      async initData() {
        let userInfo = await this.app.getUserInfo();
        request({
          url: "wx/get/my/reserve/list",
          method: "POST",
          data: {
            user_ouid: userInfo.ouid
          }
        }).then(async (res) => {
          let enumInfo = await this.app.getEnum();
          let reservationList = res.data.reverse();
          reservationList.forEach((con) => {
            let siteNum = 0;
            let hour = 0;
            let timeList = [];
            con.site_detail = con.site_detail ? con.site_detail : [];
            con.site_detail.forEach((content) => {
              siteNum = siteNum + 1;
              hour = content.time_enum.length + hour;
              content.time_enum.forEach((contentItem) => {
                timeList.push({
                  date: con.gmt_create,
                  timeRange: enumInfo[contentItem]
                });
              });
            });
            con.siteNum = siteNum;
            con.hour = hour;
            con.timeList = timeList;
          });
          this.reservationList = reservationList;
          let waitUsedList = this.reservationList.filter((item) => item.status == "Y");
          let alreadyUsedList = this.reservationList.filter((item) => item.status == "finished");
          this.waitUsedList = waitUsedList;
          this.alreadyUsedList = alreadyUsedList;
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_2$3);
    const _component_u_empty = resolveEasycom(vue.resolveDynamicComponent("u-empty"), __easycom_3$2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/orderList/orderList.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "我的预约",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_tabs, {
            class: "tabs",
            list: $data.titleList,
            onChange: $options.onChange,
            lineColor: "#0077FF",
            lineWidth: "40"
          }, null, 8, ["list", "onChange"]),
          $data.active == 0 ? (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 0,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.reservationList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.reservationList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无预约"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.reservationList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              class: "w-full h-full",
                              src: item.shop_avatar,
                              mode: ""
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", {
                            class: "flex flex-direction align-start justify-between",
                            style: { "height": "132rpx" }
                          }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "reservationInfo" },
                                "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "flex align-start" }, [
                                vue.createElementVNode("view", { class: "reservationInfo" }, "预约时间："),
                                vue.createElementVNode("view", { class: "flex flex-direction mutipleLine" }, [
                                  (vue.openBlock(true), vue.createElementBlock(
                                    vue.Fragment,
                                    null,
                                    vue.renderList(item.timeList, (con, j) => {
                                      return vue.openBlock(), vue.createElementBlock(
                                        "view",
                                        {
                                          class: "reservationInfo align-center",
                                          key: j
                                        },
                                        vue.toDisplayString(con.date) + " " + vue.toDisplayString(con.timeRange),
                                        1
                                        /* TEXT */
                                      );
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-end stateBox" }, [
                        item.status == "finished" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "redText"
                        }, "已使用")) : item.status == "Y" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "blueText"
                        }, "待使用")) : item.status == "N" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 2,
                          class: "redText"
                        }, "待支付")) : item.status == "C" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 3,
                          class: "grayText"
                        }, "已取消")) : vue.createCommentVNode("v-if", true)
                      ]),
                      vue.createElementVNode("view", {
                        class: "detailBox flex align-center",
                        onClick: _cache[0] || (_cache[0] = (...args) => $options.toDetail && $options.toDetail(...args)),
                        "data-item": item
                      }, [
                        vue.createTextVNode(" 查看预约 "),
                        vue.createElementVNode("image", {
                          src: "/static/images/mine/rightArrow.svg",
                          style: { "width": "28rpx", "height": "28rpx" },
                          mode: ""
                        })
                      ], 8, ["data-item"])
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          )) : $data.active == 1 ? (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 1,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.waitUsedList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.waitUsedList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无待使用预约"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.waitUsedList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              class: "w-full h-full",
                              src: item.shop_avatar,
                              mode: ""
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", {
                            class: "flex flex-direction align-start justify-between",
                            style: { "height": "132rpx" }
                          }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "reservationInfo" },
                                "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "flex align-start" }, [
                                vue.createElementVNode("view", { class: "reservationInfo" }, "预约时间："),
                                vue.createElementVNode("view", { class: "flex flex-direction mutipleLine" }, [
                                  (vue.openBlock(true), vue.createElementBlock(
                                    vue.Fragment,
                                    null,
                                    vue.renderList(item.timeList, (con, j) => {
                                      return vue.openBlock(), vue.createElementBlock(
                                        "view",
                                        {
                                          class: "reservationInfo align-center",
                                          key: j
                                        },
                                        vue.toDisplayString(con.date) + " " + vue.toDisplayString(con.timeRange),
                                        1
                                        /* TEXT */
                                      );
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-end stateBox" }, [
                        vue.createElementVNode("view", { class: "blueText" }, "待使用")
                      ]),
                      vue.createElementVNode("view", {
                        class: "detailBox flex align-center",
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.toDetail && $options.toDetail(...args)),
                        "data-item": item
                      }, [
                        vue.createTextVNode(" 查看预约 "),
                        vue.createElementVNode("image", {
                          src: "/static/images/mine/rightArrow.svg",
                          style: { "width": "28rpx", "height": "28rpx" },
                          mode: ""
                        })
                      ], 8, ["data-item"])
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "scroll-view",
            {
              key: 2,
              "scroll-y": true,
              class: vue.normalizeClass(["orderList", $data.alreadyUsedList.length == 0 ? "emptyFlex" : ""]),
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              $data.alreadyUsedList.length == 0 ? (vue.openBlock(), vue.createBlock(_component_u_empty, {
                key: 0,
                text: "暂无已使用预约"
              })) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.alreadyUsedList, (item, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "orderItem",
                      "data-item": item,
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center justify-between" }, [
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode("view", { class: "leftPhoto" }, [
                            vue.createElementVNode("image", {
                              class: "w-full h-full",
                              src: item.shop_avatar,
                              mode: ""
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", {
                            class: "flex flex-direction align-start justify-between",
                            style: { "height": "132rpx" }
                          }, [
                            vue.createElementVNode(
                              "view",
                              { class: "gymnasiumName" },
                              vue.toDisplayString(item.shop_name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "reservationInfo" },
                                "预约场地： " + vue.toDisplayString(item.siteNum) + "场(" + vue.toDisplayString(item.hour) + "小时） ",
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "view",
                                { class: "reservationInfo" },
                                "预约时间： " + vue.toDisplayString(item.reservationTime),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "flex align-center justify-end stateBox" }, [
                        vue.createElementVNode("view", { class: "redText" }, "已使用")
                      ]),
                      vue.createElementVNode("view", {
                        class: "detailBox flex align-center",
                        onClick: _cache[2] || (_cache[2] = (...args) => $options.toDetail && $options.toDetail(...args)),
                        "data-item": item
                      }, [
                        vue.createTextVNode(" 查看预约 "),
                        vue.createElementVNode("image", {
                          src: "/static/images/mine/rightArrow.svg",
                          style: { "width": "28rpx", "height": "28rpx" },
                          mode: ""
                        })
                      ], 8, ["data-item"])
                    ], 8, ["data-item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            6
            /* CLASS, STYLE */
          ))
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesReservationListReservationList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-9e63185c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationList/reservationList.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        app: getApp(),
        show: false,
        order_no: "",
        code: 812356,
        scrollViewHeight: 0,
        gymnasiumInfo: {
          name: "一家球馆",
          address: "中南金石国际广场",
          img: "/static/images/home/gymnasiumPhoto.png",
          sizteNo: 2,
          hour: 4,
          siteList: [
            {
              siteNo: 1,
              date: "08-08",
              startTime: "11:00",
              endTime: "14:00"
            },
            {
              siteNo: 1,
              date: "08-08",
              startTime: "11:00",
              endTime: "14:00"
            },
            {
              siteNo: 1,
              date: "08-08",
              startTime: "11:00",
              endTime: "14:00"
            }
          ],
          person: "哈哈",
          phone: "135****6936",
          createTime: "2023-08-08 12:23:36",
          status: "",
          siteNum: ""
        }
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.$nextTick(() => {
        this.getNavBarHeight();
      });
      if (options.order_no) {
        this.order_no = options.order_no;
      }
      this.initData();
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
      initData() {
        let enumInfo = this.app.globalData.enumInfo;
        request({
          url: "wx/get/reserve/detail",
          method: "POST",
          data: {
            order_no: this.order_no
          }
        }).then((res) => {
          let data = res.data;
          let site_detail = data.site_detail ? data.site_detail : [];
          let siteList = [];
          let hour = 0;
          let siteNum = site_detail ? site_detail.length : 0;
          site_detail.forEach((item) => {
            item.time_enum.forEach((con) => {
              siteList.push({
                siteName: item.site_name,
                date: data.gmt_create,
                startTime: enumInfo[con].split("~")[0],
                endTime: enumInfo[con].split("~")[1]
              });
              hour = hour + 1;
            });
          });
          this.gymnasiumInfo.name = data.shop_name;
          this.gymnasiumInfo.address = data.shop_address;
          this.gymnasiumInfo.img = data.shop_avatar;
          this.gymnasiumInfo.person = data.user_name;
          this.gymnasiumInfo.phone = data.user_phone;
          this.gymnasiumInfo.createTime = data.gmt_creat_order;
          this.gymnasiumInfo.siteList = siteList;
          this.gymnasiumInfo.siteNum = siteNum;
          this.gymnasiumInfo.hour = hour;
          this.gymnasiumInfo.status = data.status;
        });
      },
      toCancel() {
        this.show = true;
      },
      onClickLeft() {
        uni.navigateBack();
      },
      cancel() {
        this.show = false;
      },
      confirm() {
        request({
          url: "wx/cancel/order",
          method: "POST",
          data: {
            order_no: this.order_no
          }
        }).then((res) => {
          uni.showToast({
            title: "取消成功",
            icon: "none",
            duration: 2e3,
            success: () => {
              this.show = false;
              setTimeout(() => {
                this.initData();
              }, 2e3);
            }
          });
        });
      },
      getNavBarHeight() {
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let that = this;
        let query = uni.createSelectorQuery();
        query.select(".nav-bar").boundingClientRect((navRect) => {
          let query2 = uni.createSelectorQuery();
          query2.select(".bottomBox").boundingClientRect((bottomRect) => {
            that.scrollViewHeight = screenHeight - navRect.height - bottomRect.height;
          }).exec();
        }).exec();
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/reservationInfo/reservationInfo.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "预约信息",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-y": true,
              style: vue.normalizeStyle("height: " + ($data.scrollViewHeight + "px") + ";")
            },
            [
              vue.createElementVNode("view", { class: "codeBox flex flex-direction align-center justify-center" }, [
                vue.createElementVNode("image", {
                  src: "/static/images/order/codeDemo.png",
                  style: { "width": "296rpx", "height": "296rpx" },
                  mode: ""
                }),
                vue.createElementVNode(
                  "view",
                  { class: "codeText" },
                  vue.toDisplayString($data.code),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "gymnasiumBox flex align-center" }, [
                vue.createElementVNode("view", { class: "gymnasiumImg" }, [
                  vue.createElementVNode("image", {
                    class: "w-full h-full",
                    src: $data.gymnasiumInfo.img,
                    mode: ""
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "gymnasiumName" },
                    vue.toDisplayString($data.gymnasiumInfo.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "gymnasiumText" },
                    "场馆地址：" + vue.toDisplayString($data.gymnasiumInfo.address),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "gymnasiumText" },
                    "预约场地：" + vue.toDisplayString($data.gymnasiumInfo.siteNum) + "场(" + vue.toDisplayString($data.gymnasiumInfo.hour) + "小时)",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "siteBox" }, [
                vue.createElementVNode("view", { class: "siteBoxTitle" }, "预约场次"),
                vue.createElementVNode("view", { class: "siteListBox flex align-center flex-wrap" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.gymnasiumInfo.siteList, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "siteListItem flex flex-direction align-start",
                        key: index2
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "siteNo" },
                          vue.toDisplayString(item.siteName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "flex align-center" }, [
                          vue.createElementVNode(
                            "view",
                            { class: "dateBox" },
                            vue.toDisplayString(item.date),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "view",
                            { class: "timeRangeBox" },
                            vue.toDisplayString(item.startTime) + "-" + vue.toDisplayString(item.endTime),
                            1
                            /* TEXT */
                          )
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "personInfo" }, [
                vue.createElementVNode(
                  "view",
                  { style: { "margin-bottom": "18rpx" } },
                  "预约人：" + vue.toDisplayString($data.gymnasiumInfo.person),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { style: { "margin-bottom": "18rpx" } },
                  "手机号码：" + vue.toDisplayString($data.gymnasiumInfo.phone),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  null,
                  "创建时间：" + vue.toDisplayString($data.gymnasiumInfo.createTime),
                  1
                  /* TEXT */
                )
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "bottomBox flex align-center justify-end" }, [
            $data.gymnasiumInfo.status == "C" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "cancelBtn flex align-center justify-center"
            }, "已取消")) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "cancelBtn flex align-center justify-center",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.toCancel && $options.toCancel(...args))
            }, "取消预约"))
          ]),
          vue.createVNode(_component_u_modal, {
            show: $data.show,
            title: "提示",
            content: "确定要取消预约吗？",
            showCancelButton: true,
            onConfirm: $options.confirm,
            onCancel: $options.cancel
          }, null, 8, ["show", "onConfirm", "onCancel"])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesReservationInfoReservationInfo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-ba7f838c"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/reservationInfo/reservationInfo.vue"]]);
  const _sfc_main$3 = {
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
        uni.navigateBack();
      },
      calculate() {
        var that = this;
        var screenHeight = uni.getSystemInfoSync().windowHeight;
        let query = uni.createSelectorQuery();
        query.select(".nav-bar").boundingClientRect((res) => {
          that.scrollViewHeight = screenHeight - res.height - 20;
        }).exec();
      },
      initData(id) {
        request({
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_van_icon = vue.resolveComponent("van-icon");
    const _component_van_nav_bar = vue.resolveComponent("van-nav-bar");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/dataDetail/dataDetail.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_van_nav_bar, { class: "nav-bar" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", {
                slot: "left",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args))
              }, [
                vue.createVNode(_component_van_icon, {
                  name: "arrow-left",
                  size: "20px"
                })
              ]),
              vue.createElementVNode("view", {
                slot: "title",
                class: "pageTitle"
              }, "活动数据")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode(
            "scroll-view",
            {
              "scroll-y": true,
              style: vue.normalizeStyle("height: " + $data.scrollViewHeight + "px;")
            },
            [
              vue.createElementVNode("view", { class: "commonTitle" }, "活动数据"),
              vue.createElementVNode("view", { class: "flex align-center justify-around topBox" }, [
                vue.createElementVNode("view", { class: "flex-1 flex flex-direction align-center" }, [
                  vue.createElementVNode("view", { class: "topBoxTitle" }, "活动浏览量(PV)"),
                  vue.createElementVNode(
                    "view",
                    { class: "topBoxCon" },
                    vue.toDisplayString($data.pv),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "flex-1 flex flex-direction align-center" }, [
                  vue.createElementVNode("view", { class: "topBoxTitle" }, "独立访客数(UV)"),
                  vue.createElementVNode(
                    "view",
                    { class: "topBoxCon" },
                    vue.toDisplayString($data.uv),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "commonTitle" }, "报名名单"),
              $data.registrationList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.registrationList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "listItem flex align-center justify-between",
                      key: index2
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center" }, [
                        vue.createElementVNode("image", {
                          src: item.avatar,
                          mode: "",
                          style: { "width": "50px", "height": "50px", "border-radius": "50%", "margin-right": "5px" }
                        }, null, 8, ["src"]),
                        vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                          vue.createElementVNode("view", { class: "flex align-center" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "nameText" },
                              vue.toDisplayString(item.name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("image", {
                              style: { "width": "18px", "height": "18px", "margin-left": "4px" },
                              src: item.sex == 1 ? "../../static/images/mine/boyIcon.svg" : "../../static/images/mine/girlIcon.svg",
                              mode: ""
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode(
                            "view",
                            { class: "amountText" },
                            "男： " + vue.toDisplayString(item.man_count) + " 女： " + vue.toDisplayString(item.woman_count),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { class: "successText" }, "已报名")
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "flex align-center justify-center emptyText"
              }, "暂无报名")),
              vue.createElementVNode("view", { class: "commonTitle" }, "候选名单"),
              $data.waitingList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.waitingList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "listItem flex align-center justify-between",
                      key: index2
                    }, [
                      vue.createElementVNode("view", { class: "flex align-center" }, [
                        vue.createElementVNode("image", {
                          src: item.avatar,
                          mode: "",
                          style: { "width": "50px", "height": "50px", "border-radius": "50%", "margin-right": "5px" }
                        }, null, 8, ["src"]),
                        vue.createElementVNode("view", { class: "flex flex-direction align-start" }, [
                          vue.createElementVNode("view", { class: "flex align-center" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "nameText" },
                              vue.toDisplayString(item.name),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("image", {
                              style: { "width": "18px", "height": "18px", "margin-left": "4px" },
                              src: item.sex == 1 ? "../../static/images/mine/boyIcon.svg" : "../../static/images/mine/girlIcon.svg",
                              mode: ""
                            }, null, 8, ["src"])
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { class: "successText" }, "候选")
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 3,
                class: "flex align-center justify-center emptyText"
              }, "暂无候选"))
            ],
            4
            /* STYLE */
          )
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesDataDetailDataDetail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-3b44c5b1"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/dataDetail/dataDetail.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        accountNo: "163987",
        phone: "",
        status: "已绑定",
        show: false,
        app: getApp(),
        userInfo: null
      };
    },
    async onLoad() {
      let userInfo = await this.app.getUserInfo();
      this.userInfo = userInfo;
      this.phone = userInfo.phone;
    },
    methods: {
      onClickLeft() {
        uni.navigateBack();
      },
      logOff() {
        this.show = true;
      },
      cancel() {
        this.show = false;
      },
      confirm() {
        this.show = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    const _component_u_cell = resolveEasycom(vue.resolveDynamicComponent("u-cell"), __easycom_2$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" pages/accountSecurity/accountSecurity.wxml "),
        vue.createElementVNode("view", { class: "page" }, [
          vue.createVNode(_component_u_navbar, {
            class: "nav-bar",
            title: "账号与安全",
            safeAreaInsetTop: true,
            autoBack: false,
            fixed: false
          }, {
            left: vue.withCtx(() => [
              vue.createVNode(_component_up_icon, {
                name: "arrow-left",
                onClick: $data.app.toBack
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_cell_group, { "custom-class": "userinfo-group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_cell, {
                title: "氢羽号",
                center: "",
                value: $data.accountNo,
                "custom-class": "userinfo-cell"
              }, null, 8, ["value"]),
              vue.createVNode(_component_u_cell, {
                title: "手机号",
                value: $data.phone,
                center: "",
                "custom-class": "userinfo-cell"
              }, null, 8, ["value"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(' <view class="logOffBtn flex align-center justify-center" @click="logOff">注销账号</view> '),
          vue.createVNode(_component_u_modal, {
            show: $data.show,
            title: "提示",
            content: "确定要注销账号吗？",
            showCancelButton: true,
            onConfirm: $options.confirm,
            onCancel: $options.cancel
          }, null, 8, ["show", "onConfirm", "onCancel"])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesAccountSecurityAccountSecurity = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-ee0a2e80"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/accountSecurity/accountSecurity.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        app: getApp()
      };
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_up_icon = resolveEasycom(vue.resolveDynamicComponent("up-icon"), __easycom_0$7);
    const _component_u_navbar = resolveEasycom(vue.resolveDynamicComponent("u-navbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_u_navbar, {
        class: "nav-bar",
        safeAreaInsetTop: true,
        fixed: false,
        title: "用户协议",
        autoBack: false
      }, {
        left: vue.withCtx(() => [
          vue.createVNode(_component_up_icon, {
            name: "arrow-left",
            onClick: $data.app.toBack
          }, null, 8, ["onClick"])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", null, " 欢迎您使用服务（以下简称：本服务）请您仔细阅读下方条款，若您对本协议的任何条款有异议，您可以第一时间选择不进入。 "),
        vue.createElementVNode("view", { class: "title" }, "使用规则"),
        vue.createElementVNode("view", null, " 1.用户登录成功后，将给予每个用户一个可以收藏文章的个人中心。 2.用户需对信息的真实性，合法性，邮箱性承担全部责任，用不得冒充他人。 ")
      ])
    ]);
  }
  const PagesUserAgreementUserAgreement = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-96203526"], ["__file", "C:/project/轻羽项目/qingyu-client/pages/userAgreement/userAgreement.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/arrgement/arrgement", PagesArrgementArrgement);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/reservation/reservation", PagesReservationReservation);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/gymnasiumInfo/gymnasiumInfo", PagesGymnasiumInfoGymnasiumInfo);
  __definePage("pages/album/album", PagesAlbumAlbum);
  __definePage("pages/errorReport/errorReport", PagesErrorReportErrorReport);
  __definePage("pages/reservationDetail/reservationDetail", PagesReservationDetailReservationDetail);
  __definePage("pages/orderDetail/orderDetail", PagesOrderDetailOrderDetail);
  __definePage("pages/infoEdit/infoEdit", PagesInfoEditInfoEdit);
  __definePage("pages/orderList/orderList", PagesOrderListOrderList);
  __definePage("pages/feedback/feedback", PagesFeedbackFeedback);
  __definePage("pages/settings/settings", PagesSettingsSettings);
  __definePage("pages/aboutUs/aboutUs", PagesAboutUsAboutUs);
  __definePage("pages/reservationList/reservationList", PagesReservationListReservationList);
  __definePage("pages/reservationInfo/reservationInfo", PagesReservationInfoReservationInfo);
  __definePage("pages/dataDetail/dataDetail", PagesDataDetailDataDetail);
  __definePage("pages/accountSecurity/accountSecurity", PagesAccountSecurityAccountSecurity);
  __definePage("pages/userAgreement/userAgreement", PagesUserAgreementUserAgreement);
  const _sfc_main = {
    globalData: {
      httpUrl: "http://172.16.7.99:8002/",
      // httpUrl: 'http://172.16.8.5:8002/',
      uploadAvatarUrl: "http://172.16.7.99:8002/common/upload/avatar",
      uploadImgUrl: "http://172.16.7.99:8002/common/upload/photo",
      iconObj: {
        "培训": "/static/images/common/training.svg",
        "停车场": "/static/images/common/park.svg",
        "VIP": "/static/images/common/VIP.svg",
        "wifi": "/static/images/common/WIFI.svg",
        "商店": "/static/images/common/shop.svg",
        "淋浴房": "/static/images/common/shower.svg",
        "储物柜": "/static/images/common/storageCabinet.svg",
        "24小时": "/static/images/common/allDay.svg",
        "茶水间": "/static/images/common/tea.svg",
        "餐饮": "/static/images/common/food.svg",
        "洗手间": "/static/images/common/toilet.svg",
        "空调": "/static/images/common/air-conditioning.svg"
      },
      userInfo: {
        longitude: "",
        //经度
        latitude: "",
        //纬度
        ouid: "",
        //用户ouid
        avatar: "",
        //头像
        birthday: "",
        //生日
        name: "",
        //昵称
        phone: "",
        //手机号
        sex: "",
        //性别
        total_count: "",
        //运动次数
        total_length: "",
        //运动时长
        sport_day: ""
        //运动天数
      },
      enumInfo: {},
      gymnasiumInfo: {}
    },
    methods: {
      getLocation() {
        var that = this;
        uni.getLocation({
          type: "wgs84",
          success: function(res) {
            that.userInfo.latitude = res.latitude;
            that.userInfo.longitude = res.longitude;
          }
        });
      },
      checkVersion() {
        const miniProgram = uni.getAccountInfoSync();
        var versionNumber = miniProgram.miniProgram.version;
        let storageVersionNumber = uni.getStorageSync("version_number");
        if (!storageVersionNumber) {
          uni.setStorageSync("version_number", versionNumber);
        }
        if (!storageVersionNumber || storageVersionNumber != versionNumber) {
          const updateManager = uni.getUpdateManager();
          updateManager.onUpdateReady(function() {
            uni.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onCheckForUpdate(function(res) {
            const miniProgram2 = uni.getAccountInfoSync();
            var versionNumber2 = miniProgram2.miniProgram.version;
            uni.setStorageSync("version_number", versionNumber2);
          });
        }
      },
      toShare() {
        uni.onAppRoute((res) => {
          let pages2 = getCurrentPages();
          let view = pages2[pages2.length - 1];
          if (view) {
            uni.showShareMenu({
              menus: ["shareAppMessage", "shareTimeline"],
              success(res2) {
              },
              fail(e) {
              }
            });
          }
        });
      },
      // 获取用户信息
      getUserInfo() {
        return new Promise((resolve, reject) => {
          let userInfo = uni.getStorageSync("userInfo");
          userInfo = userInfo ? JSON.parse(userInfo) : "";
          if (userInfo) {
            this.globalData.userInfo = userInfo;
            uni.setStorageSync("userInfo", JSON.stringify(userInfo));
            resolve(userInfo);
            return;
          }
          uni.request({
            url: this.globalData.httpUrl + "wx/get/user/info",
            method: "POST",
            data: {
              user_ouid: this.globalData.userInfo.ouid
            },
            header: {
              "content-type": "application/json"
            },
            success: (res) => {
              if (res.statusCode == 200) {
                let userInfo2 = res.data.data;
                this.globalData.userInfo.avatar = userInfo2.avatar;
                this.globalData.userInfo.birthday = userInfo2.birthday;
                this.globalData.userInfo.name = userInfo2.name;
                this.globalData.userInfo.phone = userInfo2.phone;
                this.globalData.userInfo.sex = userInfo2.sex;
                this.globalData.userInfo.total_count = userInfo2.total_count;
                this.globalData.userInfo.total_length = userInfo2.total_length;
                this.globalData.userInfo.sport_day = userInfo2.sport_day;
                this.globalData.userInfo.introduce = userInfo2.introduce;
                uni.removeStorageSync("userInfo");
                uni.setStorageSync("userInfo", JSON.stringify(this.globalData.userInfo));
                resolve(userInfo2);
              }
            }
          });
        });
      },
      // 获取门店信息
      getStoreInfo(type = "") {
        return new Promise((resolve, reject) => {
          let storeInfo = uni.getStorageSync("gymnasiumInfo");
          if (storeInfo && !type) {
            storeInfo = JSON.parse(storeInfo);
            this.globalData.gymnasiumInfo = storeInfo;
            resolve(storeInfo);
            return false;
          }
          uni.request({
            url: this.globalData.httpUrl + "wx/get/shop/detail",
            method: "POST"
          }).then((res) => {
            let tag = res.data.data.tag;
            let tagList = [];
            tag.forEach((item) => {
              tagList.push({
                text: item,
                icon: this.globalData.iconObj[item] ? this.globalData.iconObj[item] : ""
              });
            });
            let gymnasiumInfo = {};
            gymnasiumInfo.gymnasiumName = res.data.data.shop_name;
            gymnasiumInfo.latitude = res.data.data.latitude;
            gymnasiumInfo.longitude = res.data.data.longitude;
            gymnasiumInfo.phone = res.data.data.shop_phone;
            gymnasiumInfo.location = res.data.data.shop_address;
            gymnasiumInfo.businessHours = res.data.data.work_time;
            gymnasiumInfo.facility = res.data.data.facility;
            gymnasiumInfo.serve = res.data.data.serve;
            gymnasiumInfo.hardwareFacilities = tagList;
            let gymnasiumImgList = [];
            let list = JSON.parse(res.data.data.shop_photo);
            list.forEach((item) => {
              gymnasiumImgList.push(this.globalData.httpUrl + item);
            });
            gymnasiumInfo.gymnasiumImgList = gymnasiumImgList;
            this.globalData.gymnasiumInfo = gymnasiumInfo;
            uni.setStorageSync("gymnasiumInfo", JSON.stringify(gymnasiumInfo));
            resolve(gymnasiumInfo);
          });
        });
      },
      // 退出登录
      logout() {
        this.globalData.userInfo = {
          longitude: "",
          latitude: "",
          ouid: ""
        };
        uni.removeStorageSync("userInfo");
        uni.removeStorageSync("gymnasiumInfo");
        uni.removeStorageSync("tabbarIndex");
        uni.removeStorageSync("album");
        uni.reLaunch({
          url: "/pages/login/login"
        });
      },
      // 获取枚举信息
      getEnum() {
        return new Promise((resolve, reject) => {
          let enumInfo = uni.getStorageSync("enumInfo");
          enumInfo = enumInfo ? JSON.parse(enumInfo) : "";
          if (enumInfo) {
            this.globalData.enumInfo = enumInfo;
            uni.setStorageSync("enumInfo", JSON.stringify(enumInfo));
            resolve(enumInfo);
            return false;
          }
          uni.request({
            url: this.globalData.httpUrl + "common/get/enum",
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if (res.statusCode == 200) {
                this.globalData.enumInfo = res.data.data.time_enum;
                uni.setStorageSync("enumInfo", JSON.stringify(this.globalData.enumInfo));
                resolve(res.data.data.time_enum);
              }
            }
          });
        });
      },
      // 返回
      toBack() {
        let canNavBack = getCurrentPages();
        if (canNavBack && canNavBack.length > 1) {
          uni.navigateBack();
        } else {
          history.back();
        }
      }
    },
    onLaunch: function() {
      this.getEnum();
      formatAppLog("log", "at App.vue:259", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:262", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:265", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/project/轻羽项目/qingyu-client/App.vue"]]);
  const { toString } = Object.prototype;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  function deepMerge$1() {
    const result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge$1(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge$1({}, val);
      } else {
        result[key] = val;
      }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url2, params) {
    if (!params) {
      return url2;
    }
    let serializedParams;
    if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts = [];
      forEach(params, (val, key) => {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach(val, (v) => {
          if (isDate(v)) {
            v = v.toISOString();
          } else if (isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(`${encode(key)}=${encode(v)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function settle(resolve, reject, response) {
    const { validateStatus } = response.config;
    const status = response.statusCode;
    if (status && (!validateStatus || validateStatus(status))) {
      resolve(response);
    } else {
      reject(response);
    }
  }
  const mergeKeys$1 = (keys, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
    return config3;
  };
  const adapter = (config2) => new Promise((resolve, reject) => {
    const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
    const _config = {
      url: fullPath,
      header: config2.header,
      complete: (response) => {
        config2.fullPath = fullPath;
        response.config = config2;
        try {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e) {
        }
        settle(resolve, reject, response);
      }
    };
    let requestTask;
    if (config2.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      const otherConfig = {
        filePath: config2.filePath,
        name: config2.name
      };
      const optionalKeys = [
        "files",
        "timeout",
        "formData"
      ];
      requestTask = uni.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
    } else if (config2.method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        _config.timeout = config2.timeout;
      }
      requestTask = uni.downloadFile(_config);
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      requestTask = uni.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
    }
    if (config2.getTask) {
      config2.getTask(requestTask, config2);
    }
  });
  const dispatchRequest = (config2) => adapter(config2);
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach2(fn) {
    this.handlers.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  };
  const mergeKeys = (keys, globalsConfig, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      } else if (!isUndefined(globalsConfig[prop])) {
        config3[prop] = globalsConfig[prop];
      }
    });
    return config3;
  };
  const mergeConfig = (globalsConfig, config2 = {}) => {
    const method = config2.method || globalsConfig.method || "GET";
    let config3 = {
      baseURL: globalsConfig.baseURL || "",
      method,
      url: config2.url || "",
      params: config2.params || {},
      custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
      header: deepMerge$1(globalsConfig.header || {}, config2.header || {})
    };
    const defaultToConfig2Keys = ["getTask", "validateStatus"];
    config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
    if (method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        config3.timeout = config2.timeout;
      } else if (!isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else if (method === "UPLOAD") {
      delete config3.header["content-type"];
      delete config3.header["Content-Type"];
      const uploadKeys = [
        "files",
        "filePath",
        "name",
        "timeout",
        "formData"
      ];
      uploadKeys.forEach((prop) => {
        if (!isUndefined(config2[prop])) {
          config3[prop] = config2[prop];
        }
      });
      if (isUndefined(config3.timeout) && !isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else {
      const defaultsKeys = [
        "data",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
    }
    return config3;
  };
  const defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: true,
    firstIpv4: false,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  var clone = function() {
    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_) {
      nativePromise = function() {
      };
    }
    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto2;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone2.__isArray(parent2)) {
          child = [];
        } else if (clone2.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone2.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.from) {
            child = Buffer.from(parent2);
          } else {
            child = new Buffer(parent2.length);
            parent2.copy(child);
          }
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto2 = Object.getPrototypeOf(parent2);
            child = Object.create(proto2);
          } else {
            child = Object.create(prototype);
            proto2 = prototype;
          }
        }
        if (circular) {
          var index2 = allParents.indexOf(parent2);
          if (index2 != -1) {
            return allChildren[index2];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i);
          if (attrs) {
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          } catch (e) {
            if (e instanceof TypeError) {
              continue;
            } else if (e instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            Object.defineProperty(child, symbol, descriptor);
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i = 0; i < allPropertyNames.length; i++) {
            var propertyName = allPropertyNames[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, descriptor);
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c = function() {
      };
      c.prototype = parent;
      return new c();
    };
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o) {
      return typeof o === "object" && __objToStr(o) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o) {
      return typeof o === "object" && __objToStr(o) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o) {
      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
      var flags = "";
      if (re.global)
        flags += "g";
      if (re.ignoreCase)
        flags += "i";
      if (re.multiline)
        flags += "m";
      return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
  }();
  class Request {
    /**
    * @param {Object} arg - 全局配置
    * @param {String} arg.baseURL - 全局根路径
    * @param {Object} arg.header - 全局header
    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
    * @param {String} arg.dataType = [json] - 全局默认的dataType
    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
    * @param {Object} arg.custom - 全局默认的自定义参数
    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
    */
    constructor(arg = {}) {
      if (!isPlainObject(arg)) {
        arg = {};
        formatAppLog("warn", "at node_modules/uview-plus/libs/luch-request/core/Request.js:39", "设置全局参数必须接收一个Object");
      }
      this.config = clone({ ...defaults, ...arg });
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */
    setConfig(f) {
      this.config = f(this.config);
    }
    middleware(config2) {
      config2 = mergeConfig(this.config, config2);
      const chain = [dispatchRequest, void 0];
      let promise2 = Promise.resolve(config2);
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise2 = promise2.then(chain.shift(), chain.shift());
      }
      return promise2;
    }
    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
    request(config2 = {}) {
      return this.middleware(config2);
    }
    get(url2, options = {}) {
      return this.middleware({
        url: url2,
        method: "GET",
        ...options
      });
    }
    post(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "POST",
        ...options
      });
    }
    put(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "PUT",
        ...options
      });
    }
    delete(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "DELETE",
        ...options
      });
    }
    options(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "OPTIONS",
        ...options
      });
    }
    upload(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "UPLOAD";
      return this.middleware(config2);
    }
    download(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "DOWNLOAD";
      return this.middleware(config2);
    }
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = uni.$u.queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = uni.$u.deepMerge(this.config, options);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig2.url === uni.$u.page())
        return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = uni.$u.deepMerge(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha) {
    color2 = rgbToHex(color2);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = String(color2).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return `rgba(${sColorChange.join(",")},${alpha})`;
    }
    return sColor;
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range: range$1,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at node_modules/uview-plus/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (test.number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = "") {
    if (!unit) {
      unit = uni.$u.config.unit || "px";
    }
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    const o = test.array(obj) ? [] : {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (source[prop] == null) {
          target[prop] = source[prop];
        } else if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = deepMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function error(err) {
    {
      formatAppLog("error", "at node_modules/uview-plus/libs/function/index.js:240", `uView提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else {
      date2 = new Date(
        typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
      );
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = uni.$u.$parent.call(instance, "u-form-item");
    const form = uni.$u.$parent.call(instance, "u-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    const pages2 = getCurrentPages();
    return `/${pages2[pages2.length - 1].route || ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function setConfig({
    props: props2 = {},
    config: config2 = {},
    color: color2 = {},
    zIndex: zIndex2 = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$u;
    uni.$u.config = deepMerge2(uni.$u.config, config2);
    uni.$u.props = deepMerge2(uni.$u.props, props2);
    uni.$u.color = deepMerge2(uni.$u.color, color2);
    uni.$u.zIndex = deepMerge2(uni.$u.zIndex, zIndex2);
  }
  const index = {
    range,
    getPx,
    sleep,
    os,
    sys,
    random,
    guid,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge,
    error,
    randomArray,
    timeFormat,
    timeFrom,
    trim,
    queryParams,
    toast,
    type2icon,
    priceFormat,
    getDuration,
    padZero,
    formValidate,
    getProperty,
    setProperty,
    page,
    pages,
    setConfig
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  let platform = "none";
  platform = "vue3";
  platform = "plus";
  const platform$1 = platform;
  const $u = {
    route,
    date: index.timeFormat,
    // 另名date
    colorGradient: colorGradient$1.colorGradient,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    colorToRgba: colorGradient$1.colorToRgba,
    test,
    type: ["primary", "success", "error", "warning", "info"],
    http: new Request(),
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props: props$p,
    ...index,
    color,
    platform: platform$1
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.config.globalProperties.$u = $u;
    Vue2.config.globalProperties.$nextTick = (cb) => {
      cb();
    };
    Vue2.mixin(mixin);
  };
  const uviewPlus = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uviewPlus);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
