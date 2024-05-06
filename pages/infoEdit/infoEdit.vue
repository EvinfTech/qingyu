<template>
	<!-- pages/infoEdit/infoEdit.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="个人信息" :autoBack="false">
			<template #left>
				<up-icon name="arrow-left" @click="app.toBack"></up-icon>
			</template>
		</u-navbar>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="头像" is-link>
				<template #value>
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deleteImg" :maxCount="1">
						<view v-if="!avatarUrl" class="flex align-center justify-center"
							style="background-color: #f4f5f7;;width: 40px;height: 40px;">
							<u-icon name="plus"></u-icon>
						</view>
						<image v-else :src="avatarUrl" class="avatarBox"></image>
					</u-upload>
				</template>
			</u-cell>
			<u-cell title="昵称">
				<template #value>
					<input v-model="nickname" placeholder="请输入8个字以内的昵称" style="text-align: right;"
						placeholder-style="font-size:28rpx;color: #B1B4C3;" />
				</template>
			</u-cell>
			<u-cell title="性别">
				<template #value>
					<u-radio-group v-model="sex">
						<u-radio name="1" label="男" style="margin-right: 48rpx"></u-radio>
						<u-radio name="2" label="女"></u-radio>
					</u-radio-group>
				</template>
			</u-cell>
			<u-cell title="生日" is-link @tap.native="chooseAge">
				<template #value>
					<view style="font-size: 28rpx; color: #b1b4c3">
						{{ !dealCurrentDate ? '请选择' : dealCurrentDate }}
					</view>
				</template>

			</u-cell>
		</u-cell-group>
		<u-datetime-picker :show="show" mode="date" :min-date="minDate" :max-date="maxDate" v-model="currentDate"
			@confirm="onConfirm" @cancel="onCancel" />
		<view class="devide"></view>
		<view class="personalProfile">
			<view class="personalProfileTitle">个人简介</view>
			<u-textarea v-model="personalProfile" placeholder="请输入..." />
		</view>
		<view class="saveBtn flex align-center justify-center" @tap="save">保存</view>
	</view>
</template>

<script>
	// pages/infoEdit/infoEdit.ts
	import {
		request
	} from '../../utils/request';
	import {
		formatNumber
	} from '../../utils/util';
	export default ({
		data() {
			return {
				app: getApp(),
				initAvatarUrl:'',
				avatarUrl: '',
				nickname: '',
				sex: '',
				personalProfile: '',
				show: false,
				columns: [],
				currentDate: 0,
				dealCurrentDate: '',
				minDate: 0,
				maxDate: 0,
				fileList: [],
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad() {
			let userInfo = await this.app.getUserInfo()
			this.maxDate = Date.now()
			this.currentDate = Date.now()
			this.nickname = userInfo.name
			this.avatarUrl = userInfo.avatar
			this.sex = String(userInfo.sex)
			this.dealCurrentDate = userInfo.birthday
			this.personalProfile = userInfo.introduce

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
			// 返回
			onClickLeft() {
				uni.navigateBack();
			},
			deleteImg(event) {
				this.fileList = []
				this.avatarUrl = ''
			},
			// 上传问题相关图片
			afterRead(event) {
				const {
					file
				} = event;
				uni.uploadFile({
					url: this.app.globalData.uploadAvatarUrl,
					filePath: file.url,
					name: 'file',
					success: (res) => {
						let fileList = this.fileList;
						fileList.push({
							url: this.app.globalData.httpUrl  + JSON.parse(res.data)
								.data
						});
						this.initAvatarUrl = JSON.parse(res.data)
								.data
						this.fileList = fileList
						this.avatarUrl = fileList[0].url
					}
				});
			},
			onCancel() {
				this.show = false
			},
			chooseAge() {
				this.show = true
			},
			onConfirm(e) {
				let date = new Date(e.value);
				let year = date.getFullYear();
				let month = formatNumber(date.getMonth() + 1);
				let day = formatNumber(date.getDate());
				this.currentDate = e.value
				this.dealCurrentDate = `${year}${month}${day}`
				this.show = false
			},

			// 保存
			save() {
				request({
					url: 'wx/update/user/info',
					method: 'POST',
					data: {
						user_ouid: this.app.globalData.userInfo.ouid,
						name: this.nickname,
						avatar: this.initAvatarUrl,
						phone: '',
						birthday: Number(this.dealCurrentDate),
						sex: Number(this.sex), //1男  2女
						introduce: this.personalProfile
					}
				}).then(() => {
					uni.removeStorageSync('userInfo')
					this.app.getUserInfo()
					uni.showToast({
						title: '保存成功',
						icon: 'none',
						duration: 2000
					});
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}, 1500)
				});
			}
		}
	});
</script>
<style scoped>
	/* pages/infoEdit/infoEdit.wxss */
	.page {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		position: relative;
	}

	/deep/ uni-image>img {
		width: 40px !important;
		height: 40px !important;
	}

	/deep/ .u-upload__wrap__preview__image {
		width: 40px !important;
		height: 40px !important;
	}

	/deep/ .u-upload__wrap {
		justify-content: flex-end !important;
	}

	/deep/ .u-radio-group--row {
		justify-content: flex-end !important;
	}

	.avatar-wrapper {
		padding: 0 !important;
		background-color: transparent !important;
		border: none !important;
		margin-right: 0;
	}

	.devide {
		width: 100%;
		height: 20rpx;
		background-color: #f6f8fa;
	}

	.personalProfile {
		height: 290rpx;
		width: 100%;
		background-color: #fff;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.personalProfileTitle {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: normal;
		color: #5d667b;
		margin-bottom: 16rpx;
	}

	.saveBtn {
		width: 686rpx;
		height: 84rpx;
		border-radius: 12rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 100rpx;
		background-color: #0077ff;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
	}

	.avatarBox {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
</style>