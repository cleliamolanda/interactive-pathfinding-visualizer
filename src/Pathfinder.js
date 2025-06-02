// This file contains the main logic for the pathfinding visualizer. It manages the grid state, handles user inputs for placing obstacles, start and end points, and triggers the pathfinding algorithm.

class Pathfinder {
    constructor(grid) {
        this.grid = grid;
        this.start = null;
        this.end = null;
        this.obstacles = [];
    }

    setStart(cell) {
        if (this.start) {
            this.start.isStart = false;
        }
        this.start = cell;
        this.start.isStart = true;
    }

    setEnd(cell) {
        if (this.end) {
            this.end.isEnd = false;
        }
        this.end = cell;
        this.end.isEnd = true;
    }

    toggleObstacle(cell) {
        if (cell.isStart || cell.isEnd) return;
        cell.isObstacle = !cell.isObstacle;
        if (cell.isObstacle) {
            this.obstacles.push(cell);
        } else {
            this.obstacles = this.obstacles.filter(obstacle => obstacle !== cell);
        }
    }

    async findPath() {
        if (!this.start || !this.end) return;

        const dijkstra = new Dijkstra(this.grid, this.start, this.end, this.obstacles);
        const path = await dijkstra.calculatePath();
        this.visualizePath(path);
    }

    visualizePath(path) {
        for (let cell of path) {
            cell.isPath = true;
        }
        this.grid.render();
    }

    reset() {
        this.start = null;
        this.end = null;
        this.obstacles = [];
        this.grid.resetCells();
    }
}

export default Pathfinder;