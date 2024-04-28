<script>
	export default {
		globalData: {
			httpUrl: 'http://172.16.7.99:8002/',
			// httpUrl: 'http://172.16.8.5:8002/',
			uploadAvatarUrl: 'http://172.16.7.99:8002/common/upload/avatar',
			uploadImgUrl: 'http://172.16.7.99:8002/common/upload/photo',
			iconObj: {
				'培训': '/static/images/common/training.svg',
				'停车场': '/static/images/common/park.svg',
				'VIP': '/static/images/common/VIP.svg',
				'wifi': '/static/images/common/WIFI.svg',
				'商店': '/static/images/common/shop.svg',
				'淋浴房': '/static/images/common/shower.svg',
				'储物柜': '/static/images/common/storageCabinet.svg',
				'24小时': '/static/images/common/allDay.svg',
				'茶水间': '/static/images/common/tea.svg',
				'餐饮': '/static/images/common/food.svg',
				'洗手间': '/static/images/common/toilet.svg',
				'空调': '/static/images/common/air-conditioning.svg'
			},
			userInfo: {
				longitude: '',
				//经度
				latitude: '',
				//纬度
				ouid: '',
				//用户ouid
				avatar: '',
				//头像
				birthday: '',
				//生日
				name: '',
				//昵称
				phone: '',
				//手机号
				sex: '',
				//性别
				total_count: '',
				//运动次数
				total_length: '',
				//运动时长
				sport_day: '' //运动天数
			},

			enumInfo: {},
			gymnasiumInfo: {}
		},
		methods: {
			getLocation() {
				var that = this;
				// 获取位置信息
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						that.userInfo.latitude = res.latitude;
						that.userInfo.longitude = res.longitude;
					}
				});
			},

			checkVersion() {
				// 获取小程序版本
				const miniProgram = uni.getAccountInfoSync();
				var versionNumber = miniProgram.miniProgram.version;
				// 判断并存储
				let storageVersionNumber = uni.getStorageSync('version_number');
				if (!storageVersionNumber) {
					uni.setStorageSync('version_number', versionNumber);
				}
				if (!storageVersionNumber || storageVersionNumber != versionNumber) {
					// 小程序版本更新
					const updateManager = uni.getUpdateManager();
					updateManager.onUpdateReady(function() {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						const miniProgram = uni.getAccountInfoSync();
						var versionNumber = miniProgram.miniProgram.version;
						uni.setStorageSync('version_number', versionNumber);
					});
				}
			},

			toShare() {
				uni.onAppRoute((res) => {
					let pages = getCurrentPages();
					let view = pages[pages.length - 1];
					if (view) {
						uni.showShareMenu({
							menus: ['shareAppMessage', 'shareTimeline'],
							success(res) {},
							fail(e) {}
						});
					}
				});
			},
			// 获取用户信息
			getUserInfo() {
				return new Promise((resolve, reject) => {
					let userInfo = uni.getStorageSync('userInfo');
					userInfo = userInfo ? JSON.parse(userInfo) : '';
					if (userInfo) {
						this.globalData.userInfo = userInfo;
						uni.setStorageSync('userInfo', JSON.stringify(userInfo));
						resolve(userInfo)
						return;
					}
					uni.request({
						url: this.globalData.httpUrl + 'wx/get/user/info',
						method: 'POST',
						data: {
							user_ouid: this.globalData.userInfo.ouid
						},
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							if (res.statusCode == 200) {
								let userInfo = res.data.data;
								this.globalData.userInfo.avatar = userInfo.avatar; //头像
								this.globalData.userInfo.birthday = userInfo.birthday; //生日
								this.globalData.userInfo.name = userInfo.name; //昵称
								this.globalData.userInfo.phone = userInfo.phone; //手机号
								this.globalData.userInfo.sex = userInfo.sex; //性别
								this.globalData.userInfo.total_count = userInfo.total_count; //运动次数
								this.globalData.userInfo.total_length = userInfo.total_length; //运动时长
								this.globalData.userInfo.sport_day = userInfo.sport_day; //运动天数
								this.globalData.userInfo.introduce = userInfo.introduce; //个人简介
								uni.removeStorageSync('userInfo');
								uni.setStorageSync('userInfo', JSON.stringify(this.globalData
									.userInfo));
								resolve(userInfo)
							}
						}
					});
				})


			},
			// 获取门店信息
			getStoreInfo() {
				return new Promise((resolve, reject) => {
					let storeInfo = uni.getStorageSync("gymnasiumInfo")
					if (storeInfo) {
						storeInfo = JSON.parse(storeInfo)
						this.globalData.gymnasiumInfo = storeInfo;
						resolve(storeInfo)
						return false;
					}
					uni.request({
						url: this.globalData.httpUrl + 'wx/get/shop/detail',
						method: 'POST'
					}).then((res) => {
						let tag = res.data.data.tag;
						let tagList = [];
						tag.forEach((item) => {
							tagList.push({
								text: item,
								icon: this.globalData.iconObj[item] ? this.globalData
									.iconObj[item] : ''
							});
						});
						let gymnasiumInfo = {}
						gymnasiumInfo.gymnasiumName = res.data.data.shop_name
						gymnasiumInfo.latitude = res.data.data.latitude
						gymnasiumInfo.longitude = res.data.data.longitude
						gymnasiumInfo.phone = res.data.data.shop_phone
						gymnasiumInfo.location = res.data.data.shop_address
						gymnasiumInfo.businessHours = res.data.data.work_time
						gymnasiumInfo.facility = res.data.data.facility
						gymnasiumInfo.serve = res.data.data.serve
						gymnasiumInfo.hardwareFacilities = tagList
						let gymnasiumImgList = [];
						let list = JSON.parse(res.data.data.shop_photo)
						list.forEach(item=>{
							gymnasiumImgList.push(this.globalData.httpUrl+item)
						})
						gymnasiumInfo.gymnasiumImgList = gymnasiumImgList
						this.globalData.gymnasiumInfo = gymnasiumInfo;
						uni.setStorageSync("gymnasiumInfo", JSON.stringify(gymnasiumInfo))
						resolve(gymnasiumInfo)
					});
				})

			},
			// 退出登录
			logout() {
				this.globalData.userInfo = {
					longitude: '',
					latitude: '',
					ouid: ''
				};
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('gymnasiumInfo');
				uni.removeStorageSync("tabbarIndex");
				uni.removeStorageSync('album');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},

			// 获取枚举信息
			getEnum() {
				return new Promise((resolve, reject) => {
					let enumInfo = uni.getStorageSync('enumInfo');
					enumInfo = enumInfo ? JSON.parse(enumInfo) : '';
					if (enumInfo) {
						this.globalData.enumInfo = enumInfo;
						uni.setStorageSync('enumInfo', JSON.stringify(enumInfo));
						resolve(enumInfo)
						return false;
					}
					uni.request({
						url: this.globalData.httpUrl + 'common/get/enum',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							if (res.statusCode == 200) {
								this.globalData.enumInfo = res.data.data.time_enum;
								uni.setStorageSync('enumInfo', JSON.stringify(this.globalData
									.enumInfo));
								resolve(res.data.data.time_enum)
							}
						}
					});

				})


			},
			// 返回
			toBack() {
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}


			}
		},

		onLaunch: function() {
			this.getEnum()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-plus/index.scss";

	.w-full {
		width: 100%;
	}

	.h-full {
		height: 100%;
	}

	.flex {
		display: flex;
	}

	.flex-direction {
		flex-direction: column;
	}

	.justify-around {
		justify-content: space-around;
	}

	.justify-start {
		justify-content: flex-start;
	}

	.justify-end {
		justify-content: flex-end;
	}

	.justify-between {
		justify-content: space-between;
	}

	.justify-center {
		justify-content: center;
	}

	.align-start {
		align-items: flex-start;
	}

	.align-end {
		align-items: flex-end;
	}

	.align-center {
		align-items: center;
	}

	.flex-1 {
		flex: 1;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}

	.flex-shirnk {
		flex-shrink: 0;
	}

	.solid-bottom {
		border-bottom: 1rpx solid #F6F8FA;
	}

	.border-radius-circle {
		border-radius: 50%;
	}
</style>