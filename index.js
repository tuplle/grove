import Trie from "./src/trie/Trie.js";

const t = new Trie();
t.insert("cau");
t.insert("caco");
t.insert("caca");
t.insert("ca");

console.log(t);

console.log("Search for caco: \n" + t.search("caco"));
console.log("Search for koko:" + t.search("koko"));

console.log(t.delete("caca"));
console.log(t.search("caca"));