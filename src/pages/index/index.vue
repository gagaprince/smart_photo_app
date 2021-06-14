<template>
  <div class="frame">
    <div class="tj" v-if="hotData && hotData.length>0">
      <div class="label">每日精选</div>
      <div class="pics" v-if="topHot.length>=4">
        <div class="img-frame" v-for="hot in topHot" :key="hot.id">
          <common-card :imgurl="hot.url" size="150" :photoId="hot.id"></common-card>
        </div>
      </div>
      <div class="pics" v-if="bottomHot.length>=4">
        <div class="img-frame" v-for="hot in bottomHot" :key="hot.id">
          <common-card :imgurl="hot.url" size="150" :photoId="hot.id"></common-card>
        </div>
      </div>
    </div>
    <div v-if="cateData && cateData.length>0" >
      <div class="cate" v-for="cateObj in cateData" :key="cateObj.cate">
        <div class="label">
          <div class="left-label">{{cateObj.cate}}</div>
          <div class="right-label"><img class="arrow" src="https://p0.meituan.net/travelcube/ec88becb40e648158328f5ba7e91e42a5034.png" alt=""></div>  
        </div>
        <div class="pics2">
          <div class="img-frame"><common-card :imgurl="cateObj.infos[0].url" size="320" :photoId="cateObj.infos[0].id"></common-card></div>
          <div class="img-frame"><common-card :imgurl="cateObj.infos[1].url" size="320" :photoId="cateObj.infos[1].id"></common-card></div>
        </div>
        <div class="pics2">
          <div class="img-frame"><common-card :imgurl="cateObj.infos[2].url" size="320" :photoId="cateObj.infos[2].id"></common-card></div>
          <div class="img-frame"><common-card :imgurl="cateObj.infos[3].url" size="320" :photoId="cateObj.infos[3].id"></common-card></div>
        </div>
        <div class="pics2">
          <div class="img-frame"><common-card :imgurl="cateObj.infos[4].url" size="320" :photoId="cateObj.infos[4].id"></common-card></div>
          <div class="img-frame"><common-card :imgurl="cateObj.infos[5].url" size="320" :photoId="cateObj.infos[5].id"></common-card></div>
        </div>
      </div>  
    </div>
    
  </div>
  
</template>

<script>
import commonCard from '@/components/common-card'
import {request} from '../../utils/request';

export default {
  data () {
    return {
      hotData:[],
      cateData:[]
    }
  },

  components: {
    "common-card":commonCard
  },

  computed:{
    topHot(){
      if(this.hotData.length>=4){
        return this.hotData.slice(0,4);
      }
      return [];
    },
    bottomHot(){
      if(this.hotData.length>=8){
        return this.hotData.slice(4,8);
      }
      return [];
    }
  },

  methods: {
    fetchHot(){
      return request({
        url:'/smart-photo/api/getHotDaliy'
      }).then((res)=>{
        console.log(res);
        if(res.code==0){
          this.hotData = res.data;
        }else{
          console.log('hotdata is empty');
        }
      }).catch((e)=>{
        console.log(e);
      })
    },
    fetchCate(){
      return request({
        url:'/smart-photo/api/getAllCateData'
      }).then((res)=>{
        console.log(res);
        if(res.code==0){
          // this.hotData = res.data;
          this.cateData = res.data;
        }else{
          console.log('catedata is empty');
        }
      }).catch((e)=>{
        console.log(e);
      })
    },
  },

  onPullDownRefresh () {
    this.fetchHot();
    this.fetchCate().then(()=>{
      wx.stopPullDownRefresh();
    });
  },

  onLoad(){
    this.fetchHot();
    this.fetchCate();
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
  .tj{
    
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
    width:100rpx;
    position: relative;
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
    margin-top:40rpx;
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
