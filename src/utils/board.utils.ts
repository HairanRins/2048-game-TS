import type { TileValue, Position, Board, Tile } from '../types/game.types.js';

export class BoardUtils {
  static createEmptyBoard(size: number = 4): Board {
    const tiles: Tile[] = [];
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

  static getTileAt(board: Board, position: Position): TileValue | undefined {
    return board.find(tile => 
      tile.position.row === position.row && 
      tile.position.col === position.col
    )?.value;
  }

  static setTileAt(board: Board, position: Position, value: TileValue): Board {
    return board.map(tile => 
      tile.position.row === position.row && 
      tile.position.col === position.col
        ? { ...tile, value }
        : tile
    );
  }

  static getEmptyPositions(board: Board): readonly Position[] {
    return board
      .filter(tile => tile.value === 0)
      .map(tile => tile.position);
  }

  static transpose(board: Board): Board {
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

  static reverse(board: Board): Board {
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

  static extractRow(board: Board, rowIndex: number): readonly TileValue[] {
    return board
      .filter(tile => tile.position.row === rowIndex)
      .sort((a, b) => a.position.col - b.position.col)
      .map(tile => tile.value);
  }

  static extractColumn(board: Board, colIndex: number): readonly TileValue[] {
    return board
      .filter(tile => tile.position.col === colIndex)
      .sort((a, b) => a.position.row - b.position.row)
      .map(tile => tile.value);
  }

  static applyRowToBoard(board: Board, rowIndex: number, newRow: readonly TileValue[]): Board {
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

  static applyColumnToBoard(board: Board, colIndex: number, newColumn: readonly TileValue[]): Board {
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
