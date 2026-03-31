export class BoardUtils {
    static createEmptyBoard(size = 4) {
        const tiles = [];
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                tiles.push({
                    value: 0,
                    position: { row, col },
                    id: `${row}-${col}`
                });
            }
        }
        return tiles;
    }
    static getTileAt(board, position) {
        return board.find(tile => tile.position.row === position.row &&
            tile.position.col === position.col)?.value;
    }
    static setTileAt(board, position, value) {
        return board.map(tile => tile.position.row === position.row &&
            tile.position.col === position.col
            ? { ...tile, value }
            : tile);
    }
    static getEmptyPositions(board) {
        return board
            .filter(tile => tile.value === 0)
            .map(tile => tile.position);
    }
    static transpose(board) {
        return board.map(tile => {
            const newRow = tile.position.col;
            const newCol = tile.position.row;
            return {
                ...tile,
                position: { row: newRow, col: newCol },
                id: `${newRow}-${newCol}`
            };
        });
    }
    static reverse(board) {
        const size = Math.sqrt(board.length);
        return board.map(tile => {
            const newCol = size - 1 - tile.position.col;
            return {
                ...tile,
                position: { ...tile.position, col: newCol },
                id: `${tile.position.row}-${newCol}`
            };
        });
    }
    static extractRow(board, rowIndex) {
        return board
            .filter(tile => tile.position.row === rowIndex)
            .sort((a, b) => a.position.col - b.position.col)
            .map(tile => tile.value);
    }
    static extractColumn(board, colIndex) {
        return board
            .filter(tile => tile.position.col === colIndex)
            .sort((a, b) => a.position.row - b.position.row)
            .map(tile => tile.value);
    }
    static applyRowToBoard(board, rowIndex, newRow) {
        return board.map(tile => {
            if (tile.position.row === rowIndex) {
                const value = newRow[tile.position.col];
                return {
                    ...tile,
                    value: value !== undefined ? value : 0
                };
            }
            return tile;
        });
    }
    static applyColumnToBoard(board, colIndex, newColumn) {
        return board.map(tile => {
            if (tile.position.col === colIndex) {
                const value = newColumn[tile.position.row];
                return {
                    ...tile,
                    value: value !== undefined ? value : 0
                };
            }
            return tile;
        });
    }
}
//# sourceMappingURL=board.utils.js.map