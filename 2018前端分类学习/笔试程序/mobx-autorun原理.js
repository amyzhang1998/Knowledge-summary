const proxis = new WeakMap();//存储结构
function isObservable<T extends object>(obj:T){
    return proxis.get(obj) === obj;
}
//存储监听
const observers = new WeakMap<object,Map<PropertyKey,Set<Observer>>>()
const queuedObservers = new Set()//待观察队列

let queued= false;
let currentObserver:Observer = null;

//将对象加工成可观察
 function observable<T extends object>(obj:T={}as T):T{
     return proxis.get(obj)  || toObservable(obj)
 }
 toObservable(obj){
     //实例化代理，以及拦截get set 方法
 }
 const dynamicObject = new Proxy(obj,{
     get(target,key,receiver){
         const result = Reflect.get(target,ket,receiver)

        // 如果取的值是对象，优先取代理对象
        const resultIsObject = typeof result === 'object' && result
        const existProxy = resultIsObject && proxies.get(result)

        // 将监听添加到这个 key 上
        if (currentObserver) {
            registerObserver(target, key)
            if (resultIsObject) {
                return existProxy || toObservable(result)
            }
        }

        return existProxy || result
     }
 })