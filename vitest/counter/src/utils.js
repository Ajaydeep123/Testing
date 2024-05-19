export function sum(a,b){
    return a+b
}

export function delayedFunc(cb){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cb("sdfc"))
        },2000)
    })
}