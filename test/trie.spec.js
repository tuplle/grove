const {Trie, TrieNode} = require('../dist/grove');

describe("Trie spec", () => {

    let trie;

    beforeEach(() => {
        trie = new Trie();
    });

    test("creating new instance of Trie", () => {
        expect(trie).toBeDefined();
        expect(trie).toBeInstanceOf(Trie);
        expect(trie.root).toBeDefined();
        expect(trie.root.parent).toBeNull();
    });

    test("inserting word CACAO", () => {
        const word = "CACAO";
        trie.insert(word, 1);
        console.log(trie.search(word));
        expect(trie.search(word)).toBe(1);
    });
});
