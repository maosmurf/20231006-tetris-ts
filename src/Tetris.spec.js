import {describe, it} from "node:test";
import assert from "assert";

class Game {
    constructor({ coords, bottom }) {
        this._coords = coords;
        this._bottom = bottom;
    }

    isGameOver() {
        return this._bottom.maximumHeight() >= this._coords.height;
    }
}

describe('Tetris', () => {
    it('A full board loses the game', () => {
        let boardheight = 10;
        const game = new Game({
            coords: {
                height: boardheight,
            },
            bottom: {
                maximumHeight: () => {
                    return boardheight;
                }
            }
        });

        assert(game.isGameOver());
    });
})
;

// define given design elements
// early in development

class Bottom {
    /**
     * Check a piece has contact with bottom
     * @returns {boolean}
     */
    hasLanded(piece) {
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


