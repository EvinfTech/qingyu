<template>
	<!-- pages/orderDetail/orderDetail.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :title="detailType == 'add' ? '确认订单' : '订单详情'" :safeAreaInsetTop="true"
			:autoBack="false" :fixed="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack((type?2:1))"></up-icon>
			</template>
		</u-navbar>
		<u-modal :show="show" title="提示" content="确定要取消此订单？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
		<scroll-view :scroll-y="true" class="w-full" :style="'height: ' + (scrollViewHeight + 'px') + ';'"
			style="padding-top: 14rpx;">
			<view class="payStateBox flex align-center justify-center" v-if="payState == 'N'">
				<image src="/static/images/order/timeLine.svg" mode=""
					style="width: 94rpx; height: 94rpx; margin-right: 20rpx" />
				<view class="flex flex-direction align-start">
					<view class="waitPayText">等待支付</view>
					<view class="waitPayTitle">订单已生成，请在{{emptyTime}}内支付完成</view>
				</view>
			</view>
			<!-- <view class="codeBox flex flex-direction align-center" v-if="payState == 'Y'"
				:style="'height: ' + (payState == 'Y' ? '400rpx' : '484rpx') + ';'">
				<view class="paySuccessText" v-if="payState == 'justPayed'">支付成功</view>
				<view class="codeImgBox">
					<image src="/static/images/order/codeDemo.png" style="width: 296rpx; height: 296rpx" mode="" />
				</view>
				<view class="codeTextBox">
					<text class="codeLabel" style="color: #333333 !important ">验证码:</text>
					{{ code }}
				</view>
			</view> -->
			<view class="topBox">
				<view class="topName">
					{{ gymnasiumInfo.name }}
				</view>
				<view class="flex align-center justify-between" style="margin-bottom: 8rpx; height: 38rpx">
					<view class="commonLeftLabel" @tap="toCall">
						<text>电话：</text>
						<text style="color: #409EFF;">{{ gymnasiumInfo.phone }}</text>
					</view>
				</view>
				<view class="flex align-center justify-between" style="height: 38rpx">
					<view class="commonLeftLabel" @tap="toMap">
						<text>地址：</text>
						<text style="color: #409EFF;">{{ gymnasiumInfo.location }}</text>
					</view>
				</view>
			</view>
			<view class="siteList">
				<view class="siteListTitle">预约场次</view>
				<view style="padding: 0 30rpx">
					<view class="siteListItem" v-for="(item, index) in sessionList" :key="index">
						<view class="flex align-center justify-between">
							<view class="blackText">
								{{ item.siteName }}
							</view>
							<view class="grayText">{{ item.hour }}小时</view>
						</view>

						<view class="flex align-center justify-between" style="margin-top: 12rpx">
							<view class="flex flex-direction">
								<view class="grayText" v-for="(con, j) in item.timeList" :key="j">
									<text>{{ con.date }} {{ con.timeRange }}</text>
								</view>
							</view>
							<view class="blackText">￥ {{ item.price/100 }}</view>
						</view>
					</view>
				</view>
				<view class="flex align-center justify-between" style="padding: 24rpx 20rpx 16rpx">
					<view class="methodText">小计(共{{ sessionList.length }}场)</view>
					<view class="priceText">￥{{ totalPrice/100 }}</view>
				</view>
			</view>
			<view class="orderInfoBox flex flex-direction justify-center">
				<view class="flex align-center">
					<view class="leftLabel">预约人：</view>
					<view class="leftLabel flex align-center">
						<text>{{ person }}</text>
					</view>
				</view>
				<view class="flex align-center" style="margin-top: 12rpx">
					<view class="leftLabel">手机号码：</view>
					<view class="leftLabel flex align-center">
						<text>{{ phone }}</text>
					</view>
				</view>
				<view class="flex align-center" style="margin-top: 12rpx">
					<view class="leftLabel">备注：</view>
					<view class="leftLabel flex align-center">
						<text>{{ remark }}</text>
					</view>
				</view>
				<view class="flex align-center" style="margin-top: 12rpx">
					<view class="leftLabel">订单编号：</view>
					<view class="leftLabel flex align-center">
						<text>{{ order_no }}</text>
						<text class="copyText" @tap="tocopy">复制</text>
					</view>
				</view>
				<view class="flex align-center" style="margin-top: 12rpx">
					<view class="leftLabel">下单时间：</view>
					<view class="leftLabel flex align-center">
						<text>{{ orderTime }}</text>
					</view>
				</view>
				<view class="flex align-center" style="margin-top: 12rpx" v-if="payState == 'Y'">
					<view class="leftLabel">支付时间：</view>
					<view class="leftLabel flex align-center">
						<text>{{ payTime }}</text>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between payMethodBox" v-if="payState == 'N'">
				<view class="methodText">支付方式</view>
				<view class="flex align-center">
					<image src="/static/images/order/wechatIcon.svg" mode=""
						style="width: 36rpx; height: 36rpx; margin-right: 8rpx" />
					<text class="wechatText">微信支付</text>
				</view>
			</view>
			<view class="bottomBox w-full">
				<view class="flex align-center justify-between h-full">
					<view class="flex align-center">
						<view class="totalText">总计：</view>
						<view class="priceText">
							<text>￥</text>
							<text>{{ totalPrice/100 }}</text>
						</view>
					</view>
					<view class="flex align-center justify-end">
						<view class="cancelBtn" @tap="cancelOrder" v-if="payState == 'N'||payState == 'Y'">取消订单</view>
						<view class="useBtn" v-if="payState == 'Y'" @click="toUse">去使用</view>
						<view class="payBtn" v-if="payState == 'N'" @click="toPay">确认支付</view>
						<view v-else-if="payState == 'C'" class="grayText" style="font-size: 32rpx">已取消</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	import {
		formatNumber
	} from '../../utils/util';
	// 引入支付混入
	import payment from '@/mixins/pay.js';
	export default ({
		mixins:[payment],
		data() {
			return {
				app: getApp(),
				order_no: '',
				detailType: '',
				//订单详情类型
				gymnasiumInfo: {
					name: '',
					phone: '',
					location: '',
					latitude: '',
					longitude: ''
				},
				show: false,
				sessionList: [],
				orderTime: '',
				//下单时间
				payTime: '',
				totalPrice: 0,
				//总价
				payState: '',
				code: 812356,
				//验证码
				//scrollview高度
				scrollViewHeight: 0,
				con: {
					date: '',
					timeRange: ''
				},
				type: '',
				person: '', //预约人
				phone: '', //预约人联系电话
				remark: '', //备注
				emptyTime: '15:00', //支付剩余时间
				timer: null, //定时器
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.order_no = options.order_no;
			this.type = options.type ? options.type : ''
			this.detailType = options.type;
			this.$nextTick(() => {
				this.getNavBarHeight();
			})
			this.initData();
		},
		onUnload(){
			// 页面销毁如果有定时器存在，清除定时器
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			async initData() {
				let enumInfo = await this.app.getEnum();
				request({
					url: 'wx/get/order/detail',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then((res) => {
					let data = res.data;
					let site_detail = data.site_detail ? data.site_detail : [];
					let sessionList = [];
					site_detail.forEach((con) => {
						let timeList = [];
						con.time_enum.forEach((content) => {
							timeList.push({
								date: data.reserve_date,
								timeRange: enumInfo[content]
							});
						});
						sessionList.push({
							hour: con.time_enum.length,
							price: con.money,
							siteName: con.site_name,
							timeList: timeList
						});
					});
					this.gymnasiumInfo.name = data.shop_name
					this.gymnasiumInfo.phone = data.shop_phone
					this.gymnasiumInfo.location = data.shop_address
					this.gymnasiumInfo.latitude = data.latitude
					this.gymnasiumInfo.longitude = data.longitude
					this.orderTime = data.gmt_creat_order
					this.payTime = data.gmt_pay
					this.totalPrice = data.money
					this.payState = data.status
					this.sessionList = sessionList
					this.person = data.user_name
					this.phone = data.user_phone
					this.remark = data.remark
					if (data.status == 'N') {
						this.setPayTimer(data.gmt_creat_order)
					}else{
						clearInterval(this.timer);
						this.timer = null;
						this.emptyTime = '15:00';
					}
				});
			},
			// 设置支付倒计时
			setPayTimer(createTime) {
				this.calateTimeDiff(createTime)
				this.timer = setInterval(() => {
					this.calateTimeDiff(createTime)
				}, 500)
			},
			// 计算时间差
			calateTimeDiff(createTime){
				let createTimeStamp = (new Date(createTime)).getTime();
				let nowTime = Date.now();
				let diff = Math.floor((nowTime - createTimeStamp)/1000);
				if (diff <= 15 * 60) {
					let minutes = formatNumber(Math.floor((15*60-diff) / 60));
					let seconds = formatNumber((15*60-diff) % 60);
					this.emptyTime = `${minutes}:${seconds}`;
				} else {
					clearInterval(this.timer)
					this.timer = null;
					this.payState = 'C';
					this.emptyTime = '15:00'
				}
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
								that.scrollViewHeight = screenHeight - navRect.height - bottomRect.height
							})
							.exec();
					})
					.exec();
			},

			// 打电话
			toCall() {
				uni.makePhoneCall({
					phoneNumber: this.gymnasiumInfo.phone //仅为示例，并非真实的电话号码
				});
			},

			// 地图位置
			toMap() {
				uni.openLocation({
					latitude: this.gymnasiumInfo.latitude,
					longitude: this.gymnasiumInfo.longitude,
					scale: 18,
					name: this.gymnasiumInfo.location
				});
			},
			// 复制订单编号
			tocopy() {
				uni.setClipboardData({
					data: this.order_no
				});
			},
			// 取消 取消订单
			cancel() {
				this.show = false
			},
			// 确认 取消订单
			confirm() {
				request({
					url: 'wx/cancel/order',
					method: 'POST',
					data: {
						order_no: this.order_no
					}
				}).then(() => {
					this.payState = 'C'
					uni.showToast({
						title: '取消成功',
						icon: 'none',
						duration: 2000,
						success: () => {
							this.show = false
							if (!this.type) {
								const eventChannel = this.getOpenerEventChannel();
								eventChannel.emit('toChangeOrderState', this.order_no, 'C')
							}
							setTimeout(() => {
								this.initData();
							}, 2000);
						}
					});
				});
			},
			// 取消订单
			cancelOrder() {
				this.show = true;
			},
			// 支付完成 或支付取消
			payComplete(type){
				uni.showToast({
					title: type=='success'?'支付成功':'支付取消',
					icon: 'none',
					duration: 2000,
					success: () => {
						if (!this.type && type=='success') {
							const eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('toChangeOrderState', this.order_no, 'Y')
						}
						setTimeout(() => {
							this.initData();
						}, 2000);
					}
				});
			},
			// 去支付
			toPay() {
				request({
					url: 'wx/pay',
					method: 'POST',
					data: {
						order_no: this.order_no,
						type: 'web'
					}
				}).then((res) => {
					// #ifdef MP-WEIXIN
					this.wxPay(res.data.per_pay,this.payComplete)
					// #endif
					// #ifdef H5
					let flag = this.isWeiXin()
					if (flag) {
						// 走微信内置浏览器支付
						this.weChatInside()
					} else {
						// 走外置浏览器支付
						this.toPayOutside()
					}
					// #endif
					
				});

			},
			// 去使用
			toUse() {
				uni.navigateTo({
					url: '/pages/reservationInfo/reservationInfo?order_no=' + this.order_no
				})
			},
		}
	});
