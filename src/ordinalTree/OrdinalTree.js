import OrdinalNode from "./OrdinalNode";

/**
 * Class representing an ordinal tree structure.
 * The tree is a hierarchical structure where each node represents a character,
 * and edges between nodes represent the progression of the word.
 */
class OrdinalTree {
    /**
     * Creates an instance of an OrdinalTree.
     * @param {Array|null} globalPattern - A global pattern to assign to nodes if no specific pattern is provided.
     */
    constructor(globalPattern = null) {
        this.root = new OrdinalNode("Root"); // Root node of the tree
        this.globalPattern = globalPattern; // Global pattern to apply to the tree nodes
    }

    /**
     * Adds a word to the tree, creating nodes for each character in the word.
     * @param {string} word - The word to add to the tree.
     * @param {Array|null} pattern - A specific pattern to associate with the nodes for the word.
     */
    add(word, pattern = null) {
        let currentNode = this.root; // Start from the root node
        let i = 0;

        // Traverse through the word
        while (i < word.length) {
            const char = word[i];
            let childNode = currentNode.findChild(char); // Look for a child node with the character

            // If a child node is found, concatenate the pattern if provided
            if (childNode !== null) {
                if (pattern !== null) {
                    childNode.pattern = childNode.pattern.concat(pattern);
                }
            }

            // If no child node is found, create one and add it to the tree
            if (!childNode) {
                childNode = new OrdinalNode(char); // Create a new node for the character
                currentNode.addChild(
                    childNode,
                    pattern || currentNode.pattern || this.globalPattern // Use provided pattern or fallback
                );
            }

            currentNode = childNode; // Move to the next node
            i++;
        }
    }

    /**
     * Prints the tree structure starting from the root node.
     * This is a visual representation of the tree.
     */
    printTree() {
        this.root.printNode(""); // Call the printNode method of the root
    }

    /**
     * Retrieves all the values from the tree by traversing it.
     * @returns {Array} - An array containing all the node values.
     */
    getAllValues() {
        const values = [];
        this.traverse((node) => values.push(node.value)); // Collect all node values during traversal
        return values;
    }

    /**
     * Traverses the tree and executes the provided callback for each node.
     * @param {Function} callback - The function to execute for each node.
     */
    traverse(callback) {
        const traverseNode = (node) => {
            callback(node); // Execute callback for the current node
            node.children.forEach(traverseNode); // Traverse through all children recursively
        };

        if (this.root) {
            traverseNode(this.root); // Start traversal from the root node
        }
    }
}

export default OrdinalTree;
