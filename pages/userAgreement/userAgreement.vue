<template>
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="用户协议" :autoBack="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="content">
			<view>
				欢迎您使用服务（以下简称：本服务）请您仔细阅读下方条款，若您对本协议的任何条款有异议，您可以第一时间选择不进入。
			</view>
			<view class="title">使用规则</view>
			<view>
				1.用户登录成功后，将给予每个用户一个可以收藏文章的个人中心。
				2.用户需对信息的真实性，合法性，邮箱性承担全部责任，用不得冒充他人。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app:null
			}
		},
		onLoad(){
			this.app = getApp()
		},
		methods: {

		}
	}
</script>

<style scoped>
	.page {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		box-sizing: border-box;
	}

	.content {
		padding: 30rpx;
	}
	.title{
		font-weight: bold;
		margin: 30rpx 0;
	}
</style>