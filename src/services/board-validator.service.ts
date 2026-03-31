import type { Direction, Board, TileValue } from '../types/game.types.js';
import { BoardUtils } from '../utils/board.utils.js';
import type { IBoardValidator } from '../types/interfaces.js';

export class BoardValidator implements IBoardValidator {
  isValidMove(board: Board, direction: Direction): boolean {
    const testBoard = this.simulateMove(board, direction);
    return !this.boardsEqual(board, testBoard);
  }

  hasValidMoves(board: Board): boolean {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    return directions.some(direction => this.isValidMove(board, direction));
  }

  checkWinCondition(board: Board): boolean {
    return board.some(tile => tile.value === 2048);
  }

  private simulateMove(board: Board, direction: Direction): Board {
    let workingBoard = [...board];

    switch (direction) {
      case 'left':
        workingBoard = this.simulateMoveLeft(workingBoard);
        break;
      case 'right':
        workingBoard = this.simulateMoveRight(workingBoard);
        break;
      case 'up':
        workingBoard = this.simulateMoveUp(workingBoard);
        break;
      case 'down':
        workingBoard = this.simulateMoveDown(workingBoard);
        break;
    }

    return workingBoard;
  }

  private simulateMoveLeft(board: Board): Board {
    let newBoard = [...board];
    
    for (let row = 0; row < 4; row++) {
      const currentRow = BoardUtils.extractRow(newBoard, row);
      const processedRow = this.processLine(currentRow);
      newBoard = BoardUtils.applyRowToBoard(newBoard, row, processedRow);
    }
    
    return newBoard;
  }

  private simulateMoveRight(board: Board): Board {
    let newBoard = [...board];
    
    for (let row = 0; row < 4; row++) {
      const currentRow = BoardUtils.extractRow(newBoard, row);
      const reversedRow = [...currentRow] as TileValue[];
      const processedRow = this.processLine(reversedRow);
      const finalRow = [...processedRow].reverse() as TileValue[];
      newBoard = BoardUtils.applyRowToBoard(newBoard, row, finalRow);
    }
    
    return newBoard;
  }

  private simulateMoveUp(board: Board): Board {
    let newBoard = [...board];
    
    for (let col = 0; col < 4; col++) {
      const currentColumn = BoardUtils.extractColumn(newBoard, col);
      const processedColumn = this.processLine(currentColumn);
      newBoard = BoardUtils.applyColumnToBoard(newBoard, col, processedColumn);
    }
    
    return newBoard;
  }

  private simulateMoveDown(board: Board): Board {
    let newBoard = [...board];
    
    for (let col = 0; col < 4; col++) {
      const currentColumn = BoardUtils.extractColumn(newBoard, col);
      const reversedColumn = [...currentColumn] as TileValue[];
      const processedColumn = this.processLine(reversedColumn);
      const finalColumn = [...processedColumn].reverse() as TileValue[];
      newBoard = BoardUtils.applyColumnToBoard(newBoard, col, finalColumn);
    }
    
    return newBoard;
  }

  private processLine(line: readonly TileValue[]): readonly TileValue[] {
    const filtered = line.filter(val => val !== 0);
    const merged = this.mergeLine(filtered);
    const missing = 4 - merged.length;
    const zeros = Array(missing).fill(0) as TileValue[];
    
    return [...merged, ...zeros];
  }

  private mergeLine(line: readonly TileValue[]): TileValue[] {
    const result: TileValue[] = [];
    
    for (let i = 0; i < line.length; i++) {
      const current = line[i];
      const next = line[i + 1];
      
      if (i < line.length - 1 && current !== undefined && next !== undefined && current === next) {
        const mergedValue = (current * 2) as TileValue;
        result.push(mergedValue);
        i++;
      } else if (current !== undefined) {
        result.push(current);
      }
    }
    
    return result;
  }

  private boardsEqual(board1: Board, board2: Board): boolean {
    return board1.every((tile, index) => {
      const otherTile = board2[index];
      return otherTile !== undefined && tile.value === otherTile.value;
    });
  }
}
