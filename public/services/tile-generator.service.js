import { BOARD_SIZE } from '../constants/game.constants.js';
import { BoardUtils } from '../utils/board.utils.js';
export class TileGenerator {
    constructor() {
        this.randomValues = [2, 2, 2, 2, 4];
    }
    generateRandomPosition(board) {
        const emptyPositions = BoardUtils.getEmptyPositions(board);
        if (emptyPositions.length === 0)
            return null;
        const randomIndex = Math.floor(Math.random() * emptyPositions.length);
        return emptyPositions[randomIndex] ?? null;
    }
    generateRandomValue() {
        const randomIndex = Math.floor(Math.random() * this.randomValues.length);
        return this.randomValues[randomIndex] ?? 2;
    }
    generateRandomTile(board) {
        const position = this.generateRandomPosition(board);
        if (!position)
            return null;
        const value = this.generateRandomValue();
        return { position, value };
    }
    addRandomTileToBoard(board) {
        const tile = this.generateRandomTile(board);
        if (!tile)
            return board;
        return BoardUtils.setTileAt(board, tile.position, tile.value);
    }
    static isValidPosition(position) {
        return (position.row >= 0 &&
            position.row < BOARD_SIZE &&
            position.col >= 0 &&
            position.col < BOARD_SIZE);
    }
    static createPosition(row, col) {
        const position = { row, col };
        if (!TileGenerator.isValidPosition(position)) {
            throw new Error(`Invalid position: ${row}, ${col}`);
        }
        return position;
    }
}
//# sourceMappingURL=tile-generator.service.js.map