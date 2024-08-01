    <template>
    	<!-- pages/wechatLogin/wechatLogin.wxml -->
    	<view class="page">
    		<u-navbar class="nav-bar" title="微信快捷登录" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
    			<template #left>
    				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
    			</template>
    		</u-navbar>
    		<view class="loginBox flex flex-direction align-center">
    			<view class="imgBox">
    				<image src="/static/images/common/logo.png" mode="" class="h-full w-full" />
    			</view>
    			<view class="title">欢迎登录轻羽</view>
    			<button class="btn-wechat-login" @tap="onWechatLogin('')">手机号快捷登录</button>

    		</view>
    		<u-popup :show="show" @close="close" @open="open" mode="center" round="10" :safeAreaInsetBottom="false">
    			<view class="popBox">
    				<view class="popTitle">新用户登录，请授权手机号进行注册登录</view>
    				<view class="flex align-center justify-around">
    					<view class="btn-cancel-login" @click="cancelShow">取消</view>
    					<button class="btn-phone-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
    						@click="ensure">确定</button>
    				</view>
    			</view>
    		</u-popup>
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
    				app:null,
    				show: false,
    			};
    		},
			onLoad(){
				this.app = getApp()
			},
    		methods: {
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
    			// 授权手机号
    			async getPhoneNumber(e) {
    				if (e.detail.errMsg === 'getPhoneNumber:ok') {
    					this.onWechatLogin(e.detail.code);
    				} else {
    					uni.showToast({
    						title: '手机号授权失败',
    						icon: 'none'
    					})
    				}
    			},
    			// 服务器登录
    			async onWechatLogin(phone_code = '') {
    				let code = await this.wechatLogin();
    				request({
    					url: 'wx/login',
    					method: 'POST',
    					data: {
    						code,
    						phone_code
    					}
    				}).then(async (res) => {
    					if (res.data.ouid) {
    						this.app.globalData.userInfo.ouid = res.data.ouid;
    						await this.app.getUserInfo('reGet');
    						uni.reLaunch({
    							url: '/pages/index/index'
    						});
    					} else {
    						this.show = true
    					}
    				});
    			},
    			// 弹框打开
    			open() {

    			},
    			// 弹框关闭
    			close() {

    			},
    			// 确定
    			ensure() {
    				this.show = false
    			},
    			//取消
    			cancelShow() {
    				this.show = false
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

    	.popBox {
    		padding: 40px 15px 30px;
    	}

    	.popTitle {
    		margin-bottom: 30px;
    	}

    	.btn-cancel-login {
    		width: 45%;
    		height: 70rpx;
    		border-radius: 18rpx;
    		opacity: 1;
    		background: #fff;
    		display: flex;
    		align-items: center;
    		justify-content: center;
    		border: 1px solid #ddd;
    	}

    	.btn-phone-login {
    		width: 45%;
    		height: 70rpx;
    		border-radius: 18rpx;
    		opacity: 1;
    		background: #0077ff;
    		display: flex;
    		align-items: center;
    		justify-content: center;
    		color: #fff;
    	}
    </style>