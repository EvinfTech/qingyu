<template>
    <!-- pages/album/album.wxml -->
    <view class="page">
        <van-nav-bar>
            <view slot="left" @tap="onClickLeft">
                <van-icon name="arrow-left" size="20px" />
            </view>
            <view slot="title" class="pageTitle">相册</view>
        </van-nav-bar>
        <view class="w-full flex flex-wrap" style="padding: 20rpx; box-sizing: border-box">
            <view class="imgBox" @tap="previwImg" :data-item="item" v-for="(item, index) in imgList" :key="index">
                <image :src="item" mode="" class="w-full h-full" />
            </view>
        </view>
    </view>
</template>

<script>
// pages/album/album.ts
export default({
    data() {
        return {
            currentIndex: 0,
            imgList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        let imgList = uni.getStorageSync('album');
        imgList = JSON.parse(imgList);
        uni.removeStorageSync('album');
        this.imgList = imgList;
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

        previwImg(e) {
            this.currentIndex =  e.currentTarget.dataset.item
            uni.previewImage({
                urls: this.imgList,
                current: e.currentTarget.dataset.item
            });
        }
    }
});
</script>
<style scoped>
/* pages/album/album.wxss */
.page {
    width: 100%;
    height: 100vh;
    background-color: #fff;
}
.imgBox {
    width: 344rpx;
    height: 230rpx;
    margin-bottom: 20rpx;
}
.imgBox:nth-child(2n + 1) {
    margin-right: 22rpx;
}
</style>
