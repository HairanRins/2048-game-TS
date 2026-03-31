import type { Direction } from '../types/game.types.js';
import type { IGameEngine } from '../types/interfaces.js';

export class GameController {
  private readonly gameEngine: IGameEngine;
  private readonly keydownHandler: (e: KeyboardEvent) => void;

  constructor(gameEngine: IGameEngine) {
    this.gameEngine = gameEngine;
    this.keydownHandler = this.handleKeydown.bind(this);
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    document.addEventListener('keydown', this.keydownHandler);
  }

  private handleKeydown(event: KeyboardEvent): void {
    const direction = this.getDirectionFromKey(event.key);
    if (direction) {
      event.preventDefault();
      this.gameEngine.move(direction);
    }
  }

  private getDirectionFromKey(key: string): Direction | null {
    switch (key) {
      case 'ArrowUp':
        return 'up';
      case 'ArrowDown':
        return 'down';
      case 'ArrowLeft':
        return 'left';
      case 'ArrowRight':
        return 'right';
      default:
        return null;
    }
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.keydownHandler);
  }
}
