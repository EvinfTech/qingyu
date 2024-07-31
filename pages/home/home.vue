<template>
	<view class="page">
		<view class="banner">
			<swiper :indicator-dots="indicatorDots" class="h-full" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<block v-for="(item, index) in swiperList" :key="index">
					<swiper-item>
						<view class="swiper-item h-full">
							<image :src="item" class="w-full h-full" mode="" @click="previewImg(item)" />
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="indexInfo" :style="{'height':viewHeight+'px'}">
			<view class="commonInfo">
				<view class="flex align-center">
					<image :src="storeInfo.shop_avatar" class="storeHeadPhoto"></image>
					<view>
						<view class="gymnasiumName">
							{{storeInfo.gymnasiumName}}
						</view>
						<view class="location">
							营业时间： {{storeInfo.businessHours}}
						</view>
					</view>
				</view>
				<view class="flex align-start" @click="toCall" style="margin:10px 0 8px 0">
					<view class="flex align-center justify-between  flex-shirnk">
						<view class="flex align-center operateItem1">
							<u-icon name="phone-fill"></u-icon>
							<view class="operateItem">
								电话
							</view>
						</view>
					</view>
					<view class="location" style="color: #409EFF;">
						{{storeInfo.phone}}
					</view>
				</view>
				<view class="flex align-start" @click="toMap">
					<view class="flex  operateItem1 align-center  flex-shirnk">
						<u-icon name="map-fill"></u-icon>
						<view class="operateItem">
							地址
						</view>
					</view>
					<view class="location" style="color: #409EFF;">
						{{storeInfo.location}}
					</view>
				</view>
			</view>
			<view v-if="storeInfo.desc">
				<view class="commonTitle">
					场馆简介
				</view>
				<view class="commonValue">
					<text>{{ storeInfo.desc}}</text>
				</view>
			</view>
			<view v-if="storeInfo.facility">
				<view class="commonTitle">
					场馆设施
				</view>
				<view class="commonValue">
					<text>{{ storeInfo.facility?(storeInfo.facility).replace(/\\n/,'\n'):'' }}</text>
				</view>
			</view>
			<view v-if="storeInfo.serve">
				<view class="commonTitle">
					场馆服务
				</view>
				<view class="commonValue">
					<text>{{ storeInfo.serve?(storeInfo.serve).replace(/\\n/,'\n'):'' }}</text>
				</view>
			</view>
			<view class="venueReservationList w-full">
				<scroll-view :scroll-x="true" class="h-full w-full">
					<view class="w-full" style="white-space: nowrap">
						<view :class="'venueReservationItem ' + (item.residue == 0 ? 'isFullBorder' : '')"
							@tap="toDetail(item)" v-for="(item, index) in venueReservationList" :key="index">
							<view
								:class="'venueReservationItemTop flex flex-direction align-center justify-center ' + (item.residue == 0 ? 'isFullBg' : '')">
								<view>
									{{ item.day }}
								</view>
								<view>({{ item.date }})</view>
							</view>

							<view class="venueReservationItemBottom">
								<view class="w-full flex align-center justify-between"
									:style="'margin-bottom: 12rpx;color: ' + (item.residue == 0 ? '#5F5F5F' : '#0077FF')">
									<text>剩余</text>
									<text>{{ item.residue }}</text>
								</view>
								<view class="w-full flex align-center justify-between">
									<text>起订</text>
									<text>￥{{ item.basicPrice }}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	import {
		getNowDate,
		formatNumber,
		calcDistance
	} from '../../utils/util';
	export default ({
		data() {
			return {
				app: getApp(),
				indicatorDots: true,
				vertical: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				swiperList: [],
				viewHeight: 0,
				storeInfo: {},
				venueReservationList: [],
				currentImgIndex: -1,
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
					name: this.storeInfo.location,
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
								that.viewHeight = that.scrollViewHeight - bannerRect.height
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
			// 获取近7天可约场地
			getReservationInfo() {
				request({
					url: 'wx/get/shop/surplus/count',
					method: 'POST',
					data: {
						date: getNowDate('-')
					}
				}).then((res) => {
					let list = this.et7Days();
					let obj = res.data;
					list.forEach((item) => {
						item.residue = obj[`${item.date}`].count;
						item.basicPrice = obj[`${item.date}`].money / 100;
					});
					this.venueReservationList = list
				});
			},
			et7Days() {
				//获取系统当前时间
				let dateList = [];
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 86400 * 1000;
				for (var i = 0; i < 7; i++) {
					var ShowTime = nowTime + i * oneDayTime;
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					dateList.push({
						year: year,
						fullDate: year + '-' + formatNumber(month) + '-' + formatNumber(date),
						date: formatNumber(month) + '-' + formatNumber(date),
						day: i == 0 ? '今日' : '周' + '日一二三四五六'.charAt(myDate.getDay()),
						residue: 5,
						basicPrice: 20
					});
				}
				return dateList;
			},
			// 去场地预约详情
			toDetail(e) {
				let date = e.fullDate;
				if (e.residue == 0) {
					uni.showToast({
						icon: 'none',
						title: '暂无场地'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/reservationDetail/reservationDetail?date=' + date
				});
			},
			// 预览图片
			previewImg(e) {
				this.currentImgIndex = e
				uni.previewImage({
					urls: this.swiperList,
					current: e
				});
			},
		},

		created: async function() {
			// 获取门店信息
			let gymnasiumInfo = await this.app.getStoreInfo('reGet')
			// #ifdef H5
			uni.setNavigationBarTitle({
				title: gymnasiumInfo.gymnasiumName
			})
			// #endif
			let serveList = [];
			let facilityList = [];
			if (gymnasiumInfo.facility.includes('设施:')) {
				gymnasiumInfo.facility = gymnasiumInfo.facility.split('设施:')[1]
			}
			if (gymnasiumInfo.serve.includes('服务:')) {
				gymnasiumInfo.serve = gymnasiumInfo.serve.split('服务:')[1]
			}
			this.storeInfo = gymnasiumInfo
			this.swiperList = this.storeInfo.gymnasiumImgList
			this.getReservationInfo();
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

	.storeHeadPhoto {
		width: 60px;
		height: 60px;
		border-radius: 6px;
		margin-right: 8px;
	}

	.navBox {
		margin: 10px 10px 0;
		height: 90px;
		position: relative;
		box-sizing: border-box;
	}

	.navLeft {
		flex: 1;
		height: 90px;
		background: #64b0ef;
		border-radius: 10px;
		margin-right: 7px;
		position: relative;
	}

	.navRight {
		flex: 1;
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
		padding: 36rpx 24rpx;
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
		font-weight: bold;
	}

	.location {
		font-family: PingFang SC;
		font-size: 14px;
		font-variation-settings: "opsz" auto;
		color: #8A8A8A;
	}

	.operateItem {
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 500;
		font-variation-settings: "opsz" auto;
		margin-left: 2px;
	}

	.operateItem1 {
		margin-right: 4px;
	}

	.commonTitle {
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 500;
		font-variation-settings: "opsz" auto;
		color: #333333;
		margin-top: 30rpx;
		font-weight: bold;
	}

	.commonValue {
		/* 地板：架空实木地板+4.5厘米宝石专用塑胶 */
		font-family: PingFang SC;
		font-size: 14px;
		font-variation-settings: "opsz" auto;
		color: #9E9E9E;
		margin-top: 10rpx;
	}

	.venueReservationList {
		height: 208rpx;
		margin-top: 20px;
	}

	.venueReservationItem {
		width: 160rpx;
		height: 208rpx;
		margin-right: 16rpx;
		border-radius: 10rpx;
		border: 1px solid #0077ff;
		box-sizing: border-box;
		display: inline-block;
	}

	.venueReservationItemTop {
		width: 100%;
		height: 94rpx;
		background-color: #0077ff;
		color: #fff;
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #ffffff;
	}

	.isFullBg {
		background-color: #5f5f5f;
	}

	.isFullBorder {
		border: 1px solid #5f5f5f;
	}

	.venueReservationItemBottom {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		font-feature-settings: 'kern' on;
		color: #5f5f5f;
		padding: 14rpx 10rpx;
	}

	.errorReporting {
		margin-top: 12rpx;
		width: 100%;
		height: 80rpx;
		padding: 0 20rpx;
		background-color: #fff;
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-feature-settings: 'kern' on;
		color: #121836;
		box-sizing: border-box;
	}

	.specailBtn {
		background-color: transparent;
		padding: 0;
	}

	.specailBtn::after {
		border: none;
	}
</style>