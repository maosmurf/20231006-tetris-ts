import {describe, it} from "node:test";
import assert from "assert";

describe('yoyo', () => {
    it('should ', () => {
        assert(true);
    });
});

// define given design elements
// early in development

class Bottom {
    /**
     * Check a piece has contact with bottom
     * @returns {boolean}
     */
    hasLanded(piece){
        throw new Error("not implemented")
    }

    /**
     * Add the piece to the bottom because it has landed
     */
    land(piece) {
        throw new Error("not implemented")
    }

    /**
     * Check for full lines and remove the returned lines, empty when no full lines there
     * count from bottom, 0 is lowest.
     * @returns {number[]}
     */
    removeFullLines() {
        throw new Error("not implemented")
    }

    /**
     * Return max height of the different columns of bottom.
     * @returns {number}
     */
    maximumHeight() {
        throw new Error("not implemented")
    }
}


