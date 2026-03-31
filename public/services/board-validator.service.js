import { BoardUtils } from '../utils/board.utils.js';
export class BoardValidator {
    isValidMove(board, direction) {
        const testBoard = this.simulateMove(board, direction);
        return !this.boardsEqual(board, testBoard);
    }
    hasValidMoves(board) {
        const directions = ['up', 'down', 'left', 'right'];
        return directions.some(direction => this.isValidMove(board, direction));
    }
    checkWinCondition(board) {
        return board.some(tile => tile.value === 2048);
    }
    simulateMove(board, direction) {
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
    simulateMoveLeft(board) {
        let newBoard = [...board];
        for (let row = 0; row < 4; row++) {
            const currentRow = BoardUtils.extractRow(newBoard, row);
            const processedRow = this.processLine(currentRow);
            newBoard = BoardUtils.applyRowToBoard(newBoard, row, processedRow);
        }
        return newBoard;
    }
    simulateMoveRight(board) {
        let newBoard = [...board];
        for (let row = 0; row < 4; row++) {
            const currentRow = BoardUtils.extractRow(newBoard, row);
            const reversedRow = [...currentRow];
            const processedRow = this.processLine(reversedRow);
            const finalRow = [...processedRow].reverse();
            newBoard = BoardUtils.applyRowToBoard(newBoard, row, finalRow);
        }
        return newBoard;
    }
    simulateMoveUp(board) {
        let newBoard = [...board];
        for (let col = 0; col < 4; col++) {
            const currentColumn = BoardUtils.extractColumn(newBoard, col);
            const processedColumn = this.processLine(currentColumn);
            newBoard = BoardUtils.applyColumnToBoard(newBoard, col, processedColumn);
        }
        return newBoard;
    }
    simulateMoveDown(board) {
        let newBoard = [...board];
        for (let col = 0; col < 4; col++) {
            const currentColumn = BoardUtils.extractColumn(newBoard, col);
            const reversedColumn = [...currentColumn];
            const processedColumn = this.processLine(reversedColumn);
            const finalColumn = [...processedColumn].reverse();
            newBoard = BoardUtils.applyColumnToBoard(newBoard, col, finalColumn);
        }
        return newBoard;
    }
    processLine(line) {
        const filtered = line.filter(val => val !== 0);
        const merged = this.mergeLine(filtered);
        const missing = 4 - merged.length;
        const zeros = Array(missing).fill(0);
        return [...merged, ...zeros];
    }
    mergeLine(line) {
        const result = [];
        for (let i = 0; i < line.length; i++) {
            const current = line[i];
            const next = line[i + 1];
            if (i < line.length - 1 && current !== undefined && next !== undefined && current === next) {
                const mergedValue = (current * 2);
                result.push(mergedValue);
                i++;
            }
            else if (current !== undefined) {
                result.push(current);
            }
        }
        return result;
    }
    boardsEqual(board1, board2) {
        return board1.every((tile, index) => {
            const otherTile = board2[index];
            return otherTile !== undefined && tile.value === otherTile.value;
        });
    }
}
//# sourceMappingURL=board-validator.service.js.map