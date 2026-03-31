import type { TileValue, Direction } from '../types/game.types.js';

export const TILE_COLORS: Record<TileValue, string> = {
  0: '#afa192',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#ffcea4',
  32: '#e8c064',
  64: '#ffab6e',
  128: '#fd9982',
  256: '#ead79c',
  512: '#76daff',
  1024: '#beeaa5',
  2048: '#d7d4f0'
} as const;

export const BOARD_SIZE = 4;
export const WINNING_TILE = 2048 as const;
export const INITIAL_TILES_COUNT = 2;

export const DIRECTION_VECTORS: Record<Direction, { row: number; col: number }> = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 }
} as const;
