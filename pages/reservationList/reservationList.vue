<template>
	<!-- pages/orderList/orderList.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="我的预约" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
			</template>
		</u-navbar>
		<u-tabs class="tabs" :list="titleList" @change="onChange" lineColor="#0077FF" lineWidth="40"></u-tabs>
		<scroll-view :scroll-y="true" v-if="active == 0" class="orderList"
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="reservationList.length == 0?'emptyFlex':''"
			refresher-enabled :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="lower">
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
						<view v-if="item.status == 'U'" class="grayText">已使用</view>
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
			:style="'height: ' + (scrollViewHeight + 'px') + ';'" :class="waitUsedList.length == 0?'emptyFlex':''"
			:refresher-triggered="triggered1" refresher-enabled @refresherrefresh="onRefresh" @scrolltolower="lower">
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

		<scroll-view :scroll-y="true" v-else class="orderList" :style="'height: ' + (scrollViewHeight + 'px') + ';'"
			:class="alreadyUsedList.length == 0?'emptyFlex':''" :refresher-triggered="triggered2" refresher-enabled
			@refresherrefresh="onRefresh" @scrolltolower="lower">
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
						<view class="grayText">已使用</view>
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
				app: getApp(),
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
				},
				searchInfo: {
					pageObj: {
						firstPage: 1,
						secondPage: 1,
						thirdPage: 1
					},
					size: 10,
					status: ''
				},
				triggered: false,
				triggered1: false,
				triggered2: false
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
			// 去详情页
			toDetail(e) {
				let order_no = e.currentTarget.dataset.item.order_no;
				uni.navigateTo({
					url: '/pages/reservationInfo/reservationInfo?order_no=' + order_no,
					events: {
						toChangeReservationState: (order_no) => {
							this.dealWithOrderState(order_no)
						}
					}
				});
			},
			// tab栏切换
			onChange(e) {
				this.active = e.index
				switch (e.index) {
					case 0:
						this.searchInfo.status = ''
						break;
					case 1:
						this.searchInfo.status = 'Y'
						if (this.waitUsedList.length == 0) {
							this.initData()
						}
						break;
					case 2:
						this.searchInfo.status = 'U'
						if (this.alreadyUsedList.length == 0) {
							this.initData()
						}
						break;
				}
			},
			// 计算scroll-view高度
			calculate() {
				let sysInfo = uni.getSystemInfoSync()
				var screenHeight = sysInfo.windowHeight;
				// 获取navbar的高度
				// #ifdef H5
				this.scrollViewHeight = screenHeight - 88
				// #endif
				// #ifdef MP-WEIXIN || APP-PLUS
				this.scrollViewHeight = screenHeight - 88 - sysInfo.statusBarHeight
				// #endif
			},
			// 初始化数据
			async initData(type = '') {
				let userInfo = await this.app.getUserInfo();
				request({
					url: 'wx/get/my/reserve/list',
					method: 'POST',
					data: {
						user_ouid: userInfo.ouid,
						page: this.active == 0 ? this.searchInfo.pageObj.firstPage : (this.active == 1 ?
							this.searchInfo.pageObj.secondPage : this.searchInfo.pageObj.thirdPage),
						size: this.searchInfo.size,
						status: this.searchInfo.status
					}
				}).then(async (res) => {
					let enumInfo = await this.app.getEnum();
					let reservationList = res.data.list ? res.data.list : [];
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
									date: con.reserve_date,
									timeRange: enumInfo[contentItem]
								});
							});
						});
						con.siteNum = siteNum;
						con.hour = hour;
						con.timeList = timeList;
						con.shop_avatar = this.app.globalData.httpUrl + con.shop_avatar
					});
					if (reservationList.length < 10 && type == 'lower') {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据了'
						})
					}
					switch (this.active) {
						case 0:
							this.reservationList = (type == 'refresh' ? reservationList : this
								.reservationList.concat(
									reservationList))
							this.triggered = false
							break;
						case 1:
							this.waitUsedList = (type == 'refresh' ? reservationList : this
								.waitUsedList
								.concat(reservationList))
							this.triggered1 = false
							break;
						case 2:
							this.alreadyUsedList = (type == 'refresh' ? reservationList : this
								.alreadyUsedList.concat(
									reservationList))
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
			// 修改预约状态
			dealWithOrderState(order_no) {
				// 全部模块
				if (this.active == 0) {
					let index = this.reservationList.findIndex(item=>{
						return item.order_no == order_no;
					})
					if(index>-1){
						this.reservationList[index].status = 'C';
						let resI = this.waitUsedList.findIndex(item=>{
							return item.order_no == order_no;
						})
						if(resI>-1){
							this.waitUsedList.splice(resI,1)
						}
					}
				} else {
					// 待使用模块
					let index = this.waitUsedList.findIndex(item=>{
						return item.order_no == order_no;
					})
					if(index>-1){
						this.waitUsedList.splice(index,1)
						let resI = this.reservationList.findIndex(item=>{
							return item.order_no == order_no;
						})
						if(resI>-1){
							this.reservationList[resI].status = 'C'
						}
					}
				}
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