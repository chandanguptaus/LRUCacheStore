// crete a a Genric Type script class 
var CacheStore = /** @class */ (function () {
    function CacheStore(entries) {
        this.limitentries = entries;
        this.map = new Map();
    }
    CacheStore.prototype.setCache = function (key, value) {
        if (this.map.size >= this.limitentries) {
            var keyToRemove = this.map.keys().next().value;
            this.map["delete"](keyToRemove);
        }
        this.map.set(key, value);
    };
    CacheStore.prototype.getCache = function (key) {
        if (this.map.has(key)) {
            var value = this.map.get(key);
            this.map["delete"](key); // LRU
            this.map.set(key, value);
            return this.map.get(key);
        }
        return "Key doesn't exist";
    };
    CacheStore.prototype.cacheSize = function () {
        return this.map.size;
    };
    return CacheStore;
}());
var cache = new CacheStore(2);
cache.setCache('score1', 100);
cache.setCache('score2', 200);
cache.setCache('score3', 300);
cache.setCache('score4', 400);
cache.setCache('score5', 500);
cache.setCache('score6', 600);
cache.setCache('score7', 700);
cache.setCache('score8', 800);
cache.setCache('score9', 900);
console.log(cache.getCache('score8'));
console.log(cache.getCache('score9'));
console.log(cache.cacheSize());
console.log(cache.getCache('score7'));
console.log(cache.getCache('score6'));
