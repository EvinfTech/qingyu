<template>
	<!-- pages/orderList/orderList.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="我的预约" :safeAreaInsetTop="true" :autoBack="true" :fixed="false">
		</u-navbar>
		<u-tabs class="tabs" :list="titleList" @change="onChange" lineColor="#0077FF" lineWidth="40"></u-tabs>
		<scroll-view :scroll-y="true" v-if="active == 0" class="orderList"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="reservationList.length == 0?'emptyFlex':''">
			<u-empty text="暂无预约" v-if="reservationList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in reservationList" :key="index1">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image class="w-full h-full" :src="item.shop_avatar" mode="" />
							</view>
							<view class="flex flex-direction align-start justify-between" style="height: 132rpx">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="flex flex-direction align-start">
									<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
									</view>
									<view class="flex align-start">
										<view class="reservationInfo">预约时间：</view>
										<view class="flex flex-direction mutipleLine">
											<view class="reservationInfo align-center" v-for="(con, j) in item.timeList"
												:key="j">{{ con.date }}
												{{ con.timeRange }}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="flex align-center justify-end stateBox">
						<view v-if="item.status == 'finished'" class="redText">已使用</view>
						<view v-else-if="item.status == 'Y'" class="blueText">待使用</view>
						<view v-else-if="item.status == 'N'" class="redText">待支付</view>
						<view v-else-if="item.status == 'C'" class="grayText">已取消</view>
					</view>
					<view class="detailBox flex align-center" @tap="toDetail" :data-item="item">
						查看预约
						<image src="/static/images/mine/rightArrow.svg" style="width: 28rpx; height: 28rpx" mode="" />
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else-if="active == 1" class="orderList"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="waitUsedList.length == 0?'emptyFlex':''">
			<u-empty text="暂无待使用预约" v-if="waitUsedList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in waitUsedList" :key="index1">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image class="w-full h-full" :src="item.shop_avatar" mode="" />
							</view>
							<view class="flex flex-direction align-start justify-between" style="height: 132rpx">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="flex flex-direction align-start">
									<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
									</view>
									<view class="flex align-start">
										<view class="reservationInfo">预约时间：</view>
										<view class="flex flex-direction mutipleLine">
											<view class="reservationInfo align-center" v-for="(con, j) in item.timeList"
												:key="j">{{ con.date }}
												{{ con.timeRange }}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="flex align-center justify-end stateBox">
						<view class="blueText">待使用</view>
					</view>

					<view class="detailBox flex align-center" @tap="toDetail" :data-item="item">
						查看预约
						<image src="/static/images/mine/rightArrow.svg" style="width: 28rpx; height: 28rpx" mode="" />
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view :scroll-y="true" v-else class="orderList" :style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="alreadyUsedList.length == 0?'emptyFlex':''">
			<u-empty text="暂无已使用预约" v-if="alreadyUsedList.length == 0" />
			<view v-else>
				<view class="orderItem" :data-item="item" v-for="(item, index1) in alreadyUsedList" :key="index1">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view class="leftPhoto">
								<image class="w-full h-full" :src="item.shop_avatar" mode="" />
							</view>
							<view class="flex flex-direction align-start justify-between" style="height: 132rpx">
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="flex flex-direction align-start">
									<view class="reservationInfo">预约场地： {{ item.siteNum }}场({{ item.hour }}小时）
									</view>
									<view class="reservationInfo">预约时间： {{ item.reservationTime }}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="flex align-center justify-end stateBox">
						<view class="redText">已使用</view>
					</view>

					<view class="detailBox flex align-center" @tap="toDetail" :data-item="item">
						查看预约
						<image src="/static/images/mine/rightArrow.svg" style="width: 28rpx; height: 28rpx" mode="" />
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// pages/orderList/orderList.ts
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app:getApp(),
				titleList: [{
					name: '全部'
				}, {
					name: '待使用'
				}, {
					name: '已使用'
				}, ],
				active: 0,
				waitUsedList: [],
				alreadyUsedList: [],

				reservationList: [],

				scrollViewHeight: '',
				j: '',

				con: {
					date: '',
					timeRange: ''
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

			toDetail(e) {
				let order_no = e.currentTarget.dataset.item.order_no;
				uni.navigateTo({
					url: '/pages/reservationInfo/reservationInfo?order_no=' + order_no
				});
			},

			onChange(e) {
				this.active = e.index
				if (this.active == 0) {
					// this.setData({
					//     processedList: this.data.orderList
					// })
				} else if (this.active == 1) {
					// let arr = this.data.orderList.filter(con => con.state == 'wait')
					// this.setData({
					//     processedList: arr
					// })
				} else {
					// let arr = this.data.orderList.filter(con => con.state == 'payed')
					// this.setData({
					//     processedList: arr
					// })
				}
			},

			calculate() {
				var screenHeight = uni.getSystemInfoSync().windowHeight;
				// 获取navbar的高度
				this.scrollViewHeight = screenHeight - 88
			},

			initData() {
				let enumInfo = this.app.globalData.enumInfo;
				request({
					url: 'wx/get/my/reserve/list',
					method: 'POST',
					data: {
						user_ouid: this.app.globalData.userInfo.ouid
					}
				}).then((res) => {
					let enumInfo = this.app.globalData.enumInfo;
					let reservationList = res.data.reverse();
					reservationList.forEach((con) => {
						let siteNum = 0; //预约场地数
						let hour = 0; //所有预约的时间总和
						let timeList = []; //预约时间的集合
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
					this.reservationList = reservationList
					let waitUsedList = this.reservationList.filter((item) => item.status == 'Y');
					let alreadyUsedList = this.reservationList.filter((item) => item.status == 'finished');
					this.waitUsedList = waitUsedList
					this.alreadyUsedList = alreadyUsedList
				});
			}
		}
	});
</script>
<style scoped>
	/* pages/reservationList/reservationList.wxss */
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
		height: 176rpx;
		border-radius: 10rpx;
		background: #ffffff;
		background-color: #fff;
		margin-bottom: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
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
		margin: 0rpx 20rpx 0rpx 0;
	}

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.reservationInfo {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-weight: 500;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
		margin-bottom: 4rpx;
	}

	.mutipleLine {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
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

	.stateBox {
		position: absolute;
		right: 16rpx;
		top: 22rpx;
	}

	.detailBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
		position: absolute;
		right: 16rpx;
		bottom: 18rpx;
	}
</style>