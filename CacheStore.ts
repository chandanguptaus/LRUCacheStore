// crete a a Genric Type script class 
class CacheStore<T>
{
   private map : Map<string,T>  // Use a map with key value pairs.
   private limitentries:number;
    constructor(entries:number) {
        this.limitentries = entries;
        this.map = new Map<string,T>();
    }
    setCache(key:string,value:any) : void{
        if (this.map.size >= this.limitentries)
        {
            let keyToRemove = this.map.keys().next().value;
            this.map.delete(keyToRemove);
        }
        this.map.set(key,value);
    }
    getCache(key:string):any
    {
       if (this.map.has(key))
        {
            let value = this.map.get(key);
            this.map.delete(key);  // LRU
            this.map.set(key,value);
            return this.map.get(key);
        }
        return "Key doesn't exist"
    }
    cacheSize():number{
        return this.map.size;
    }
}

var cache = new CacheStore<number>(2);
cache.setCache('score1',100);
cache.setCache('score2',200);
cache.setCache('score3',300);
cache.setCache('score4',400);
cache.setCache('score5',500);
cache.setCache('score6',600);
cache.setCache('score7',700);
cache.setCache('score8',800);
cache.setCache('score9',900);

console.log(cache.getCache('score8'));  // SHOULD print
console.log(cache.getCache('score9')); // SHOULD print
console.log(cache.cacheSize());
console.log(cache.getCache('score7'));  // these keys are evicted from cache.
console.log(cache.getCache('score6'));  //evicted from cache.
