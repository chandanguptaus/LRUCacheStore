"use strict";
exports.__esModule = true;
exports.DataNode = exports.DataCache = void 0;
var DataNode = /** @class */ (function () {
    function DataNode(key, val) {
        this.key = key;
        this.value = val;
    }
    return DataNode;
}());
exports.DataNode = DataNode;
var DataCache = /** @class */ (function () {
    function DataCache() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    DataCache.prototype.append = function (key, val) {
        var newNode = new DataNode(key, val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
            this.length++;
            return newNode;
        }
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return newNode;
    };
    DataCache.prototype.makerecent = function (node) {
        // check if tail
        if (!node.next)
            return node.value;
        var prevNode = node.prev; // fetch prev node.
        var nextNode = node.next; // fetch next node .
        if (prevNode) // chck if node is not head node.
            prevNode.next = nextNode; // point prev node next pointer  to next node.
        else
            this.head = nextNode;
        nextNode.prev = prevNode; // point next node prev pointer to previous node.
        this.length--; /// node is removed from middle and appended to tail.
        // create a node to tail which becomes the recently used tail.
        var node = this.append(node.key, node.value);
        return node.value;
    };
    // prepends the new node and makes it as Head
    DataCache.prototype.prepend = function (key, val) {
        var newNode = new DataNode(key, val);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return newNode;
    };
    // remove the head node and returns key
    DataCache.prototype.removeHead = function () {
        var node = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        this.length--;
        return node.key;
    };
    return DataCache;
}());
exports.DataCache = DataCache;
