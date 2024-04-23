<template>
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false">
			<template #left>
				<image src="/static/images/home/qingyu.svg" mode="" style="width: 180px" />
			</template>
		</u-navbar>
		<view class="banner">
			<swiper :indicator-dots="indicatorDots" class="h-full" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<block v-for="(item, index) in swiperList" :key="index">
					<swiper-item>
						<view class="swiper-item h-full">
							<image :src="item" class="w-full h-full" mode="" />
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="flex align-center navBox justify-center">
			<view class="navLeft" @tap="appointmentVenue">
				<image src="/static/images/home/appointment.svg" mode="" class="leftText" />
				<image src="/static/images/home/predetermine.svg" mode="" class="rightIcon" />
				<view class="leftSubText">包场通场</view>
			</view>
			<view class="navRight flex align-center justify-center" @tap="toMine">
				<image src="/static/images/home/mine.svg" mode="" class="leftText" />
				<image src="/static/images/home/infoIcon.svg" mode="" class="rightIcon" />
				<view class="leftSubText">个人信息</view>
			</view>
		</view>
		<view class="indexInfo" :style="{'height':viewHeight+'px'}">
			<view class="commonInfo">
				<view class="gymnasiumName">
					{{storeInfo.gymnasiumName}}
				</view>
				<view class="location">
					{{storeInfo.location}}
				</view>
				<view class="location">
					{{storeInfo.phone}}
				</view>
				<view class="flex align-center justify-between">
					<view class="flex align-center operateItem1" @click="toMap">
						<u-icon name="map-fill" color="#409EFF"></u-icon>
						<view class="operateItem ">
							地图/导航
						</view>
					</view>
					<view class="flex align-center operateItem2" @click="toCall">
						<u-icon name="phone-fill" color="#409EFF"></u-icon>
						<view class="operateItem">
							联系商家
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="commonTitle">
					场馆设施
				</view>
				<view class="commonValue">
					<text>{{ storeInfo.facility?(storeInfo.facility).replace(/\\n/,'\n'):'' }}</text>
				</view>
			</view>
			<view>
				<view class="commonTitle">
					场馆服务
				</view>
				<view class="commonValue">
					<text>{{ storeInfo.serve?(storeInfo.serve).replace(/\\n/,'\n'):'' }}</text>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	import {
		calcDistance
	} from '../../utils/util';
	export default ({
		data() {
			return {
				app:getApp(),
				indicatorDots: true,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				swiperList: ['/static/images/home/topBanner1.png', '/static/images/home/topBanner2.png'],
				viewHeight: 0,
				storeInfo: {}
			};
		},
		/**
		 * 页面的初始数据
		 */
		options: {
			addGlobalClass: true
		},
		props: {
			scrollViewHeight: {
				type: Number,
				default: 0
			},
		},
		mounted() {
			// 处理小程序 ready 生命周期
			this.$nextTick(() => this.ready());
		},
		watch: {
			// 监听高度
			scrollViewHeight: function(val) {
				if (val && val > 0) {
					this.calculatePageHeight()
				}
			},
		},
		methods: {
			// 打电话
			toCall() {
				uni.makePhoneCall({
					phoneNumber: this.storeInfo.phone
				});
			},
			// 地图位置
			toMap() {
				var that = this;
				uni.openLocation({
					latitude: that.storeInfo.latitude,
					longitude: that.storeInfo.longitude,
					scale: 18,
					name: this.storeInfo.location
				});
			},
			ready() {
				this.calculatePageHeight();
			},
			// 计算页面高度
			calculatePageHeight() {
				var that = this;
				let res = uni.getSystemInfoSync()
				let query1 = uni.createSelectorQuery().in(that);
				query1
					.select('.banner')
					.boundingClientRect((bannerRect) => {
						let query2 = uni.createSelectorQuery().in(that);
						query2
							.select('.navBox')
							.boundingClientRect((navBoxRect) => {
								that.viewHeight = that.scrollViewHeight - bannerRect.height - navBoxRect
									.height - 54 - res.statusBarHeight
							})
							.exec();
					})
					.exec();
			},
			// 去订场
			appointmentVenue() {
				uni.navigateTo({
					url: '/pages/gymnasiumInfo/gymnasiumInfo'
				});
			},
			// 去我的
			toMine() {
				this.$emit('navigate', {
					detail: 1
				});
			},
		},
		created: async function() {
			// 获取门店信息
			let gymnasiumInfo = await this.app.getStoreInfo()
			let serveList = [];
			let facilityList = [];
			if (gymnasiumInfo.facility.includes('设施:')) {
				gymnasiumInfo.facility = gymnasiumInfo.facility.split('设施:')[1]
			}
			if (gymnasiumInfo.serve.includes('服务:')) {
				gymnasiumInfo.serve = gymnasiumInfo.serve.split('服务:')[1]
			}
			this.storeInfo = gymnasiumInfo
		},
	});
