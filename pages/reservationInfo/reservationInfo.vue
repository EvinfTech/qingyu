<template>
	<!-- pages/reservationInfo/reservationInfo.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="预约信息" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<scroll-view :scroll-y="true" :style="'height: ' + (scrollViewHeight + 'px') + ';'" style="padding-top: 14rpx;">
			<view class="codeBox flex flex-direction align-center justify-center">
				<view class="codeImg" :style="{'opacity':(gymnasiumInfo.status == 'U'||gymnasiumInfo.status == 'C')?'0.2':'1'}">
					<image :src="codeImg" class="w-full h-full" mode="" />
				</view>
				<view :class="(gymnasiumInfo.status == 'U'||gymnasiumInfo.status == 'C')? 'disabledText' : 'codeText'">
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
				<view style="margin-bottom: 18rpx">备注：{{ gymnasiumInfo.remark }}</view>
				<view>创建时间：{{ gymnasiumInfo.createTime }}</view>
			</view>
		</scroll-view>
		<view class="bottomBox flex align-center justify-end">
			<view class="cancelBtn flex align-center justify-center" v-if="gymnasiumInfo.status == 'C'">已取消</view>
			<view class="cancelBtn flex align-center justify-center" v-if="gymnasiumInfo.status == 'U'">已使用</view>
			<view v-if="gymnasiumInfo.status != 'U'&&gymnasiumInfo.status != 'C'"
				class="cancelBtn flex align-center justify-center" @tap="toCancel">取消预约</view>
		</view>
		<u-modal :show="show" title="提示" content="确定要取消预约吗？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
	</view>
</template>

<script>
	// pages/reservationInfo/reservationInfo.ts
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app:null,
				show: false,//控制弹框
				order_no: '',//订单号
				code: '',//二维码值
				codeImg: '',//二维码
				scrollViewHeight: 0,
				gymnasiumInfo: {
					name: '',
					address: '',
					img: '',
					sizteNo: 0,
					hour: 0,
					siteList: [],
					person: '',
					phone: '',
					createTime: '',
					status: '',
					siteNum: '',
					remark:''
				}//场馆信息
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.app = getApp()
			this.$nextTick(() => {
				this.getCenterHeight();
			})
			if (options.order_no) {
				this.order_no = options.order_no
			}
			this.initData();
		},
		methods: {
			// 初始化数据
			initData() {
				let enumInfo = this.app.globalData.enumInfo;
				request({
					url: 'wx/get/reserve/detail',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then((res) => {
					let data = res.data;
					let site_detail = data.site_detail ? data.site_detail : [];
					let siteList = [];
					let hour = 0;
					let siteNum = site_detail ? site_detail.length : 0;
					this.code = data.check_no;
					this.codeImg = this.app.globalData.httpUrl + data.check_qr
					site_detail.forEach((item) => {
						item.time_enum.forEach((con) => {
							siteList.push({
								siteName: item.site_name,
								date: data.reserve_date,
								startTime: enumInfo[con].split('~')[0],
								endTime: enumInfo[con].split('~')[1]
							});
							hour = hour + 1;
						});
					});
					this.gymnasiumInfo.name = data.shop_name
					this.gymnasiumInfo.address = data.shop_address
					this.gymnasiumInfo.img = this.app.globalData.httpUrl + data.shop_avatar
					this.gymnasiumInfo.person = data.user_name
					this.gymnasiumInfo.phone = data.user_phone
					this.gymnasiumInfo.createTime = data.gmt_creat_order
					this.gymnasiumInfo.siteList = siteList
					this.gymnasiumInfo.siteNum = siteNum
					this.gymnasiumInfo.hour = hour
					this.gymnasiumInfo.status = data.status
					this.gymnasiumInfo.remark = data.remark
				});
			},
			// 取消预约
			toCancel() {
				this.show = true
			},
			// 取消 取消预约
			cancel() {
				this.show = false
			},
			// 确定 取消预约
			confirm() {
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
							const eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('toChangeReservationState', this.order_no)
							setTimeout(() => {
								this.initData();
							}, 2000);
						}
					});
				});
			},
			// 获取中间内容高度
			getCenterHeight() {
				let sysInfo = uni.getSystemInfoSync()
				var screenHeight = sysInfo.windowHeight;
				let that = this;
				// 获取navbar的高度
				let query = uni.createSelectorQuery();
				query
					.select('.bottomBox')
					.boundingClientRect((bottomRect) => {
						// #ifdef H5
						that.scrollViewHeight = screenHeight - 44 - bottomRect
							.height
						// #endif
						// #ifdef MP-WEIXIN || APP-PLUS
						that.scrollViewHeight = screenHeight - 44 - bottomRect
							.height - sysInfo.statusBarHeight
						// #endif
					})
					.exec();
			}
		}
	});
</script>
<style scoped>
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.codeBox {
		height: 420rpx;
		background-color: #fff;
	}

	.codeImg {
		width: 296rpx;
		height: 296rpx;
	}

	.codeText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 40rpx;
		font-weight: 600;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.disabledText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 40rpx;
		font-feature-settings: 'kern' on;
		color: #ddd;
		text-decoration: line-through;
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
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-bottom: 18rpx;
	}

	.gymnasiumText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
		margin-bottom: 6rpx;
	}

	.siteBox {
		margin-top: 20rpx;
		margin-bottom: 14rpx;
		background-color: #fff;
		padding: 12rpx 18rpx 40rpx 18rpx;
	}

	.siteBoxTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.siteListBox {
		margin-top: 24rpx;
	}

	.siteListItem {
		width: 348rpx;
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
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.dateBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.timeRangeBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
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
		font-feature-settings: 'kern' on;
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