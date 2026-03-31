import type { Position, TileValue, Board } from '../types/game.types.js';
import { BOARD_SIZE } from '../constants/game.constants.js';
import { BoardUtils } from '../utils/board.utils.js';
import type { ITileGenerator } from '../types/interfaces.js';

export class TileGenerator implements ITileGenerator {
  private readonly randomValues: readonly TileValue[] = [2, 2, 2, 2, 4];

  generateRandomPosition(board: Board): Position | null {
    const emptyPositions = BoardUtils.getEmptyPositions(board);
    if (emptyPositions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptyPositions.length);
    return emptyPositions[randomIndex] ?? null;
  }

  generateRandomValue(): TileValue {
    const randomIndex = Math.floor(Math.random() * this.randomValues.length);
    return this.randomValues[randomIndex] ?? 2;
  }

  generateRandomTile(board: Board): { position: Position; value: TileValue } | null {
    const position = this.generateRandomPosition(board);
    if (!position) return null;

    const value = this.generateRandomValue();
    return { position, value };
  }

  addRandomTileToBoard(board: Board): Board {
    const tile = this.generateRandomTile(board);
    if (!tile) return board;

    return BoardUtils.setTileAt(board, tile.position, tile.value);
  }

  static isValidPosition(position: Position): boolean {
    return (
      position.row >= 0 &&
      position.row < BOARD_SIZE &&
      position.col >= 0 &&
      position.col < BOARD_SIZE
    );
  }

  static createPosition(row: number, col: number): Position {
    const position = { row, col };
    if (!TileGenerator.isValidPosition(position)) {
      throw new Error(`Invalid position: ${row}, ${col}`);
    }
    return position;
  }
}
