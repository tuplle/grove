import {Trie} from "../src";
import TrieNode from "../src/trie/trie-node";

describe("Trie spec", () => {

    let trie;

    beforeEach(() => {
        trie = new Trie();
    });

    it("creating new instance of Trie", () => {
        expect(trie).toBeDefined();
        expect(trie).toEqual(jasmine.any(Trie));
        expect(trie.root).toEqual(jasmine.any(TrieNode));
    });

    it("inserting word CACAO", () => {
        const word = "CACAO";
        trie.insert(word, 1);
        console.log(trie.search(word));
        expect(trie.search(word)).toBe(1);
    })
});
