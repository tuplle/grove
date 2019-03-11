import TrieNode from "./TrieNode.js";

export default class Trie {


    constructor() {
        this.root = new TrieNode();
        this.lastIndex = 0;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * If data is not provided it is automatically provided.
     * @param {String}word
     * @param {Object}data
     */
    insert(word, data) {
        this._insertWord(word, data, this.root, 0);
    }

    /**
     *
     * @param {String}word
     * @param {Object}data
     * @param {TrieNode}currentNode
     * @param {number}charIndex
     * @private
     */
    _insertWord(word, data, currentNode, charIndex) {
        if (charIndex === word.length) {
            currentNode.isEndOfWord = true;
            currentNode.data = data;
            return;
        }

        let c = word.charAt(charIndex);
        if (!currentNode.children[c]) {
            currentNode.children[c] = new TrieNode();
            currentNode.children[c].parent = currentNode;
        }
        this._insertWord(word, data, currentNode.children[c], charIndex + 1);
    }

    search(word) {

    }
}