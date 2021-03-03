Problem:
Implement a class that uses generics (to support any data type) and acts as a service for caching data by a string key, is limited to an arbitrary number of entries (e.g. 1000), has no time expiration, and uses a LRU (least recently used) algorithm for the eviction policy. Keep a balance of both performance and simplicity in mind when implementing it. Feel free to use a library or package for specific helper functions where appropriate.

New Implementation (With Hashmap on side and Doubly Linked List)

1. LRUCacheService<T> is a generic class. It accepts a particular type of value and accepts the maximum number of entries through constructor parameter. Imports classes from CacheStore.ts

2. LRU Cache Service initializes Hashmaps to store keys and value as memory reference to doubly linked list node containing two pointers pre and next and key and value.The linked list maintains the most recently used item in the tail  and least recently in head. It can be other way around as well.

    There are service two important methods as below.
3.  setCache method. Arguments accepts a key as a string, value as a generic type. 
    Case a. If keys exists simply update the value.
    Case b. If key doesnt exists and max cache size has reached >= maxentries    then     
        -> remove the head of linked list which is Lest Recently used. Performance of operation. Time complexity is Big O(1)
        -> Remove the key from the map. Performance time complexity is Big O(1)
        -> Add the new key and value as a Node object to tail of linked list.   Performance Big O(1)
Case c else
        -> Simly Append the key and value as a Node object to tail of linked list . Performance Big O(1)

3.  Service getCache method returns value of generic type T. 
    Argument accepts a key as a string
    Case a . If node exists for the key then make it most recently used
                -> Remove it from its address location. Point the previou nodes next pointer to following node - Big O(1) operation
                -> Create a new node and append to tail - Big O(1) operation
    Case b    else 
                -> return null. No value exists for the given key.

4.  Size() : returns number -- Return the cache size.

5.  CacheStore.ts - DataNode class helps with creating nodes obect and DataCache is the doubly linked list data structure.


Execution steps
Install NPM and Node.js 
Install typescript npm install -g typescript
cmd - npm init -y for packages.json
Install ambient Node.js types for TypeScript
cmd- npm install @types/node
tsconfig.json required
cmd-> tsc --v for typescript compiler version.
cmd-> tsc LRUCacheService.ts compiles the typescript and transpiles to LRUCacheService.js and dependent module CacheStore.js

TEST the Caching service is inside LRUCacheService.js.Pls check

Directly run the Program
cmd-> node LRUCacheService.js ..

Current Cache size set in program is 10. You can arbitrarily increase to any number e.g 1000 by specifying in the constructor of the typescript class
Expected output
100
200
null
1001
1100
10








Old Implementation (Using inbuilt hashmaps to store keys and values) OldCacheStore.ts
CacheStore using LRU eviction policy from maps.
CacheStore.ts class uses inbuilt Typecript key value maps
Generic Type script class. On constructor pass the arbitrary cache size. 
getCache if key is present delete the key and add the key and value again to the map to bump up the order of keys.
setcache if size of map is greater than equal to limit entries remove the immediate key and value else set the new key value pair inside the map.