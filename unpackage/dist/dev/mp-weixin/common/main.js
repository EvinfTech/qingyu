(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{0:function(t,a,e){"use strict";(function(t,a){var n=e(4),o=n(e(11));e(26);var r=n(e(27)),u=n(e(25));e(33);var i=n(e(34));function c(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,n)}return e}function s(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?c(Object(e),!0).forEach((function(a){(0,o.default)(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}t.__webpack_require_UNI_MP_PLUGIN__=e,u.default.use(i.default),u.default.config.productionTip=!1,r.default.mpType="app";var l=new u.default(s({},r.default));a(l).$mount()}).call(this,e(1)["default"],e(2)["createApp"])},27:function(t,a,e){"use strict";e.r(a);var n=e(28);for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e(30);var r,u,i,c,s=e(32),l=Object(s["default"])(n["default"],r,u,!1,null,null,null,!1,i,c);l.options.__file="App.vue",a["default"]=l.exports},28:function(t,a,e){"use strict";e.r(a);var n=e(29),o=e.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(r);a["default"]=o.a},29:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={globalData:{httpUrl:"https://qingyu.evinf.cn/",uploadAvatarUrl:"https://qingyu.evinf.cn/common/upload/avatar",uploadImgUrl:"https://qingyu.evinf.cn/common/upload/photo",userInfo:{longitude:"",latitude:"",ouid:"",avatar:"",birthday:"",name:"",phone:"",sex:"",total_count:"",total_length:"",sport_day:"",memberType:"",balance:""},enumInfo:{},gymnasiumInfo:{},aboutUs:"",agreement:"",officialAppId:""},methods:{getLocation:function(){var a=this;t.getLocation({type:"wgs84",success:function(t){a.userInfo.latitude=t.latitude,a.userInfo.longitude=t.longitude}})},checkVersion:function(){var a=t.getAccountInfoSync(),e=a.miniProgram.version,n=t.getStorageSync("version_number");if(n||t.setStorageSync("version_number",e),!n||n!=e){var o=t.getUpdateManager();o.onUpdateReady((function(){t.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&o.applyUpdate()}})})),o.onCheckForUpdate((function(a){var e=t.getAccountInfoSync(),n=e.miniProgram.version;t.setStorageSync("version_number",n)}))}},toShare:function(){t.onAppRoute((function(a){var e=getCurrentPages(),n=e[e.length-1];n&&t.showShareMenu({menus:["shareAppMessage","shareTimeline"],success:function(t){},fail:function(t){}})}))},getUserInfo:function(){var a=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new Promise((function(n,o){var r=t.getStorageSync("userInfo");if(r=r?JSON.parse(r):"",r&&!e)return a.globalData.userInfo=r,t.setStorageSync("userInfo",JSON.stringify(r)),n(r),!1;t.request({url:a.globalData.httpUrl+"wx/get/user/info",method:"POST",data:{user_ouid:a.globalData.userInfo.ouid?a.globalData.userInfo.ouid:r.ouid},header:{"content-type":"application/json"},success:function(e){if(200==e.statusCode){var o=e.data.data;o.avatar=a.globalData.httpUrl+o.avatar,o.balance=o.balance/100,a.globalData.userInfo=o,t.removeStorageSync("userInfo"),t.setStorageSync("userInfo",JSON.stringify(a.globalData.userInfo)),n(a.globalData.userInfo)}}})}))},getCommonInfo:function(){var a=this;return new Promise((function(e,n){t.request({url:a.globalData.httpUrl+"wx/get/agreement/about",method:"POST"}).then((function(t){var a=t.data.data;e(a)}))}))},getStoreInfo:function(){var a=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new Promise((function(n,o){var r=t.getStorageSync("gymnasiumInfo");if(r&&!e)return r=JSON.parse(r),a.globalData.gymnasiumInfo=r,n(r),!1;t.request({url:a.globalData.httpUrl+"wx/get/shop/detail",method:"POST"}).then((function(e){var o=e.data.data.tag?e.data.data.tag:[],r=[];o.forEach((function(t){r.push({text:t,icon:a.globalData.iconObj[t]?a.globalData.iconObj[t]:""})}));var u={};u.gymnasiumName=e.data.data.shop_name,u.latitude=e.data.data.latitude,u.longitude=e.data.data.longitude,u.phone=e.data.data.shop_phone,u.location=e.data.data.shop_address,u.businessHours=e.data.data.work_time,u.facility=e.data.data.facility,u.serve=e.data.data.serve,u.hardwareFacilities=r,u.shop_avatar=a.globalData.httpUrl+e.data.data.shop_avatar,u.desc=e.data.data.desc;var i=[],c=JSON.parse(e.data.data.shop_photo);c.forEach((function(t){i.push(a.globalData.httpUrl+t)})),u.gymnasiumImgList=i,a.globalData.gymnasiumInfo=u,t.setStorageSync("gymnasiumInfo",JSON.stringify(u)),n(u)}))}))},getEnum:function(){var a=this;return new Promise((function(e,n){var o=t.getStorageSync("enumInfo");if(o=o?JSON.parse(o):"",o)return a.globalData.enumInfo=o,t.setStorageSync("enumInfo",JSON.stringify(o)),e(o),!1;t.request({url:a.globalData.httpUrl+"common/get/enum",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){200==n.statusCode&&(a.globalData.enumInfo=n.data.data.time_enum,t.setStorageSync("enumInfo",JSON.stringify(a.globalData.enumInfo)),e(n.data.data.time_enum))}})}))},toBack:function(a){var e=getCurrentPages();e&&e.length>1?t.navigateBack({delta:a||1}):history.back()},logout:function(){this.globalData.userInfo={longitude:"",latitude:"",ouid:""},t.removeStorageSync("userInfo"),t.removeStorageSync("gymnasiumInfo"),t.removeStorageSync("tabbarIndex"),t.removeStorageSync("weixinCallback"),t.removeStorageSync("album"),t.reLaunch({url:"/pages/login/login"})}},onLaunch:function(){this.getEnum(),this.checkVersion(),console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};a.default=e}).call(this,e(2)["default"])},30:function(t,a,e){"use strict";e.r(a);var n=e(31),o=e.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(r);a["default"]=o.a},31:function(t,a,e){}},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map