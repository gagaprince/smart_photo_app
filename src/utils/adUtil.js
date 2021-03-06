
const _showAdOnce = (adId,times)=>{
    // 在页面中定义插屏广告
    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
    interstitialAd = wx.createInterstitialAd({
        adUnitId: adId
    })
    interstitialAd.onLoad(() => {})
    interstitialAd.onError((err) => {
        console.error(err)
        if(times>0){
            setTimeout(()=>{
                _showAdOnce(adId,times-1);
            },1000);
        }
    })
    interstitialAd.onClose(() => {})
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
    interstitialAd.show().catch((err) => {
        console.error(err)
        if(times>0){
            setTimeout(()=>{
                _showAdOnce(adId,times-1);
            },1000);
        }
    })
    }
}

export const showInterstitialAd = (adId)=>{
    _showAdOnce(adId,15);
}