<template>
  <div>
    <div v-if="photoData" class="photo-fr">
      <div class="desc">{{photoData.desc||''}}</div>
      <div class="photo-list">
        <div class="photo-item" v-for="item in photoData.pics" :key="item" @tap="preview(item)">
          <img :src="item" mode="widthFix">
        </div>
      </div>
    </div>
    <div class="save-fr">
      <div class="save-btn" @tap="savePics">一键保存</div>
    </div>
  </div>
  
</template>

<script>
import {request} from '../../../utils/request';

export default {
  data () {
    return {
      photoData:null,
      isSaving:false,
    }
  },

  computed:{
    
  },

  

  methods: {
    preview(item){
      console.log(item);
      wx.previewImage({
        urls:this.photoData.pics,
        current: item,
      })
    },
    savePic(img){
      return new Promise((res,rej)=>{
        wx.downloadFile({
          url: img, 
          success (result) {
            console.log('download success url',img);
            console.log('download success path',result);
            wx.saveImageToPhotosAlbum({
              filePath: result.tempFilePath,
              success(ret) {
                res(ret);
              },
              fail(e){
                rej(e);
              }
            });
          },
          fail(e){
            rej(e);
          },
          complete(){
            
          }
        })
      })
    },
    async savePics(){
      const {pics} = this.photoData;
      wx.showLoading({
        title:'下载中'
      });
      if(pics && pics.length){
        for(let i=0;i<pics.length;i++){
          try{
            await this.savePic(pics[i]);
          }catch(e){
            console.error(e);
            wx.showToast({
              title:'下载或保存图片出错',
            });
          }
        }
      }
      wx.hideLoading();
      wx.showToast({
        title:'保存完成'
      });
    },
    clearStorage(){
      wx.removeStorageSync('photo_key');
    },
  },

  onLoad(options){
    // this.test();
    this.photoData = wx.getStorageSync('photo_key');
    console.log('photoData',this.photoData);
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
