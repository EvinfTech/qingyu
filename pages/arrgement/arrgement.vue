<template>
	<!-- pages/arrgement/arrgement.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="用户协议" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="arrgementBox">
			<view v-html="agreement"></view>
		</view>
	</view>
</template>

<script>
	// pages/arrgement/arrgement.ts
	export default ({
		data() {
			return {
				app: getApp(),
				agreement: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad() {
			let commonInfo = await this.app.getCommonInfo();
			this.agreement = commonInfo.agreement
		},


		methods: {
			onClickLeft() {
				uni.navigateBack();
			}
		}
	});
</script>
<style scoped>
	/* pages/arrgement/arrgement.wxss */
	.page {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-color: #fff;
	}

	.pageTitle {
		font-size: 34rpx;
		font-weight: 600;
		color: #26292c;
	}

	.arrgementBox {
		padding: 0 32rpx;

		margin-top: 28rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		line-height: 48rpx;
		color: #0b1526;
	}
</style>