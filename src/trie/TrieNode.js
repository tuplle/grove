
export default class TrieNode {

    constructor() {
        this.parent = null;
        this.parentKey = null;
        this.children = {};
        this.data = null;
        this.isEndOfWord = false;
    }

    hasChildren(){
        return Object.keys(this.children).length > 0;
    }

    deleteChild(char){
        this.children[char].data = null;
        this.children[char].parent = null;
        delete this.children[char];
    }
}