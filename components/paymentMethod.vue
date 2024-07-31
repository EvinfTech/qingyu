<template>
	<view>
		<u-popup :show="show" mode="center" round="10" :safeAreaInsetBottom="false">
			<view class="popupBox">
				<view class="popTitle">
					请选择支付方式
				</view>
				<view class="flex align-center justify-between" v-for="(item,index) in methodList" :key="index"
					@click="chooseItem(index)">
					<view class="flex align-center">
						<img v-if="index==0" src="../static/images/order/balanceIcon.svg" class="iconClass" alt="">
						<img v-else-if="index==1" src="../static/images/order/wechatIcon.svg" class="iconClass"
							alt="">
						<text>{{item}}</text>
						<text v-if="index==0" style="color: gray;font-size: 14px;">(可用{{balance}})</text>
					</view>
					<view class="radioBox flex align-center justify-center" :class="methodIndex==index?'active':''"
						:style="{'background':(index==0&&price>balance)?'#f5f5f5':''}">
						<u-icon name="checkmark" color="#fff" size="12"></u-icon>
					</view>
				</view>
				<div class="flex align-center">
					<view class="cancelBtn flex align-center justify-center" @click="cancel">
						取消
					</view>
					<view class="ensureBtn flex align-center justify-center" @click="enSure">
						确定
					</view>
				</div>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "paymentMethod",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			price: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				app: getApp(),
				methodIndex: 0,
				methodList: ['余额支付', '微信支付'],
				balance: 0
			};
		},
		watch: {
			async show(val) {
				if (val) {
					let userInfo = await this.app.getUserInfo()
					this.balance = userInfo.balance
					if (this.price > this.balance) {
						this.methodIndex = 1
					}
				}
			}
		},
		methods: {
			// 选择支付方式
			chooseItem(index) {
				// 如果点击余额支付且 余额不足
				if (index == 0 && this.price > this.balance) {
					return false;
				}
				this.methodIndex = index
			},
			// 取消
			cancel() {
				this.$emit('cancelPay')
				this.methodIndex = 0
			},
			// 确定
			enSure() {
				this.$emit('toEnsurePay', this.methodIndex)
			}
		}
	}
</script>

<style scoped>
	.popupBox {
		width: 60vw;
		padding: 18px;
	}

	.popTitle {
		margin-bottom: 10px;
	}

	.radioBox {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin-top: 12px;
	}

	.active {
		background-color: #0077ff;
		border-color: #0077ff;
	}

	.iconClass {
		width: 20px;
		height: 20px;
		margin-right: 3px;

	}

	.cancelBtn {
		width: 90%;
		height: 70rpx;
		border-radius: 40rpx;
		opacity: 1;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		margin: 20px 0 0;
		margin-right: 10px;
		border: 1px solid #ccc;
		color: #323233;
	}

	.ensureBtn {
		background-color: #0077ff;
		width: 90%;
		height: 70rpx;
		border-radius: 40rpx;
		opacity: 1;
		font-family: Alibaba PuHuiTi 2;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		margin: 20px 0 0;
	}
</style>