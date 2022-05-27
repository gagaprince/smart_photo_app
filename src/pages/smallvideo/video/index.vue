<template>
  <div v-if="videoData" class="video-fr">
    <video class="video-content" :src="videoData.videoUrl" :poster="videoData.cover"></video>
    <div class="btn-fr">
      <div class="btn-save" @tap="saveVideo">保存视频{{showProgress}}</div>
      <div class="btn-cp" @tap="cpVideoLink">复制无水印链接</div>
    </div>
  </div>
</template>

<script>
import {request} from '../../../utils/request';

export default {
  data () {
    return {
      videoData:null,
      isSaving:false,
      progress:0,
    }
  },

  computed:{
    showProgress(){
      return this.isSaving?`${this.progress}%`:'';
    }
  },

  

  methods: {
    saveVideo(){
      const _this = this;
      const videoData = this.videoData||{};
      wx.showLoading({
        title:'下载中'
      });
      const downloadTask = wx.downloadFile({
        url: videoData.videoUrl, 
        success (res) {
          console.log('download success',res);
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading();
              wx.showToast({
                title:'下载成功'
              })
            }
          });
        },
        complete(res){
          console.log('complete');
        }
      })

      downloadTask.onProgressUpdate((res) => {
        this.isSaving = true;
        this.progress = res.progress;
        // console.log('下载进度', res.progress)
        // console.log('已经下载的数据长度', res.totalBytesWritten)
        // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        if(res.progress === 100){
          this.isSaving = false;
        }
      })
    },
    cpVideoLink(){
      wx.setClipboardData({
        data:this.videoData.videoUrl
      });
    },
    clearStorage(){
      wx.removeStorageSync('video_key');
    },
    
  },

  onLoad(options){
    // this.test();
    this.videoData = wx.getStorageSync('video_key');
    console.log('videoData',this.videoData);
    this.clearStorage();
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .video-fr{
    display: flex;
    flex-direction:column;
  }
  .video-content{
    width:100%;
  }
  .btn-fr{
    display: flex;
    justify-content: space-between;
    width: 690rpx;
    margin:auto; 
    margin-top:30rpx;
  }
  .btn-save,.btn-cp{
    width:45%;
    height:70rpx;
    background: #000;
    color: #fff;
    font-size: 36rpx;
    text-align: center;
    line-height: 70rpx; 
    border-radius: 10rpx; 
  }
  .btn-cp{
    margin-left:10%;
  }
</style>
