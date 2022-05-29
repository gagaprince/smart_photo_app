<template>
  <div class="link-fr">
    <ad unit-id="adunit-94416bd408899a96"></ad>
    <textarea :value="linkContent" maxlength="-1" @input="onInput" @blur="onBlur" class="link-text" placeholder="请输入视频链接，暂时只支持筷艏和钭垠"></textarea>
    <div class="link-btn" @tap="beginJx">立即解析</div>
    <div class="past-btn" @tap="pastContent">粘贴</div>
    <div class="jiaocheng-btn" @tap="toJiaoCheng">查看教程</div>
  </div>
</template>

<script>
import {request} from '../../../utils/request';
import {showInterstitialAd} from '../../../utils/adUtil';

export default {
  data () {
    return {
      linkContent:''
    }
  },

  

  methods: {
    jumptoDetail(data){
      if(data.pics && data.pics.length>0){//有图片
        this.jumptoPhotoDetail(data);
      }else if(data.videoUrl){
        this.jumptoVideoDetail(data);
      }else if(data.user){
        this.jumptoCenterDetail(data);
      }else{
        
      }
    },
    jumptoCenterDetail(data){
      wx.setStorageSync('ks_refer',data.refer);
      wx.setStorageSync('ks_cookie',data.cookie||'');
      wx.setStorageSync('ks_query',data.query||'');
      const url = `/pages/smallvideo/center/main?type=${data.type}&user=${data.user}`;
      wx.navigateTo({url});
    },
    jumptoPhotoDetail(data){
      wx.setStorageSync('photo_key',data);
      const url = `/pages/smallvideo/photo/main`;
      wx.navigateTo({url});
    },
    jumptoVideoDetail(data){
      wx.setStorageSync('video_key',data);
      const url = `/pages/smallvideo/video/main`;
      wx.navigateTo({url});
    },
    toJiaoCheng(){
      const url = `/pages/smallvideo/learn/main`;
      wx.navigateTo({url});
    },
    jx(textContent) {
      if(!textContent){
        wx.showToast({
          title:'请先粘贴链接'
        })
        return;
      }
      wx.showLoading({
        title:'解析中'
      })
      request({
        url:'/smallvideo/all',
        data:{
          content:textContent
        },
        method:'POST'
      }).then((ret)=>{
        console.log('ret',ret);
        const { code, data } = ret;
        if(code === 0){
          this.jumptoDetail(data);
        }
      }).finally(()=>{
        wx.hideLoading();
      });
    },
    onBlur(e){
      this.linkContent = e.mp.detail.value;
    },
    onInput(e){
      this.linkContent = e.mp.detail.value;
    },
    beginJx(){
      setTimeout(()=>{
        this.jx(this.linkContent);
      },300)
    },
    pastContent(){
      const _this = this;
      wx.getClipboardData({
        success(res){
          if(res.data){
            _this.linkContent = res.data;
          }
        }
      })
    }
    
  },

  

  onLoad(){
    // this.test();
    
  },
  onShow(){
    showInterstitialAd('adunit-ea9a41be010b8c4d');
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .link-fr{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  textarea{
    margin-top:30rpx;
  }
  .link-text{
    background: #f6f6f6;
    width:650rpx;
    padding:20rpx;
  }
  .link-btn,.past-btn{
    display: block;
    width:690rpx;
    height:80rpx;
    margin-top: 30rpx;
    border-radius: 10rpx;
    background: #000000;
    color: #f6f6f6;
    font-size: 36rpx;
    text-align: center;
    line-height: 80rpx;
  }
  .past-btn{
    width:120rpx;
    height:60rpx;
    line-height: 60rpx;
    position: absolute;
    right:10rpx;
    bottom: 150rpx;
    font-size: 30rpx;
  }
  .jiaocheng-btn{
    width:150rpx;
    height:150rpx;
    color: #f6f6f6;
    font-size: 32rpx;
    text-align: center;
    line-height: 150rpx;
    border-radius: 75rpx;
    position: fixed;
    right:0;
    bottom: 100rpx;
    background: #000000;
  }
</style>
