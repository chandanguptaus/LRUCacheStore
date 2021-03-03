import { throws } from "assert";

class DataNode {
    public prev: DataNode;
    public key: string;
    public value: any;
    public next: DataNode;
    constructor(key: string, val: any) {
        this.key = key;
        this.value = val;
    }
}
class DataCache {
    private head: DataNode;
    private tail: DataNode;
    public length: number;
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    append(key: string, val: any) {
        const newNode = new DataNode(key, val);
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
    }

    makerecent(node: DataNode): any {

        // check if tail
        if (!node.next) return node.value;

        const prevNode = node.prev;  // fetch prev node.
        const nextNode = node.next;   // fetch next node .
        if (prevNode)  // chck if node is not head node.
            prevNode.next = nextNode;   // point prev node next pointer  to next node.
        else
            this.head = nextNode;

        nextNode.prev = prevNode;    // point next node prev pointer to previous node.

        this.length-- /// node is removed from middle and appended to tail.
        // create a node to tail which becomes the recently used tail.
        var node = this.append(node.key, node.value);
        return node.value;
    }
    // prepends the new node and makes it as Head
    prepend(key: string, val: any) {
        const newNode = new DataNode(key, val);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return newNode;
    }
    // remove the head node and returns key
    removeHead(): string {
        const node = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        this.length--;
        return node.key;
    }

}

export { DataCache }
export { DataNode }