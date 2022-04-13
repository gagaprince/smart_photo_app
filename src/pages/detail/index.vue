<template>
  <div class="frame">
    <div class="card-item" v-for="(detail,index) in detailData" :key="detail.id">
        <detail-card :imgurl="detail.url" :title="detail.title" :detailId="detail.id"></detail-card>
        <div v-if="index==0">
            <ad unit-id="adunit-7f3baa5786787e9d"></ad>
        </div>
    </div>
  </div>
</template>

<script>
import detailCard from '@/components/detail-card'
import {request} from '../../utils/request';
export default {
  data () {
    return {
      id:0,
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
                id,
                version:1,
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
    },
    initAD(){
        // 在页面中定义插屏广告
        let interstitialAd = null
        console.log('initAD');
        console.log(wx.createInterstitialAd);

        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            console.log('init interstitialAd');
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-4ada6be552504e7b'
            })
            interstitialAd.onLoad(() => {
                console.log('interstitialAd load');
                // 在适合的场景显示插屏广告
                if (interstitialAd) {
                    interstitialAd.show().catch((err) => {
                        console.error(err)
                    })
                }
            })
            interstitialAd.onError((err) => {})
            interstitialAd.onClose(() => {})
        }

    }
  },

  onLoad({id}){
    this.id = id;
    this.fetchDetail(id);
    this.initAD();
  },

  created () {
    // let app = getApp()
  },
  onShareAppMessage(res){
      const imageUrl = res.target.dataset.url||`https://ip.webmasterapi.com/api/imageproxy/375x300,sc/${this.detailData[0].url}`;
      return {
        title: '这么甜美的女生你见过吗?',
        imageUrl,
        path: `/pages/detail/main?id=${this.id}`,
    }
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
