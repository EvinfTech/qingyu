<template>
	<!-- pages/mine/mine.wxml -->
	<view class="page" :style="'padding-top: ' + (topHeight + 'px') + ';'">
		<view class="basicTop flex align-center justify-between">
			<view class="flex align-center">
				<image :src="userInfo.avatar" style="width: 128rpx; height: 128rpx; border-radius: 50%" mode="" />
				<view class="flex flex-direction align-start" style="margin-left: 26rpx" @tap="toInfoEdit">
					<view class="nickName flex align-center">
						{{ userInfo.name }}
						<image v-if="userInfo.vip_type=='储值会员'" src="/static/images/mine/vipIcon.svg"
							style="width: 26rpx; height: 26rpx;margin-left: 3px;" mode="" />
					</view>
					<view class="phone">
						{{ userInfo.phone ? userInfo.phone : '' }}
					</view>
				</view>
			</view>
			<view @tap="toInfoEdit">
				<image src="/static/images/mine/editIcon.svg" style="width: 40rpx; height: 40rpx" mode="" />

			</view>
		</view>
		<!-- <view class="flex align-center statisticsBox">
			<view class="statisticsItem flex flex-direction align-center justify-center"
				v-for="(item, index) in statisticsList" :key="index">
				<view class="numBox">
					{{ item.num }}
				</view>

				<view class="titleBox">
					{{ item.title }}
				</view>
			</view>
		</view> -->
		<view class="vipBox flex align-center justify-between">
			<view class="flex flex-direction align-center">
				<image src="/static/images/mine/vip.svg" style="width: 112rpx; height: 78rpx" mode="" />
				<view class="priceText">余额：{{userInfo.balance}}</view>
			</view>
			<view class="openBtn flex align-center justify-center" @click="toVoucherCenter">
				{{userInfo.vip_type=='储值会员'?'我要充值':'我要开卡'}}
			</view>
		</view>
		<view class="myReservation" style="margin-top: 50rpx;">
			<view class="flex align-center justify-between" @tap="toOrderList">
				<view class="myReservationTitle">
					<u-icon name="order" size="22"></u-icon>
					<text style="margin-left:3px;">我的订单</text>
				</view>
				<view>
					<image src="/static/images/mine/editIcon.svg" style="width: 32rpx; height: 32rpx" mode="" />
				</view>
			</view>
		</view>
		<view class="myReservation">
			<view class="flex align-center justify-between" @tap="toReservationList">
				<view class="myReservationTitle">
					<u-icon name="hourglass" size="22"></u-icon>
					<text style="margin-left:3px;">我的预约</text>
				</view>
				<view>
					<image src="/static/images/mine/editIcon.svg" style="width: 32rpx; height: 32rpx" mode="" />
				</view>
			</view>
			<!-- <view class="reservationBox" v-if="reservationInfo.length > 0">
				<view @tap="toDetail" v-for="(item, index) in reservationInfo" :key="index">
					<view class="flex align-center justify-between">
						<view class="gymnasiumName">
							{{ item.gymnasiumName }}
						</view>
						<view class="reservationDate">{{ item.day }} {{ item.date }}</view>
					</view>

					<view class="flex align-start flex-wrap" style="margin-top: 8rpx">
						<view class="siteText">预约场次:</view>
						<view class="flex-1 flex flex-wrap">
							<view class="siteItem" v-for="(con, j) in item.siteList" :key="j">{{ con.siteNo }}
								{{ con.startTime }} - {{ con.endTime }}
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="myReservation">
			<view class="flex align-center justify-between" @tap="toFeedBack">
				<view class="myReservationTitle">
					<u-icon name="question-circle" size="22"></u-icon>
					<text style="margin-left:3px;">意见反馈</text>
				</view>
				<view>
					<image src="/static/images/mine/editIcon.svg" style="width: 32rpx; height: 32rpx" mode="" />
				</view>
			</view>
		</view>
		<view class="myReservation">
			<view class="flex align-center justify-between" @tap="toAboutUs">
				<view class="myReservationTitle">
					<u-icon name="more-circle" size="22"></u-icon>
					<text style="margin-left:3px;">关于我们</text>
				</view>
				<view>
					<image src="/static/images/mine/editIcon.svg" style="width: 32rpx; height: 32rpx" mode="" />
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="myReservation" style="border: none;">
			<button :show-message-card="true" open-type="contact" @contact="handleContact"
				class="specialBtn flex align-center justify-between">
				<view class="myReservationTitle">
					<u-icon name="kefu-ermai" size="22"></u-icon>
					<text style="margin-left:3px;">联系客服</text>
				</view>
				<view>
					<image src="/static/images/mine/editIcon.svg" style="width: 32rpx; height: 32rpx" mode="" />
				</view>
			</button>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app: null,
				topHeight: 0,
				userInfo: {},
				nickName: '',
				avatar: '',
				phone: '',
				statisticsList: [{
						title: '运动时长',
						num: 0
					},
					{
						title: '累计天数',
						num: 0
					},
					{
						title: '连续天数',
						num: 0
					}
				],
				reservationInfo: [],
			};
		},
		async mounted() {
			this.app = getApp()
			// 处理小程序 ready 生命周期
			let userInfo = await getApp().getUserInfo('reGet')
			this.userInfo = userInfo;
			this.$nextTick(() => this.ready());
			this.statisticsList[0].num = userInfo.total_length
			this.statisticsList[1].num = userInfo.sport_day
			this.statisticsList[2].num = userInfo.total_count
		},
		methods: {
			ready() {
				this.getTopHeight();
				// this.getRecentlyReserve();
			},
			// 处理日期
			dealWithDate(date) {
				const date1 = new Date(date);
				const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
				let day = weekdays[date1.getDay()];
				let date2 = '';
				let dateArr = date.split('-');
				if (dateArr[0] == new Date().getFullYear()) {
					date2 = dateArr[1] + '-' + dateArr[2];
				} else {
					date2 = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
				}
				return {
					date: date2,
					day
				};
			},

			handleContact(e) {
				console.log(e.detail.path);
				console.log(e.detail.query);
			},

			// 获取最近的预约信息
			async getRecentlyReserve() {
				let enumInfo = await this.app.getEnum();
				request({
					url: 'wx/recently/reserve',
					method: 'POST',
					data: {
						user_ouid: this.userInfo.ouid
					}
				}).then((res) => {
					if (!res.data) {
						return false
					}
					let data = res.data;
					let date = data.data.slice(0, 10);
					let dateInfo = this.dealWithDate(date);
					let reservationInfo = [];
					let siteList = [];
					let site_detail = data.site_detail;
					if (site_detail) {
						site_detail.forEach((item) => {
							item.time_enum.forEach((enumCon) => {
								siteList.push({
									siteNo: item.site_name,
									startTime: enumInfo[enumCon]?.split('~')[0],
									endTime: enumInfo[enumCon]?.split('~')[1]
								});
							});
						});
						reservationInfo.push({
							gymnasiumName: data.shop_name,
							date: dateInfo.date,
							day: dateInfo.day,
							order_no: data.order_no,
							siteList
						});
					} else {
						reservationInfo = [];
					}
					this.reservationInfo = reservationInfo
				});
			},
			// 去预约详情页
			toDetail() {
				uni.navigateTo({
					url: '/pages/reservationInfo/reservationInfo?order_no=' + this.reservationInfo[0].order_no
				});
			},
			// 获取高度
			getTopHeight() {
				let res = uni.getSystemInfoSync();
				//#ifdef MP-WEIXIN
				let buttonInfo = uni.getMenuButtonBoundingClientRect();
				let navBarHeight = (buttonInfo.top - res.statusBarHeight) * 2 + buttonInfo.height + res
					.statusBarHeight;
				this.topHeight = navBarHeight
				// #endif
				//#ifndef MP-WEIXIN
				this.topHeight = res.statusBarHeight + 30;
				// #endif

			},
			// 去编辑信息页
			toInfoEdit() {
				uni.navigateTo({
					url: '/pages/infoEdit/infoEdit',
					events: {
						updateInfo: async () => {
							let userInfo = await getApp().getUserInfo('reGet')
							this.userInfo = userInfo;
						}
					}
				});
			},
			// 去充值中心
			toVoucherCenter() {
				uni.navigateTo({
					url: '/pages/voucherCenter/voucherCenter',
					events: {
						updateInfo: async () => {
							let userInfo = await getApp().getUserInfo('reGet')
							this.userInfo = userInfo;
						}
					}
				})
			},
			// 去订单列表页
			toOrderList() {
				uni.navigateTo({
					url: '/pages/orderList/orderList'
				});
			},
			// 去预约列表页
			toReservationList() {
				uni.navigateTo({
					url: '/pages/reservationList/reservationList'
				});
			},
			// 去意见反馈页
			toFeedBack() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				});
			},
			// 去关于我们
			toAboutUs() {
				uni.navigateTo({
					url: '/pages/aboutUs/aboutUs'
				});
			},

			// 点击我的服务操作
			chooseServiceItem(e) {
				let url = '';
				switch (e.currentTarget.dataset.item) {
					case 0:
						url = '/pages/orderList/orderList';
						break;
					case 1:
						url = '/pages/reservationList/reservationList';
						break;
					case 2:
						url = '/pages/settings/settings';
						break;
					case 3:
						url = '/pages/feedback/feedback';
						break;
					case 4:
						uni.openCustomerServiceChat({
							extInfo: {
								url: ''
							},
							corpId: '',
							success(res) {}
						});
						break;
				}
				uni.navigateTo({
					url
				});
			},

		},
	});
