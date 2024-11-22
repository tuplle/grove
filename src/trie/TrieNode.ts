/**
 * Node of a trie data structure.
 * The node can be root or any other node in Trie data structure.
 * It has access to its parent and all of its children.
 * If the node is the end of a word, it has the flag `isEndOfWord` set to true and `word` is set to the indexed word.
 * If the node is the end of a word, it can contain some additional data.
 */
export default class TrieNode<T> {
    private _parent: { key: string; node: TrieNode<T> | null } | null;
    private _children: { [key: string]: TrieNode<T> };
    public data: any;
    public isEndOfWord: boolean;
    public word: string | null;

    /**
     * Constructor of a new node of Trie data structure.
     * @param parent Parent config object.
     * @param parent.key Index for this node in its parent node.
     * @param parent.node Reference to the parent node.
     * @param isRoot Boolean flag of root node. If the node is root, it does not check for parent.
     */
    constructor(parent: { key: string; node: TrieNode<T> | null } | null = { key: "", node: null }, isRoot: boolean = false) {
        if (!isRoot && (!parent?.key || typeof parent.key !== 'string')) {
            throw new Error("Parent key cannot be null, empty, or not of type string!");
        }
        if (!isRoot && (!parent?.node || !(parent.node instanceof TrieNode))) {
            throw new Error("Parent node cannot be null, empty, or not an instance of TrieNode");
        }

        this._parent = parent;
        this._children = {};
        this.data = null;
        this.isEndOfWord = false;
        this.word = null;
    }

    /**
     * Get parent object consisting of the child index and parent node.
     * @returns The parent object with key and node reference.
     */
    get parent(): { key: string; node: TrieNode<T> | null } | null {
        return this._parent;
    }

    /**
     * Get map of all node's children.
     * @returns An object where each key is a character and the value is the corresponding child node.
     */
    get children(): { [key: string]: TrieNode<T> } {
        return this._children;
    }

    /**
     * Update indexed data of the node.
     * @param data If set, the node is marked as the end of a word. If data is falsy, the indexed word is removed.
     */
    update(data: any): void {
        this.isEndOfWord = !!data;
        this.data = data;

        if (!this.isEndOfWord) {
            this.word = null;
        }
    }

    /**
     * Remove parent object from this node.
     * After this operation, all references to this node from the Trie root are lost.
     */
    unlink(): void {
        this._parent = {
            key: "",
            node: null
        };
    }

    /**
     * Check if the node has any child nodes attached to it.
     * @returns True if the node has any children, otherwise false.
     */
    hasChildren(): boolean {
        return Object.keys(this._children).length > 0;
    }

    /**
     * Delete a child indexed by the provided character.
     * If the child does not exist, nothing happens.
     * @param char The character index of the child to delete.
     */
    deleteChild(char: string): void {
        if (!this._children[char]) return;

        this._children[char].update(null);
        this._children[char].unlink();
        this._children[char].word = null;
        delete this._children[char];
    }

    /**
     * Add a child to the node.
     * If a child already exists at the index, it is overridden by the new child.
     * @param char The character index of the child.
     * @param node The TrieNode to add as a child.
     * @returns The old child node if a child was overridden, otherwise null.
     */
    addChild(char: string, node: TrieNode<T>): TrieNode<T> | null {
        if (!char || !node) return null;

        const old = this._children[char];
        this._children[char] = node;

        return old || null;
    }

    /**
     * Check if the node has a child indexed by the provided character.
     * @param char The character index to check.
     * @returns True if a child exists at the given index, otherwise false.
     */
    hasChild(char: string): boolean {
        return !!this._children[char];
    }
}
