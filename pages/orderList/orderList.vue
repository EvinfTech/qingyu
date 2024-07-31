<template>
	<!-- pages/orderList/orderList.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="我的订单" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<u-modal :show="show" title="提示" content="确定要取消此订单？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
		<u-tabs class="tabs" :list="titleList" @change="onChange" lineColor="#0077FF" lineWidth="40"></u-tabs>
		<scroll-view :scroll-y="true" v-if="active == 0" class="orderList" :class="orderList.length == 0?'emptyFlex':''"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" refresher-enabled :refresher-triggered="triggered"
			@refresherrefresh="onRefresh" @scrolltolower="lower">
			<u-empty text="暂无订单" v-if="orderList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in orderList" :key="index1"
					@tap="toDetail">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view v-if="item.status == 'N'" class="redText">待支付</view>
						<view v-else-if="item.status == 'Y'" class="blueText">待使用</view>
						<view v-else-if="item.status == 'C'" class="grayText">已取消</view>
						<view v-else-if="item.status == 'U'" class="blueText">已使用</view>
						<!-- <view wx:elif="{{item.status == 'finished' || item.status == 'refunded'}}" class="grayText">
                            {{item.status == 'finished'?'已完成':'已退款'}}
                        </view> -->
					</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image :src="item.shop_avatar" mode="" class="w-full h-full" />
							</view>
							<view class="flex flex-direction align-start">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
								</view>
							</view>
						</view>
						<view class="priceText">￥ {{ item.money/100 }}</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'C'||item.status == 'U'">
						<view class="borderBtn" @tap.stop="toDetail" :data-item="item">查看详情</view>
					</view>
					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'N'">
						<view class="borderBtn" @tap.stop="toCancel" :data-item="item">取消订单</view>
						<view class="payBtn" @tap.stop="toPay" :data-item="item">去支付</view>
					</view>
					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'Y'">
						<view class="borderBtn" @tap.stop="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn" @tap.stop="toUse" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else-if="active == 1" class="orderList"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="waitPayedList.length == 0?'emptyFlex':''"
			:refresher-triggered="triggered1" refresher-enabled @refresherrefresh="onRefresh" @scrolltolower="lower">
			<u-empty text="暂无待支付订单" v-if="waitPayedList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in waitPayedList" :key="index1"
					@tap="toDetail">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view class="redText">待支付</view>
					</view>

					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image :src="item.shop_avatar" mode="" class="w-full h-full" />
							</view>
							<view class="flex flex-direction align-start">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
								</view>
							</view>
						</view>
						<view class="priceText">￥ {{ item.money/100 }}</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'N'">
						<view class="borderBtn" @tap.stop="toCancel" :data-item="item">取消订单</view>
						<view class="payBtn" @tap.stop="toPay" :data-item="item">去支付</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'Y'">
						<view class="borderBtn" @tap.stop="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn" @tap.stop="toUse" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else class="orderList" :style="'height: ' + (scrollViewHeight + 'px') + ';'"
			:class="waitUsedList.length == 0?'emptyFlex':''" :refresher-triggered="triggered2" refresher-enabled
			@refresherrefresh="onRefresh" @scrolltolower="lower">
			<u-empty text="暂无待使用订单" v-if="waitUsedList.length == 0" />
			<view v-else>
				<view class="orderItem" @tap="toDetail" :data-item="item" v-for="(item, index1) in waitUsedList"
					:key="index1">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view class="blueText">待使用</view>
					</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image :src="item.shop_avatar" mode="" class="w-full h-full" />
							</view>
							<view class="flex flex-direction align-start">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
								</view>
							</view>
						</view>
						<view class="priceText">￥ {{ item.money/100 }}</view>
					</view>
					<view class="w-full flex align-center" style="justify-content: flex-end">
						<view class="borderBtn" @tap.stop="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn" @tap.stop="toUse" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<PaymentMethod :show="showPop" :price="payMoney" @toEnsurePay="toEnsurePay" @cancelPay="cancelPay">
		</PaymentMethod>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	import payment from '@/mixins/pay.js';
	import PaymentMethod from '@/components/paymentMethod.vue'
	export default ({
		components: {
			PaymentMethod
		},
		mixins: [payment],
		data() {
			return {
				show: false,
				app: getApp(),
				titleList: [{
					name: '全部'
				}, {
					name: '待支付'
				}, {
					name: '待使用'
				}, ],
				active: 0,
				waitPayedList: [], //等待支付列表
				waitUsedList: [], //等待使用列表
				order_no: '', //订单号
				orderList: [], //全部订单列表
				scrollViewHeight: '', //中间内容高度
				searchInfo: {
					pageObj: {
						firstPage: 1,
						secondPage: 1,
						thirdPage: 1
					},
					size: 10,
					status: ''
				}, //搜索条件
				triggered: false, //控制全部 下拉刷新
				triggered1: false, //控制待支付 下拉刷新
				triggered2: false, //控制待使用 下拉刷新
				showPop: false,
				payMoney: 0
			};
		},
		async onShow() {
			// #ifdef H5
			// 微信内置浏览器且code存在
			let flag = this.isWeiXin()
			if (flag) {
				const code = this.getUrlParam("code")
				if (code) {
					this.toPayInside()
				}
			} else {
				// 判断是否是h5支付后返回此页面
				let payState = uni.getStorageSync('weixinCallback')
				if (payState) {
					uni.removeStorageSync('weixinCallback')
					// 因为h5支付没有支付回调，所以查询此订单是否支付
					let data = await this.getOrderState(this.order_no)
					if (data.status == 'Y') {
						this.dealWithOrderState(this.order_no, 'Y')
					}
				}
			}
			// #endif
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
			})
		},
		methods: {
			// tab栏切换
			onChange(e) {
				this.active = e.index;
				switch (e.index) {
					case 0:
						this.searchInfo.status = ''
						break;
					case 1:
						this.searchInfo.status = 'N'
						if (this.waitPayedList.length == 0) {
							this.initData()
						}
						break;
					case 2:
						this.searchInfo.status = 'Y'
						if (this.waitUsedList.length == 0) {
							this.initData()
						}
						break;
				}
			},
			// 计算中间内容高度
			calculate() {
				let sysInfo = uni.getSystemInfoSync()
				var screenHeight = sysInfo.windowHeight;
				// 获取navbar的高度
				// #ifdef H5
				this.scrollViewHeight = screenHeight - 88
				// #endif
				// #ifdef MP-WEIXIN
				this.scrollViewHeight = screenHeight - 88 - sysInfo.statusBarHeight
				// #endif
			},
			// 获取订单状态
			getOrderState(order_no) {
				return new Promise((resolve, reject) => {
					request({
						url: 'wx/get/order/status',
						method: 'POST',
						data: {
							order_no
						}
					}).then(res => {
						resolve(res.data)
					})
				})
			},
			// 去订单详情
			toDetail(e) {
				let order_no = e.currentTarget.dataset.item.order_no;
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?order_no=' + order_no,
					events: {
						toChangeOrderState: (order_no, type) => {
							this.dealWithOrderState(order_no, type)
						}
					}
				});
			},
			// 取消 取消订单
			cancel() {
				this.show = false
			},
			// 确定 取消订单
			confirm() {
				request({
					url: 'wx/cancel/order',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then(() => {
					uni.showToast({
						title: '取消成功',
						icon: 'none',
						duration: 2000,
						success: () => {
							this.dealWithOrderState(this.order_no, 'C')
							this.show = false
						}
					});
				});
			},
			// 取消订单
			toCancel(e) {
				this.show = true;
				this.order_no = e.currentTarget.dataset.item.order_no
			},
			// 支付完成 或支付取消
			payComplete(type) {
				uni.showToast({
					title: type == 'success' ? '支付成功' : '支付取消',
					icon: 'none',
					duration: 2000,
					success: () => {
						if (type == 'success') {
							this.dealWithOrderState(this.order_no, 'Y')
						}

					}
				});
			},
			// 取消选择支付方式
			cancelPay() {
				this.showPop = false;
				this.payMoney = 0
			},
			// 确定支付
			async toEnsurePay(index) {
				if (index == 0) {
					let state = await this.balancePayment()
					if (state) {
						this.showPop = false;
						uni.showToast({
							title:  '支付成功' ,
							icon: 'none',
							duration: 2000,
							success: () => {
								this.payMoney = 0
								this.dealWithOrderState(this.order_no, 'Y')
							}
						});
					}
				} else {
					this.showPop = false;
					this.confirmPay()
				}
			},
			// 余额支付
			async balancePayment() {
				let userInfo = await this.app.getUserInfo();
				return new Promise((resolve, reject) => {
					request({
						url: 'wx/balance/pay',
						method: 'POST',
						data: {
							order_no: this.order_no,
							user_ouid: userInfo.ouid
						}
					}).then(res => {
						if (res.code == 200) {
							resolve(true)
						}
					})
				})

			},
			// 微信支付
			confirmPay() {
				let type = 'web'
				// #ifdef H5
				type = 'h5'
				// #endif
				request({
					url: 'wx/pay',
					method: 'POST',
					data: {
						order_no: this.order_no,
						type
					}
				}).then((res) => {
					// 微信小程序支付已走通，其余场景请自行进行支付对接
					// #ifdef MP-WEIXIN
					this.wxPay(res.data.per_pay, this.payComplete)
					// #endif
					// #ifdef H5
					let flag = this.isWeiXin()
					if (flag) {
						// 走微信内置浏览器支付
						this.weChatInside()
					} else {
						// 走外置浏览器支付
						this.toPayOutside(res.data)
					}
					// #endif
				});
			},
			// 选择支付方式
			toPay(e) {
				this.order_no = e.currentTarget.dataset.item.order_no
				this.payMoney = e.currentTarget.dataset.item.money / 100
				this.showPop = true;

			},
			// 去使用
			toUse(e) {
				uni.navigateTo({
					url: '/pages/reservationInfo/reservationInfo?order_no=' + e.currentTarget.dataset.item
						.order_no
				})
			},
			// 初始化数据
			async initData(type = '') {
				let userInfo = await this.app.getUserInfo();
				request({
					url: 'wx/get/order/list',
					method: 'POST',
					data: {
						user_ouid: userInfo.ouid,
						page: this.active == 0 ? this.searchInfo.pageObj.firstPage : (this.active == 1 ?
							this.searchInfo.pageObj.secondPage : this.searchInfo.pageObj.thirdPage),
						size: this.searchInfo.size,
						status: this.searchInfo.status
					}
				}).then((res) => {
					let orderList = res.data.list ? res.data.list : [];
					orderList.forEach((con) => {
						con.siteNum = con.site_detail ? con.site_detail.length : 0;
						let hour = 0;
						con.site_detail = con.site_detail ? con.site_detail : [];
						con.site_detail.forEach((content) => {
							hour = hour + content.time_enum.length;
						});
						con.shop_avatar = this.app.globalData.httpUrl + con.shop_avatar
						con.hour = hour;
					});
					if (orderList.length < 10 && type == 'lower') {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据了'
						})
					}
					switch (this.active) {
						case 0:
							this.orderList = (type == 'refresh' ? orderList : this.orderList.concat(
								orderList))
							this.triggered = false
							break;
						case 1:
							this.waitPayedList = (type == 'refresh' ? orderList : this.waitPayedList
								.concat(orderList))
							this.triggered1 = false
							break;
						case 2:
							this.waitUsedList = (type == 'refresh' ? orderList : this.waitUsedList.concat(
								orderList))
							this.triggered2 = false
							break;
					}

				});
			},
			// 下拉刷新
			onRefresh() {
				switch (this.active) {
					case 0:
						this.searchInfo.pageObj.firstPage = 1;
						this.triggered = true
						break;
					case 1:
						this.searchInfo.pageObj.secondPage = 1;
						this.triggered1 = true
						break;
					case 2:
						this.searchInfo.pageObj.thirdPage = 1;
						this.triggered2 = true
						break;
				}
				this.initData('refresh');
			},
			// 上拉加载
			lower() {
				switch (this.active) {
					case 0:
						this.searchInfo.pageObj.firstPage = this.searchInfo.pageObj.firstPage + 1;
						break;
					case 1:
						this.searchInfo.pageObj.secondPage = this.searchInfo.pageObj.secondPage + 1;
						break;
					case 2:
						this.searchInfo.pageObj.thirdPage = this.searchInfo.pageObj.thirdPage + 1;
						break;
				}
				this.initData('lower')
			},
			// 处理订单  取消 或者 支付成功
			dealWithOrderState(order_no, type) {
				// 全部模块
				if (this.active == 0) {
					let index = this.orderList.findIndex((item) => {
						return item.order_no == order_no
					})
					if (index > -1) {
						// 支付成功
						if (type == 'Y') {
							this.waitUsedList.unshift(this.orderList[index])
							let resI = this.waitPayedList.findIndex((item) => {
								return item.order_no == order_no
							})
							if (resI > -1) {
								this.waitPayedList.splice(resI, 1)
							}
						} else {
							// 取消订单
							if (this.orderList[index].status == 'N') {
								let resI = this.waitPayedList.findIndex((item) => {
									return item.order_no == order_no
								})
								if (resI > -1) {
									this.waitPayedList.splice(resI, 1)
								}
							} else if (this.orderList[index].status == 'Y') {
								let resI1 = this.waitUsedList.findIndex((item) => {
									return item.order_no == order_no
								})
								if (resI1 > -1) {
									this.waitPayedList.splice(resI1, 1)
								}
							}
						}
						this.orderList[index].status = type
					}
				} else if (this.active == 1) {
					// 待支付模块
					let index1 = this.waitPayedList.findIndex((item) => {
						return item.order_no == order_no
					})
					if (index1 > -1) {
						this.waitPayedList[index1].status = type;
						let deleteItem = this.waitPayedList.splice(index1, 1);
						if (type == 'Y') {
							this.waitUsedList.unshift(deleteItem[0])
						} else {
							let resI = this.orderList.findIndex(item => {
								return item.order_no == order_no
							})
							if (resI > -1) {
								this.orderList[resI].status = 'C'
							}
						}
					}
				} else {
					// 待使用模块
					let index2 = this.waitUsedList.findIndex((item) => {
						return item.order_no == order_no
					})
					if (index2 > -1) {
						this.waitUsedList.splice(index2, 1);
						let resI = this.orderList.findIndex(item => {
							return item.order_no == order_no
						})
						if (resI > -1) {
							this.orderList[resI].status = 'C'
						}
					}
				}
			}
		}
	});
</script>
<style scoped>
	/* pages/orderList/orderList.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.orderList {
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	}

	.emptyFlex {
		padding-top: 100px;
		box-sizing: border-box;
	}

	.orderItem {
		height: 300rpx;
		border-radius: 10rpx;
		background: #ffffff;
		background-color: #fff;
		margin-bottom: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.orderNoText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		display: flex;
		color: #b1b4c3;
	}

	.leftPhoto {
		width: 132rpx;
		height: 132rpx;
		border-radius: 4rpx;
		margin: 20rpx 20rpx 24rpx 0;
	}

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-bottom: 12rpx;
	}

	.reservationInfo {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-weight: 500;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.borderBtn {
		width: 152rpx;
		height: 50rpx;
		border-radius: 40rpx;
		border: 1px solid #b1b4c3;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		color: #b1b4c3;
	}

	.payBtn {
		width: 152rpx;
		height: 50rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		background-color: #ff5634;
		margin-left: 12rpx;
	}

	.useBtn {
		width: 152rpx;
		height: 50rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #0077ff;
		margin-left: 12rpx;
		color: #fff;
	}

	.redText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
		color: #ff5634;
	}

	.blueText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
		color: #0077ff;
	}

	.grayText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}
</style>