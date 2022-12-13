const isProduction = process.env.NODE_ENV === 'production'


export const request = ({url,data={},method='GET'})=>{
    console.log('isProduction',isProduction);
    // const realUrl = `http://localhost:3000${url}`; 
    // return new Promise((res,rej)=>{
        // wx.request({
        //     url:realUrl,
        //     data:Object.assign({version:'1'},data),
        //     success(ret){
        //         if(ret.statusCode==200){
        //             res(ret.data);
        //         }else{
        //             rej(`statusCode:${ret.statusCode}`);
        //         }
        //     },
        //     fail(e){
        //         rej(e);
        //     }
        // })
        
    // })
    let realUrl = '';
    if(isProduction){
        // return wx.cloud.callContainer({
        //     "path": url,
        //     "header": {
        //         "X-WX-SERVICE": "koa-4qz4"
        //     },
        //     method,
        //     data
        // }).then((ret)=>{
        //     console.log(ret);
        //     return ret.data;
        // })
        realUrl = `https://vd.gagaprince.top${url}`; 
    }else{
        // const realUrl = `http://192.168.50.197:3000${url}`; 
        // const realUrl = `https://vd.gagaprince.top${url}`; 
        realUrl = `http://localhost:3000${url}`;
    }
    console.log(realUrl);
    return new Promise((res,rej)=>{
        wx.request({
            url:realUrl,
            method,
            data:Object.assign({version:'1'},data),
            success(ret){
                if(ret.statusCode==200){
                    console.log(ret.data);
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