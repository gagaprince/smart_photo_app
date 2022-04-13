<template>
  <div class="frame">
    <div class="cate">
      <div class="label">
        <div class="left-label">{{cate}}</div>
        <div class="right-label">图片收集于网络,如有侵权立刻删除</div>  
      </div>
      <div v-for="(rows,index) in rowsDataArr" :key="index">
        <div class="pics2">
          <div class="img-frame" v-if="rows[0]"><common-card :imgurl="rows[0].url" size="320" :photoId="rows[0].id"></common-card></div>
          <div class="img-frame" v-if="rows[1]"><common-card :imgurl="rows[1].url" size="320" :photoId="rows[1].id"></common-card></div>
        </div>
        <div v-if="index==3" style="margin-top:20px;">
          <ad unit-id="adunit-47e4be69c30312de"></ad>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <ad unit-id="adunit-cfca5c4948f989ca" ad-type="video" ad-theme="white"></ad>
    </div>
    <div class="more-btn-frame" v-if="dataArr.length>0">
      <div class="more-btn" @click="fetchMore">加载更多</div>
    </div>
  </div>
  
</template>

<script>
import commonCard from '@/components/common-card'
import {request} from '../../utils/request';

export default {
  data () {
    return {
      page:0,
      cate:"",
      dataArr:[]
    }
  },

  components: {
    "common-card":commonCard
  },

   computed:{
     rowsDataArr(){
       const rowsData = [];
       this.dataArr.forEach((item,index)=>{
         if(index%2==0){
           rowsData.push([item,this.dataArr[index+1]]);
         }
       });
       return rowsData;
     }
   },

  methods: {
    fetchDataByPage(cate){
      request({
            url:'/smart-photo/api/getCateDataPage',
            data:{
                cate,pno:this.page,
                version:1,
            }
        }).then((res)=>{
            console.log(res);
            if(res.code==0){
                this.dataArr = this.dataArr.concat(res.data);
                this.page++;
            }else{
                console.log('catedata is empty');
            }
        }).catch((e)=>{
            console.log(e);
        });
    },
    fetchMore(){
      this.fetchDataByPage(this.cate);
    }
  },

  onLoad(opt){
    this.page=0;
    this.dataArr=[];
    const {cate} = opt;
    this.cate = cate;
    this.fetchDataByPage(cate);
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
  .more-btn-frame{
    display: flex;
    width:100%;
    justify-content: center; 
    align-items: center;
    height:100rpx;
    margin: 10rpx 0 0 0;
  }
  .more-btn{
    width:70%;
    height:70rpx;
    background: pink;
    text-align: center;
    line-height: 70rpx;
    color: #fff;
    font-size: 30rpx;
  }

</style>
