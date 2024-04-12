<template>
    <!-- pages/arrgement/arrgement.wxml -->
    <view class="page">
		<u-navbar class="nav-bar" title="用户协议" :safeAreaInsetTop="true" :autoBack="true" :fixed="false"></u-navbar>
        <view class="arrgementBox">欢迎您使用服务（以下简称：本服务）请您仔细阅读下方条款，若您对本协议的任何条款有异议，您可以第一时间选择不进入。</view>
    </view>
</template>

<script>
// pages/arrgement/arrgement.ts
export default({
    data() {
        return {};
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},
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
        }
    }
});
</script>
<style scoped>
/* pages/arrgement/arrgement.wxss */
.page {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fff;
}

.pageTitle {
    font-size: 34rpx;
    font-weight: 600;
    color: #26292c;
}

.arrgementBox {
    padding: 0 32rpx;

    margin-top: 28rpx;
    font-family: Alibaba PuHuiTi 2;
    font-size: 32rpx;
    line-height: 48rpx;
    color: #0b1526;
}
</style>
