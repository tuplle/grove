import TrieNode from "./TrieNode.js";

export default class Trie {


    constructor() {
        this._root = new TrieNode();
        this.lastIndex = 1;
    }

    get root() {
        return this._root;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * If data is not provided it is automatically generated as an increasing number.
     * @param {String}word
     * @param {Object}[data]
     */
    insert(word, data) {
        this._insertWord(word, data, this._root, 0);
    }

    /**
     *
     * @param {String}word
     * @param {Object}data
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @private
     */
    _insertWord(word, data, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            currentNode.isEndOfWord = true;
            currentNode.data = !data ? this._getNextIndex() : data;
            return;
        }

        let c = word.charAt(wordIndex);
        if (!currentNode.children[c]) {
            currentNode.children[c] = new TrieNode();
            currentNode.children[c].parent = currentNode;
            currentNode.children[c].parentKey = c;
        }
        this._insertWord(word, data, currentNode.children[c], wordIndex + 1);
    }

    /**
     * Searching Trie for data indexed by the provided word.
     * If the word is in the Trie a data object is returned.
     * If the word is not found in the Trie null is returned.
     * @param {String}word
     * @returns {Object | null}
     */
    search(word) {
        const node = this._searchNode(word, this._root, 0);
        return !node ? null : node.data;
    }

    /**
     * Get index node for the word.
     * If the word is not in the Trie null is returned.
     * @param {String}word
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @returns {TrieNode | null}
     * @private
     */
    _searchNode(word, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            if (currentNode.isEndOfWord)
                return currentNode;
            else
                return null;
        }

        let c = word.charAt(wordIndex);
        if (currentNode.children[c])
            return this._searchNode(word, currentNode.children[c], wordIndex + 1);
        else
            return null;
    }

    /**
     * Delete word from the Trie.
     * If the word is not in the Trie false is returned otherwise true.
     * @param {String}word
     * @returns {boolean}
     */
    delete(word) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        if(node.hasChildren()){
            node.isEndOfWord = false;
            node.data = null;
            return true;
        }

        this._deleteWord(node);
        return true;
    }

    _deleteWord(currentNode) {
        if (currentNode === this._root)
            return;
        const parent = currentNode.parent;

        // if(currentNode.parentKey === word.charAt(wordIndex))

        parent.deleteChild(currentNode.parentKey);

        if (parent.hasChildren())
            return;
        this._deleteWord(parent);
    }


    _getNextIndex() {
        return this.lastIndex++;
    }
}