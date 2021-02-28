Install NPM and Node.js 
Install typescript npm install -g typescript
cmd - npm init -y for packages.json
Install ambient Node.js types for TypeScript
cmd- npm install @types/node
tsconfig.json required
tsc --v for typescript compiler
tsc CacheStore.ts transpiles to CacheStore.js
node CacheStore.js outputs the result 
Current Cache size set in program is 2. You can arbitrarily increase to any number e.g 1000 by specifying in the constructor of the typescript class


CacheStore using LRU eviction policy from maps.
CacheStore.ts class uses inbuilt Typecript key value maps
Generic Type script class. On constructor pass the arbitrary cache size. 
getCache if key is present delete the key and add the key and value again to the map to bump up the order of keys.
setcache if size of map is greater than equal to limit entries remove the immediate key and value else set the new key value pair inside the map.