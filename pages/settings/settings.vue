<template>
	<!-- pages/settings/settings.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="设置" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="账号与安全" center custom-class="userinfo-cell" is-link @tap.native="toAccountSecurity"></u-cell>
			<u-cell title="用户协议" center custom-class="userinfo-cell" is-link @tap.native="toUserAgreement"></u-cell>
			<u-cell title="隐私协议" center custom-class="userinfo-cell" is-link></u-cell>
		</u-cell-group>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="使用帮助" center custom-class="userinfo-cell" is-link></u-cell>
			<u-cell title="关于我们" center custom-class="userinfo-cell" is-link @tap.native="toAboutUs"></u-cell>
		</u-cell-group>
		<view class="logoutBtn flex align-center justify-center" @tap="logout">退出登录</view>
		<u-modal :show="show" title="提示" content="确定要退出登录吗？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
	</view>
</template>

<script>
	// pages/settings/settings.ts
	export default ({
		data() {
			return {
				app: getApp(),
				show: false
			};
		},
		methods: {
			// 账号与安全
			toAccountSecurity() {
				uni.navigateTo({
					url: '/pages/accountSecurity/accountSecurity'
				});
			},
			// 用户协议
			toUserAgreement() {
				uni.navigateTo({
					url: '/pages/userAgreement/userAgreement'
				})
			},
			// 关于我们
			toAboutUs() {
				uni.navigateTo({
					url: '/pages/aboutUs/aboutUs'
				});
			},
			// 退出登录
			logout() {
				this.show = true;
			},
			// 取消退出登录
			cancel() {
				this.show = false
			},
			// 确认退出登录
			confirm() {
				this.show = false
				this.app.logout()
			}
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