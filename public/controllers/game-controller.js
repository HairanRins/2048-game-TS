export class GameController {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.keydownHandler = this.handleKeydown.bind(this);
        this.attachEventListeners();
    }
    attachEventListeners() {
        document.addEventListener('keydown', this.keydownHandler);
    }
    handleKeydown(event) {
        const direction = this.getDirectionFromKey(event.key);
        if (direction) {
            event.preventDefault();
            this.gameEngine.move(direction);
        }
    }
    getDirectionFromKey(key) {
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
    destroy() {
        document.removeEventListener('keydown', this.keydownHandler);
    }
}
//# sourceMappingURL=game-controller.js.map