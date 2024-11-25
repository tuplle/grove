const { describe, expect, test, beforeEach } = require("@jest/globals");
const { OrdinalTree, OrdinalNode } = require("../dist/grove.js");

describe("OrdinalTree", () => {
    const captureConsoleOutput = (fn) => {
        const originalLog = console.log;
        let output = "";
        console.log = (message) => {
            output += message + "\n";
        };
        fn();
        console.log = originalLog;
        return output;
    };
    test("should create an OrdinalTree with a root node", () => {
        const tree = new OrdinalTree();
        expect(tree.root.value).toBe("Root");
        expect(tree.root.children).toHaveLength(0);
    });

    test("should add nodes to the tree", () => {
        const tree = new OrdinalTree();
        tree.add("abc");
        expect(tree.root.children).toHaveLength(1);
        expect(tree.root.children[0].value).toBe("a");
        expect(tree.root.children[0].children[0].value).toBe("b");
        expect(tree.root.children[0].children[0].children[0].value).toBe("c");
    });

    test("should handle adding words with overlapping prefixes", () => {
        const tree = new OrdinalTree();
        tree.add("abc");
        tree.add("abd");
        expect(tree.root.children).toHaveLength(1);
        expect(tree.root.children[0].value).toBe("a");
        expect(tree.root.children[0].children).toHaveLength(1);
        expect(tree.root.children[0].children[0].children).toHaveLength(2);
    });

    test("should store and use global pattern for sorting siblings at the root level", () => {
        const pattern = ["B", "A", "C"];
        const tree = new OrdinalTree(pattern);

        // Add words to the tree
        tree.add("CAB");
        tree.add("BAB");

        // Test that the root's children are sorted by the pattern
        expect(tree.root.children.map((child) => child.value)).toEqual([
            "B", // "BAB" starts with "B"
            "C", // "CAB" starts with "C"
        ]);
    });

    test("should correctly retrieve all node values", () => {
        const tree = new OrdinalTree();
        tree.add("abc");
        tree.add("def");
        const values = tree.getAllValues();
        expect(values).toEqual(["Root", "a", "b", "c", "d", "e", "f"]);
    });
    test("should update pattern of existing child node when adding overlapping prefix", () => {
        const tree = new OrdinalTree();
        tree.add("abc", ["x"]);
        tree.add("abc", ["y"]);
        
        const childNode = tree.root.findChild("a");
        expect(childNode.pattern).toEqual(["x", "y"]);
    });

      
  
    test("should return corect amount of children", () => {
        const tree = new OrdinalTree();
        tree.add("abc");
        tree.add("def");
        tree.add("dee");
        const values = tree.root.getChildrenCount();
        expect(values).toEqual(2);
    });

    test("should pretty print the tree", () => {
        const tree = new OrdinalTree();
        tree.add("abc");
        tree.add("abd");
        expect(() => tree.printTree()).not.toThrow();
    });
});

describe("OrdinalNode", () => {
    test("should create an OrdinalNode", () => {
        const node = new OrdinalNode("A");
        expect(node.value).toBe("A");
        expect(node.children).toHaveLength(0);
    });

    test("should add children and sort them based on a pattern", () => {
        const node = new OrdinalNode("Root");
        const pattern = ["B", "A", "C"];

        node.addChild(new OrdinalNode("C"), pattern);
        node.addChild(new OrdinalNode("A"), pattern);
        node.addChild(new OrdinalNode("B"), pattern);

        expect(node.children.map((child) => child.value)).toEqual([
            "B",
            "A",
            "C",
        ]);
    });

    test("should return an empty array for getSiblings when node has no parent", () => {
        const rootNode = new OrdinalNode("Root");
        const siblings = rootNode.getSiblings();
        expect(siblings).toEqual([]);
    });

    test("should print node with value and pattern", () => {
        const node = new OrdinalNode("A");
        node.pattern = ["x", "y"];
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        node.printNode();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("A (x,y)")
        );
        consoleSpy.mockRestore();
    });

    test("should sort children when both are in the pattern", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = ["A", "B", "C"];

        parent.addChild(new OrdinalNode("B"), pattern);
        parent.addChild(new OrdinalNode("A"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["A", "B"]);
    });

    test("should prioritize child in the pattern over one not in the pattern (a in pattern)", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = ["A", "B", "C"];

        parent.addChild(new OrdinalNode("A"), pattern);
        parent.addChild(new OrdinalNode("D"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["A", "D"]);
    });

    test("should prioritize child in the pattern over one not in the pattern (b in pattern)", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = ["A", "B", "C"];

        parent.addChild(new OrdinalNode("D"), pattern);
        parent.addChild(new OrdinalNode("B"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["B", "D"]);
    });

    test("should sort alphabetically by case when neither child is in the pattern (same lowercase)", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = ["A", "B", "C"];

        parent.addChild(new OrdinalNode("a"), pattern);
        parent.addChild(new OrdinalNode("A"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["A", "a"]);
    });
    test("should sort alphabetically by uppercase when values are the same in lowercase (a < b)", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = [];

        parent.addChild(new OrdinalNode("a"), pattern);
        parent.addChild(new OrdinalNode("A"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["A", "a"]);
    });

    test("should sort alphabetically by uppercase when values are the same in lowercase (b < a)", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = [];

        parent.addChild(new OrdinalNode("A"), pattern);
        parent.addChild(new OrdinalNode("a"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["A", "a"]);
    });

    test("should sort alphabetically when neither child is in the pattern", () => {
        const parent = new OrdinalNode("Parent");
        const pattern = ["A", "B", "C"];

        parent.addChild(new OrdinalNode("D"), pattern);
        parent.addChild(new OrdinalNode("E"), pattern);

        expect(parent.children.map((child) => child.value)).toEqual(["D", "E"]);
    });

    test("should find a child node by value", () => {
        const node = new OrdinalNode("Root");
        const child = new OrdinalNode("A");
        node.addChild(child);
        const found = node.findChild("A");
        expect(found).toBe(child);
    });

    test("should return null when finding a non-existent child", () => {
        const node = new OrdinalNode("Root");
        expect(node.findChild("Z")).toBeNull();
    });

    test("should correctly retrieve siblings", () => {
        const parent = new OrdinalNode("Parent", []);
        const child1 = new OrdinalNode("Child1");
        const child2 = new OrdinalNode("Child2");

        parent.addChild(child1);
        parent.addChild(child2);

        const siblings = child1.getSiblings();
        expect(siblings).toHaveLength(1);
        expect(siblings[0]).toBe(child2);
    });

    test("should pretty print the node and its children", () => {
        const node = new OrdinalNode("Root");
        const child = new OrdinalNode("A");
        node.addChild(child);
        expect(() => node.printNode()).not.toThrow();
    });
});
