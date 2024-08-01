<template>
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="确认预约" :autoBack="false">
			<template #left>
				<u-icon name="arrow-left" @click="toBackPage"></u-icon>
			</template>
		</u-navbar>
		<view class="centerContent" :style="'height: ' + (centerHeight + 'px') + ';'">
			<view class="reservationInfo">
				<view class="reservationInfoTitle">
					预约信息
				</view>
				<view class="flex align-center" style="margin-top: 11px;">
					<view class="commonInfoLabel">姓名</view>
					<input type="text" placeholder="预约人姓名" v-model="userName">
				</view>
				<view class="flex align-center" style="margin-top: 11px;">
					<view class="commonInfoLabel">手机</view>
					<input type="text" placeholder="预约人手机号码" v-model="phone">
				</view>
				<view class="flex align-center" style="margin-top: 11px;">
					<view class="commonInfoLabel">备注</view>
					<input type="text" placeholder="备注信息" v-model="remark">
				</view>
			</view>
			<view class="gymnasiumInfoBox">
				<view class="gymnasiumInfoBoxName">{{gymnasiumInfo.gymnasiumName}}</view>
				<view class="gymnasiumInfoBoxText">营业时间：{{gymnasiumInfo.businessHours}}</view>
				<view class="gymnasiumInfoBoxText">电话：{{gymnasiumInfo.phone}}</view>
				<view class="gymnasiumInfoBoxText">地址：{{gymnasiumInfo.location}}</view>
			</view>
			<view class="siteList">
				<view class="siteListTitle">预约场次</view>
				<view style="padding: 0 30rpx">
					<view class="siteListItem" v-for="(item, index) in sessionList" :key="index">
						<view class="flex align-center justify-between">
							<view class="blackText">
								{{ item.siteName }}
							</view>
							<view class="grayText">{{ item.hour }}小时</view>
						</view>

						<view class="flex align-center justify-between" style="margin-top: 12rpx">
							<view class="flex flex-direction">
								<view class="grayText" v-for="(con, j) in item.timeList" :key="j">
									<text>{{ con.date }} {{ con.timeRange }}</text>
								</view>
							</view>
							<view class="blackText">￥ {{ item.price/100 }}</view>
						</view>
					</view>
				</view>
				<view class="flex align-center justify-between" style="padding: 24rpx 20rpx 16rpx">
					<view class="methodText">小计(共{{ sessionList.length }}场)</view>
					<view class="priceText">￥{{orderInfo.totalPrice }}</view>
				</view>
			</view>
			<view class="flex align-center justify-between payMethodBox">
				<view class="methodText">支付方式</view>
				<view class="flex align-center">
					<image src="/static/images/order/wechatIcon.svg" mode=""
						style="width: 36rpx; height: 36rpx; margin-right: 8rpx" />
					<text class="wechatText">微信支付</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="flex align-center justify-between h-full">
				<view class="flex align-center">
					<view class="totalText">总计：</view>
					<view class="priceText">
						<text>￥</text>
						<text>{{ orderInfo.totalPrice }}</text>
					</view>
				</view>
				<view class="flex align-center justify-end">
					<view class="payBtn" @click="createOrder">确认支付</view>
				</view>
			</view>
		</view>
		<PaymentMethod :show="showPop" :price="payMoney" @toEnsurePay="toEnsurePay" @cancelPay="cancelPay">
		</PaymentMethod>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	// 引入weixin-js-sdk
	// #ifdef H5
	import * as jweixin from 'weixin-js-sdk'
	// #endif
	// 引入支付混入
	import payment from '@/mixins/pay.js';
	import PaymentMethod from '@/components/paymentMethod.vue'
	export default {
		mixins: [payment],
		components: {
			PaymentMethod
		},
		data() {
			return {
				app: null,
				centerHeight: 0,
				orderInfo: {},
				gymnasiumInfo: {},
				userName: '',
				phone: '',
				remark: '',
				userInfo: {},
				sessionList: [],
				show: false,
				order_no: '',
				showPop: false,
				payMoney: 0
			}
		},
		async onLoad() {
			this.app = getApp()
			let orderInfo = uni.getStorageSync('orderInfo')
			orderInfo = JSON.parse(orderInfo)
			this.orderInfo = orderInfo;
			this.gymnasiumInfo = await this.app.getStoreInfo()
			this.userInfo = await this.app.getUserInfo()
			let enumInfo = await this.app.getEnum();
			this.userName = this.userInfo.name;
			this.phone = this.userInfo.phone;
			let sessionList = []
			let site_detail = orderInfo.site_detail
			site_detail.forEach((con) => {
				let timeList = [];
				con.time_enum.forEach((content) => {
					timeList.push({
						date: orderInfo.gmt_site_use,
						timeRange: enumInfo[content]
					});
				});
				sessionList.push({
					hour: con.time_enum.length,
					price: con.money,
					siteName: con.site_name,
					timeList: timeList
				});
			});
			this.sessionList = sessionList;
		},
		onReady() {
			this.$nextTick(() => {
				this.calculate();
			})
		},
		onShow() {
			// #ifdef H5
			// 微信内置浏览器且code存在
			let flag = this.isWeiXin()
			if (flag) {
				const code = this.getUrlParam("code")
				if (code) {
					this.toPayInside()
				}
			} else {
				let payState = uni.getStorageSync('weixinCallback')
				if (payState) {
					uni.removeStorageSync('weixinCallback')
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/orderDetail/orderDetail?order_no=' +
								this.order_no + '&type=new',
							success: () => {
								uni.removeStorageSync('orderInfo')
							}
						})
					}, 1000);
				}
			}
			// #endif
		},
		methods: {
			toBackPage(){
				this.app.toBack()
			},
			calculate() {
				let sysInfo = uni.getSystemInfoSync()
				var screenHeight = sysInfo.windowHeight;
				// 获取navbar的高度
				// #ifdef H5
				this.centerHeight = screenHeight - 122
				// #endif
				// #ifdef MP-WEIXIN || APP-PLUS
				this.centerHeight = screenHeight - 122 - sysInfo.statusBarHeight
				// #endif
			},
			// 生成订单 选择支付方式
			createOrder() {
				request({
					url: 'wx/add/order',
					method: 'POST',
					data: {
						user_ouid: this.userInfo.ouid,
						//用户ouid
						site_detail: this.orderInfo.site_detail,
						gmt_site_use: this.orderInfo.gmt_site_use,
						reserve_name: this.userName,
						reserve_phone: this.phone,
						remark: this.remark
					}
				}).then((res) => {
					if (res.msg == '操作成功') {
						this.order_no = res.data.order;
						this.payMoney = res.data.money / 100; //需要支付的订单金额
						this.showPop = true;
					} else {
						uni.showToast({
							title: res.msg + ',请重选',
							icon: 'none'
						})
						setTimeout(() => {
							const eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('updateSiteInfo', res.data.site)
							setTimeout(() => {
								this.app.toBack()
							}, 200)
						}, 1500)

					}

				});

			},
			// 取消选择支付方式
			cancelPay() {
				this.showPop = false;
				this.payMoney = 0
				uni.removeStorageSync('orderInfo')
				uni.redirectTo({
					url: '/pages/orderDetail/orderDetail?order_no=' +
						this.order_no + '&type=new',
				})
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
								setTimeout(()=>{
									uni.removeStorageSync('orderInfo')
									uni.redirectTo({
										url: '/pages/orderDetail/orderDetail?order_no=' +
											this.order_no + '&type=new',
									})
								},200)
								
							}
						});
						
					}
				} else {
					this.showPop = false;
					this.confirm()
				}
			},
			// 余额支付
			balancePayment() {
				return new Promise((resolve, reject) => {
					request({
						url: 'wx/balance/pay',
						method: 'POST',
						data: {
							order_no: this.order_no,
							user_ouid: this.userInfo.ouid
						}
					}).then(res => {
						if (res.code == 200) {
							resolve(true)
						}
					})
				})

			},
			// 确定支付订单
			confirm() {
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
						this.toPayOutside(res.data, this.order_no)
					}
					// setTimeout(() => {
					// 	uni.removeStorageSync('orderInfo')
					// 	uni.redirectTo({
					// 		url: '/pages/orderDetail/orderDetail?order_no=' +
					// 			this.order_no + '&type=new'
					// 	})
					// }, 1000);
					// #endif

				});
			},
			// 取消支付
			cancel() {
				this.show = false;
				uni.removeStorageSync('orderInfo')
				uni.redirectTo({
					url: '/pages/orderDetail/orderDetail?order_no=' + this.order_no + '&type=new'
				})
			},
			// 支付完成 或支付取消
			payComplete(type) {
				uni.showToast({
					title: type == 'success' ? '支付成功' : '支付取消',
					icon: 'none',
					duration: 2000,
					success: () => {
						setTimeout(() => {
							uni.removeStorageSync('orderInfo')
							uni.redirectTo({
								url: '/pages/orderDetail/orderDetail?order_no=' +
									this.order_no + '&type=new',
							})
						}, 200);

					}
				});
			},

		}
	}
