import { TILE_COLORS } from '../constants/game.constants.js';
export class GameRenderer {
    constructor(gridElement, scoreElement, resultElement) {
        this.tileElements = new Map();
        this.gridElement = gridElement;
        this.scoreElement = scoreElement;
        this.resultElement = resultElement;
        this.initializeGrid();
    }
    render(board) {
        this.updateTiles(board);
    }
    renderScore(score) {
        this.scoreElement.textContent = score.current.toString();
    }
    renderState(state) {
        switch (state) {
            case 'won':
                this.resultElement.textContent = 'You WIN!';
                this.resultElement.style.color = '#f67c5f';
                break;
            case 'lost':
                this.resultElement.textContent = 'You LOSE!';
                this.resultElement.style.color = '#776e65';
                break;
            case 'playing':
                this.resultElement.textContent = 'Rejoignez le numéro et arriver à la tuile 2048 !';
                this.resultElement.style.color = '#776e65';
                break;
            case 'idle':
                this.resultElement.textContent = 'Press any arrow key to start';
                this.resultElement.style.color = '#776e65';
                break;
        }
    }
    updateTile(tile) {
        const tileElement = this.tileElements.get(tile.id);
        if (tileElement) {
            this.updateTileElement(tileElement, tile);
        }
    }
    updateTiles(board) {
        board.forEach(tile => {
            this.updateTile(tile);
        });
    }
    clear() {
        this.tileElements.clear();
        this.gridElement.innerHTML = '';
        this.initializeGrid();
    }
    initializeGrid() {
        this.gridElement.innerHTML = '';
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const tileElement = document.createElement('div');
                tileElement.className = 'tile';
                tileElement.id = `tile-${row}-${col}`;
                this.gridElement.appendChild(tileElement);
                this.tileElements.set(`${row}-${col}`, tileElement);
                this.updateTileElement(tileElement, { value: 0, position: { row, col }, id: `${row}-${col}` });
            }
        }
    }
    updateTileElement(element, tile) {
        element.textContent = tile.value === 0 ? '' : tile.value.toString();
        element.style.backgroundColor = TILE_COLORS[tile.value];
        if (tile.value > 4) {
            element.style.color = '#f9f6f2';
        }
        else {
            element.style.color = '#776e65';
        }
        if (tile.value === 0) {
            element.classList.add('empty');
        }
        else {
            element.classList.remove('empty');
        }
    }
}
//# sourceMappingURL=game-renderer.js.map