</script>
<style scoped>
	/* pages/orderDetail/orderDetail.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.payStateBox {
		height: 180rpx;
		background: #ffffff;
		margin-bottom: 14rpx;
	}

	.waitPayText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 40rpx;
		font-weight: 600;
		height: 56rpx;
		line-height: 56rpx;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.waitPayTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		height: 28rpx;
		line-height: 28rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}

	.codeBox {
		background-color: #fff;
	}

	.codeTextBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		color: #9e9e9e;
		font-feature-settings: 'kern' on;
	}

	.paySuccessText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 40rpx;
		font-weight: 600;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-top: 40rpx;
	}

	.topBox {
		padding: 20rpx;
		background-color: #fff;
	}

	.topName {
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-bottom: 8rpx;
		height: 44rpx;
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
		flex-shrink: 0;
	}

	.siteList {
		background-color: #fff;
		margin-top: 14rpx;
		box-sizing: border-box;
	}

	.siteListTitle {
		padding: 20rpx 20rpx 0;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
		margin-bottom: 24rpx;
	}

	.blackText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #333333;
	}

	.grayText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		text-align: right;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.siteListItem {
		width: 100%;
		min-height: 140rpx;
		height: auto;
		border-radius: 10rpx;
		opacity: 1;
		background-color: #f6f8fa;
		padding: 28rpx;
		box-sizing: border-box;
		margin-bottom: 10rpx;
	}

	.orderInfoBox {
		background-color: #fff;
		margin-top: 16rpx;
		padding: 20rpx;
	}

	.leftLabel {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}

	.copyText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-feature-settings: 'kern' on;
		color: #5f5f5f;
		margin-left: 18rpx;
	}

	.payMethodBox {
		height: 94rpx;
		background-color: #fff;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.methodText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #5f5f5f;
	}

	.wechatText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0px;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.bottomBox {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background-color: #fff;
		height: 156rpx;
		padding: 0 20rpx 0 32rpx;
		box-sizing: border-box;
	}

	.totalText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		line-height: normal;
		font-feature-settings: 'kern' on;
		color: #9e9e9e;
	}

	.priceText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-feature-settings: 'kern' on;
		color: #ff5634;
	}

	.payBtn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ff5634;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
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
		display: flex;
		align-items: center;
		justify-content: center;
		color: #b1b4c3;
		margin-right: 8rpx;
	}

	.useBtn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0077ff;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
	}
</style>