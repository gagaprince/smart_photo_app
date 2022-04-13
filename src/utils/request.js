export const request = ({url,data={},method='GET'})=>{
    const realUrl = `https://gagalulu.cn${url}`;
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
        return wx.cloud.callContainer({
            "path": url,
            "header": {
                "X-WX-SERVICE": "koa-4qz4"
            },
            method,
            data
        }).then((ret)=>{
            console.log(ret);
            return ret.data;
        })
    // })
}