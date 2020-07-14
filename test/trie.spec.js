import Trie from "../src/trie/Trie";
import TrieNode from "../src/trie/TrieNode";


describe("Trie spec", ()=>{

    let trie;

    beforeEach(()=>{
        trie = new Trie();
    });

    it("creating new instance of Trie",()=>{
        expect(trie).toBeDefined();
        expect(trie).toEqual(jasmine.any(Trie));
        expect(trie.root).toEqual(jasmine.any(TrieNode));
        expect(trie._lastIndex).toBe(1);
    });

    it("inserting word CACAO",()=>{
        const word = "CACAO";

        trie.insert(word);
        console.log(trie.search(word));
        expect(trie.search(word)).toBe(1);
    })
});