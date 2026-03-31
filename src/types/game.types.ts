export type TileValue =
  | 0
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048;

export type Direction = "up" | "down" | "left" | "right";

export type GameState = "playing" | "won" | "lost" | "idle";

export type Position = {
  readonly row: number;
  readonly col: number;
};

export type Tile = {
  readonly value: TileValue;
  readonly position: Position;
  readonly id: string;
};

export type Board = Tile[];

export type GameScore = {
  readonly current: number;
  readonly best: number;
};

export type GameEvent =
  | {
      type: "TILE_MOVED";
      payload: { from: Position; to: Position; value: TileValue };
    }
  | {
      type: "TILES_MERGED";
      payload: { position: Position; value: TileValue; score: number };
    }
  | { type: "TILE_ADDED"; payload: { position: Position; value: TileValue } }
  | { type: "GAME_WON"; payload: { score: number } }
  | { type: "GAME_LOST"; payload: { score: number } }
  | {
      type: "GAME_OVER";
      payload: { state: Exclude<GameState, "playing">; score: number };
    }
  | { type: "SCORE_UPDATED"; payload: { score: number } }
  | { type: "BOARD_RESET" };
