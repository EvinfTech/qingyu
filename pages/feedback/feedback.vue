<template>
	<view class="page">
		<u-navbar class="nav-bar" title="意见反馈" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="errorBox">
			<view class="describeBox">
				<view class="flex align-center justify-between">
					<view style="margin-bottom: 20rpx">反馈问题</view>
				</view>
				<u--textarea v-model="error" placeholder="请输入..." />
			</view>
			<view class="uploadBox">
				<view>上传问题相关图片</view>
				<view style="margin-top: 24rpx">
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deleteImg" name="1" multiple
						:maxCount="9">
					</u-upload>
				</view>
				<view class="uploadText">最多9张
				</view>
			</view>
			<button type="info" class="submitBtn" @tap.native="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app: null,
				error: '',
				fileList: []
			};
		},
		onLoad(){
			this.app = getApp()
		},
		methods: {
			onClickLeft() {
				uni.navigateBack();
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
								url: this.app.globalData.httpUrl + JSON.parse(res.data)
									.data
							});
							this.fileList = fileList
						}
					});
				});
			},

			async submit() {
				if (!this.error) {
					uni.showToast({
						title: '请输入反馈问题',
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
				let userInfo = await this.app.getUserInfo();
				request({
					url: 'wx/add/feedback',
					method: 'POST',
					data: {
						user_ouid: userInfo.ouid,
						content: this.error,
						//反馈内容
						photo: photos //照片
					}
				}).then(() => {
					uni.showToast({
						title: '提交成功',
						icon: 'none',
						duration: 2000,
						success: () => {
							setTimeout(() => {
								this.app.toBack()
							}, 2000);
						}
					});
				});
			},

			deleteImg(event) {
				let fileList = this.fileList;
				fileList.splice(event.index, 1);
				this.fileList = fileList
			},

			toFeedbackList() {
				uni.navigateTo({
					url: '/pages/feedbackList/feedbackList'
				});
			}
		}
	});
</script>
<style scoped>
	/* pages/feedback/feedback.wxss */
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

	.input-class {}

	.uploadBorder {
		width: 160rpx;
		height: 160rpx;
		border-radius: 12rpx;
		border: 1px dashed #e3e8f2;
	}

	.submitBtn {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 94rpx;
	}

	.textarea {
		max-height: 100rpx !important;
		min-height: 100rpx !important;
	}

	.submitBtn {
		width: 686rpx;
		border-radius: 12rpx;
		position: absolute !important;
		left: 50%;
		transform: translateX(-50%);
		bottom: 130rpx !important;
		background-color: #0077ff;
		color: #fff;
	}

	.uploadText {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #b1b4c3
	}
</style>