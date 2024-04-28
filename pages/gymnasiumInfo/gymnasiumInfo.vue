<template>
	<!-- pages/gymnasiumInfo/gymnasiumInfo.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="球馆信息" :autoBack="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
			</template>
		</u-navbar>
		<view style="margin-top: 28rpx; padding: 0 20rpx 30rpx; background-color: #fff">
			<view class="flex align-center justify-between w-full">
				<view class="gymnasiumName">
					{{ gymnasiumInfo.gymnasiumName }}
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="shareBox flex align-center justify-center">
					<button open-type="share" class="specailBtn">
						<image src="/static/images/common/share.svg" style="width: 30rpx; height: 30rpx" mode="" />
					</button>
				</view>
				<!-- #endif -->

			</view>
			
			<view class="imgScroll w-full">
				<view class="w-full" style="position: relative">
					<scroll-view :scroll-x="true" class="w-full h-full">
						<view class="flex align-center" style="position: relative">
							<view class="imgScrollItem" :data-item="index" @tap="previewImg"
								v-for="(item, index) in gymnasiumInfo.gymnasiumImgList" :key="index">
								<image :src="item" mode="" style="width: 260rpx; height: 164rpx" />
							</view>
						</view>
					</scroll-view>
					<view class="album flex align-center justify-center" @tap="toAlbum">
						<view style="margin-left: 8rpx; margin-right: 2rpx">相册</view>
						<view>
							<van-icon name="arrow" />
						</view>
					</view>
				</view> 
			</view>
			<view class="flex align-center justify-between" style="margin-bottom: 20rpx">
				<view class="commonLeftLabel">
					<text>场馆电话：</text>
					<text>{{ gymnasiumInfo.phone }}</text>
				</view>
				<view class="commonRightOpe" @tap="toCall">拨打</view>
			</view>
			<view class="flex align-center" style="margin-bottom: 20rpx">
				<view class="commonLeftLabel">
					<text>营业时间：</text>
					<text>{{ gymnasiumInfo.businessHours }}</text>
				</view>
			</view>
			<view class="flex align-center justify-between">
				<view class="commonLeftLabel">
					<text>场馆地址：</text>
					<text>{{ gymnasiumInfo.location }}</text>
				</view>
				<view class="commonRightOpe flex-shirnk" @tap="toMap">查看</view>
			</view>
			<view class="hardwareBox flex align-center flex-wrap justify-start">
				<view class="hardwareItem flex align-center" v-for="(item, index) in gymnasiumInfo.hardwareFacilities"
					:key="index">
					<view class="flex align-center w-full h-full justify-center">
						<image v-if="item.icon" :src="item.icon" mode=""
							style="width: 25px; height: 25px; margin-right: 4px" />
						<image v-else src="/static/static/images/common/wifi.svg" mode=""
							style="width: 25px; height: 25px; margin-right: 4px" />
						<text class="iconText">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="venueReservation">
			<view class="venueReservationTitle">场地预定</view>
			<view class="venueReservationList w-full">
				<scroll-view :scroll-x="true" class="h-full w-full">
					<view class="w-full" style="white-space: nowrap">
						<view :class="'venueReservationItem ' + (item.residue == 0 ? 'isFullBorder' : '')"
							 @tap="toDetail(item)"
							v-for="(item, index) in gymnasiumInfo.venueReservationList" :key="index">
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
		formatNumber
	} from '../../utils/util';
	export default ({
		data() {
			return {
				app:getApp(),
				gymnasiumInfo: {
					gymnasiumImg: '/static/images/home/gymnasiumPhoto.png',
					gymnasiumName: '我看看怎么个事',
					latitude: '',
					longitude: '',
					phone: '0532-8186886',
					location: '青岛市黄岛区金石国际北楼1611',
					businessHours: '周一至周日 07:00-22:00',
					distance: 200,
					siteNum: 10,
					floor: '木龙骨地板',
					facilities: ['停车场', '空调', '更衣室'],
					currentImgIndex: -1,
					gymnasiumImgList: [
						'https://img1.baidu.com/it/u=1087984015,2094611444&fm=253&fmt=auto&app=138&f=JPEG?w=707&h=500',
						'https://img2.baidu.com/it/u=2663528246,3127026870&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff775610c-310c-4f5a-9ae4-94bdc145c7e6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701845453&t=9030131f1e5a2ea40630a08433886371'
					],
					hardwareFacilities: [],
					venueReservationList: []
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
		methods:{
			// 初始化数据
			async initData() {
				// 获取门店信息
				this.gymnasiumInfo = await this.app.getStoreInfo()
				this.getReservationInfo();
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
						item.basicPrice = obj[`${item.date}`].money/100;
					});
					this.gymnasiumInfo.venueReservationList = list
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

			onClickLeft() {
				uni.navigateBack();
			},
			// 预览图片
			previewImg(e) {
				this.gymnasiumInfo.currentImgIndex = e.currentTarget.dataset.item
				uni.previewImage({
					urls: this.gymnasiumInfo.gymnasiumImgList,
					current: e.currentTarget.dataset.item
				});
			},

			// 去相册
			toAlbum() {
				uni.setStorageSync('album', JSON.stringify(this.gymnasiumInfo.gymnasiumImgList));
				uni.navigateTo({
					url: '/pages/album/album'
				});
			},

			// 打电话
			toCall() {
				uni.makePhoneCall({
					phoneNumber: this.gymnasiumInfo.phone
				});
			},

			// 地图位置
			toMap() {
				var that = this;
				uni.openLocation({
					latitude: that.gymnasiumInfo.latitude,
					longitude: that.gymnasiumInfo.longitude,
					scale: 18,
					name: this.gymnasiumInfo.location
				});
			},

			// 去场地预约详情
			toDetail(e) {
				let date = e.fullDate;
				if(e.residue==0){
					uni.showToast({
						icon:'none',
						title:'暂无场地'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/reservationDetail/reservationDetail?date=' + date 
				});
			},
		}
	});
</script>
<style scoped>
	/* pages/gymnasiumInfo/gymnasiumInfo.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 48rpx;
		font-weight: bold;
		font-feature-settings: 'kern' on;
		color: #000000;
		line-height: 68rpx;
	}

	.shareBox {
		width: 48rpx;
		height: 48rpx;
		border-radius: 3px;
		background: linear-gradient(180deg, #ffc300 0%, #ff8f1f 100%), #ffc300;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
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

	.imgScroll {
		height: 164rpx;
		margin-bottom: 40rpx;
	}

	.imgScrollItem {
		margin-right: 16rpx;
		border-radius: 4rpx;
	}

	.album {
		position: absolute;
		right: 20rpx;
		bottom: 12rpx;
		width: 90rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: rgba(21, 21, 21, 0.6);
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern' on;
		color: #ffffff;
	}

	.commonLeftLabel {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}

	.commonRightOpe {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		text-align: right;
		letter-spacing: 0em;
		text-decoration: underline;
		font-feature-settings: 'kern' on;
		color: #0077ff;
	}

	.hardwareBox {
		background-color: #fafcfe;
		padding: 20rpx 10rpx;
		border-radius: 16rpx;
		margin-top: 34rpx;
		font-size: 24rpx;
	}

	.hardwareItem {
		padding: 10rpx 0;
		width: 25%;
		box-sizing: border-box;
		/* margin-bottom: 20rpx; */
	}

	.iconText {
		flex-shrink: 0;
	}

	.venueReservation {
		margin-top: 12rpx;
		background-color: #fff;
		padding: 20rpx;
	}

	.venueReservationTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0em;
		color: #121836;
		margin-bottom: 16rpx;
	}

	.venueReservationList {
		height: 208rpx;
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