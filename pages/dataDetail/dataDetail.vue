<template>
	<!-- pages/dataDetail/dataDetail.wxml -->
	<view class="page">
		<van-nav-bar class="nav-bar">
			<view slot="left" @tap="onClickLeft">
				<van-icon name="arrow-left" size="20px" />
			</view>
			<view slot="title" class="pageTitle">活动数据</view>
		</van-nav-bar>
		<scroll-view :scroll-y="true" :style="'height: ' + scrollViewHeight + 'px;'">
			<view class="commonTitle">活动数据</view>
			<view class="flex align-center justify-around topBox">
				<view class="flex-1 flex flex-direction align-center">
					<view class="topBoxTitle">活动浏览量(PV)</view>
					<view class="topBoxCon">
						{{ pv }}
					</view>
				</view>
				<view class="flex-1 flex flex-direction align-center">
					<view class="topBoxTitle">独立访客数(UV)</view>
					<view class="topBoxCon">
						{{ uv }}
					</view>
				</view>
			</view>
			<view class="commonTitle">报名名单</view>
			<view v-if="registrationList.length > 0">
				<view class="listItem flex align-center justify-between" v-for="(item, index) in registrationList"
					:key="index">
					<view class="flex align-center">
						<image :src="item.avatar" mode=""
							style="width: 50px; height: 50px; border-radius: 50%; margin-right: 5px" />
						<view class="flex flex-direction align-start">
							<view class="flex align-center">
								<text class="nameText">{{ item.name }}</text>
								<image style="width: 18px; height: 18px; margin-left: 4px"
									:src="item.sex == 1 ? '../../static/images/mine/boyIcon.svg' : '../../static/images/mine/girlIcon.svg'"
									mode="" />
							</view>
							<view class="amountText">男： {{ item.man_count }} 女： {{ item.woman_count }}</view>
						</view>
					</view>

					<view>
						<text class="successText">已报名</text>
					</view>
				</view>
			</view>
			<view v-else class="flex align-center justify-center emptyText">暂无报名</view>

			<view class="commonTitle">候选名单</view>
			<view v-if="waitingList.length > 0">
				<view class="listItem flex align-center justify-between" v-for="(item, index) in waitingList"
					:key="index">
					<view class="flex align-center">
						<image :src="item.avatar" mode=""
							style="width: 50px; height: 50px; border-radius: 50%; margin-right: 5px" />
						<view class="flex flex-direction align-start">
							<view class="flex align-center">
								<text class="nameText">{{ item.name }}</text>
								<image style="width: 18px; height: 18px; margin-left: 4px"
									:src="item.sex == 1 ? '../../static/images/mine/boyIcon.svg' : '../../static/images/mine/girlIcon.svg'"
									mode="" />
							</view>
						</view>
					</view>

					<view>
						<text class="successText">候选</text>
					</view>
				</view>
			</view>
			<view v-else class="flex align-center justify-center emptyText">暂无候选</view>
		</scroll-view>
	</view>
</template>

<script>
	// pages/dataDetail/dataDetail.ts
	import {
		request
	} from '../../utils/request';
	export default ({
		data() {
			return {
				scrollViewHeight: 0,
				pv: 0, 
				uv: 0,
				registrationList: [{
						name: '昵称1',
						sex: 2,
						man_amount: 1,
						woman_amount: 2,
						state: 0
					},
					{
						name: '昵称1',
						sex: 1,
						man_amount: 1,
						woman_amount: 2,
						state: 0
					}
				],
				waitingList: [{
					name: '昵称1',
					sex: 1,
					state: 0
				}]
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.calculate();
			this.initData(options.id);
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
			onClickLeft() {
				uni.navigateBack();
			},

			calculate() {
				var that = this;
				var screenHeight = uni.getSystemInfoSync().windowHeight;
				let query = uni.createSelectorQuery();
				query
					.select('.nav-bar')
					.boundingClientRect((res) => {
						that.scrollViewHeight = screenHeight - res.height - 20
					})
					.exec();
			},

			initData(id) {
				request({
					url: 'wx/get/activity/apply/list',
					method: 'POST',
					data: {
						activity_id: Number(id)
					}
				}).then((res) => {
					this.pv = res.data.browse
					this.uv = res.data.independent
					this.registrationList = res.data.success
					this.waitingList = res.data.wait ? res.data.wait : []
				});
			}
		}
	});
</script>
<style scoped>
	/* pages/dataDetail/dataDetail.wxss */
	.page {
		width: 100%;
		height: 100vh;
		background-color: #f4f4f4;
		box-sizing: border-box;
	}

	.commonTitle {
		width: 100%;
		height: 44px;
		font-family: PingFang SC;
		font-size: 18px;
		color: #000000;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.topBox {
		width: 100%;
		height: 97px;
		background-color: #fff;
	}

	.topBoxTitle {
		font-family: PingFang SC;
		font-size: 14px;
		color: #9e9e9e;
	}

	.topBoxCon {
		font-family: PingFang SC;
		font-size: 24px;
		font-weight: 500;
		color: #333333;
		margin-top: 3px;
	}

	.listItem {
		width: 100%;
		height: 74px;
		box-sizing: border-box;
		padding: 12px 16px;
		background-color: #fff;
	}

	.nameText {
		font-family: PingFang SC;
		font-size: 16px;
		color: #9e9e9e;
	}

	.amountText {
		font-family: PingFang SC;
		font-size: 12px;
		color: #9e9e9e;
		margin-top: 6px;
	}

	.successText {
		font-family: PingFang SC;
		font-size: 12px;
		line-height: 24px;
		color: #00ba7f;
	}

	.errorText {
		font-family: PingFang SC;
		font-size: 12px;
		line-height: 24px;
		color: #ff5634;
	}

	.emptyText {
		box-sizing: border-box;
		padding: 20px;
		font-size: 14px;
		color: #ccc;
	}
</style>
