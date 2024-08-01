<template>
	<!-- index.wxml -->
	<view class="page">
		<scroll-view class="content" :scroll-y="true" :style="'height: ' + scrollViewHeight + 'px;'">
			<Home v-if="active == 0" :scrollViewHeight="scrollViewHeight" @navigate="navigate"></Home>
			<Mine ref="mine" id="mine" v-else></Mine>
		</scroll-view>
		<u-tabbar :value="active" @change="tabbarChange" :border="true" :fixed="false" :placeholder="false">
			<u-tabbar-item :text="item.text" v-for="(item,index) in tabbarList" :key="index">
				<template #active-icon>
					<image class="u-page__item__slot-icon" :src="item.selectedIconPath"
						style="width: 48rpx; height: 60rpx"></image>
				</template>
				<template #inactive-icon>
					<image class="u-page__item__slot-icon" :src="item.iconPath" style="width: 48rpx; height: 60rpx">
					</image>
				</template>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<script>
	import Home from '../home/home';
	import Mine from '../mine/mine';
	// index.ts
	export default ({
		components: {
			Home,
			Mine
		},
		data() {
			return {
				app: null,
				active: 0,
				scrollViewHeight: 0,
				tabbarList: [{
						text: '首页',
						iconPath: '/static/images/index/home.svg',
						selectedIconPath: '/static/images/index/homeActive.svg',
					},
					{
						text: '我的',
						iconPath: '/static/images/index/mine.svg',
						selectedIconPath: '/static/images/index/mineActive.svg'
					}
				],
				gymnasiumInfo: {}
			};
		},
		onLoad() {
			this.app = getApp()
			// this.getTabbarIndex();
			this.calculatePageHeight();
			// 判断登录状态进行页面跳转
			this.checkLoginState();
		},
		onShow() {
		},
		onReady() {},
		methods: {
			getTabbarIndex() {
				let tabbarIndex = uni.getStorageSync('tabbarIndex')
				if (tabbarIndex) {
					this.active = Number(tabbarIndex)
				}
			},
			navigate(index) {
				this.active = index.detail
			},
			// 计算页面高度
			calculatePageHeight() {
				var screenHeight = uni.getSystemInfoSync().windowHeight;
				let that = this;
				let info = uni.getSystemInfoSync();
				let saveBottom = info.safeArea.bottom;
				that.scrollViewHeight = screenHeight - 50 - (screenHeight - saveBottom)
				// #ifdef H5
				that.scrollViewHeight = screenHeight - 60 - (screenHeight - saveBottom)
				// #endif
			},
			// 验证登录状态 然后跳转
			checkLoginState() {
				let userInfo = uni.getStorageSync('userInfo');
				if (!userInfo) {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			},
			// tabbar切换
			tabbarChange(name) {
				this.active = name;
				uni.setStorageSync('tabbarIndex', name)
			}
		}
	});
</script>
<style scoped>
	/**index.wxss**/
	.page {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.homeTitle {
		font-family: YouSheBiaoTiHei;
		font-size: 48rpx;
		line-height: 50rpx;
		color: #000000;
	}

	/* #ifdef H5 */
	.u-tabbar {
		height: 60px !important;
		padding: 5px 0 !important;
		box-sizing: border-box !important;
	}

	/* #endif */
</style>