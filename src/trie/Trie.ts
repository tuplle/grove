import TrieNode from "./TrieNode";

/**
 * Trie data structure.
 */
export default class Trie<T> {
    private _root: TrieNode<T>;
    public _lastIndex: number;

    /**
     * @constructor
     */
    constructor() {
        this._root = new TrieNode<T>(null, true);
        this._lastIndex = 1;
    }

    /**
     * Get root node of the Trie
     * @returns {TrieNode<T>}
     */
    get root(): TrieNode<T> {
        return this._root;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * If data is not provided it is automatically generated as an increasing number.
     * @param word - The word to insert.
     * @param data - Optional data to map to the word.
     */
    insert(word: string, data?: any): boolean {
        return this._insertWord(word, data, this._root, 0);
    }

    /**
     *
     * @param word - The word to insert.
     * @param data - Data associated with the word.
     * @param currentNode - The current node in the Trie.
     * @param wordIndex - The index of the character in the word.
     * @private
     */
    private _insertWord(word: string, data: any, currentNode: TrieNode<T>, wordIndex: number): boolean {
        if (wordIndex === word.length) {
            currentNode.word = word;
            currentNode.update(data || this._getNextIndex());
            return true;
        }

        const c = word.charAt(wordIndex);
        if (!currentNode.hasChild(c)) {
            currentNode.addChild(c, new TrieNode<T>({ key: c, node: currentNode }));
        }
        return this._insertWord(word, data, currentNode.children[c], wordIndex + 1);
    }

    /**
     * Searching Trie for data indexed by the provided word.
     * If the word is in the Trie a data object is returned.
     * If the word is not found in the Trie null is returned.
     * @param word - The word to search.
     * @returns The data associated with the word, or null if not found.
     */
    search(word: string): any | null {
        const node = this._searchNode(word, this._root, 0);
        return node ? node.data : null;
    }

    /**
     * Get index node for the word.
     * If the word is not in the Trie null is returned.
     * @param word - The word to find the node for.
     * @param currentNode - The current node in the Trie.
     * @param wordIndex - The index of the character in the word.
     * @returns The TrieNode for the word, or null if not found.
     * @private
     */
    private _searchNode(word: string, currentNode: TrieNode<T>, wordIndex: number): TrieNode<T> | null {
        if (wordIndex === word.length) {
            return currentNode.isEndOfWord ? currentNode : null;
        }

        const c = word.charAt(wordIndex);
        return currentNode.hasChild(c) ? this._searchNode(word, currentNode.children[c], wordIndex + 1) : null;
    }

    /**
     * Delete word from the Trie.
     * If the word is not in the Trie false is returned otherwise true.
     * @param word - The word to delete.
     * @returns True if the word was deleted, otherwise false.
     */
    delete(word: string): boolean {
        const node = this._searchNode(word, this._root, 0);
        if (!node) return false;

        if (node.hasChildren()) {
            node.update(null);
            return true;
        }

        this._deleteWord(node);
        return true;
    }

    /**
     * Deletes the word from the Trie.
     * @param currentNode - The current node to delete.
     * @private
     */
    private _deleteWord(currentNode: TrieNode<T>): void | null{
        if (currentNode === this._root) return;
        
        const parent = currentNode.parent;
        parent?.node?.deleteChild(parent.key);

        if (parent?.node && !parent.node.hasChildren()) {
            this._deleteWord(parent.node);
        }
    }

    /**
     * Updates the data for a given word.
     * @param word - The word to update.
     * @param data - The new data.
     * @returns True if the update was successful, otherwise false.
     */
    update(word: string, data: any): boolean {
        const node = this._searchNode(word, this._root, 0);
        if (!node) return false;

        node.update(data);
        return true;
    }

    /**
     * Gets the data node associated with a word.
     * @param word - The word to retrieve the data node for.
     * @returns The TrieNode associated with the word.
     */
    getDataNode(word: string): TrieNode<T> | null {
        return this._searchNode(word, this._root, 0);
    }

    /**
     * Gets the path of TrieNodes leading to a given word.
     * @param word - The word to retrieve the path for.
     * @returns An array of TrieNodes forming the path to the word.
     */
    getPath(word: string): Array<TrieNode<T> | null> {
        const path: Array<TrieNode<T> | null> = [this._root];

        for (let i = 1; i <= word.length; i++) {
            path.push(this._searchNode(word.substring(0, i), this._root, 0));
        }

        return path;
    }

    /**
     * Generates the next index for data storage.
     * @returns The next index.
     * @private
     */
    private _getNextIndex(): number {
        return this._lastIndex++;
    }
}
