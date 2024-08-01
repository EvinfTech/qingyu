<template>
    <!-- pages/accountSecurity/accountSecurity.wxml -->
    <view class="page">
		<u-navbar class="nav-bar" title="账号与安全" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
			<template #left>
				<u-icon name="arrow-left" @click="app.toBack"></u-icon>
			</template>
		</u-navbar>
        <u-cell-group custom-class="userinfo-group">
            <u-cell title="手机号" :value="phone" center custom-class="userinfo-cell"></u-cell>
			<!-- #ifdef MP-WEIXIN -->
			<u-cell title="绑定微信" :value="status" center custom-class="userinfo-cell"></u-cell>
			<!-- #endif -->
        </u-cell-group>
        <!-- <view class="logOffBtn flex align-center justify-center" @click="logOff">注销账号</view> -->
		<u-modal :show="show" title="提示" content="确定要注销账号吗？" :showCancelButton="true" @confirm="confirm" @cancel="cancel"></u-modal>
    </view>
</template>

<script >
// pages/accountSecurity/accountSecurity.ts
export default({
    data() {
        return {
            accountNo: '163987',
            phone: '',
            status: '已绑定',
			show:false,
			app:null,
			userInfo:null
        };
    },
	async onLoad() {
		this.app = getApp()
		let userInfo = await this.app.getUserInfo()
		this.userInfo = userInfo;
		this.phone = userInfo.phone
	
	},
    methods: {
        onClickLeft() {
            uni.navigateBack();
        },

        logOff() {
			this.show = true
        },
		cancel(){
			this.show = false
		},
		confirm(){
			this.show = false
		}
    }
});
</script>
<style scoped>
/* pages/accountSecurity/accountSecurity.wxss */
.page {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fff;
}

.logOffBtn {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    width: 343px;
    height: 42px;
    border-radius: 6px;
    background: #f56c6c;
    font-family: Alibaba PuHuiTi 2;
    font-size: 16px;
    color: #fff;
}
</style>
