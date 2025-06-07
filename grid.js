const WALL = 0;
const performanceNow = window.performance ? () => performance.now() : () => new Date().getTime();

document.addEventListener('DOMContentLoaded', () => {
    const $grid = document.getElementById('search_grid');
    const $selectObstacleFrequency = document.getElementById('obstacle-frequency');
    const $selectGridSize = document.getElementById('grid-size');
    const $checkDebug = document.getElementById('check-debug');
    const $searchDiagonal = document.getElementById('search-diagonal');
    const $checkClosest = document.getElementById('check-closest');
    const $generateWeights = document.getElementById('generate-weights');
    const $displayWeights = document.getElementById('display-weights');
    const $generateGridBtn = document.getElementById('generate-grid');
    const $weightsKey = document.getElementById('weightsKey');
    const $message = document.getElementById('message');

    const opts = {
        wallFrequency: parseFloat($selectObstacleFrequency.value),
        gridSize: parseInt($selectGridSize.value),
        debug: $checkDebug.checked,
        diagonal: $searchDiagonal.checked,
        closest: $checkClosest.checked
    };

    const grid = new GraphSearch($grid, opts, astar.search);

    $generateGridBtn.addEventListener('click', () => grid.initialize());

    $selectObstacleFrequency.addEventListener('change', () => {
        grid.setOption({ wallFrequency: parseFloat($selectObstacleFrequency.value) });
        grid.initialize();
    });

    $selectGridSize.addEventListener('change', () => {
        grid.setOption({ gridSize: parseInt($selectGridSize.value) });
        grid.initialize();
    });

    $checkDebug.addEventListener('change', () => {
        grid.setOption({ debug: $checkDebug.checked });
    });

    $searchDiagonal.addEventListener('change', () => {
        const val = $searchDiagonal.checked;
        grid.setOption({ diagonal: val });
        grid.graph.diagonal = val;
    });

    $checkClosest.addEventListener('change', () => {
        grid.setOption({ closest: $checkClosest.checked });
    });

    $generateWeights.addEventListener('change', () => {
        $weightsKey.style.display = $generateWeights.checked ? 'block' : 'none';
    });
});

const css = { start: "start", finish: "finish", wall: "wall", active: "active" };

function GraphSearch($graph, options, implementation) {
    this.$graph = $graph;
    this.search = implementation;
    this.opts = Object.assign({ wallFrequency: 0.1, debug: true, gridSize: 10 }, options);
    this.initialize();
}

GraphSearch.prototype.setOption = function(opt) {
    this.opts = Object.assign(this.opts, opt);
    this.drawDebugInfo();
};

GraphSearch.prototype.initialize = function() {
    this.grid = [];
    const nodes = [];
    const gridSize = this.opts.gridSize;
    const cellWidth = (this.$graph.clientWidth / gridSize) - 2;
    const cellHeight = (this.$graph.clientHeight / gridSize) - 2;
    this.$graph.innerHTML = '';

    let startSet = false;

    for (let x = 0; x < gridSize; x++) {
        const row = document.createElement('div');
        row.className = 'clear';
        const nodeRow = [];
        const gridRow = [];

        for (let y = 0; y < gridSize; y++) {
            const id = `cell_${x}_${y}`;
            const cell = document.createElement('span');
            cell.className = 'grid_item';
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
            cell.setAttribute('x', x);
            cell.setAttribute('y', y);
            cell.id = id;

            let isWall = Math.floor(Math.random() * (1 / this.opts.wallFrequency));
            if (isWall === 0) {
                nodeRow.push(WALL);
                cell.classList.add(css.wall);
            } else {
                const useWeights = document.getElementById('generate-weights').checked;
                const displayWeights = document.getElementById('display-weights').checked;
                const weight = useWeights ? (Math.floor(Math.random() * 3) * 2 + 1) : 1;
                nodeRow.push(weight);
                cell.classList.add('weight' + weight);
                if (displayWeights) {
                    cell.innerHTML = weight;
                }

                if (!startSet) {
                    cell.classList.add(css.start);
                    startSet = true;
                }
            }

            row.appendChild(cell);
            gridRow.push(cell);
        }

        this.$graph.appendChild(row);
        this.grid.push(gridRow);
        nodes.push(nodeRow);
    }

    this.graph = new Graph(nodes);
    this.$cells = this.$graph.querySelectorAll('.grid_item');
    this.$cells.forEach(cell => {
        cell.addEventListener('click', () => this.cellClicked(cell));
    });
};

GraphSearch.prototype.cellClicked = function(cell) {
    if (cell.classList.contains(css.wall) || cell.classList.contains(css.start)) {
        return;
    }

    this.$cells.forEach(c => c.classList.remove(css.finish));
    cell.classList.add(css.finish);

    const $start = this.$graph.querySelector(`.${css.start}`);
    const start = this.nodeFromElement($start);
    const end = this.nodeFromElement(cell);

    const sTime = performanceNow();
    const path = this.search(this.graph, start, end, { closest: this.opts.closest });
    const fTime = performanceNow();
    const duration = (fTime - sTime).toFixed(2);

    const $message = document.getElementById('message');
    if (path.length === 0) {
        $message.textContent = `couldn't find a path (${duration}ms)`;
        this.animateNoPath();
    } else {
        $message.textContent = `search took ${duration}ms.`;
        this.drawDebugInfo();
        this.animatePath(path);
    }
};

GraphSearch.prototype.drawDebugInfo = function() {
    this.$cells.forEach(cell => cell.innerHTML = '');
    if (!this.opts.debug) return;

    this.$cells.forEach(cell => {
        const node = this.nodeFromElement(cell);
        if (node.visited) {
            cell.innerHTML = `F: ${node.f}<br/>G: ${node.g}<br/>H: ${node.h}`;
        }
    });
};

GraphSearch.prototype.nodeFromElement = function(cell) {
    return this.graph.grid[parseInt(cell.getAttribute('x'))][parseInt(cell.getAttribute('y'))];
};

GraphSearch.prototype.animateNoPath = function() {
    let i = 0;
    const jiggle = () => {
        if (i >= 15) {
            this.$graph.style.top = '0px';
            this.$graph.style.left = '0px';
            return;
        }
        this.$graph.style.top = `${Math.random() * 6}px`;
        this.$graph.style.left = `${Math.random() * 6}px`;
        i++;
        setTimeout(jiggle, 5);
    };
    jiggle();
};

GraphSearch.prototype.animatePath = function(path) {
    const grid = this.grid;
    const timeout = 1000 / grid.length;
    const getElement = node => grid[node.x][node.y];
    const self = this;

    const removeClass = (path, i) => {
        if (i >= path.length) {
            return setStartClass(path);
        }
        getElement(path[i]).classList.remove(css.active);
        setTimeout(() => removeClass(path, i + 1), timeout * path[i].getCost());
    };

    const setStartClass = (path) => {
        const oldStart = this.$graph.querySelector(`.${css.start}`);
        if (oldStart) oldStart.classList.remove(css.start);
        const finish = this.$graph.querySelector(`.${css.finish}`);
        if (finish) finish.classList.remove(css.finish);
        const newStart = getElement(path[path.length - 1]);
        newStart.classList.add(css.start);
    };

    const addClass = (path, i) => {
        if (i >= path.length) {
            return removeClass(path, 0);
        }
        getElement(path[i]).classList.add(css.active);
        setTimeout(() => addClass(path, i + 1), timeout * path[i].getCost());
    };

    addClass(path, 0);
};
