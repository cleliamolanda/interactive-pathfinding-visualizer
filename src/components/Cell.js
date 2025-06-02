class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isObstacle = false;
        this.isPath = false;
    }

    toggleObstacle() {
        this.isObstacle = !this.isObstacle;
    }

    setStart() {
        this.isStart = true;
        this.isEnd = false;
        this.isObstacle = false;
    }

    setEnd() {
        this.isEnd = true;
        this.isStart = false;
        this.isObstacle = false;
    }

    reset() {
        this.isStart = false;
        this.isEnd = false;
        this.isObstacle = false;
        this.isPath = false;
    }

    render() {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        if (this.isStart) {
            cellElement.classList.add('start');
        } else if (this.isEnd) {
            cellElement.classList.add('end');
        } else if (this.isObstacle) {
            cellElement.classList.add('obstacle');
        } else if (this.isPath) {
            cellElement.classList.add('path');
        }
        cellElement.dataset.row = this.row;
        cellElement.dataset.col = this.col;
        return cellElement;
    }
}

export default Cell;