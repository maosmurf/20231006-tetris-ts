import {describe, it} from "node:test";
import assert from "node:assert";

class Game {
    constructor({ coords, bottom }) {
        this._coords = coords;
        this._bottom = bottom;
        this._score = 0;
        this.piece = {};
    }

    isGameOver() {
        return this._bottom.maximumHeight() >= this._coords.height;
    }

    score() {
        return this._score;
    }

    acceptPlayerInteraction(foo) {
        // user interaction, rotate/translate piece, but is outside tick
        // modifies piece, cannot move into bottom
    }

    tick() {
        // logic missing: create a new piece when previous has landed
        // move down piece if one exists
        if (this._bottom.touches(this.piece)) {
            this._bottom.land(this.piece);
            this.piece = null;
        }
        this._score += this._bottom.removeFullLines().length;
    }

    getPiece() {
        return this.piece;
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
                // needed by logic
                touches(piece) {
                    return false;
                },
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

    it('A piece touches bottom becomes immovable', () => {
        let hasBeenCalled = false;
        const game = new Game({
            bottom: {
                // given piece has labded
                touches(piece) {
                    return true;
                },
                land(piece) {
                    hasBeenCalled = true;
                },
                // needed by logic, dont care
                removeFullLines: () => {
                    return [];
                }
            }
        });
        assert(game.getPiece());
        // moves down -> lands -> .... -->  ?removeFullLines
        game.tick();
        assert(game.getPiece() === null);
    });

});

// define given design elements
// early in development

class Bottom {
    /**
     * Check a piece has contact with bottom
     * @returns {boolean}
     */
    touches(piece) {
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

class Pieced {
    /**
     * Give next random piece
     * @returns {Piece}
     */
    next() {
        throw new Error("not implemented")
    }

    /**
     * Show next - next piece
     * @returns {Piece}
     */
    preview() {
        throw new Error("not implemented")
    }

    /**
     * Move the piece...
     */
    moveDown(piece) {
        throw new Error("not implemented")
    }
}
