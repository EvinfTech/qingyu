<template>
<uni-shadow-root class="vant-steps-index"><view :class="'custom-class '+(utils.bem('steps', [direction]))">
  <view class="van-step__wrapper">
    <view v-for="(item,index) in (steps)" :key="item.index" :class="(utils.bem('step', [direction, status(index, active)]))+' van-hairline'">
      <view class="van-step__title" :style="index === active ? 'color: ' + activeColor : ''">
        <view>{{ item.text }}</view>
        <view>{{ item.desc }}</view>
      </view>
      <view class="van-step__circle-container">
        <block v-if="index !== active">
          <van-icon v-if="inactiveIcon" color="#969799" :name="inactiveIcon" custom-class="van-step__icon"></van-icon>
          <view v-else class="van-step__circle" :style="index < active ? 'background-color: ' + activeColor : ''"></view>
        </block>

        <van-icon v-else :name="activeIcon" :color="activeColor" custom-class="van-step__icon"></van-icon>
      </view>
      <view v-if="index !== steps.length - 1" class="van-step__line" :style="index < active ? 'background-color: ' + activeColor : ''"></view>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs module="status" src="./index-status.wxs"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant/steps/index'
import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';
VantComponent({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: 'horizontal'
        },
        activeColor: {
            type: String,
            value: GREEN
        },
        activeIcon: {
            type: String,
            value: 'checked'
        },
        inactiveIcon: String
    }
});
export default global['__wxComponents']['vant/steps/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-steps{overflow:hidden;background-color:#fff;background-color:var(--steps-background-color,#fff)}.van-steps--horizontal{padding:10px}.van-steps--horizontal .van-step__wrapper{position:relative;display:-webkit-flex;display:flex;overflow:hidden}.van-steps--vertical{padding-left:10px}.van-steps--vertical .van-step__wrapper{padding:0 0 0 20px}.van-step{position:relative;-webkit-flex:1;flex:1;font-size:14px;font-size:var(--step-font-size,14px);color:#969799;color:var(--step-text-color,#969799)}.van-step--finish{color:#323233;color:var(--step-finish-text-color,#323233)}.van-step__circle{border-radius:50%;width:5px;width:var(--step-circle-size,5px);height:5px;height:var(--step-circle-size,5px);background-color:#969799;background-color:var(--step-circle-color,#969799)}.van-step--horizontal{padding-bottom:14px}.van-step--horizontal:first-child .van-step__title{-webkit-transform:none;transform:none}.van-step--horizontal:first-child .van-step__circle-container{padding:0 8px 0 0;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0)}.van-step--horizontal:last-child{position:absolute;right:0;width:auto}.van-step--horizontal:last-child .van-step__title{text-align:right;-webkit-transform:none;transform:none}.van-step--horizontal:last-child .van-step__circle-container{right:0;padding:0 0 0 8px;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0)}.van-step--horizontal .van-step__circle-container{position:absolute;bottom:6px;z-index:1;-webkit-transform:translate3d(-50%,50%,0);transform:translate3d(-50%,50%,0);background-color:#fff;background-color:var(--white,#fff);padding:0 8px;padding:0 var(--padding-xs,8px)}.van-step--horizontal .van-step__title{display:inline-block;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);font-size:12px;font-size:var(--step-horizontal-title-font-size,12px)}.van-step--horizontal .van-step__line{position:absolute;right:0;bottom:6px;left:0;height:1px;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);background-color:#ebedf0;background-color:var(--step-line-color,#ebedf0)}.van-step--horizontal.van-step--process{color:#323233;color:var(--step-process-text-color,#323233)}.van-step--horizontal.van-step--process .van-step__icon{display:block;line-height:1;font-size:12px;font-size:var(--step-icon-size,12px)}.van-step--vertical{padding:10px 10px 10px 0;line-height:18px}.van-step--vertical:after{border-bottom-width:1px}.van-step--vertical:last-child:after{border-bottom-width:none}.van-step--vertical:first-child:before{position:absolute;top:0;left:-15px;z-index:1;width:1px;height:20px;content:"";background-color:#fff;background-color:var(--white,#fff)}.van-step--vertical .van-step__circle,.van-step--vertical .van-step__icon,.van-step--vertical .van-step__line{position:absolute;top:19px;left:-14px;z-index:2;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.van-step--vertical .van-step__icon{line-height:1;font-size:12px;font-size:var(--step-icon-size,12px)}.van-step--vertical .van-step__line{z-index:1;width:1px;height:100%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);background-color:#ebedf0;background-color:var(--step-line-color,#ebedf0)}
</style>