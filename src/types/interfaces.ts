export interface IGameEngine {
  move(direction: import('./game.types').Direction): boolean;
  addRandomTile(): void;
  reset(): void;
  getBoard(): import('./game.types').Board;
  getScore(): import('./game.types').GameScore;
  getState(): import('./game.types').GameState;
  canMove(): boolean;
}

export interface IGameRenderer {
  render(board: import('./game.types').Board): void;
  renderScore(score: import('./game.types').GameScore): void;
  renderState(state: import('./game.types').GameState): void;
  updateTile(tile: import('./game.types').Tile): void;
  clear(): void;
}

export interface IEventEmitter<T = never> {
  on(event: string, listener: (data: T) => void): void;
  off(event: string, listener: (data: T) => void): void;
  emit(event: string, data: T): void;
}

export interface IGameStorage {
  saveBestScore(score: number): void;
  loadBestScore(): number;
  saveBoard(board: import('./game.types').Board): void;
  loadBoard(): import('./game.types').Board | null;
}

export interface IBoardValidator {
  isValidMove(board: import('./game.types').Board, direction: import('./game.types').Direction): boolean;
  hasValidMoves(board: import('./game.types').Board): boolean;
  checkWinCondition(board: import('./game.types').Board): boolean;
}

export interface ITileGenerator {
  generateRandomPosition(board: import('./game.types').Board): import('./game.types').Position | null;
  generateRandomValue(): import('./game.types').TileValue;
}
