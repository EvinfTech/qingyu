<template>
	<!-- pages/settings/settings.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="设置" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
			</template>
		</u-navbar>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="账号与安全" center custom-class="userinfo-cell" is-link @tap.native="toAccountSecurity"></u-cell>
			<u-cell title="用户协议" center custom-class="userinfo-cell" is-link @tap.native="toUserAgreement"></u-cell>
			<u-cell title="隐私协议" center custom-class="userinfo-cell" is-link></u-cell>
		</u-cell-group>
		<view class="devide"></view>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="使用帮助" center custom-class="userinfo-cell" is-link></u-cell>
			<u-cell title="关于我们" center custom-class="userinfo-cell" is-link @tap.native="toAboutUs"></u-cell>
			<u-cell title="意见反馈" center custom-class="userinfo-cell" is-link @tap.native="toFeedBack"></u-cell>
			<!-- #ifdef MP-WEIXIN -->
			<u-cell title="联系客服" is-link>
				<template #value>
					<u-button :showMessageCard="true" openType="contact" :plain="true"
						:customStyle="{'width':'100rpx','borderWidth':'0','backgroundColor':'transparent'}" class="btn"></u-button>
				</template>
			</u-cell>
				<!-- #endif -->
		</u-cell-group>
		<!-- <view class="devide"></view>
		<u-cell-group>
			<u-cell title="清除缓存" center custom-class="userinfo-cell" @tap.native="clearCache">
				<view class="clearRight">立即清除</view>
			</u-cell>
		</u-cell-group> -->
		<view class="logoutBtn flex align-center justify-center" @tap="logout">退出登录</view>
		<u-modal :show="show" title="提示" content="确定要退出登录吗？" :showCancelButton="true" @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	// pages/settings/settings.ts
	// import Dialog from '@/wxcomponents/vant/dialog/dialog';
	export default ({
		data() {
			return {
				app:getApp(),
				show:false
			};
		},
		onLoad() { },
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady() { },
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() { },
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide() { },
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload() { },
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh() { },
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() { },
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage() { },
		methods: {
			/**
			 * 生命周期函数--监听页面加载
			 */
			onClickLeft() {
				uni.navigateBack();
			},

			toAccountSecurity() {
				uni.navigateTo({
					url: '/pages/accountSecurity/accountSecurity'
				});
			},
			toUserAgreement(){
				uni.navigateTo({
					url:'/pages/userAgreement/userAgreement'
				})
			},
			toAboutUs() {
				uni.navigateTo({
					url: '/pages/aboutUs/aboutUs'
				});
			},

			toFeedBack() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				});
			},

			logout() {
				this.show = true;
			},
			cancel(){
				this.show = false
			},
			confirm(){
				this.show = false
				this.app.logout()
			},
			clearCache() {}
		}
	});
</script>
<style scoped>
	/* pages/settings/settings.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		position: relative;
	}

	.devide {
		width: 100%;
		height: 20rpx;
		background: #f6f8fa;
	}

	.clearRight {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		color: #f44336;
	}

	.logoutBtn {
		width: 686rpx;
		height: 84rpx;
		border-radius: 12rpx;
		background: #ffe6e6;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #f44336;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 100rpx;
		z-index: 9;
	}


	.specialBtn::after {
		border: none;
	}

	.u-cell__title {
		text-align: left;
		font-size: 15px;
	}
</style>