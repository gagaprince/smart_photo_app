export const request = ({url,data={}})=>{
    const realUrl = `http://fund.gagalulu.wang${url}`;
    return new Promise((res,rej)=>{
        wx.request({
            url:realUrl,
            data,
            success(ret){
                if(ret.statusCode==200){
                    res(ret.data);
                }else{
                    rej(`statusCode:${ret.statusCode}`);
                }
            },
            fail(e){
                rej(e);
            }
        })
    })
}