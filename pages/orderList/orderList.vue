<template>
	<!-- pages/orderList/orderList.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="我的订单" :safeAreaInsetTop="true" :autoBack="true" :fixed="false">
		</u-navbar>
		<u-modal :show="show" title="提示" content="确定要取消此订单？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
		<u-tabs class="tabs" :list="titleList" @change="onChange" lineColor="#0077FF" lineWidth="40"></u-tabs>
		<scroll-view :scroll-y="true" v-if="active == 0" class="orderList" :class="orderList.length == 0?'emptyFlex':''"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'">
			<u-empty text="暂无订单" v-if="orderList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in orderList" :key="index1">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view v-if="item.status == 'N'" class="redText">待支付</view>
						<view v-else-if="item.status == 'Y'" class="blueText">待使用</view>
						<view v-else-if="item.status == 'C'" class="grayText">已取消</view>
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

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'C'">
						<view class="borderBtn" @tap="toDetail" :data-item="item">查看详情</view>
					</view>
					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'N'">
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="payBtn" @tap="toDetail" :data-item="item">去支付</view>
					</view>
					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'Y'">
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn"  @tap="toDetail" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else-if="active == 1" class="orderList"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="waitPayedList.length == 0?'emptyFlex':''">
			<u-empty text="暂无待支付订单" v-if="waitPayedList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in waitPayedList" :key="index1">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view v-if="item.status == 'N'" class="redText">待支付</view>
						<view v-else-if="item.status == 'Y'" class="blueText">待使用</view>
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

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'N'">
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="payBtn" @tap="toDetail" :data-item="item">去支付</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'Y'">
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn"  @tap="toDetail" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else class="orderList" :style="'height: ' + (scrollViewHeight + 'px') + ';'"
			:class="waitUsedList.length == 0?'emptyFlex':''">
			<u-empty text="暂无待使用订单" v-if="waitUsedList.length == 0" />
			<view v-else>
				<view class="orderItem" @tap="toDetail" :data-item="item" v-for="(item, index1) in waitUsedList"
					:key="index1">
					<view class="flex align-center justify-between">
						<view class="orderNoText">订单编号： {{ item.order_no }}</view>
						<view v-if="item.status == 'N'" class="redText">待支付</view>
						<view v-else-if="item.status == 'Y'" class="blueText">待使用</view>
						<view v-else-if="item.status == 'finished' || item.status == 'refunded'" class="grayText">
							{{ item.status == 'finished' ? '已完成' : '已退款' }}
						</view>
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
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="payBtn">去支付</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end" v-if="item.status == 'Y'">
						<view class="borderBtn" @tap="toCancel" :data-item="item">取消订单</view>
						<view class="useBtn" @tap="toDetail" :data-item="item">去使用</view>
					</view>

					<view class="w-full flex align-center" style="justify-content: flex-end"
						v-if="item.status == 'finished' || item.status == 'refunded'">
						<view class="borderBtn">再次预定</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	// pages/orderList/orderList.ts
	import {
		request
	} from '../../utils/request';
	// import Dialog from '@/wxcomponents/vant/dialog/dialog';
	export default ({
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
				waitPayedList: [],
				waitUsedList: [],
				order_no: '',
				orderList: [],

				scrollViewHeight: ''
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
			})
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage() {},
		methods: {
			onClickLeft() {
				uni.navigateBack();
			},

			onChange(e) {
				this.active = e.index
				if (this.active == 0) {
					// this.setData({
					//     processedList:this.data.orderList
					// })
				} else if (this.active == 1) {
					// let arr = this.data.orderList.filter(con => con.state == 'wait')
					// this.setData({
					//     processedList:arr
					// })
				} else {
					// let arr = this.data.orderList.filter(con => con.state == 'payed')
					// this.setData({
					//     processedList:arr
					// })
				}
			},

			calculate() {
				var screenHeight = uni.getSystemInfoSync().windowHeight;
				let that = this;
				// 获取navbar的高度
				that.scrollViewHeight = screenHeight - 88
			},
			toDetail(e) {
				let order_no = e.currentTarget.dataset.item.order_no;
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?order_no=' + order_no
				});
			},
			cancel() {
				this.show = false
			},
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
							this.show = false
							setTimeout(() => {
								this.initData();
							}, 2000);
						}
					});
				});
			},
			toCancel(e) {
				this.show = true;
				this.order_no =  e.currentTarget.dataset.item.order_no

			},

			initData() {
				request({
					url: 'wx/get/order/list',
					method: 'POST',
					data: {
						user_ouid: this.app.globalData.userInfo.ouid
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
					this.orderList = orderList
					let waitPayedList = this.orderList.filter((item) => item.status == 'N');
					let waitUsedList = this.orderList.filter((item) => item.status == 'Y');
					this.waitPayedList = waitPayedList
					this.waitUsedList = waitUsedList
				});
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