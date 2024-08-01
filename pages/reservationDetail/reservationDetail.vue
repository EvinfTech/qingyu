<template>
	<!-- pages/reservationDetail/reservationDetail.wxml -->
	<view class="page">
		<u-navbar class="nav-bar" :safeAreaInsetTop="true" :fixed="false" title="预约" :autoBack="false">
			<template #left>
				<u-icon name="arrow-left" @click="toBack"></u-icon>
			</template>
		</u-navbar>
		<view class="customerTab">
			<scroll-view :scroll-x="true" class="h-full w-full" :scroll-left="scrollLeft">
				<view class="flex align-center w-full h-full"
					style="padding: 10rpx 0 0rpx; box-sizing: border-box; position: relative">
					<view class="selected" :style="'transform: translateX(' + (translateDistance + 'px') + ');'"></view>
					<view class="customerTabItem h-full" :data-index="index" @tap="chooseTab"
						v-for="(item, index) in dateList" :key="index">
						<view class="flex flex-direction align-center w-full topItem"
							:style="'color: ' + (index == active ? '#0077FF' : '') + ';'">
							<view>
								{{ item.day }}
							</view>
							<view style="line-height: 50rpx">
								{{ item.date }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="scrollViewBox" :style="'height: ' + (centerHeight + 'px') + ';'">
			<scroll-view :scroll-y="true" :scroll-x="true" class="w-full h-full"
				style="padding: 10rpx 0 10rpx 0rpx; box-sizing: border-box">
				<view class="flex" style="margin-left: 10rpx; position: relative">
					<view class="leftTimeBox">
						<view class="timeItem" v-for="(item, index) in timeList" :key="index">
							{{ item.value }}
						</view>
					</view>
					<view class="rightSiteBox" style="padding-right: 20rpx">
						<view class="flex align-center">
							<view class="siteBox" v-for="(item, index) in siteList" :key="index">
								{{ item.siteName }}

								<view style="margin-top: 9px">
									<view :data-item="con" :data-index="index" :data-j="j" @tap="chooseSite"
										v-for="(con, j) in item.timeList" :key="j">
										<view
											:class="' ' + (con.already ? 'disSelected' : con.checked ? 'selectable' : 'freeSelect') + ' selectItem'">
											{{ con.price == '不可订' ? con.price : ' ￥' + (con.price/100) }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottomCon">
			<view class="choosedListBox w-full">
				<scroll-view scroll-x="true" class="w-full h-full" :scroll-left="scrollLeftDistance">
					<view class="w-full flex align-center">
						<view v-if="choosedList.length == 0" class="flex align-center emptyText" >暂未选择场地</view>
						<view v-else class="w-full flex align-center">
							<view class="choosedItem flex flex-direction" v-for="(item, index) in choosedList"
								:key="index">
								<view class="closeBox" @click="deleteItem(index)">
									<u-icon name="close" color="#000" size="14"></u-icon>
								</view>
								<view class="itemTop">
									<text>{{ item.startTime }}-{{ item.endTime }}</text>
								</view>

								<view class="itemBottom flex align-center justify-center">
									{{ item.siteName }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>


			</view>
			<view class="flex align-center justify-between">
				<view>
					<text>
						<text class="rmbBox">￥</text>
						<text class="priceBox">{{ totalPrice }}</text>
					</text>
				</view>
				<view class="submitBtn flex align-center justify-center" @tap="submitOrder">确认预约</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/reservationDetail/reservationDetail.ts
	import {
		groupBy,
		formatNumber
	} from '../../utils/util';
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				app:null,
				active: 0,
				//当前选中的日期索引
				dateList: [],
				//日期列表
				translateDistance: 0,
				//选中底部条的滚动距离
				tabWidth: 0,
				//tab项的宽度
				widthDiff: 0,
				scrollLeft: 0,
				//滚动条x轴的滚动距离
				totalPrice: 0,
				//总价
				choosedList: [],
				//被选中的
				centerHeight: 0,
				timeList: [],
				siteList: [],
				todayDeleteIndex: 0,
				con: {
					already: false,
					checked: false,
					price: ''
				},
				j: '',
				currentDate: '',
				scrollLeftDistance:0
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.app = getApp()
			let date = options.date.slice(5);
			this.currentDate = date
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady() {
			// 生成最近7天的日期 并设置被选中的那天
			this.setAciveDate(this.currentDate);
			// 获取tabItem宽度
			this.$nextTick(() => {
				setTimeout(() => {
					this.getTabItemWidth();
				}, 500)
			})
		},
		methods: {
			toBack(){
				this.app.toBack()
			},
			// 获取现在时间
			getNowTime() {
				let date = new Date();
				let hour = date.getHours();
				let minute = date.getMinutes();
				return [hour, minute];
			},
			// 初始化可预约时间数据
			initEnumInfo() {
				let enumInfo = this.app.globalData.enumInfo;
				let timeArr = [];
				let arr = [];
				let dateItemSiteList = this.dateList[this.active].siteList;
				dateItemSiteList.forEach((con) => {
					timeArr = timeArr.concat(con.store_time_enum);
				});
				timeArr = Array.from(new Set(timeArr));
				timeArr.sort(function(a, b) {
					return a - b;
				});
				// enumInfo[arrItem]
				timeArr.forEach((arrItem) => {
					let value = enumInfo[arrItem].split('~')[0];
					let value1 = enumInfo[arrItem].split('~')[1];
					let index1 = arr.findIndex((item) => item.value == value);
					let index2 = arr.findIndex((item) => item.value == value1);
					if (index1 < 0) {
						arr.push({
							index: arrItem,
							value: value
						});
					}
					if (index2 < 0) {
						arr.push({
							index: arrItem,
							value: value1
						});
					}
				});
				let index = 0;
				// 如果是预约当天的球场 需要过滤掉已过时间点的
				if (this.active == 0) {
					let nowDateList = this.getNowTime();
					index = arr.findIndex((item) => {
						let list = item.value.split(':');
						if (Number(list[0]) > nowDateList[0] || (Number(list[0]) == nowDateList[0] &&
								Number(list[1]) > nowDateList[1])) {
							return true;
						}
					});
					if (index == -1) {
						arr = [];
					} else {
						arr = arr.slice(index);
					}
				}
				this.timeList = arr
			},
			// 删除已预约场地
			deleteItem(index) {
				this.siteList[this.choosedList[index].siteIndex].timeList[this.choosedList[index].siteTimeIndex]
					.checked = false
				this.totalPrice = this.totalPrice - (this.choosedList[index].price) / 100
				this.choosedList.splice(index, 1)
			},
			// 初始化数据
			initData(date) {
				let siteList = [];
				if (this.dateList[this.active].isRequest == false) {
					request({
						url: 'wx/get/site/reserve',
						method: 'POST',
						data: {
							date: date //日期
						}
					}).then((res) => {
						let dataList = res.data;
						dataList.forEach((con, index) => {
							siteList.push({
								siteNo: index + 1,
								siteId: con.site_id,
								disableList: con.reserve_time_enum,
								siteName: con.site_name,
								store_time_enum: con.store_time_enum,
								priceList: con.price,
								timeList: []
							});
						});
						this.dateList[this.active].siteList = siteList,
							this.dateList[this.active].isRequest = true
						this.siteList = siteList
						// 设置左侧时间点
						this.initEnumInfo();
						// 设置预约场地列表
						this.setTimeList();
					});
				} else {
					siteList = this.dateList[this.active].siteList;
					this.siteList = siteList
					// 设置左侧时间点
					this.initEnumInfo();
					// 设置预约场地列表
					this.setTimeList();
				}
			},
			// 设置选中日期
			setAciveDate(date) {
				this.dateList = this.et7Days()
				let index = this.dateList.findIndex((item) => item.date == date);
				this.active = index
			},
			// 确认预约
			async submitOrder() {
				if (this.choosedList.length == 0) {
					uni.showToast({
						title: '未选择场地',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				let userInfo = await this.app.getUserInfo()
				let site_detail = [];
				let site_obj = groupBy(this.choosedList, 'siteId');
				for (var key in site_obj) {
					let time_enum = [];
					let money = 0;
					let site_name = ''
					for (var item of site_obj[key]) {
						time_enum.push(Number(item.enumInfoIndex));
						money = money + item.price
						site_name = item.siteName
					}
					site_detail.push({
						site_id: Number(key),
						time_enum: time_enum,
						money,
						site_name: site_name
					});
				}
				uni.setStorageSync("orderInfo", JSON.stringify({
					user_ouid: userInfo.ouid,
					//用户ouid
					site_detail: site_detail,
					gmt_site_use: this.choosedList[0].date,
					site_obj,
					totalPrice: this.totalPrice
				}))
				uni.navigateTo({
					url: '/pages/confirmAppointment/confirmAppointment',
					events:{
						updateSiteInfo:(list)=>{
							list.forEach(con=>{
								let index = this.siteList.findIndex(item=>{
									return item.siteId == con.site_id
								})
								con.time_enum.forEach(timeTime=>{
									let index1 = this.timeList.findIndex(content=>{
										return content.index == timeTime
									})
									index1 = index1==0?0:index1-1
									let choosedIndex = this.choosedList.findIndex(choosedItem=>{
										return choosedItem.siteId == con.site_id && choosedItem.enumInfoIndex == timeTime
									})
									this.siteList[index].timeList[index1].already = true
									this.totalPrice = this.totalPrice - (this.choosedList[choosedIndex].price/100)
									this.siteList[index].timeList[index1].price = '不可订'
									this.choosedList.splice(choosedIndex,1)
								})
								
							})
						},
						// toOrderDetail:(orderNo)=>{
						// 	uni.redirectTo({
						// 		url: '/pages/orderDetail/orderDetail?order_no=' +
						// 			orderNo + '&type=new',
						// 	})
						// }
					}
				})
			},

			// 设置预约场地列表
			setTimeList() {
				let siteList = JSON.parse(JSON.stringify(this.siteList));
				siteList.forEach((con, index) => {
					for (var i = 1; i <= this.timeList.length - 1; i++) {
						let priceIndex = con.priceList.findIndex((content) => content.time_enum ==
							this.timeList[i].index);
						if (priceIndex >= 0) {
							if (con.disableList.includes(this.timeList[i].index)) {
								con.timeList.push({
									price: con.priceList[priceIndex].price,
									already: true,
									checked: true
								});
							} else {
								con.timeList.push({
									price: con.priceList[priceIndex].price,
									already: false,
									checked: false
								});
							}
						} else {
							con.timeList.push({
								price: '不可订',
								already: true,
								checked: false
							});
						}
					}
				});
				this.siteList = siteList
			},
			// 获取中间内容高度、上方日期选择器的宽度
			getTabItemWidth() {
				let that = this;
				let sysInfo = uni.getSystemInfoSync()
				var screenHeight = sysInfo.windowHeight;
				let query = uni.createSelectorQuery();
				query.select('.customerTabItem').boundingClientRect((navRect) => {
						let query2 = uni.createSelectorQuery();
						query2
							.select('.selected')
							.boundingClientRect((con) => {
								that.tabWidth = navRect.width
								that.translateDistance = (navRect.width - con.width) / 2
								that.widthDiff = (navRect.width - con.width) / 2
								that.scrollLeft = navRect.width * (this.active - 4)
								that.chooseTab(that.active);
								let query3 = uni.createSelectorQuery();
								query3
									.select('.bottomCon')
									.boundingClientRect((item) => {
										let query4 = uni.createSelectorQuery();
										query4
											.select('.nav-bar')
											.boundingClientRect((bar) => {
												// #ifdef MP-WEIXIN || APP-PLUS
												that.centerHeight = screenHeight - 44 - item
													.height - navRect.height - sysInfo.statusBarHeight
												// #endif
												// #ifdef H5
												that.centerHeight = screenHeight - bar.height - item
													.height - navRect
													.height
												// #endif

											})
											.exec();
									})
									.exec();
							})
							.exec();
					})
					.exec();
			},
			// 选择日期
			chooseTab(e) {
				let index;
				if (e.hasOwnProperty('currentTarget')) {
					index = e.currentTarget.dataset.index;
				} else {
					index = e;
				}
				let distance = index * this.tabWidth + this.widthDiff;
				if (this.active != index) {
					this.choosedList = []
					this.totalPrice = 0
				}
				this.active = index
				this.translateDistance = distance
				this.initData(this.dateList[index].fullDate);
			},
			// 选择场地
			chooseSite(e) {
				let data = e.currentTarget.dataset;
				if (data.item.already || data.item.price == '不可订') {
					return;
				}
				this.siteList[data.index].timeList[data.j].checked = !this.siteList[data.index].timeList[data.j]
					.checked
				if (this.siteList[data.index].timeList[data.j].checked) {
					let siteItem = this.siteList[data.index];
					// 选中
					let objItem = {
						siteName: siteItem.siteName,
						//场地名称
						siteId: siteItem.siteId,
						//场地id
						price: data.item.price,
						//场地价格
						date: this.dateList[this.active].fullDate,
						//场地使用时间
						startTime: this.timeList[data.j].value,
						//开始时间
						endTime: this.timeList[data.j + 1].value,
						//结束时间
						enumInfoIndex: -1,
						//在枚举中的key
						siteIndex: data.index,
						//球场的索引，方便清空功能实现
						siteTimeIndex: data.j //球场时间的索引，方便清空功能实现
					};

					let enumInfo = this.app.globalData.enumInfo;
					for (var key in enumInfo) {
						if (enumInfo[key] == objItem.startTime + '~' + objItem.endTime) {
							objItem.enumInfoIndex = key;
							break;
						}
					}
					let choosedList = this.choosedList;
					choosedList.push(objItem);
					this.choosedList = choosedList
					this.totalPrice = this.totalPrice + objItem.price / 100
				} else {
					// 取消选中
					let index = this.choosedList.findIndex((con) => con.startTime == this.timeList[data.j].value);
					let dataList = this.choosedList;
					dataList.splice(index, 1);
					this.choosedList = dataList
					this.totalPrice = this.totalPrice - data.item.price / 100
				}
				this.$nextTick(()=>{
					this.scrollLeftDistance = 9999 + this.scrollLeftDistance
				})
			},
			// 获取7天内的时间日期列表
			et7Days() {
				//获取系统当前时间
				let dateList = [];
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 86400 * 1000;
				for (var i = 0; i < 7; i++) {
					var ShowTime = nowTime + i * oneDayTime;
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					dateList.push({
						fullDate: year + '-' + formatNumber(month) + '-' + formatNumber(date),
						date: formatNumber(month) + '-' + formatNumber(date),
						day: i == 0 ? '今日' : '周' + '日一二三四五六'.charAt(myDate.getDay()),
						siteList: [],
						isRequest: false
					});
				}
				return dateList;
			}
		}
	});
</script>
<style scoped>
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.customerTab {
		width: 100%;
		height: 110rpx;
		background-color: #fff;
	}

	.customerTabItem {
		width: 20%;
		flex-shrink: 0;
		position: relative;
	}

	.selected {
		position: absolute;
		bottom: 0px;
		z-index: 1;
		width: 84rpx;
		height: 6rpx;
		background-color: #0077ff;
		border-radius: 6rpx;
		transition: all 0.5s;
	}

	.topItem {
		font-family: Alibaba PuHuiTi 2;
		font-size: 28rpx;
		font-weight: 500;
		text-align: center;
		font-feature-settings: 'kern' on;
		color: #b1b4c3;
	}
	.emptyText{
		margin-top: 10px;
		color: #ccc; 
		padding-left: 20rpx;
		height: 100rpx;
	}
	
	.bottomCon {
		padding: 0 24rpx 74rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		height: 308rpx;
		z-index: 99;
		box-sizing: border-box;
	}

	.clearBox {
		position: absolute;
		top: 8rpx;
		right: 20rpx;
		z-index: 99;
		font-family: Alibaba PuHuiTi 2;
		font-size: 20rpx;
		height: 28rpx;
		font-weight: normal;
		line-height: 28rpx;
		text-align: center;
		letter-spacing: 0px;
		text-decoration: underline;
		font-feature-settings: 'kern' on;
		color: #0077ff;
	}

	.rmbBox {
		font-family: Alibaba PuHuiTi 2;
		font-weight: 400;
		font-size: 36rpx;
		color: #ff5634;
	}

	.priceBox {
		font-family: D-DIN-PRO-Medium-Medium;
		font-weight: 400;
		font-size: 36rpx;
		color: #ff5634;
	}

	.choosedListBox {
		margin-top: 40rpx;
		height: auto;

	}

	.submitBtn {
		width: 200rpx;
		height: 70rpx;
		border-radius: 40rpx;
		opacity: 1;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		background-color: #0077ff;
		margin-top: 22rpx;
	}

	.choosedItem {
		width: 170rpx;
		height: 100rpx;
		border-radius: 6rpx;
		opacity: 1;
		box-sizing: border-box;
		border: 1px solid #0077ff;
		margin-right: 20rpx;
		flex-shrink: 0;
		position: relative;
		margin-top: 10px;
	}

	.closeBox {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #d8d8d8;
		right: -10px;
		top: -10px;
	}

	.itemTop {
		height: 50rpx;
		background-color: #0077ff;
		font-family: D-DIN-PRO-Medium-Medium;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		flex-wrap: nowrap;
	}

	.leftTimeBox {
		margin-top: 20px;
		width: 57px;
		flex-shrink: 0;
		text-align: center;
		/* padding-left: 32rpx; */
		/* position: absolute;
    left: 0;
    top: 20px;
    background-color: #fff; */
	}

	.rightSiteBox {
		width: calc(100vw - 57px);
		padding-right: 10px;
		box-sizing: border-box;
		overflow-x: auto;
		padding-bottom: 10px;
	}

	.timeItem {
		font-family: D-DIN-PRO-Medium-Medium;
		font-size: 28rpx;
		height: 20px;
		line-height: 20px;
		color: #333333;
		margin-bottom: 22px;
	}

	.selectable {
		/* 蓝色渐变 */
		background: linear-gradient(180deg, #92c5ff 0%, #0077ff 100%), #d8d8d8;
	}

	.disSelected {
		background: #d8d8d8;
	}

	.freeSelect {
		background: #ffffff;
		border: 1px solid #92c5ff;
		color: #b1b4c3 !important;
	}

	.selectItem {
		width: 65px;
		height: 35px;
		border-radius: 6rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		font-feature-settings: 'kern' on;
		color: #ffffff;
		margin: 0rpx 12rpx 7px 0;
		box-sizing: border-box;
	}

	.siteBox {
		font-family: Alibaba PuHuiTi 2;
		font-size: 24rpx;
		width: 130rpx;
		height: 50rpx;
		font-weight: normal;
		text-align: center;
		font-feature-settings: 'kern' on;
		color: #333333;
		text-align: center;
		line-height: 50rpx;
		margin-left: 12rpx;
	}
</style>