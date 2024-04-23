<template>
	<!-- pages/reservation/reservation.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="预约场地" :safeAreaInsetTop="true" leftIconSize="0" :fixed="false">
		</u-navbar>
		<u-tabs :list="list" lineWidth="18" lineHeight="3" lineColor="0077FF" @change="tabChange"></u-tabs>
		<scroll-view class="content" :scroll-y="true" :style="'height: ' + viewHeight + 'px;'" v-show="active==0">
			<u-empty text="暂无场馆" mode="list" marginTop="100" v-if="gymnasiumList.length == 0" />
			<view class="recommendBox" v-else>
				<view class="recommendBoxItem" wx-for-item="item" :data-item="item" @tap="gumnasiumDetail"
					v-for="(item, index) in gymnasiumList" :key="index">
					<view class="flex align-center h-full">
						<image :src="item.avatar" class="gymnasiumImg" mode="" />
						<view class="flex flex-direction justify-between h-full flex-1"
							style="margin-left: 20rpx; height: 200rpx">
							<view>
								<view class="gymnasiumName">
									{{ item.shop_name }}
								</view>
								<view class="flex align-center">
									<view class="commonTitleBox" style="background-color: #29cc65">订</view>
									<view class="commonTitleBox" style="background-color: #ff5634">惠</view>
									<view class="commonTitleBox" style="background-color: #5f2aff">赛</view>
									<view class="commonTitleBox" style="background-color: #e3c377">活</view>
									<view class="commonTitleBox" style="background-color: #fa3e3e">爆</view>
								</view>
							</view>
							<view class="w-full">
								<view class="flex align-end">
									<view
										style="font-family: Alibaba PuHuiTi 2; font-weight: 400; font-size: 28rpx; color: #ff5634; margin-bottom: 2rpx">
										￥</view>
									<text
										style="font-family: Alibaba PuHuiTi 2; font-weight: 700; font-size: 40rpx; color: #ff5634">{{ item.bottom_price }}</text>
									<view
										style="font-family: Alibaba PuHuiTi 2; font-weight: 400; font-size: 20rpx; color: #b1b4c3; margin-left: 4rpx; margin-bottom: 4rpx">
										起
									</view>
								</view>
								<view class="flex align-center flex-1 justify-between">
									<view class="location">
										{{ item.address }}
									</view>
									<view class="distance">
										{{ item.distance }}
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="flex align-center w-full" style="margin-top: 24rpx">
						<!-- <view class="commonBtn">
                                {{item.siteNum}}片
                            </view>
                            <view class="commonBtn">
                                {{item.floor}}
                            </view> -->
						<view class="plainBtn" :data-item="item" v-for="(item, index1) in item.tag" :key="index1">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view class="content" :scroll-y="true" :style="'height: ' + viewHeight + 'px;'" v-show="active==1">
			<u-empty text="暂无场次" mode="list" marginTop="100" v-if="sessionList.length == 0" />
			<view class="recommendBox" v-else></view>
		</scroll-view>
	</view>
</template>

<script>
	// pages/reservation/reservation.ts
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
				active: 0,
				viewHeight: 0,
				gymnasiumList: [],
				list: [{
					name: '场馆'
				}, {
					name: '场次'
				}],
				sessionList: [
					// {
					//     timeRange:'8:00~9:00',
					//     gymnasiumList:[
					//         {
					//             shop_name:'奇点羽毛球馆',//球馆名称
					//             price:500,//球场价格
					//         }
					//     ]
					// }
				]
			};
		},
		options: {
			addGlobalClass: true
		},
		mounted() {
			// 处理小程序 ready 生命周期
			this.$nextTick(() => this.ready());
		},
		props: {
			scrollViewHeight: {
				type: Number,
				default: 0
			}
		},
		methods: {
			tabChange(e) {
				this.active = e.index;
			},
			ready() {
				this.calculateHeight();
				this.initData();
			},
			initData() {
				request({
					url: 'wx/get/shop/list',
					method: 'POST'
				}).then((res) => {
					let gymnasiumList = res.data;
					gymnasiumList.forEach((item) => {
						item.distance = calcDistance(item.latitude, item.longitude, this.app.globalData
							.userInfo.latitude, this.app.globalData.userInfo.longitude);
					});
					this.gymnasiumList = gymnasiumList
				});
			},

			onChange(event) {},
			onClickLeft() {},

			gumnasiumDetail(e) {
				let shop_id = e.currentTarget.dataset.item.id;
				uni.navigateTo({
					url: '/pages/gymnasiumInfo/gymnasiumInfo?shop_id=' + shop_id
				});
			},

			calculateHeight() {
				var that = this;
				let query = uni.createSelectorQuery().in(that);
				query
					.select('.nav-bar')
					.boundingClientRect((navRect) => {
						that.viewHeight = that.scrollViewHeight - navRect.height - 59
					})
					.exec();
			}
		},
		created: function() {}
	});
</script>
<style scoped>
	/* pages/reservation/reservation.wxss */
	.page {
		width: 100%;
		height: 100%;
	}

	.nav-class {
		width: 300rpx;
	}

	.tab-class {
		font-family: Alibaba PuHuiTi 2 !important;
		font-size: 28rpx !important;
		color: #8d93a6 !important;
	}

	.tab-active-class {
		font-size: 36rpx !important;
		font-weight: 500 !important;
		color: #0b1526 !important;
	}

	.recommendBox {
		padding: 0 20rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.recommendBoxItem {
		margin-bottom: 20rpx;
		/* height: 300rpx; */
		height: auto;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
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

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-weight: bold;
		font-feature-settings: 'kern'on;
		color: #000000;
		margin-bottom: 4rpx;
	}

	.commonBtn {
		padding: 4rpx 8rpx;
		background: #009678;
		border-radius: 6rpx;
		margin-right: 6rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern'on;
		color: #ffffff;
	}

	.commonTitleBox {
		width: 28rpx;
		height: 28rpx;
		border-radius: 4rpx;
		margin-right: 8rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern'on;
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
		font-feature-settings: 'kern'on;
		color: #b1b4c3;
		margin-right: 6rpx;
	}

	.location,
	.distance {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-feature-settings: 'kern'on;
		color: #b1b4c3;
	}
</style>