</script>
<style scoped>
	/* pages/home/home.wxss */
	.page {
		width: 100% !important;
		height: 100% !important;
		background-color: #f6f8fa;
		box-sizing: border-box;
	}

	.banner {
		width: 100%;
		height: 211px;
	}

	.navBox {
		margin: 10px 10rpx 0;
		margin-top: 10px;
		height: 90px;
		position: relative;
		box-sizing: border-box;
	}

	.navLeft {
		width: 170px;
		height: 90px;
		background: #64b0ef;
		border-radius: 10px;
		margin-right: 7px;
		position: relative;
	}

	.navRight {
		width: 170px;
		height: 90px;
		border-radius: 10px;
		background: #65dd9e;
		position: relative;
	}

	.navLeft1 {
		background: #f56c6c;
	}

	.navRight1 {
		background: #f1a532;
	}

	.leftText {
		width: 100px;
		height: 47px;
		position: absolute;
		top: 17px;
		left: -7px;
	}

	.rightIcon {
		width: 80px;
		height: 80px;
		position: absolute;
		top: 50%;
		right: 12px;
		transform: translateY(-50%);
	}

	.navLeftText {
		position: absolute;
		left: 118rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.leftSubText {
		font-family: PingFang SC;
		font-size: 10px;
		color: #ffffff;
		position: absolute;
		bottom: 21px;
		left: 10px;
	}

	.recommendBox {
		padding: 10px;
		background-color: #fff;
		margin-top: 9px;
		box-sizing: border-box;
	}

	.recommendBoxItem {
		margin: 20rpx 0;
		/* height: 300rpx; */
		height: auto;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;
	}

	.recommendTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-weight: 500;
		color: #121836;
	}

	.gymnasiumImg {
		width: 240rpx;
		height: 200rpx;
		border-radius: 20rpx;
	}


	.commonBtn {
		padding: 4rpx 8rpx;
		background: #009678;
		border-radius: 6rpx;
		margin-right: 6rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #ffffff;
	}

	.commonTitleBox {
		width: 28rpx;
		height: 28rpx;
		border-radius: 4rpx;
		margin-right: 8rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.plainBtn {
		padding: 4rpx 8rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		border: 2rpx solid #b1b4c3;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
		margin-right: 6rpx;
	}

	.location,
	.distance {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}

	.menuText {
		font-family: YouSheBiaoTiHei;
		font-size: 30px;
		color: #FFFFFF;
		margin-left: 8px;
		margin-top: 17px;
	}

	.indexInfo {
		background-color: #fff;
		box-sizing: border-box;
		padding: 36rpx 18rpx;
		overflow-y: auto;
	}

	.gymnasiumName {
		font-family: PingFang SC;
		font-size: 20px;
		font-weight: 500;
		line-height: normal;
		font-variation-settings: "opsz" auto;
		color: #333333;
		margin-bottom: 8rpx;
	}

	.location {
		font-family: PingFang SC;
		font-size: 14px;
		font-variation-settings: "opsz" auto;
		color: #8A8A8A;
		margin-bottom: 8rpx;
	}

	.operateItem {
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 500;
		font-variation-settings: "opsz" auto;
		color: #409EFF;
	}

	.operateItem1 {
		margin-left: 60rpx;
	}

	.operateItem2 {
		margin-right: 60rpx;
	}

	.commonTitle {
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 500;
		font-variation-settings: "opsz" auto;
		color: #333333;
		margin-top: 30rpx;
	}

	.commonValue {
		/* 地板：架空实木地板+4.5厘米宝石专用塑胶 */
		font-family: PingFang SC;
		font-size: 14px;
		font-variation-settings: "opsz" auto;
		color: #9E9E9E;
		margin-top: 10rpx;
	}
</style>