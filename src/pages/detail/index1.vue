<template>
  <div class="frame">
    <!-- <swiper class="photo-swiper" :indicator-dots="indicatorDots"
        :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="item in background" :key="item">
          <swiper-item>
            <view class="swiper-item" :class="item">
              <img mode="widthFix" src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.lianzhixiu.com%2Fuploads%2Fallimg%2F202105%2F9999%2F22339fe1a7.jpg">
            </view>
          </swiper-item>
        </block>
      </swiper> -->
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 4000,
      duration: 500
    };
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
  .photo-swiper{
    height:800rpx;
  }
  .swiper-item{

  }
  .swiper-item image{
    width:100%;

  }

</style>
