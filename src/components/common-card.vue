<template>
  <div>
    <div class="img-frame" :style="imgFrameStyle" @click="viewTap"><img mode="aspectFill" :src="encodeUrl"></div>
  </div>
</template>

<script>
export default {
  props: ['imgurl','size','photoId'],
  computed:{
      encodeUrl(){
          // return `https://images.weserv.nl/?url=${encodeURIComponent(this.imgurl)}`;
          // return `https://imageproxy.pimg.tw/resize?url=${encodeURIComponent(this.imgurl)}`;
          // return `https://pic1.xuehuaimg.com/proxy/${encodeURIComponent(this.imgurl)}`;
          // return `https://ip.webmasterapi.com/api/imageproxy/${this.size}x${this.size},sc/${this.imgurl}`;
          return this.imgurl;
      },
      imgFrameStyle(){
          return `width:${this.size}rpx;height:${this.size}rpx;`
      }
  },
  methods:{
      viewTap(e){
          const url = `/pages/detail/main?id=${this.photoId}`;
          wx.navigateTo({url});
      }
  }
}
</script>

<style scoped>
  .img-frame{
    width:150rpx;
    height:150rpx;
    overflow: hidden;
    border-radius: 20rpx;
    background: #efefef;
  }
  .img-frame image{
    width:100%;
    height:100%;
  }
</style>
