/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Trie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _trie_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trie/index */ "./src/trie/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Trie", function() { return _trie_index__WEBPACK_IMPORTED_MODULE_0__["Trie"]; });



/***/ }),

/***/ "./src/trie/Trie.js":
/*!**************************!*\
  !*** ./src/trie/Trie.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Trie; });
/* harmony import */ var _TrieNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrieNode.js */ "./src/trie/TrieNode.js");


class Trie {


    constructor() {
        this._root = new _TrieNode_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._lastIndex = 1;
    }

    get root() {
        return this._root;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * If data is not provided it is automatically generated as an increasing number.
     * @param {String}word
     * @param {Object}[data]
     */
    insert(word, data) {
        return this._insertWord(word, data, this._root, 0);
    }

    /**
     *
     * @param {String}word
     * @param {Object}data
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @private
     */
    _insertWord(word, data, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            currentNode.word = word;
            currentNode.update(data || this._getNextIndex());
            return true;
        }

        let c = word.charAt(wordIndex);
        if (!currentNode.hasChild(c)) {
            currentNode.addChild(c, new _TrieNode_js__WEBPACK_IMPORTED_MODULE_0__["default"](currentNode, c))
        }
        return this._insertWord(word, data, currentNode.children[c], wordIndex + 1);
    }

    /**
     * Searching Trie for data indexed by the provided word.
     * If the word is in the Trie a data object is returned.
     * If the word is not found in the Trie null is returned.
     * @param {String}word
     * @returns {Object | null}
     */
    search(word) {
        const node = this._searchNode(word, this._root, 0);
        return !node ? null : node.data;
    }

    /**
     * Get index node for the word.
     * If the word is not in the Trie null is returned.
     * @param {String}word
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @returns {TrieNode | null}
     * @private
     */
    _searchNode(word, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            return currentNode.isEndOfWord ? currentNode : null;
        }

        let c = word.charAt(wordIndex);
        return currentNode.hasChild(c) ? this._searchNode(word, currentNode.children[c], wordIndex + 1) : null;
    }

    /**
     * Delete word from the Trie.
     * If the word is not in the Trie false is returned otherwise true.
     * @param {String}word
     * @returns {boolean}
     */
    delete(word) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        if (node.hasChildren()) {
            node.update(null);
            return true;
        }

        this._deleteWord(node);
        return true;
    }

    _deleteWord(currentNode) {
        if (currentNode === this._root)
            return;
        const parent = currentNode.parent;

        // if(currentNode.parentKey === word.charAt(wordIndex))

        parent.node.deleteChild(parent.key);
        if (parent.node.hasChildren())
            return;
        this._deleteWord(parent.node);
    }

    update(word, data) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        node.update(data);
        return true;
    }

    getDataNode(word) {
        return this._searchNode(word, this._root, 0);
    }

    getPath(word) {
        const path = [];
        path.push(this._root);

        for (let i = 1; i <= word.length; i++) {
            path.push(this._searchNode(word.substring(0, i), this._root, 0));
        }

        return path;
    }

    _getNextIndex() {
        return this._lastIndex++;
    }
}

/***/ }),

/***/ "./src/trie/TrieNode.js":
/*!******************************!*\
  !*** ./src/trie/TrieNode.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TrieNode; });
class TrieNode {

    constructor(parentNode = null, parentKey = null) {
        this._parentNode = parent;
        this._parentKey = parentKey;
        this._children = {};
        this.data = null;
        this.isEndOfWord = false;
        this.word = null;
    }

    get parent() {
        return {
            key: this._parentKey,
            node: this._parentNode
        };
    }

    get children() {
        return this._children;
    }

    update(data) {
        this.isEndOfWord = !!data;
        this.data = data;

        if(!this.isEndOfWord)
            this.word = null;
    }

    hasChildren() {
        return Object.keys(this._children).length > 0;
    }

    deleteChild(char) {
        this.children[char].update(null);
        this.children[char]._parentNode = null;
        this.children[char]._parentKey = null;
        this.children[char].word = null;
        delete this._children[char];
    }

    addChild(char, node) {
        this._children[char] = node;
    }

    hasChild(char) {
        return !!this._children[char];
    }
}

/***/ }),

