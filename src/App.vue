<script>
export default {
  created () {
    console.log('created');
    wx.login({
      success({code}){
        console.log(code);
      }
    })
    wx.cloud.init({
      "env": "prod-3ggdr11dab400c61"
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
