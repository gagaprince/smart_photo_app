<template>
  <div class="frame">
    <div class="card-item" v-for="detail in detailData" :key="detail.id">
        <detail-card :imgurl="detail.url" :title="detail.title"></detail-card>
    </div>
  </div>
</template>

<script>
import detailCard from '@/components/detail-card'
import {request} from '../../utils/request';
export default {
  data () {
    return {
      detailData:[]
    };
  },

  components: {
    "detail-card":detailCard
  },


  methods: {
    fetchDetail(id){
        request({
            url:'/smart-photo/api/getDetail',
            data:{
                id
            }
        }).then((res)=>{
            console.log(res);
            if(res.code==0){
                this.detailData = res.data;
            }else{
                console.log('detail is empty');
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
  },

  onLoad({id}){
    this.fetchDetail(id);
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped >
  .frame{
      margin:0 20rpx;
  }
  .card-item{
      width:100%;
      border-radius: 10rpx;
      overflow: hidden;
      margin:20rpx 0;
      box-shadow: #999 0rpx 5rpx 10rpx;
  }
</style>