</script>
<style scoped>
	/* pages/mine/mine.wxss */
	.page {
		width: 100% !important;
		height: 100% !important;
		overflow-y: auto;
		background-color: #fafafe;
		background-size: 100%;
		box-sizing: border-box;
	}

	.basicTop {
		box-sizing: border-box;
		padding-left: 64rpx;
		padding-right: 48rpx;
	}

	.nickName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 42rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-weight: normal;
		line-height: normal;
		color: #121836;
	}

	.phone {
		font-family: Alibaba PuHuiTi 2;
		font-size: 26rpx;
		font-weight: normal;
		line-height: normal;
		color: #aab0ba;
		margin-top: 8rpx;
	}

	.vipBox {
		height: 65px;
		background-color: #333450;
		border-radius: 10px;
		margin: 28rpx 20rpx;
		padding: 0 26rpx;
	}

	.priceText {
		font-family: PingFang SC;
		font-size: 10px;
		font-variation-settings: "opsz" auto;
		color: #9E9E9E;
		margin-top: -8px;
	}

	.openBtn {
		width: 88px;
		height: 27px;
		border-radius: 50px;
		background: #05D003;
		color: #fff;
		font-family: PingFang SC;
		font-size: 12px;

	}

	.statisticsBox {
		padding: 0 64rpx;
		margin-top: 38rpx;
	}

	.statisticsItem {
		width: 112rpx;
		height: 116rpx;
		margin-right: 144rpx;
	}

	.statisticsItem:nth-child(3) {
		margin-right: 0;
	}

	.numBox {
		font-family: D-DIN;
		font-size: 42rpx;
		font-weight: bold;
		line-height: normal;
		letter-spacing: 0em;
		/* fonts/主色/深蓝色 */
		color: #282c38;
		height: 46rpx;
		line-height: 46rpx;
	}

	.titleBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		text-align: center;
		letter-spacing: 0em;
		color: #aab0ba;
		height: 34rpx;
		line-height: 34rpx;
		margin-top: 8rpx;
	}

	.myReservation {
		margin: 0rpx 38rpx 0rpx 34rpx;
		background-color: #fff;
		padding: 28rpx 20rpx;
		border-bottom: 1rpx solid #eee;
		/* border-radius: 20rpx; */
	}

	.myReservationTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #121836;
		display: flex;
		align-items: center;
	}

	.reservationBox {
		padding: 10rpx;
		background-color: #f6f8fa;
		margin-top: 24rpx;
		border-radius: 6rpx;
	}

	.gymnasiumName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: normal;
		line-height: normal;
		font-feature-settings: 'kern' on;
		color: #151515;
	}

	.reservationDate {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		text-align: right;
		letter-spacing: 0em;

		font-feature-settings: 'kern' on;
		color: #6d737c;
	}

	.siteText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
		width: 104rpx;
		margin-right: 16rpx;
	}

	.siteItem {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #0077ff;
		margin-right: 42rpx;
		height: 34rpx;
		line-height: 34rpx;
	}

	.siteItem:nth-child(2n) {
		margin-right: 0;
	}

	.serviceItem {
		margin-right: 70rpx;
		width: 100rpx;
		height: 90rpx;
		margin-bottom: 34rpx;
	}

	.serviceItem:nth-child(4n) {
		margin-right: 0;
	}

	.serviceItemTitle {
		margin-top: 16rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		color: #121836;
	}

	.specialBtn {
		width: 100%;
		height: 42rpx;
		background-color: #fff;
		padding: 0;
	}

	.specialBtn::after {
		border: none;
	}
</style>