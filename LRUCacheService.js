"use strict";
exports.__esModule = true;
var CacheStore_1 = require("./CacheStore");
//LRU Cache  Service class.
var LRUCacheService = /** @class */ (function () {
    function LRUCacheService(entries) {
        this._map = new Map();
        this._cache = new CacheStore_1.DataCache();
        this._maxEntries = entries;
    }
    //set cache method
    LRUCacheService.prototype.setCache = function (key, val) {
        // if key exists simply update the cache value
        if (this._map.has(key)) {
            var node = this._map.get(key);
            node.value = val;
        }
        // if no key exists check further
        if (!this._map.has(key)) {
            /// if max cache size has reached >= maxentries allowed
            if (this._cache.length >= this._maxEntries) {
                // remove the head of linked list which is Lest Recently used
                // and remove the key from the map. The linked list maintains
                // the most recently used item in the tail.
                // remove the LRU  head node;
                var leastUsedKey = this.RemoveHead();
                this._map["delete"](leastUsedKey); // remove the LRU key from HashMap.
                this.AppendToTail(key, val); // it created a new node and append to tail .
            }
            else {
                this.AppendToTail(key, val); // Created a new node and appends to linked list tail.
            }
        }
    };
    // method to fetch value from cache.
    LRUCacheService.prototype.getCache = function (key) {
        var node = this._map.get(key);
        if (node) // if node exists
         {
            // make the node as most recently used item v important!
            return this._cache.makerecent(node);
        }
        else // no  node present wiht given key
            return null;
    };
    // returns the current size of the cache.
    LRUCacheService.prototype.Size = function () {
        return this._cache.length;
    };
    LRUCacheService.prototype.RemoveHead = function () {
        // remove the head and append value;
        var key = this._cache.removeHead(); // remove the least used value from 
        return key;
    };
    LRUCacheService.prototype.AppendToTail = function (key, val) {
        var node = this._cache.append(key, val);
        this._map.set(key, node);
    };
    return LRUCacheService;
}());
// TEST the Caching service
var cachesize = 10; // set cache size to 10; no keys can exist greater than 10.
var cache = new LRUCacheService(cachesize);
// Test case 1 can only add value as number type
// Only accepts number type
/// can't add string as the value needs to be a number
// cache.setCache("keys2", 200);   
////
cache.setCache("keys1", 100);
cache.setCache("keys2", 200);
cache.setCache("keys3", 300);
cache.setCache("keys4", 400);
cache.setCache("keys5", 500);
cache.setCache("keys6", 600);
cache.setCache("keys7", 600);
cache.setCache("keys8", 600);
cache.setCache("keys9", 600);
cache.setCache("keys10", 1000);
// Updates the key value from 1000 to 1001
cache.setCache("keys10", 1001);
cache.getCache("keys1"); // Moves key 1 to tail as most recently access item.
cache.getCache("keys2"); // Moves key 2 to tail as most recently access item.
// trying to add 11th key this will evict key keys3 as per LRU algorithm
// maxentries can only be 10
cache.setCache("keys11", 1100);
console.log(cache.getCache("keys1")); //  prints 100;
console.log(cache.getCache("keys2")); /// prints 200
// key 3 was evicted and returns null as  keys1 and keys2 are moved to tail .
console.log(cache.getCache("keys3"));
console.log(cache.getCache("keys10")); /// prints 1001 moves to tail.
console.log(cache.getCache("keys11")); /// prints 1100 moved to tail 
console.log(cache.Size()); // size should be 5
// Expected output
//100 , 200 , null, 1001, 1100, 10
