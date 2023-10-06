import {describe, it} from "node:test";
import assert from "node:assert";

class Game {
    constructor({ coords, bottom }) {
        this._coords = coords;
        this._bottom = bottom;
        this._score = 0;
    }

    isGameOver() {
        return this._bottom.maximumHeight() >= this._coords.height;
    }

    score() {
        return this._score;
    }

    tick() {
        this._score += this._bottom.removeFullLines().length;
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
    it('A full row is removed and scores the game', () => {
        const game = new Game({
            bottom: {
                // given a full row at bottom coordinate 0 is removed
                removeFullLines: () => {
                  return [0];
                }
            }
        });
        assert(game.score() === 0);

        game.tick();

        assert(game.score() === 1);
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


