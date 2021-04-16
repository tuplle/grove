/**
 * Node of a trie data structure.
 * The node can be root or any other node in Trie data structure.
 * The has access to its parent and all of its children.
 * If the node is index of the word inserted into the Trie it has flag isEndOfWorld set to true
 * and word is set to the indexed word.
 * If the node is the end of a word it can contain some additional index data.
 */
export default class TrieNode<T> {

    private _children: { [k: string]: TrieNode<T> } = {};
    private _data: T;
    private _isEnd: boolean = false;
    private _word: string;

    /**
     * Constructor of a new node of Trie data structure
     * @param _key Index for this node in its parent node
     * @param _parent Reference to the parent node
     * @param {boolean} [isRoot] Boolean flag of root node. If the node is root it is not check for parent
     */
    constructor(private _key: string, private _parent: TrieNode<T>, isRoot: boolean = false) {
        if (!isRoot && (!_key || typeof _key !== 'string'))
            throw new Error("Parent key cannot be null, empty or not type of string!");
        if (!isRoot && (!_parent || !(_parent instanceof TrieNode)))
            throw new Error("Parent node cannot be null, empty or not class of TrieNode");
    }

    /**
     * Get parent object consisting of the child index and parent node.
     * @returns {TrieNode}
     */
    get parent(): TrieNode<T> {
        return this._parent;
    }

    /**
     * Get map of all node's children.
     * @returns {{}|{TrieNode}} Child index is one character of a inserted word and value is child's node object.
     */
    get children(): { [k: string]: TrieNode<T> } {
        return this._children;
    }

    get data(): T {
        return this._data;
    }

    /**
     * Update indexed data of the node.
     * @param {*} value If data is set to some value the node is automatically set as the end of a word.
     * If data has false value indexed word is removed from the node.
     */
    set data(value: T) {
        this._isEnd = !!value;
        this._data = value;
        if (!this._isEnd)
            this._word = undefined;
    }

    get word(): string {
        return this._word;
    }

    set word(value: string) {
        this._word = value;
    }

    get isEnd(): boolean {
        return this._isEnd;
    }

    get key(): string {
        return this._key;
    }

    /**
     * Remove parent object from this node.
     * If this function is finished all reference to this node from the Trie root is lost.
     */
    unlink() {
        this._parent = undefined;
        this._key = undefined;
    }

    /**
     * Link this node with new parent node.
     * @param key Index of this node in the new parent
     * @param parent Reference to the parent node
     */
    link(key: string, parent: TrieNode<T>) {
        this._key = key;
        this._parent = parent;
    }

    /**
     * Check if the node has any child nodes attached to it.
     * @returns {boolean} True if has any children, otherwise false.
     */
    hasChildren() {
        return Object.keys(this._children).length > 0;
    }

    /**
     * Delete child indexed by the provided character.
     * If the child does not exists nothing happens.
     * If the child does exists, the child node object is deleted.
     * @param key Child index
     */
    deleteChild(key: string) {
        if (!this._children[key])
            return;
        this._children[key].data = undefined;
        this._children[key].unlink();
        delete this._children[key];
    }

    /**
     * Add a child to the node.
     * If a child already exists on the index it is overridden by the new child.
     * @param key
     * @param {TrieNode} node
     * @returns {TrieNode|undefined} If a child is overridden the old child node is return, otherwise undefined.
     */
    addChild(key: string, node: TrieNode<T>) {
        if (!key || !node)
            return undefined;
        const old = this._children[key];
        this._children[key] = node;
        return old;
    }

    /**
     * Check is the node has a child indexed by the provided character.
     * @returns {boolean} True if a child exists, otherwise false.
     * @param key
     */
    hasChild(key: string) {
        return !!this._children[key];
    }
}
