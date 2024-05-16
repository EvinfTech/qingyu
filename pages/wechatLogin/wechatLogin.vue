    <template>
    	<!-- pages/wechatLogin/wechatLogin.wxml -->
    	<view class="page">
    		<u-navbar class="nav-bar" title="微信快捷登录" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
    			<template #left>
    				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
    			</template>
    		</u-navbar>
    		<view class="loginBox flex flex-direction align-center">
    			<view class="imgBox">
    				<image src="/static/images/common/logo.png" mode="" class="h-full w-full" />
    			</view>
    			<view class="title">欢迎登录轻羽</view>
    			<!-- <button class="btn-wechat-login" @tap="onWechatLogin">微信快捷登录</button> -->
    			<button class="btn-wechat-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号快捷登录</button>
    		</view>
    	</view>
    </template>

    <script>
    	// pages/wechatLogin/wechatLogin.ts
    	import {
    		request
    	} from '../../utils/request';
    	export default ({
    		data() {
    			return {
    				app: getApp()
    			};
    		},
    		/**
    		 * 生命周期函数--监听页面加载
    		 */
    		onLoad() {},
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
    		methods: {
    			onClickLeft() {
    				uni.navigateBack();
    			},

    			// 微信方登录
    			wechatLogin() {
    				return new Promise((resolve) => {
    					uni.login({
    						success: (resWxLogin) => {
    							resolve(resWxLogin.code);
    						}
    					});
    				});
    			},

    			getPhoneNumberAjax(code) {
    				request({
    					url: 'wx/get/phone',
    					method: 'POST',
    					data: {
    						phone_code: code,
    						user_ouid: this.app.globalData.userInfo.ouid
    					}
    				}).then((res) => {
    					uni.reLaunch({
    						url: '/pages/index/index'
    					});
    				});
    			},

    			// 获取手机号
    			getPhoneNumber(e) {
    				this.onWechatLogin(e.detail.code);
    			},

    			// 服务器登录
    			async onWechatLogin(phoneCode) {
    				let code = await this.wechatLogin();
    				request({
    					url: 'wx/login',
    					method: 'POST',
    					data: {
    						code
    					}
    				}).then(async (res) => {
    					this.app.globalData.userInfo.ouid = res.data.ouid;
    					await this.app.getUserInfo('reGet');
    					uni.reLaunch({
    						url: '/pages/index/index'
    					});
    					//   this.getPhoneNumberAjax(phoneCode)
    				});
    			}
    		}
    	});
    </script>
    <style scoped>
    	/* pages/wechatLogin/wechatLogin.wxss */
    	.page {
    		width: 100vw;
    		height: 100vh;
    		background-color: #fff;
    	}

    	.loginBox {
    		margin-top: 240rpx;
    	}

    	.imgBox {
    		width: 160rpx;
    		height: 160rpx;
    		border-radius: 40rpx;
    	}

    	.title {
    		font-family: PingFang SC;
    		font-size: 52rpx;
    		font-weight: 600;
    		line-height: 20px;
    		text-align: center;
    		color: #000000;
    		margin-top: 114rpx;
    	}

    	.btn-wechat-login {
    		width: 684rpx;
    		height: 100rpx;
    		border-radius: 24rpx;
    		opacity: 1;
    		background: #0077ff;
    		display: flex;
    		align-items: center;
    		justify-content: center;
    		color: #fff;
    		margin-top: 80rpx;
    	}
    </style>