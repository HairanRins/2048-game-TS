import type { Board, GameScore, GameState, Tile } from "../types/game.types.js";
import { TILE_COLORS } from "../constants/game.constants.js";
import type { IGameRenderer } from "../types/interfaces.js";

export class GameRenderer implements IGameRenderer {
  private readonly gridElement: HTMLElement;
  private readonly scoreElement: HTMLElement;
  private readonly resultElement: HTMLElement;
  private tileElements: Map<string, HTMLElement> = new Map();

  constructor(
    gridElement: HTMLElement,
    scoreElement: HTMLElement,
    resultElement: HTMLElement,
  ) {
    this.gridElement = gridElement;
    this.scoreElement = scoreElement;
    this.resultElement = resultElement;
    this.initializeGrid();
  }

  render(board: Board): void {
    this.updateTiles(board);
  }

  renderScore(score: GameScore): void {
    this.scoreElement.textContent = score.current.toString();
  }

  renderState(state: GameState): void {
    switch (state) {
      case "won":
        this.resultElement.textContent = "You WIN!";
        this.resultElement.style.color = "#f67c5f";
        break;
      case "lost":
        this.resultElement.textContent = "You LOSE!";
        this.resultElement.style.color = "#776e65";
        break;
      case "playing":
        this.resultElement.textContent =
          "Rejoignez le numéro et arriver à la tuile 2048 !";
        this.resultElement.style.color = "#776e65";
        break;
      case "idle":
        this.resultElement.textContent = "Press any arrow key to start";
        this.resultElement.style.color = "#776e65";
        break;
    }
  }

  updateTile(tile: Tile): void {
    const tileElement = this.tileElements.get(tile.id);
    if (tileElement) {
      this.updateTileElement(tileElement, tile);
    }
  }

  updateTiles(board: Board): void {
    board.forEach((tile) => {
      this.updateTile(tile);
    });
  }

  clear(): void {
    this.tileElements.clear();
    this.gridElement.innerHTML = "";
    this.initializeGrid();
  }

  private initializeGrid(): void {
    this.gridElement.innerHTML = "";
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const tileElement = document.createElement("div");
        tileElement.className = "tile";
        tileElement.id = `tile-${row}-${col}`;
        this.gridElement.appendChild(tileElement);
        this.tileElements.set(`${row}-${col}`, tileElement);
        this.updateTileElement(tileElement, {
          value: 0,
          position: { row, col },
          id: `${row}-${col}`,
        });
      }
    }
  }

  private updateTileElement(element: HTMLElement, tile: Tile): void {
    element.textContent = tile.value === 0 ? "" : tile.value.toString();
    element.style.backgroundColor = TILE_COLORS[tile.value];

    if (tile.value > 4) {
      element.style.color = "#f9f6f2";
    } else {
      element.style.color = "#776e65";
    }

    if (tile.value === 0) {
      element.classList.add("empty");
    } else {
      element.classList.remove("empty");
    }
  }
}
