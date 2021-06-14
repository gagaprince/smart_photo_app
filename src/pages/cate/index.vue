<template>
  <div class="frame">
    <div class="cate">
      <div class="label">
        <div class="left-label">清纯美人</div>
        <div class="right-label">图片收集于网络,如有侵权立刻删除</div>  
      </div>
      <div class="pics2">
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202105%2F9999%2F22339fe1a7.jpg"></div>
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202101%2F9999%2Fe4abd4391b.jpg"></div>
      </div>
      <div class="pics2">
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202105%2F9999%2F22339fe1a7.jpg"></div>
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202101%2F9999%2Fe4abd4391b.jpg"></div>
      </div>
      <div class="pics2">
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202105%2F9999%2F22339fe1a7.jpg"></div>
        <div class="img-frame"><img mode="aspectFill" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202101%2F9999%2Fe4abd4391b.jpg"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {}
  },

  components: {
    card
  },

  methods: {
    
  },

  onLoad(page){
    console.log(page);
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped >
  .frame{
    padding: 20rpx 40rpx;
  }
  .label{
    font-size:40rpx;
    font-weight:bolder;
    color: #000;
    display: flex;
  }
  .label .left-label{
    flex:1;
  }
  .right-label{
    color:#e0e0e0;
    font-size: 20rpx;
    line-height:60rpx;
  }
  .arrow{
    width:30rpx;
    height:30rpx;
    position: absolute;
    right:0;
    top:50%;
    margin-top:-15rpx;
  }
  .pics{
    display: flex;
    margin-top:20rpx;
  }
  .pics .img-frame{
    width:150rpx;
    height:150rpx;
    overflow: hidden;
    border-radius: 20rpx;
    margin-right: 30rpx;
  }
  .pics .img-frame:last-child{
    margin-right: 0;
  }
  .pics .img-frame image{
    width:100%;
    height:100%;
  }
  .cate{
    margin-top:10rpx;
  }
  .pics2{
    display: flex;
    margin-top:35rpx;
  }

  .pics2 .img-frame{
    width:320rpx;
    height:320rpx;
    overflow: hidden;
    border-radius: 20rpx;
    margin-right: 50rpx;
  }
  .pics2 .img-frame:last-child{
    margin-right: 0;
  }
  .pics2 .img-frame image{
    width:100%;
    height:100%;
  }

</style>
