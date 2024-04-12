<template>
	<!-- pages/reservationInfo/reservationInfo.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="预约信息" :safeAreaInsetTop="true" :autoBack="true" :fixed="false">
		</u-navbar>
		<scroll-view :scroll-y="true" :style="'height: ' + (scrollViewHeight + 'px') + ';'">
			<view class="codeBox flex flex-direction align-center justify-center">
				<image src="/static/images/order/codeDemo.png" style="width: 296rpx; height: 296rpx" mode="" />
				<view class="codeText">
					{{ code }}
				</view>
			</view>
			<view class="gymnasiumBox flex align-center">
				<view class="gymnasiumImg">
					<image class="w-full h-full" :src="gymnasiumInfo.img" mode="" />
				</view>
				<view class="flex flex-direction align-start">
					<view class="gymnasiumName">
						{{ gymnasiumInfo.name }}
					</view>
					<view class="gymnasiumText">场馆地址：{{ gymnasiumInfo.address }}</view>
					<view class="gymnasiumText">预约场地：{{ gymnasiumInfo.siteNum }}场({{ gymnasiumInfo.hour }}小时)</view>
				</view>
			</view>
			<view class="siteBox">
				<view class="siteBoxTitle">预约场次</view>
				<view class="siteListBox flex align-center flex-wrap">
					<view class="siteListItem flex flex-direction align-start"
						v-for="(item, index) in gymnasiumInfo.siteList" :key="index">
						<view class="siteNo">
							{{ item.siteName }}
						</view>

						<view class="flex align-center">
							<view class="dateBox">
								{{ item.date }}
							</view>
							<view class="timeRangeBox">{{ item.startTime }}-{{ item.endTime }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="personInfo">
				<view style="margin-bottom: 18rpx">预约人：{{ gymnasiumInfo.person }}</view>
				<view style="margin-bottom: 18rpx">手机号码：{{ gymnasiumInfo.phone }}</view>
				<view>创建时间：{{ gymnasiumInfo.createTime }}</view>
			</view>
		</scroll-view>
		<view class="bottomBox flex align-center justify-end">
			<view class="cancelBtn flex align-center justify-center" v-if="gymnasiumInfo.status == 'C'">已取消</view>
			<view v-else class="cancelBtn flex align-center justify-center" @tap="toCancel">取消预约</view>
		</view>
		<u-modal :show="show" title="提示" content="确定要取消预约吗？" :showCancelButton="true" @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script >
	 
	// pages/reservationInfo/reservationInfo.ts
	const app =getApp()
	import {
		request
	} from '../../utils/request';
	export default  ({
		data() {
			return {
				show:false,
				order_no: '',
				code: 812356,
				scrollViewHeight: 0,
				gymnasiumInfo: {
					name: '一家球馆',
					address: '中南金石国际广场',
					img: '/static/images/home/gymnasiumPhoto.png',
					sizteNo: 2,
					hour: 4,

					siteList: [{
							siteNo: 1,
							date: '08-08',
							startTime: '11:00',
							endTime: '14:00'
						},
						{
							siteNo: 1,
							date: '08-08',
							startTime: '11:00',
							endTime: '14:00'
						},
						{
							siteNo: 1,
							date: '08-08',
							startTime: '11:00',
							endTime: '14:00'
						}
					],

					person: '哈哈',
					phone: '135****6936',
					createTime: '2023-08-08 12:23:36',
					status: '',
					siteNum: ''
				}
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options ) {
			this.$nextTick(()=>{
				this.getNavBarHeight();
			})
			if (options.order_no) {
				this.order_no = options.order_no
			}
			this.initData();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady() {},
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
			initData() {
				let enumInfo = app.globalData.enumInfo;
				request({
					url: 'wx/get/reserve/detail',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then((res ) => {
					let data = res.data;
					let site_detail = data.site_detail ? data.site_detail : [];
					let siteList = [];
					let hour = 0;
					let siteNum = site_detail ? site_detail.length : 0;
					site_detail.forEach((item ) => {
						item.time_enum.forEach((con ) => {
							siteList.push({
								siteName: item.site_name,
								date: data.gmt_create,
								startTime: enumInfo[con].split('~')[0],
								endTime: enumInfo[con].split('~')[1]
							});
							hour = hour + 1;
						});
					});
					this.gymnasiumInfo.name = data.shop_name
					this.gymnasiumInfo.address = data.shop_address
					this.gymnasiumInfo.img = data.shop_avatar
					this.gymnasiumInfo.person = data.user_name
					this.gymnasiumInfo.phone = data.user_phone
					this.gymnasiumInfo.createTime = data.gmt_create_order
					this.gymnasiumInfo.siteList = siteList
					this.gymnasiumInfo.siteNum = siteNum
					this.gymnasiumInfo.hour = hour
					this.gymnasiumInfo.status = data.status
				});
			},

			toCancel() {
				this.show = true
			},

			onClickLeft() {
				uni.navigateBack();
			},
			cancel(){
				this.show = false
			},
			confirm(){
				request({
					url: 'wx/cancel/order',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then((res) => {
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

			getNavBarHeight() {
				var screenHeight = uni.getSystemInfoSync().windowHeight;
				let that = this;
				// 获取navbar的高度
				let query = uni.createSelectorQuery();
				query
					.select('.nav-bar')
					.boundingClientRect((navRect) => {
						let query2 = uni.createSelectorQuery();
						query2
							.select('.bottomBox')
							.boundingClientRect((bottomRect) => {
								that.scrollViewHeight= screenHeight - navRect.height - bottomRect
										.height
							})
							.exec();
					})
					.exec();
			}
		}
	});
</script>
<style scoped>
	/* pages/reservationInfo/reservationInfo.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.codeBox {
		margin-top: 14rpx;
		height: 420rpx;
		background-color: #fff;
	}

	.codeText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 40rpx;
		font-weight: 600;
		font-feature-settings: 'kern'on;
		color: #333333;
	}

	.gymnasiumBox {
		padding: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		margin-top: 14rpx;
	}

	.gymnasiumImg {
		width: 132rpx;
		height: 132rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 32rpx;
		letter-spacing: 0px;
		font-feature-settings: 'kern'on;
		color: #333333;
		margin-bottom: 18rpx;
	}

	.gymnasiumText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern'on;
		color: #9e9e9e;
		margin-bottom: 6rpx;
	}

	.siteBox {
		margin-top: 20rpx;
		margin-bottom: 14rpx;
		background-color: #fff;
		padding: 12rpx 20rpx 40rpx 20rpx;
	}

	.siteBoxTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		font-feature-settings: 'kern'on;
		color: #333333;
	}

	.siteListBox {
		margin-top: 24rpx;
	}

	.siteListItem {
		width: 344rpx;
		height: 106rpx;
		border-radius: 10rpx;
		background-color: #f6f8fa;
		padding: 18rpx 28rpx;
		box-sizing: border-box;
		opacity: 1;
		margin-right: 22rpx;
		margin-bottom: 20rpx;
	}

	.siteListItem:nth-child(2n) {
		margin-right: 0;
	}

	.siteNo {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: 500;
		font-feature-settings: 'kern'on;
		color: #333333;
	}

	.dateBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern'on;
		color: #9e9e9e;
	}

	.timeRangeBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern'on;
		color: #333333;
		margin-left: 12rpx;
	}

	.personInfo {
		margin-top: 14rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern'on;
		color: #b1b4c3;
		background-color: #fff;
		box-sizing: border-box;
		padding: 26rpx 20rpx;
	}

	.bottomBox {
		position: fixed;
		width: 100%;
		height: 156rpx;
		left: 0;
		bottom: 0;
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.cancelBtn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 40rpx;
		opacity: 1;
		border: 1px solid #b1b4c3;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #b1b4c3;
	}
</style>
