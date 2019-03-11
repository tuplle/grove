
export default class TrieNode {

    constructor() {
        this.parent = null;
        this.children = {};
        this.data = null;
        this.isEndOfWord = false;
    }
}