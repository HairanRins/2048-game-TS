import { GameEngine } from './core/game-engine.js';
import { GameRenderer } from './views/game-renderer.js';
import { GameController } from './controllers/game-controller.js';

document.addEventListener('DOMContentLoaded', () => {
  const gridElement = document.querySelector('.grid');
  const scoreElement = document.querySelector('#score');
  const resultElement = document.querySelector('#result');

  if (!gridElement || !scoreElement || !resultElement) {
    console.error('Required DOM elements not found');
    return;
  }

  const gameEngine = new GameEngine();
  const gameRenderer = new GameRenderer(
    gridElement as HTMLElement,
    scoreElement as HTMLElement,
    resultElement as HTMLElement
  );
  const gameController = new GameController(gameEngine);

  gameEngine.on('SCORE_UPDATED', (event) => {
    if (event.type === 'SCORE_UPDATED') {
      gameRenderer.renderScore(gameEngine.getScore());
    }
  });

  gameEngine.on('GAME_WON', (event) => {
    if (event.type === 'GAME_WON') {
      gameRenderer.renderState('won');
      gameController.destroy();
    }
  });

  gameEngine.on('GAME_LOST', (event) => {
    if (event.type === 'GAME_LOST') {
      gameRenderer.renderState('lost');
      gameController.destroy();
    }
  });

  gameEngine.on('BOARD_RESET', () => {
    gameRenderer.render(gameEngine.getBoard());
    gameRenderer.renderScore(gameEngine.getScore());
    gameRenderer.renderState('playing');
  });

  gameEngine.on('TILE_ADDED', () => {
    gameRenderer.render(gameEngine.getBoard());
  });

  gameRenderer.render(gameEngine.getBoard());
  gameRenderer.renderScore(gameEngine.getScore());
  gameRenderer.renderState('playing');
});