</script>

<style scoped>
	.page {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		position: relative;
	}

	.centerContent {
		background-color: #f6f8fa;
		overflow-y: auto;
	}

	.reservationInfo {
		background-color: #fff;
		padding: 10px;
	}

	.reservationInfoTitle {
		font-family: Alibaba PuHuiTi 2.0;
		font-size: 17px;
		color: #000000;
	}

	.commonInfoLabel {
		font-family: Alibaba PuHuiTi 2.0;
		font-size: 14px;
		color: #000000;
		margin-right: 31px;
	}

	.gymnasiumInfoBox {
		background-color: #fff;
		padding: 10px;
		margin-top: 8px;
	}

	.gymnasiumInfoBoxName {
		font-size: 17px;
	}

	.gymnasiumInfoBoxText {
		font-size: 14px;
		margin-top: 11px;
	}

	.payMethodBox {
		height: 94rpx;
		background-color: #fff;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.footer {
		height: 78px;
		padding: 0 20rpx 0 32rpx;
		background-color: #fff;
	}

	.totalText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		line-height: normal;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.priceText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-feature-settings: 'kern' on;
		color: #ff5634;
	}

	.payBtn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ff5634;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
	}

	.siteList {
		background-color: #fff;
		margin-top: 14rpx;
		box-sizing: border-box;
	}

	.siteListTitle {
		padding: 20rpx 20rpx 0;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-bottom: 24rpx;
	}

	.blackText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.grayText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		text-align: right;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.siteListItem {
		width: 100%;
		min-height: 140rpx;
		height: auto;
		border-radius: 10rpx;
		opacity: 1;
		background-color: #f6f8fa;
		padding: 28rpx;
		box-sizing: border-box;
		margin-bottom: 10rpx;
	}

	::v-deep .input-placeholder {
		font-size: 14px;
		color: #9e9e9e
	}
</style>