import TrieNode from "./trie-node";

/**
 * Trie data structure.
 */
export default class Trie<T> {

    private _root: TrieNode<T> = new TrieNode("", null, true);

    /**
     * Get root node of the Trie
     * @returns {TrieNode}
     */
    get root(): TrieNode<T> {
        return this._root;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * @param {string}word
     * @param {Object}[data]
     */
    insert(word: string, data: T): boolean {
        return this._insertWord(word, data, this._root, 0);
    }

    /**
     *
     * @param {string}word
     * @param {Object}data
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @private
     */
    private _insertWord(word: string, data: T, currentNode: TrieNode<T>, wordIndex: number): boolean {
        if (wordIndex === word.length) {
            currentNode.word = word;
            currentNode.data = data;
            return true;
        }

        const c = word.charAt(wordIndex);
        if (!currentNode.hasChild(c)) {
            currentNode.addChild(c, new TrieNode(c, currentNode));
        }
        return this._insertWord(word, data, currentNode.children[c], wordIndex + 1);
    }

    /**
     * Searching Trie for data indexed by the provided word.
     * If the word is in the Trie a data object is returned.
     * If the word is not found in the Trie undefined is returned.
     * @param {string}word
     * @returns {Object | null}
     */
    search(word: string) {
        const node = this._searchNode(word, this._root, 0);
        return !node ? undefined : node.data;
    }

    /**
     * Get index node for the word.
     * If the word is not in the Trie undefined is returned.
     * @param {string}word
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @returns {TrieNode | null}
     * @private
     */
    private _searchNode(word: string, currentNode: TrieNode<T>, wordIndex: number): TrieNode<T> {
        if (wordIndex === word.length) {
            return currentNode.isEnd ? currentNode : undefined;
        }

        const c = word.charAt(wordIndex);
        return currentNode.hasChild(c) ? this._searchNode(word, currentNode.children[c], wordIndex + 1) : undefined;
    }

    /**
     * Delete word from the Trie.
     * If the word is not in the Trie false is returned otherwise true.
     * @param {string}word
     * @returns {boolean}
     */
    delete(word: string) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        if (node.hasChildren()) {
            node.data = undefined;
            return true;
        }

        this._deleteWord(node);
        return true;
    }

    /**
     *
     * @param {TrieNode} currentNode
     * @private
     */
    private _deleteWord(currentNode: TrieNode<T>) {
        if (currentNode === this._root)
            return;
        const parent = currentNode.parent;

        parent.deleteChild(currentNode.key);
        if (parent.hasChildren())
            return;
        this._deleteWord(parent);
    }

    /**
     *
     * @param {string} word
     * @param {*} data
     * @returns {*}
     */
    update(word: string, data: T) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        const old = node.data;
        node.data = data;
        return old;
    }

    /**
     *
     * @param {string} word
     * @returns {TrieNode}
     */
    getDataNode(word: string) {
        return this._searchNode(word, this._root, 0);
    }

    /**
     *
     * @param {string} word
     * @returns {Array<TrieNode>}
     */
    getPath(word: string): TrieNode<T>[] {
        const path = [];
        path.push(this._root);

        for (let i = 1; i <= word.length; i++) {
            path.push(this._searchNode(word.substring(0, i), this._root, 0));
        }
        return path;
    }
}