/***/ "./src/trie/index.js":
/*!***************************!*\
  !*** ./src/trie/index.js ***!
  \***************************/
/*! exports provided: Trie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Trie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trie */ "./src/trie/Trie.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Trie", function() { return _Trie__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90cmllL1RyaWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWUvVHJpZU5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFxQzs7QUFFdEI7OztBQUdmO0FBQ0EseUJBQXlCLG9EQUFRO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0Msb0RBQVE7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN4SUE7QUFBQTtBQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDakRBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6Imdyb3ZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgKiBmcm9tIFwiLi90cmllL2luZGV4XCI7IiwiaW1wb3J0IFRyaWVOb2RlIGZyb20gXCIuL1RyaWVOb2RlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmllIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fcm9vdCA9IG5ldyBUcmllTm9kZSgpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RJbmRleCA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnQgd29yZCB0byB0aGUgVHJpZSBhbmQgbWFwIGRhdGEgb24gdGhlIHdvcmQuXHJcbiAgICAgKiBJZiBkYXRhIGlzIG5vdCBwcm92aWRlZCBpdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBhcyBhbiBpbmNyZWFzaW5nIG51bWJlci5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfXdvcmRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fVtkYXRhXVxyXG4gICAgICovXHJcbiAgICBpbnNlcnQod29yZCwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnNlcnRXb3JkKHdvcmQsIGRhdGEsIHRoaXMuX3Jvb3QsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfXdvcmRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fWRhdGFcclxuICAgICAqIEBwYXJhbSB7VHJpZU5vZGV9Y3VycmVudE5vZGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfXdvcmRJbmRleFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2luc2VydFdvcmQod29yZCwgZGF0YSwgY3VycmVudE5vZGUsIHdvcmRJbmRleCkge1xyXG4gICAgICAgIGlmICh3b3JkSW5kZXggPT09IHdvcmQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLndvcmQgPSB3b3JkO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZS51cGRhdGUoZGF0YSB8fCB0aGlzLl9nZXROZXh0SW5kZXgoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGMgPSB3b3JkLmNoYXJBdCh3b3JkSW5kZXgpO1xyXG4gICAgICAgIGlmICghY3VycmVudE5vZGUuaGFzQ2hpbGQoYykpIHtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUuYWRkQ2hpbGQoYywgbmV3IFRyaWVOb2RlKGN1cnJlbnROb2RlLCBjKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc2VydFdvcmQod29yZCwgZGF0YSwgY3VycmVudE5vZGUuY2hpbGRyZW5bY10sIHdvcmRJbmRleCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoaW5nIFRyaWUgZm9yIGRhdGEgaW5kZXhlZCBieSB0aGUgcHJvdmlkZWQgd29yZC5cclxuICAgICAqIElmIHRoZSB3b3JkIGlzIGluIHRoZSBUcmllIGEgZGF0YSBvYmplY3QgaXMgcmV0dXJuZWQuXHJcbiAgICAgKiBJZiB0aGUgd29yZCBpcyBub3QgZm91bmQgaW4gdGhlIFRyaWUgbnVsbCBpcyByZXR1cm5lZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfXdvcmRcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3QgfCBudWxsfVxyXG4gICAgICovXHJcbiAgICBzZWFyY2god29yZCkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9zZWFyY2hOb2RlKHdvcmQsIHRoaXMuX3Jvb3QsIDApO1xyXG4gICAgICAgIHJldHVybiAhbm9kZSA/IG51bGwgOiBub2RlLmRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaW5kZXggbm9kZSBmb3IgdGhlIHdvcmQuXHJcbiAgICAgKiBJZiB0aGUgd29yZCBpcyBub3QgaW4gdGhlIFRyaWUgbnVsbCBpcyByZXR1cm5lZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfXdvcmRcclxuICAgICAqIEBwYXJhbSB7VHJpZU5vZGV9Y3VycmVudE5vZGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfXdvcmRJbmRleFxyXG4gICAgICogQHJldHVybnMge1RyaWVOb2RlIHwgbnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9zZWFyY2hOb2RlKHdvcmQsIGN1cnJlbnROb2RlLCB3b3JkSW5kZXgpIHtcclxuICAgICAgICBpZiAod29yZEluZGV4ID09PSB3b3JkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudE5vZGUuaXNFbmRPZldvcmQgPyBjdXJyZW50Tm9kZSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYyA9IHdvcmQuY2hhckF0KHdvcmRJbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb2RlLmhhc0NoaWxkKGMpID8gdGhpcy5fc2VhcmNoTm9kZSh3b3JkLCBjdXJyZW50Tm9kZS5jaGlsZHJlbltjXSwgd29yZEluZGV4ICsgMSkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIHdvcmQgZnJvbSB0aGUgVHJpZS5cclxuICAgICAqIElmIHRoZSB3b3JkIGlzIG5vdCBpbiB0aGUgVHJpZSBmYWxzZSBpcyByZXR1cm5lZCBvdGhlcndpc2UgdHJ1ZS5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfXdvcmRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBkZWxldGUod29yZCkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9zZWFyY2hOb2RlKHdvcmQsIHRoaXMuX3Jvb3QsIDApO1xyXG4gICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5oYXNDaGlsZHJlbigpKSB7XHJcbiAgICAgICAgICAgIG5vZGUudXBkYXRlKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RlbGV0ZVdvcmQobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2RlbGV0ZVdvcmQoY3VycmVudE5vZGUpIHtcclxuICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMuX3Jvb3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBjdXJyZW50Tm9kZS5wYXJlbnQ7XHJcblxyXG4gICAgICAgIC8vIGlmKGN1cnJlbnROb2RlLnBhcmVudEtleSA9PT0gd29yZC5jaGFyQXQod29yZEluZGV4KSlcclxuXHJcbiAgICAgICAgcGFyZW50Lm5vZGUuZGVsZXRlQ2hpbGQocGFyZW50LmtleSk7XHJcbiAgICAgICAgaWYgKHBhcmVudC5ub2RlLmhhc0NoaWxkcmVuKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9kZWxldGVXb3JkKHBhcmVudC5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUod29yZCwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9zZWFyY2hOb2RlKHdvcmQsIHRoaXMuX3Jvb3QsIDApO1xyXG4gICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBub2RlLnVwZGF0ZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhTm9kZSh3b3JkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaE5vZGUod29yZCwgdGhpcy5fcm9vdCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aCh3b3JkKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IFtdO1xyXG4gICAgICAgIHBhdGgucHVzaCh0aGlzLl9yb290KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gd29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwYXRoLnB1c2godGhpcy5fc2VhcmNoTm9kZSh3b3JkLnN1YnN0cmluZygwLCBpKSwgdGhpcy5fcm9vdCwgMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldE5leHRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdEluZGV4Kys7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmllTm9kZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50Tm9kZSA9IG51bGwsIHBhcmVudEtleSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnROb2RlID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX3BhcmVudEtleSA9IHBhcmVudEtleTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0VuZE9mV29yZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud29yZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhcmVudCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMuX3BhcmVudEtleSxcclxuICAgICAgICAgICAgbm9kZTogdGhpcy5fcGFyZW50Tm9kZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuaXNFbmRPZldvcmQgPSAhIWRhdGE7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaXNFbmRPZldvcmQpXHJcbiAgICAgICAgICAgIHRoaXMud29yZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzQ2hpbGRyZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNoaWxkKGNoYXIpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYXJdLnVwZGF0ZShudWxsKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYXJdLl9wYXJlbnROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYXJdLl9wYXJlbnRLZXkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhcl0ud29yZCA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NoaWxkcmVuW2NoYXJdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENoaWxkKGNoYXIsIG5vZGUpIHtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbltjaGFyXSA9IG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzQ2hpbGQoY2hhcikge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX2NoaWxkcmVuW2NoYXJdO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IHtkZWZhdWx0IGFzIFRyaWV9IGZyb20gXCIuL1RyaWVcIjsiXSwic291cmNlUm9vdCI6IiJ9