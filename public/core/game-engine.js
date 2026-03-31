import { BoardUtils } from '../utils/board.utils.js';
import { TileGenerator } from '../services/tile-generator.service.js';
import { BoardValidator } from '../services/board-validator.service.js';
import { EventEmitter } from '../core/event-emitter.js';
import { BOARD_SIZE, INITIAL_TILES_COUNT } from '../constants/game.constants.js';
export class GameEngine {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.tileGenerator = new TileGenerator();
        this.boardValidator = new BoardValidator();
        this.reset();
    }
    move(direction) {
        if (this.state !== 'playing')
            return false;
        if (!this.boardValidator.isValidMove(this.board, direction)) {
            return false;
        }
        const previousBoard = [...this.board];
        this.board = this.performMove(this.board, direction);
        const scoreGain = this.calculateScoreGain(previousBoard, this.board);
        if (scoreGain > 0) {
            this.score = { ...this.score, current: this.score.current + scoreGain };
            this.eventEmitter.emit('SCORE_UPDATED', { type: 'SCORE_UPDATED', payload: { score: this.score.current } });
        }
        this.addRandomTile();
        if (this.boardValidator.checkWinCondition(this.board)) {
            this.state = 'won';
            this.eventEmitter.emit('GAME_WON', { type: 'GAME_WON', payload: { score: this.score.current } });
            this.eventEmitter.emit('GAME_OVER', { type: 'GAME_OVER', payload: { state: 'won', score: this.score.current } });
        }
        else if (!this.boardValidator.hasValidMoves(this.board)) {
            this.state = 'lost';
            this.eventEmitter.emit('GAME_LOST', { type: 'GAME_LOST', payload: { score: this.score.current } });
            this.eventEmitter.emit('GAME_OVER', { type: 'GAME_OVER', payload: { state: 'lost', score: this.score.current } });
        }
        return true;
    }
    addRandomTile() {
        const newBoard = this.tileGenerator.addRandomTileToBoard(this.board);
        if (newBoard !== this.board) {
            const oldBoard = this.board;
            const addedTile = newBoard.find((newTile, idx) => oldBoard[idx]?.value === 0 && newTile.value !== 0);
            this.board = newBoard;
            if (addedTile) {
                this.eventEmitter.emit('TILE_ADDED', {
                    type: 'TILE_ADDED',
                    payload: { position: addedTile.position, value: addedTile.value }
                });
            }
        }
    }
    reset() {
        this.board = BoardUtils.createEmptyBoard(BOARD_SIZE);
        this.score = { current: 0, best: this.loadBestScore() };
        this.state = 'playing';
        for (let i = 0; i < INITIAL_TILES_COUNT; i++) {
            this.addRandomTile();
        }
        this.eventEmitter.emit('BOARD_RESET', { type: 'BOARD_RESET' });
    }
    getBoard() {
        return [...this.board];
    }
    getScore() {
        return { ...this.score };
    }
    getState() {
        return this.state;
    }
    canMove() {
        return this.state === 'playing' && this.boardValidator.hasValidMoves(this.board);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    performMove(board, direction) {
        let newBoard = [...board];
        switch (direction) {
            case 'left':
                newBoard = this.moveLeft(newBoard);
                break;
            case 'right':
                newBoard = this.moveRight(newBoard);
                break;
            case 'up':
                newBoard = this.moveUp(newBoard);
                break;
            case 'down':
                newBoard = this.moveDown(newBoard);
                break;
        }
        return newBoard;
    }
    moveLeft(board) {
        let newBoard = [...board];
        for (let row = 0; row < BOARD_SIZE; row++) {
            const currentRow = BoardUtils.extractRow(newBoard, row);
            const processedRow = this.processRow(currentRow);
            newBoard = BoardUtils.applyRowToBoard(newBoard, row, processedRow);
        }
        return newBoard;
    }
    moveRight(board) {
        let newBoard = [...board];
        for (let row = 0; row < BOARD_SIZE; row++) {
            const currentRow = BoardUtils.extractRow(newBoard, row);
            const reversedRow = [...currentRow];
            const processedRow = this.processRow(reversedRow);
            const finalRow = [...processedRow].reverse();
            newBoard = BoardUtils.applyRowToBoard(newBoard, row, finalRow);
        }
        return newBoard;
    }
    moveUp(board) {
        let newBoard = [...board];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const currentColumn = BoardUtils.extractColumn(newBoard, col);
            const processedColumn = this.processRow(currentColumn);
            newBoard = BoardUtils.applyColumnToBoard(newBoard, col, processedColumn);
        }
        return newBoard;
    }
    moveDown(board) {
        let newBoard = [...board];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const currentColumn = BoardUtils.extractColumn(newBoard, col);
            const reversedColumn = [...currentColumn];
            const processedColumn = this.processRow(reversedColumn);
            const finalColumn = [...processedColumn].reverse();
            newBoard = BoardUtils.applyColumnToBoard(newBoard, col, finalColumn);
        }
        return newBoard;
    }
    processRow(row) {
        const filtered = row.filter(val => val !== 0);
        const merged = this.mergeRow(filtered);
        const missing = BOARD_SIZE - merged.length;
        const zeros = Array(missing).fill(0);
        return [...merged, ...zeros];
    }
    mergeRow(row) {
        const result = [];
        for (let i = 0; i < row.length; i++) {
            const current = row[i];
            const next = row[i + 1];
            if (i < row.length - 1 && current !== undefined && next !== undefined && current === next && current !== 0) {
                result.push((current * 2));
                i++;
            }
            else if (current !== undefined) {
                result.push(current);
            }
        }
        return result;
    }
    calculateScoreGain(previousBoard, newBoard) {
        let scoreGain = 0;
        for (let i = 0; i < newBoard.length; i++) {
            const prevTile = previousBoard[i];
            const newTile = newBoard[i];
            if (!prevTile || !newTile)
                continue;
            const prevValue = prevTile.value;
            const newValue = newTile.value;
            if (newValue > prevValue && prevValue !== 0) {
                scoreGain += newValue;
            }
        }
        if (scoreGain > 0 && this.score.current + scoreGain > this.score.best) {
            this.score = { ...this.score, best: this.score.current + scoreGain };
            this.saveBestScore(this.score.best);
        }
        return scoreGain;
    }
    loadBestScore() {
        const saved = localStorage.getItem('2048-best-score');
        return saved ? parseInt(saved, 10) : 0;
    }
    saveBestScore(score) {
        localStorage.setItem('2048-best-score', score.toString());
    }
}
//# sourceMappingURL=game-engine.js.map