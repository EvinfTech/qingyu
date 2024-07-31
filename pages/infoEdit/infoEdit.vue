<template>
	<!-- pages/infoEdit/infoEdit.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="个人信息" :autoBack="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
		<u-cell-group custom-class="userinfo-group">
			<u-cell title="头像" is-link>
				<template #value>
					<!-- #ifdef MP-WEIXIN -->
					<button v-if="!avatarUrl" open-type="chooseAvatar" @click.stop="" @chooseavatar="getAvatar"
						class="flex align-center justify-center"
						style="background-color: #f4f5f7;;width: 40px;height: 40px;">
						<u-icon name="plus"></u-icon>
					</button>
					<button v-else open-type="chooseAvatar" @click.stop="" @chooseavatar="getAvatar"
						class="flex align-center justify-center specialBtn"
						style="background-color: #f4f5f7;;width: 40px;height: 40px;outline:none;background-color: #fff;padding: 0;">
						<image  :src="avatarUrl" class="avatarBox"></image>
					</button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deleteImg" :maxCount="1">
						<view v-if="!avatarUrl" class="flex align-center justify-center"
							style="background-color: #f4f5f7;;width: 40px;height: 40px;">
							<u-icon name="plus"></u-icon>
						</view>
						<image v-else :src="avatarUrl" class="avatarBox"></image>
					</u-upload>
					<!-- #endif -->

				</template>
			</u-cell>
			<u-cell title="昵称">
				<template #value>
					<!-- #ifdef MP-WEIXIN -->
					<input v-model="nickname" type="nickname" placeholder="请输入8个字以内的昵称" style="text-align: right;"
						placeholder-style="font-size:28rpx;color: #B1B4C3;" @blur="nickNameBlur" />
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<input v-model="nickname" placeholder="请输入8个字以内的昵称" style="text-align: right;"
						placeholder-style="font-size:28rpx;color: #B1B4C3;" @blur="nickNameBlur"/>
					<!-- #endif -->
					
				</template>
			</u-cell>
			<u-cell title="性别">
				<template #value>
					<u-radio-group v-model="sex" @change="sexChange">
						<u-radio name="1" label="男" style="margin-right: 48rpx"></u-radio>
						<u-radio name="2" label="女"></u-radio>
					</u-radio-group>
				</template>
			</u-cell>
			<u-cell title="生日" is-link @tap.native="chooseAge">
				<template #value>
					<view style="font-size: 28rpx;">
						{{ !dealCurrentDate ? '请选择' : dealWithBirth(dealCurrentDate)}}
					</view>
				</template>

			</u-cell>
			<u-cell title="手机">
				<template #value>
					<view style="font-size: 28rpx;color: #aaa;">
						{{phone}}
					</view>
				</template>
			</u-cell>
			<u-cell title="会员类型">
				<template #value>
					<view style="font-size: 28rpx;">
						{{vip_type}}
					</view>
				</template>
			</u-cell>
			<u-cell title="储值金额">
				<template #value>
					<view style="font-size: 28rpx;">
						{{balance}}
					</view>
				</template>
			</u-cell>
		</u-cell-group>
		<u-datetime-picker :show="show" mode="date" :min-date="minDate" :max-date="maxDate" v-model="currentDate"
			@confirm="onConfirm" @cancel="onCancel" />
		<!-- 	<view class="devide"></view>
		<view class="personalProfile">
			<view class="personalProfileTitle">个人简介</view>
			<u-textarea v-model="personalProfile" placeholder="请输入..." />
		</view> -->
		<!-- <view class="saveBtn flex align-center justify-center" @tap="save">保存</view> -->
		<view class="logoutBtn flex align-center justify-center" @tap="logout">退出登录</view>
		<u-modal :show="showLogout" title="提示" content="确定要退出登录吗？" :showCancelButton="true" @confirm="confirm"
			@cancel="cancel"></u-modal>
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
				initAvatarUrl: '',
				avatarUrl: '',
				ouid: '',
				nickname: '',
				initNickname:'',
				sex: '',
				personalProfile: '',
				show: false,
				columns: [],
				currentDate: 0,
				dealCurrentDate: '',
				minDate: 0,
				maxDate: 0,
				fileList: [],
				showLogout: false,
				phone: '',
				vip_type: '',
				balance: ''
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad() {
			let userInfo = await this.app.getUserInfo()
			this.maxDate = Date.now()
			this.currentDate = userInfo.birthday ? (new Date(this.dealWithBirth(userInfo.birthday))).getTime() :
				Date.now()
			this.nickname = userInfo.name
			this.initNickname = this.nickname;
			this.avatarUrl = userInfo.avatar
			this.sex = String(userInfo.sex)
			this.dealCurrentDate = userInfo.birthday
			this.personalProfile = userInfo.introduce
			this.phone = userInfo.phone
			this.ouid = userInfo.ouid;
			this.vip_type = userInfo.vip_type;
			this.balance = userInfo.balance

		},
		methods: {
			// 获取微信头像
			getAvatar(e) {
				this.afterRead({
					file:{
						url:e.detail.avatarUrl
					}
				})
			},
			// 删除头像
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
							url: this.app.globalData.httpUrl + JSON.parse(res.data)
								.data
						});
						this.initAvatarUrl = JSON.parse(res.data)
							.data
						this.fileList = fileList
						this.avatarUrl = fileList[0].url
						this.save()
					}
				});
			},
			// 取消选择日期
			onCancel() {
				this.show = false
			},
			// 选择生日
			chooseAge() {
				this.show = true
			},
			// 确定选择 生日
			onConfirm(e) {
				let date = new Date(e.value);
				let year = date.getFullYear();
				let month = formatNumber(date.getMonth() + 1);
				let day = formatNumber(date.getDate());
				this.currentDate = e.value
				this.dealCurrentDate = `${year}${month}${day}`
				this.show = false
				this.save()
			},
			// 处理生日 2020-02-08
			dealWithBirth(birthday) {
				let birth = String(birthday)
				return birth.slice(0, 4) + '-' + (birth.slice(4, 6)) + '-' + (birth.slice(6, 8))
			},
			// 昵称失去焦点
			nickNameBlur(e) {
				if(this.initNickname != this.nickname){
					this.save('name')
				}
			},
			// 性别修改
			sexChange(e) {
				this.save()
			},
			// 保存
			async save(type='') {
				request({
					url: 'wx/update/user/info',
					method: 'POST',
					data: {
						user_ouid: this.ouid,
						name: this.nickname,
						avatar: this.initAvatarUrl,
						phone: '',
						birthday: Number(this.dealCurrentDate),
						sex: Number(this.sex), //1男  2女
						introduce: this.personalProfile
					}
				}).then(() => {
					if(type=='name'){
						this.initNickname = this.nickname
					}
					uni.showToast({
						title: '保存成功',
						icon: 'none',
						duration: 2000
					});
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('updateInfo')

				});
			},
			// 退出登录
			logout() {
				this.showLogout = true;
			},
			// 取消退出登录
			cancel() {
				this.showLogout = false
			},
			// 确认退出登录
			confirm() {
				this.showLogout = false
				this.app.logout()
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

	/deep/ .u-radio-grou--row {
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
</style>