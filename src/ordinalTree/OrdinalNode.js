/**
 * Class representing a node in an OrdinalTree.
 * Each node stores a character, its children, parent, and an associated pattern.
 */
class OrdinalNode {
    /**
     * Creates an instance of an OrdinalNode.
     * @param {string} value - The value or character of the node.
     */
    constructor(value) {
        this.value = value; // The character stored in the node
        this.children = []; // List of child nodes
        this.parent = null; // Parent node of the current node
        this.pattern = null; // Pattern associated with the node
    }

    /**
     * Adds a child node to the current node, sorted according to a specified pattern.
     * If no pattern is provided, the parent node's global pattern is used.
     * @param {OrdinalNode} childNode - The child node to be added.
     * @param {Array|null} pattern - The pattern to use for sorting the children.
     */
    addChild(childNode, pattern = null) {
        childNode.parent = this; // Set the current node as the parent of the child node

        const finalPattern = pattern || this.parent?.globalPattern; // Determine the pattern to use
        childNode.pattern = pattern; // Set the child's pattern
        this.insertChild(childNode, finalPattern); // Insert the child node into the correct position
    }

    /**
     * Inserts a child node into the current node's children, sorting based on a global pattern.
     * If the pattern is not found, it falls back to alphabetical sorting.
     * @param {OrdinalNode} child - The child node to be inserted.
     * @param {Array} pattern - The pattern to use for sorting the children.
     */
    insertChild(child, pattern) {
        // Ensure pattern is not null or undefined, fallback to an empty array if necessary
        pattern = pattern || [];

        this.children.push(child); // Add the child to the children array

        // Sort children based on the provided pattern
        this.children.sort((a, b) => {
            const aIndex = pattern.indexOf(a.value);
            const bIndex = pattern.indexOf(b.value);

            // If both characters are in the pattern, sort by their order in the pattern
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }
            // If only one of the characters is in the pattern, give it higher priority
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither are in the pattern, compare alphabetically, with uppercase first
            if (a.value.toLowerCase() === b.value.toLowerCase()) {
                return a.value < b.value ? -1 : 1;
            }
            return a.value.toLowerCase() < b.value.toLowerCase() ? -1 : 1;
        });
    }

    /**
     * Prints the current node and its children in a tree-like structure.
     * The nodes are printed with lines connecting parents to children and siblings.
     * @param {string} indent - The indentation string for formatting the tree structure.
     * @param {boolean} isLast - Flag indicating if the current node is the last child.
     */
    printNode(indent = "", isLast = true) {
        let treeLine = isLast ? "└── " : "├── ";

        // Print the current node's value and associated pattern
        if (this.value !== null && this.pattern !== null) {
            console.log(`${indent}${treeLine}${this.value} (${this.pattern})`);
        }

        const childIndent = indent + (isLast ? "    " : "│   "); // Adjust indent for sibling connections

        // Recursively print all children with proper formatting
        this.children.forEach((child, index) => {
            child.printNode(childIndent, index === this.children.length - 1);
        });
    }

    /**
     * Gets the number of children this node has.
     * @returns {number} - The number of children.
     */
    getChildrenCount() {
        return this.children.length;
    }

    /**
     * Finds and returns a child node with a specific value.
     * @param {string} value - The value of the child node to find.
     * @returns {OrdinalNode|null} - The found child node, or null if no child with the specified value exists.
     */
    findChild(value) {
        return this.children.find((child) => child.value === value) || null;
    }

    /**
     * Gets all the siblings of the current node.
     * Siblings are all nodes sharing the same parent as the current node.
     * @returns {OrdinalNode[]} - An array of sibling nodes.
     */
    getSiblings() {
        if (this.parent) {
            return this.parent.children.filter((child) => child !== this); // Return all siblings except the current node
        } else {
            return []; // No siblings if there is no parent
        }
    }
}

export default OrdinalNode;
