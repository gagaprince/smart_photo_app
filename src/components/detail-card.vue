<template>
  <div>
    <div class="photo-frame">
        <img mode="widthFix" :src="encodeUrl">
    </div>
    <div class="desc-frame">
        <div class="desc">{{title}}</div>
        <div class="fenxiang-frame">
            <button :data-url="shareImg" open-type="share" class="iconfont .icon-fenxiang:before fenxiang"></button>
        </div>
    </div>
  </div>
</template>

<script>
import '../../static/style/iconfont.css';
export default {
  props: ['imgurl','title','detailId'],
  computed:{
      encodeUrl(){
        //   return `https://images.weserv.nl/?url=${encodeURIComponent(this.imgurl)}`;
        // return `https://imageproxy.pimg.tw/resize?url=${encodeURIComponent(this.imgurl)}`;
        // return `https://pic1.xuehuaimg.com/proxy/${encodeURIComponent(this.imgurl)}`;
        return `https://ip.webmasterapi.com/api/imageproxy/750x/${this.imgurl}`;
      },
      shareImg(){
          return `https://ip.webmasterapi.com/api/imageproxy/375x300,sc/${this.imgurl}`;
      }
  },
  methods:{
      
  }
}
</script>

<style scoped>
  .photo-frame{
      width:100%;
      min-height: 400rpx;
      background: #efefef;
  }
  .photo-frame image{
      width:100%;
      display: block;
  }
  .desc-frame{
      height: 100rpx;
      background: #fff;
      display: flex;
      padding: 0 20rpx;
  }
  .desc{
      font-size: 30rpx;
      color:#999;
      max-width: 80%;
      line-height: 100rpx;
      flex: 1;
  }
  .fenxiang-frame{
        position: relative;
        width:20%; 
  }
    button{
        margin:0;
        padding:0;
        background-color:#ffffff;
        line-height:inherit;
        height:100rpx;
        border-radius:0;
        border:none;
        font-size:60rpx;
    }
    button::after{
        border: none;
    }
  .fenxiang{
      position: absolute;
      top:50%;
      right:0;
      margin-top:-25rpx;
      color:pink;
      font-size: 50rpx!important;
  }
</style>
