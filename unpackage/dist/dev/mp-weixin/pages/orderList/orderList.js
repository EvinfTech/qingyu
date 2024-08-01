(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderList"],{226:function(e,t,n){"use strict";(function(e,t){var r=n(4);n(26);r(n(25));var i=r(n(227));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},227:function(e,t,n){"use strict";n.r(t);var r=n(228),i=n(230);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n(232);var o,s=n(32),c=Object(s["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,"40959460",null,!1,r["components"],o);c.options.__file="pages/orderList/orderList.vue",t["default"]=c.exports},228:function(e,t,n){"use strict";n.r(t);var r=n(229);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},229:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return r}));try{r={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-navbar/u-navbar")]).then(n.bind(null,357))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,330))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,365))},uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,423))},uEmpty:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(n.bind(null,431))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement,n=(e._self._c,0==e.active?e.orderList.length:null),r=0==e.active?e.orderList.length:null,i=0!=e.active&&1==e.active?e.waitPayedList.length:null,a=0!=e.active&&1==e.active?e.waitPayedList.length:null,o=0!=e.active&&1!=e.active?e.waitUsedList.length:null,s=0!=e.active&&1!=e.active?e.waitUsedList.length:null;e.$mp.data=Object.assign({},{$root:{g0:n,g1:r,g2:i,g3:a,g4:o,g5:s}})},a=!1,o=[];i._withStripped=!0},230:function(e,t,n){"use strict";n.r(t);var r=n(231),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=i.a},231:function(e,t,n){"use strict";(function(e){var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n(56)),a=r(n(58)),o=n(170),s=r(n(215)),c=function(){Promise.all([n.e("common/vendor"),n.e("components/paymentMethod")]).then(function(){return resolve(n(373))}.bind(null,n)).catch(n.oe)},u={components:{PaymentMethod:c},mixins:[s.default],data:function(){return{show:!1,app:null,titleList:[{name:"全部"},{name:"待支付"},{name:"待使用"}],active:0,waitPayedList:[],waitUsedList:[],order_no:"",orderList:[],scrollViewHeight:"",searchInfo:{pageObj:{firstPage:1,secondPage:1,thirdPage:1},size:10,status:""},triggered:!1,triggered1:!1,triggered2:!1,showPop:!1,payMoney:0}},onShow:function(){return(0,a.default)(i.default.mark((function e(){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},onLoad:function(){this.app=getApp(),this.initData()},onReady:function(){var e=this;this.$nextTick((function(){e.calculate()}))},methods:{toBack:function(){this.app.toBack()},onChange:function(e){switch(this.active=e.index,e.index){case 0:this.searchInfo.status="";break;case 1:this.searchInfo.status="N",0==this.waitPayedList.length&&this.initData();break;case 2:this.searchInfo.status="Y",0==this.waitUsedList.length&&this.initData();break}},calculate:function(){var t=e.getSystemInfoSync(),n=t.windowHeight;this.scrollViewHeight=n-88-t.statusBarHeight},getOrderState:function(e){return new Promise((function(t,n){(0,o.request)({url:"wx/get/order/status",method:"POST",data:{order_no:e}}).then((function(e){t(e.data)}))}))},toDetail:function(t){var n=this,r=t.currentTarget.dataset.item.order_no;e.navigateTo({url:"/pages/orderDetail/orderDetail?order_no="+r,events:{toChangeOrderState:function(e,t){n.dealWithOrderState(e,t)}}})},cancel:function(){this.show=!1},confirm:function(){var t=this;(0,o.request)({url:"wx/cancel/order",method:"POST",data:{order_no:this.order_no}}).then((function(){e.showToast({title:"取消成功",icon:"none",duration:2e3,success:function(){t.dealWithOrderState(t.order_no,"C"),t.show=!1}})}))},toCancel:function(e){this.show=!0,this.order_no=e.currentTarget.dataset.item.order_no},payComplete:function(t){var n=this;e.showToast({title:"success"==t?"支付成功":"支付取消",icon:"none",duration:2e3,success:function(){"success"==t&&n.dealWithOrderState(n.order_no,"Y")}})},cancelPay:function(){this.showPop=!1,this.payMoney=0},toEnsurePay:function(t){var n=this;return(0,a.default)(i.default.mark((function r(){var a;return i.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(0!=t){r.next=7;break}return r.next=3,n.balancePayment();case 3:a=r.sent,a&&(n.showPop=!1,e.showToast({title:"支付成功",icon:"none",duration:2e3,success:function(){n.payMoney=0,n.dealWithOrderState(n.order_no,"Y")}})),r.next=9;break;case 7:n.showPop=!1,n.confirmPay();case 9:case"end":return r.stop()}}),r)})))()},balancePayment:function(){var e=this;return(0,a.default)(i.default.mark((function t(){var n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.app.getUserInfo();case 2:return n=t.sent,t.abrupt("return",new Promise((function(t,r){(0,o.request)({url:"wx/balance/pay",method:"POST",data:{order_no:e.order_no,user_ouid:n.ouid}}).then((function(e){200==e.code&&t(!0)}))})));case 4:case"end":return t.stop()}}),t)})))()},confirmPay:function(){var e=this,t="web";(0,o.request)({url:"wx/pay",method:"POST",data:{order_no:this.order_no,type:t}}).then((function(t){e.wxPay(t.data.per_pay,e.payComplete)}))},toPay:function(e){this.order_no=e.currentTarget.dataset.item.order_no,this.payMoney=e.currentTarget.dataset.item.money/100,this.showPop=!0},toUse:function(t){e.navigateTo({url:"/pages/reservationInfo/reservationInfo?order_no="+t.currentTarget.dataset.item.order_no})},initData:function(){var t=arguments,n=this;return(0,a.default)(i.default.mark((function r(){var a,s;return i.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:"",r.next=3,n.app.getUserInfo();case 3:s=r.sent,(0,o.request)({url:"wx/get/order/list",method:"POST",data:{user_ouid:s.ouid,page:0==n.active?n.searchInfo.pageObj.firstPage:1==n.active?n.searchInfo.pageObj.secondPage:n.searchInfo.pageObj.thirdPage,size:n.searchInfo.size,status:n.searchInfo.status}}).then((function(t){var r=t.data.list?t.data.list:[];switch(r.forEach((function(e){e.siteNum=e.site_detail?e.site_detail.length:0;var t=0;e.site_detail=e.site_detail?e.site_detail:[],e.site_detail.forEach((function(e){t+=e.time_enum.length})),e.shop_avatar=n.app.globalData.httpUrl+e.shop_avatar,e.hour=t})),r.length<10&&"lower"==a&&e.showToast({icon:"none",title:"没有更多数据了"}),n.active){case 0:n.orderList="refresh"==a?r:n.orderList.concat(r),n.triggered=!1;break;case 1:n.waitPayedList="refresh"==a?r:n.waitPayedList.concat(r),n.triggered1=!1;break;case 2:n.waitUsedList="refresh"==a?r:n.waitUsedList.concat(r),n.triggered2=!1;break}}));case 5:case"end":return r.stop()}}),r)})))()},onRefresh:function(){switch(this.active){case 0:this.searchInfo.pageObj.firstPage=1,this.triggered=!0;break;case 1:this.searchInfo.pageObj.secondPage=1,this.triggered1=!0;break;case 2:this.searchInfo.pageObj.thirdPage=1,this.triggered2=!0;break}this.initData("refresh")},lower:function(){switch(this.active){case 0:this.searchInfo.pageObj.firstPage=this.searchInfo.pageObj.firstPage+1;break;case 1:this.searchInfo.pageObj.secondPage=this.searchInfo.pageObj.secondPage+1;break;case 2:this.searchInfo.pageObj.thirdPage=this.searchInfo.pageObj.thirdPage+1;break}this.initData("lower")},dealWithOrderState:function(e,t){if(0==this.active){var n=this.orderList.findIndex((function(t){return t.order_no==e}));if(n>-1){if("Y"==t){this.waitUsedList.unshift(this.orderList[n]);var r=this.waitPayedList.findIndex((function(t){return t.order_no==e}));r>-1&&this.waitPayedList.splice(r,1)}else if("N"==this.orderList[n].status){var i=this.waitPayedList.findIndex((function(t){return t.order_no==e}));i>-1&&this.waitPayedList.splice(i,1)}else if("Y"==this.orderList[n].status){var a=this.waitUsedList.findIndex((function(t){return t.order_no==e}));a>-1&&this.waitPayedList.splice(a,1)}this.orderList[n].status=t}}else if(1==this.active){var o=this.waitPayedList.findIndex((function(t){return t.order_no==e}));if(o>-1){this.waitPayedList[o].status=t;var s=this.waitPayedList.splice(o,1);if("Y"==t)this.waitUsedList.unshift(s[0]);else{var c=this.orderList.findIndex((function(t){return t.order_no==e}));c>-1&&(this.orderList[c].status="C")}}}else{var u=this.waitUsedList.findIndex((function(t){return t.order_no==e}));if(u>-1){this.waitUsedList.splice(u,1);var d=this.orderList.findIndex((function(t){return t.order_no==e}));d>-1&&(this.orderList[d].status="C")}}}}};t.default=u}).call(this,n(2)["default"])},232:function(e,t,n){"use strict";n.r(t);var r=n(233),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=i.a},233:function(e,t,n){}},[[226,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderList/orderList.js.map