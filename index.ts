function formatKey(key,isSameRequest) {
    if(isSameRequest) {
        return key
    }
    if(!key) {
        return 'symbol-null'
    }
    if(Array.isArray(key)) {
        return key.toString()
    }
    if(typeof key === 'object') {
        return JSON.stringify(key)
    }
    return key
}

type Fn<T, U> = (args: U) => Promise<T>

function DebounceRequest<T, U extends unknown>(fn: Fn<T, U>,interval:number=1000,isSameRequest:boolean=false): (body: U) => Promise<T> {
    let curTime
    let preTime
    const res = new Map();
    return async function (body: U): Promise<T> {
        const updateRequest = (key) => {
            key = formatKey(key,isSameRequest)
            res.set(key,fn(body))
        }
        const getRes = (key) => {
            key = formatKey(key,isSameRequest)
            if(res.has(key)) {
                return res.get(key)
            }
            updateRequest(key)
            return getRes(key)

        }
        if(!curTime) {
            curTime = new Date().getTime();
            preTime = new Date().getTime();
            updateRequest(body)
            return getRes(body)
        }
        curTime = new Date().getTime();
        if(curTime - preTime < interval) {
            preTime = curTime
            return getRes(body)
        }
        preTime = curTime
        updateRequest(body);
        return getRes(body)
    }
}

export {DebounceRequest}
/** test-case */
// type RequestType<T> = (res: T) => Promise<T>
// const mockRequest:RequestType<string> = (res) => new Promise((resolve) => {
//     console.log('发了请求')
//     setTimeout(() => {
//         resolve(res)
//     }, 200);
// })

// const request = DebounceRequest(mockRequest,1000,false)

// async function exec() {
//     // const a = await request('a')
//     // const b = await request('b')
//     // const c = await request('c')
//     // const d = await request('c')


//     // const a = await request({name: 'andy'})
//     // const b = await request({name: 'andy'})
//     // const c = await request({name: 'andy'})
//     // const d = await request({name: 'andy'})
//     // console.log(a,b,c,d)

//     request({name: 'andy'}).then(res => console.log(res))
//     request({name: 'andy'}).then(res => console.log(res))
//     request({name: 'andy'}).then(res => console.log(res))
//     setTimeout(() => {
//         request({name: 'andy'}).then(res => console.log(res))
//     }, 100);
// }
// exec()

