class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.start = null;
        this.end = null;
    }

    createGrid() {
        const grid = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push({ isObstacle: false, isStart: false, isEnd: false });
            }
            grid.push(row);
        }
        return grid;
    }

    setStart(row, col) {
        if (this.start) {
            this.grid[this.start.row][this.start.col].isStart = false;
        }
        this.start = { row, col };
        this.grid[row][col].isStart = true;
    }

    setEnd(row, col) {
        if (this.end) {
            this.grid[this.end.row][this.end.col].isEnd = false;
        }
        this.end = { row, col };
        this.grid[row][col].isEnd = true;
    }

    toggleObstacle(row, col) {
        this.grid[row][col].isObstacle = !this.grid[row][col].isObstacle;
    }

    resetGrid() {
        this.grid.forEach(row => {
            row.forEach(cell => {
                cell.isObstacle = false;
                cell.isStart = false;
                cell.isEnd = false;
            });
        });
        this.start = null;
        this.end = null;
    }

    getGrid() {
        return this.grid;
    }
}

export default Grid;