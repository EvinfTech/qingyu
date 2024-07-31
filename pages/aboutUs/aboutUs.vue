<template>
	<!-- pages/aboutUs/aboutUs.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" title="关于我们" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="content">
			<view v-html="aboutUs"></view>
		</view>
	</view>
</template>

<script>
	// pages/aboutUs/aboutUs.ts
	export default ({
		data() {
			return {
				app: getApp(),
				aboutUs: '',

			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad() {
			let commonInfo = await this.app.getCommonInfo();
			this.aboutUs = commonInfo.about_us
		},

		methods: {
			onClickLeft() {
				uni.navigateBack();
			}
		}
	});
</script>
<style scoped>
	/* pages/aboutUs/aboutUs.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.content {
		padding: 28rpx 32rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		color: #0b1526;
	}
</style>