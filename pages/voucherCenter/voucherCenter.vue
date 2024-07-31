<template>
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="充值中心" :autoBack="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="content">
			<view class="priceBox flex flex-direction align-start justify-center">
				<view class="balanceTitle">余额</view>
				<view class="balanceText">
					￥{{balance}}
				</view>
			</view>
			<view class="packageBox flex align-center flex-wrap">
				<view class="packageItem flex   align-center justify-center" :class="index==active?'packageActive':''"
					@click="chooseItem(index)" v-for="(item,index) in packageList" :key="index">
					充{{item.origin_money}} {{item.present_money>0?('赠'+item.present_money):''}}
				</view>
			</view>
			<view class="flex align-center actualReceipt">
				<div>实际到账：</div>
				<div>￥{{actualReceipt}}</div>
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
		<view class="toPayBtn flex align-center justify-center" @click="toPay">
			去充值
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	import payment from '@/mixins/pay.js';
	export default {
		mixins: [payment],
		data() {
			return {
				app: getApp(),
				balance: 0,
				active: 0,
				actualReceipt: 0,
				packageList: [],
				userInfo: {},
				order_no: ''
			}
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
					uni.showToast({
						title: data.status == 'Y' ? '充值成功' : '支付取消',
						icon: 'none',
						duration: 2000,
						success: async () => {
							if (data.status == 'Y') {
								let userInfo = await this.app.getUserInfo('reGet')
								this.userInfo = userInfo;
								this.balance = userInfo.balance;
								const eventChannel = this.getOpenerEventChannel();
								eventChannel.emit('updateInfo')
							}
						}
					});
				}
			}
			// #endif
		},
		async onLoad() {
			this.getPackageList()
			let userInfo = await this.app.getUserInfo();
			this.userInfo = userInfo;
			this.balance = userInfo.balance
		},
		methods: {
			// 获取套餐列表
			getPackageList() {
				request({
					url: '/wx/recharge-rule/list',
					method: 'POST',
				}).then((res) => {
					let list = res.data.list
					list.forEach((item) => {
						item.origin_money = item.origin_money / 100
						item.present_money = item.present_money / 100
					})
					this.packageList = list.reverse()
					this.actualReceipt = this.packageList[0].origin_money + this.packageList[0].present_money
				})
			},
			// 选择套餐
			chooseItem(index) {
				this.active = index;
				this.actualReceipt = this.packageList[index].origin_money + this.packageList[index].present_money
			},
			// 去充值
			async toPay() {
				let type = 'web'
				// #ifdef H5
				type = 'h5'
				// #endif
				request({
					url: '/wx/recharge-order/add',
					method: 'POST',
					data: {
						type,
						money: this.packageList[this.active].origin_money * 100,
						ouid: this.userInfo.ouid
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
						this.order_no = res.data.order_no
						// 走外置浏览器支付
						this.toPayOutside(res.data)
					}
					// #endif
				});

			},
			// 获取订单状态 用于h5
			getOrderState(order_no) {
				return new Promise((resolve, reject) => {
					request({
						url: 'wx/recharge-order/status',
						method: 'POST',
						data: {
							order_no
						}
					}).then(res => {
						resolve(res.data)
					})
				})
			},
			// 支付完成 或支付取消
			payComplete(type) {
				uni.showToast({
					title: type == 'success' ? '充值成功' : '支付取消',
					icon: 'none',
					duration: 2000,
					success: async () => {
						if (type == 'success') {
							let userInfo = await this.app.getUserInfo('reGet')
							this.userInfo = userInfo;
							this.balance = userInfo.balance;
							const eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('updateInfo')
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.content {
		padding: 10px 13px 0;
	}

	.priceBox {
		height: 109px;
		border-radius: 10px;
		background: #5ABF62;
		padding-left: 18px;
	}

	.balanceTitle {
		font-family: PingFang SC;
		font-size: 18px;
		font-weight: 600;
		font-variation-settings: "opsz" auto;
		color: #FFFFFF;
	}

	.balanceText {
		font-family: PingFang SC;
		font-size: 32px;
		font-weight: 600;
		font-variation-settings: "opsz" auto;
		color: #FFFFFF;
	}

	.packageBox {
		margin-top: 17px;
	}

	.packageItem {
		border: 1px solid #787878;
		height: 50px;
		width: 46%;
		margin-bottom: 10px;
	}

	.packageItem:nth-child(2n) {
		margin-left: 16px;
	}

	.packageActive {
		border-color: #5ABF62;
		color: #5ABF62;
	}

	.actualReceipt {
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 500;
		font-variation-settings: "opsz" auto;
		color: #000000;
		margin: 10px 0;
	}

	.payMethodBox {
		height: 94rpx;
		background-color: #fff;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.toPayBtn {
		height: 48px;
		border-radius: 10px;
		background: #5ABF62;
		color: #fff;
		margin: 18px 13px;
	}
</style>