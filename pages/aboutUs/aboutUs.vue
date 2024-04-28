<template>
    <!-- pages/aboutUs/aboutUs.wxml -->
    <view class="page">
      <u-navbar class="nav-bar" title="关于我们" :safeAreaInsetTop="true" :autoBack="false" :fixed="false">
		  <template #left>
		  	<up-icon name="arrow-left" @click="app.toBack"></up-icon>
		  </template>
	  </u-navbar>
        <view class="content">
            我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。我觉得总体来说平台还是一个非常不错的平台，但是可能在用户反馈这一块还有一些欠缺。
        </view>
    </view>
</template>

<script >
// pages/aboutUs/aboutUs.ts
export default({
    data() {
        return {
			app:getApp()
		};
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
/* pages/aboutUs/aboutUs.wxss */
.page {
    width: 100%;
    height: 100vh;
    background-color: #fff;
}

.content {
    padding: 28rpx 32rpx;
    font-family: Alibaba PuHuiTi 2;
    font-size: 32rpx;
    color: #0b1526;
}
</style>
