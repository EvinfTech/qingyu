<script>
	export default {
		globalData: {
			httpUrl: 'https://qingyu.evinf.cn/',
			// httpUrl: 'http://172.16.8.5:8002/',
			// httpUrl: 'http://172.16.7.99:8002/',
			// httpUrl: 'http://sport1.evinf.cn/',
			uploadAvatarUrl: 'https://qingyu.evinf.cn/common/upload/avatar',
			uploadImgUrl: 'https://qingyu.evinf.cn/common/upload/photo',
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
				sport_day: '' ,//运动天数
				memberType:'',//会员类型
				balance:'',//储值金额
			},
			enumInfo: {}, //时间枚举
			gymnasiumInfo: {}, //场馆信息
			aboutUs:'',//关于我们
			agreement:'',//用户协议
			officialAppId:''//公众号appId
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
			// 去分享
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
			getUserInfo(type = '') {
				return new Promise((resolve, reject) => {
					let userInfo = uni.getStorageSync('userInfo');
					userInfo = userInfo ? JSON.parse(userInfo) : '';
					if (userInfo && !type) {
						this.globalData.userInfo = userInfo;
						uni.setStorageSync('userInfo', JSON.stringify(userInfo));
						resolve(userInfo)
						return false;
					}
					uni.request({
						url: this.globalData.httpUrl + 'wx/get/user/info',
						method: 'POST',
						data: {
							user_ouid: this.globalData.userInfo.ouid?this.globalData.userInfo.ouid:userInfo.ouid
						},
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							if (res.statusCode == 200) {
								let userInfo = res.data.data;
								userInfo.avatar = this.globalData.httpUrl + userInfo.avatar;
								userInfo.balance = userInfo.balance/100; //储值金额
								this.globalData.userInfo = userInfo;
								uni.removeStorageSync('userInfo');
								uni.setStorageSync('userInfo', JSON.stringify(this.globalData
									.userInfo));
								resolve(this.globalData.userInfo)
							}
						}
					});
				})
			},
			// 获取用户协议和关于我们
			getCommonInfo(){
					return new Promise((resolve, reject) => {
						uni.request({
							url: this.globalData.httpUrl + 'wx/get/agreement/about',
							method: 'POST'
						}).then((res) => {
							let commonInfo = res.data.data;
							resolve(commonInfo)
						});
					})
			},
			// 获取门店信息
			getStoreInfo(type = '') {
				return new Promise((resolve, reject) => {
					let storeInfo = uni.getStorageSync("gymnasiumInfo")
					if (storeInfo && !type) {
						storeInfo = JSON.parse(storeInfo)
						this.globalData.gymnasiumInfo = storeInfo;
						resolve(storeInfo)
						return false;
					}
					uni.request({
						url: this.globalData.httpUrl + 'wx/get/shop/detail',
						method: 'POST'
					}).then((res) => {
						let tag = res.data.data.tag ? res.data.data.tag : [];
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
						gymnasiumInfo.shop_avatar = this.globalData.httpUrl + res.data.data.shop_avatar;
						gymnasiumInfo.desc = res.data.data.desc
						let gymnasiumImgList = [];
						let list = JSON.parse(res.data.data.shop_photo)
						list.forEach(item => {
							gymnasiumImgList.push(this.globalData.httpUrl + item)
						})
						gymnasiumInfo.gymnasiumImgList = gymnasiumImgList
						this.globalData.gymnasiumInfo = gymnasiumInfo;
						uni.setStorageSync("gymnasiumInfo", JSON.stringify(gymnasiumInfo))
						resolve(gymnasiumInfo)
					});
				})

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
			toBack(num) {
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack({
						delta: num ? num : 1
					})
				} else {
					history.back()
				}
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
				uni.removeStorageSync('weixinCallback')
				uni.removeStorageSync('album');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
		},

		onLaunch: function() {
			this.getEnum()
			// #ifdef MP-WEIXIN
			this.checkVersion()
			// #endif
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
	@import "uview-ui/index.scss";

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