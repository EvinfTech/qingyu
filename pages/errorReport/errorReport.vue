<template>
	<!-- pages/errorReport/errorReport.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="场馆报错" :autoBack="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
			</template>
		</u-navbar>
		<view class="errorBox">
			<view class="title">场馆出错了？</view>
			<view class="flex align-center flex-wrap" style="margin-top: 36rpx">
				<u-radio-group v-model="type" placement="row">
					<u-radio :name="item" class="radioRight" :label="item	" v-for="(item, index) in errorTypeList"
						:key="index">
					</u-radio>
				</u-radio-group>
			</view>
			<view class="describeBox">
				<view style="margin-bottom: 20rpx">描述详情</view>
				<u--textarea v-model="error" placeholder="请输入..." />
			</view>
			<view class="uploadBox">
				<view>上传图片</view>
				<view>
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deleteImg" name="1" multiple
						:maxCount="9">
					</u-upload>
				</view>
				<view style="font-family: Alibaba PuHuiTi 2; font-size: 24rpx; margin-top: 20rpx; color: #b1b4c3">最多9张
				</view>
			</view>
			<button type="info" class="submitBtn" @tap.native="submit"
				>提交</button>
		</view>
	</view>
</template>

<script>
	// pages/errorReport/errorReport.ts
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app:getApp(),
				errorTypeList: ['信息错误', '暂停营业', '场馆不存在', '其他'],
				error: '',
				type: '',
				fileList: [],
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
		},
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
			errorInput(e) {
				this.error = e.detail.value
			},


			deleteImg(event) {
				let fileList = this.fileList;
				fileList.splice(event.detail.index, 1);
				this.fileList = fileList
			},

			// 上传问题相关图片
			afterRead(event) {
				const {
					file
				} = event;
				file.forEach((item) => {
					uni.uploadFile({
						url: this.app.globalData.uploadImgUrl,
						filePath: item.url,
						name: 'file',
						success: (res) => {
							let fileList = this.fileList;
							fileList.push({
								url: this.app.globalData.httpUrl  + JSON.parse(res.data)
									.data
							});
							this.fileList = fileList
						}
					});
				});
			},

			onClickLeft() {
				uni.navigateBack();
			},

			submit() {
				if (!this.type) {
					uni.showToast({
						title: '请选择问题类型',
						icon: 'none',
						duration: 2000
					});
					return;
				} else if (!this.error) {
					uni.showToast({
						title: '请输入描述详情',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				let list = this.fileList;
				let photos = [];
				list.forEach((item) => {
					photos.push(item.url);
				});
				request({
					url: 'wx/add/shop/error',
					method: 'POST',
					data: {
						user_ouid: this.app.globalData.userInfo.ouid,
						type: this.type,
						detial: this.error,
						photos: photos
					}
				}).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '提交成功',
						duration: 2000,
						success: () => {
							setTimeout(() => {
								uni.navigateBack();
							}, 2000);
						}
					});
				});
			},

		}
	});
</script>
<style scoped>
	/* pages/errorReport/errorReport.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		position: relative;
	}

	.errorBox {
		padding: 24rpx 32rpx;
	}

	.title {
		font-family: Alibaba PuHuiTi 2;
		font-size: 36rpx;
		font-weight: 500;
		color: #333333;
	}

	.errorItemBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		color: #b1b4c3;
		width: 140rpx;
	}

	.radioRight {
		margin-bottom: 40rpx;
	}

	.radioRight:nth-child(2n + 1) {
		margin-right: 186rpx;
	}

	.describeBox,
	.uploadBox {
		margin-top: 42rpx;
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		line-height: 40rpx;

		color: #5d667b;
	}


	.uploadBox {
		margin-top: 66rpx;
	}
	.submitBtn {
		width: 686rpx;border-radius:12rpx;
		position: absolute!important;
		left: 50%;
		transform: translateX(-50%);
		bottom: 130rpx!important;
		background-color: #0077ff;
		color: #fff;
	}
</style>