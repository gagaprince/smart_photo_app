<template>
  <div>
    <div v-if="productList" class="photo-fr">
      <div class="photo-list">
        <div class="photo-item" v-for="item in productList" :key="item" @tap="gotoDetail(item)" >
          <img :src="item.cover" mode="widthFix">
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import {request} from '../../../utils/request';

export default {
  data () {
    return {
      psize:40,
      max:0,
      hasMore:true,
      user:'',
      type:'',
      productList:[],
      loading:false,
    }
  },

  onReachBottom(){
    if(this.loading)return;
    console.log('触底了');
    if(this.hasMore){
      this.loadMore(this.user,this.type);
    }else{
      wx.showToast({
        title:'没有更多了'
      })
    }
  },

  computed:{
    
  },

  

  methods: {
    async loadData(user,type){
      this.productList = [];
      await this.loadMore(user,type);
    },
    async loadMore(user,type){
      const psize = this.psize;
      const max = this.max;
      const refer = this.refer;
      const cookie = this.cookie;
      this.loading = true;
      wx.showLoading({
        title:'加载中'
      });
      try{
        const ret = await request({
          url:'/smallvideo/userAll',
          data:{
            user,type,psize,max,refer,cookie
          },
          method:'POST'
        });
        if(ret.code===0){
          const data = ret.data;
          this.max = data.max;
          this.hasMore = data.hasMore;
          this.productList = this.productList.concat(data.productList);
        }
      }catch(e){
        console.error(e);
      }finally{
        this.loading = false;
        wx.hideLoading();
      }
    },

    async jumptoWithContentLink(contentLink){
      wx.showLoading({
        title:'加载中'
      })
      
      const ret = await request({
        url:'/smallvideo/all',
        data:{
          content:this.query?`${contentLink}${this.query}`:contentLink,
          cookie:this.cookie||'',
        },
        method:'POST'
      }).then((ret)=>{
        console.log('ret',ret);
        const { code, data } = ret;
        if(code === 0){
          if(data.pics && data.pics.length>0){
            this.jumptoPhotoDetail(data);
          }else{
            if(data.videoUrl){
              this.jumptoVideoDetail(data);
            }else{
              wx.showToast({title:'加载失败请稍后再试'})
            }
          }
        }
      }).finally(()=>{
        wx.hideLoading();
      });
      
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
    gotoDetail(item){
      if(!item.videoUrl){
        // 说明是需要重新请求contentlink的
        this.jumptoWithContentLink(item.contentLink);
      }else if(item.videoUrl.indexOf('.mp3')!==-1){
        this.jumptoWithContentLink(item.contentLink);
      }else if(item.videoUrl){
        this.jumptoVideoDetail(item);
      }
    },
    clearStorage(){
      wx.removeStorageSync('ks_refer');
      wx.removeStorageSync('ks_cookie');
      wx.removeStorageSync('ks_query');
    },
  },

  onLoad(options){
    const {user, type} = options;
    this.user = user;
    this.type = type;
    this.max = 0;
    this.refer = wx.getStorageSync('ks_refer');
    this.cookie = wx.getStorageSync('ks_cookie');
    this.query = wx.getStorageSync('ks_query');
    this.loadData(user,type)
    this.clearStorage();
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .photo-fr{
    display: flex;
    flex-direction:column;
    padding: 15rpx;
    justify-content: center;
    padding-bottom: 115rpx;
  }
  .desc{
    padding: 10rpx;
  }
  .photo-list{
    display: flex;
    flex-wrap:wrap;
  }
  .photo-item{
    width:237rpx;
    height: 315.5rpx;
    margin:5rpx 2.5rpx 0 2.5rpx;
    overflow: hidden;
    background: #000;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .photo-item img{
    width:100%;
    display: block;
  }
  .save-fr{
    position: fixed;
    z-index: 1;
    bottom: 0;
    width:100%;
    height:100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
  }
  .save-btn{
    width:720rpx;
    height:60rpx;
    background: #000000;
    color: #ffffff;
    font-size: 30rpx;
    text-align: center;
    line-height: 60rpx;
    
  }

  
</style>
