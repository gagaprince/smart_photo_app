<template>
<div>
  <div class="img-fr">
    <ad unit-id="adunit-f72371b4bbb81de2"></ad>
    <img class="learn-img" mode="widthFix" src="https://p0.meituan.net/travelcube/3c99893de1b260195adc99f314179967137801.jpg" alt="">
    <img class="learn-img" mode="widthFix" src="https://p0.meituan.net/travelcube/034a4114cd317aa8f83973d08d5bf52596762.jpg" alt="">
    <ad unit-id="adunit-3aa0226ad1ed6e73"></ad>
    <img class="learn-img" mode="widthFix" src="https://p0.meituan.net/travelcube/2c2b40c568c08c49d7cee17235ae105a91791.jpg" alt="">
    <img class="learn-img" mode="widthFix" src="https://p1.meituan.net/travelcube/9cfab1da604a2ed4ef18aafaabaa52ad70146.jpg" alt="">
  </div>
</div>
  
</template>

<script>

import {showInterstitialAd} from '../../../utils/adUtil';

export default {
  data () {
    return {
      linkContent:''
    }
  },

  

  methods: {
    
    
  },

  

  onLoad(){
    // this.test();
    showInterstitialAd('adunit-72e9c62b11935446');
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .container{

  }
  .img-fr{
    padding-top: 30rpx;
    width:100%;
    display: flex;
    align-items: center;
    flex-direction:column;
  }
  .learn-img{
    width:90%;
  }
</style>
