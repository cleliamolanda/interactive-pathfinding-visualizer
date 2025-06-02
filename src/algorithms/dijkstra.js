class Dijkstra {
    constructor(grid) {
        this.grid = grid;
        this.startNode = null;
        this.endNode = null;
        this.visitedNodes = [];
        this.shortestPath = [];
    }

    setStartNode(node) {
        this.startNode = node;
    }

    setEndNode(node) {
        this.endNode = node;
    }

    calculateShortestPath() {
        const unvisitedNodes = this.grid.getAllNodes();
        this.startNode.distance = 0;

        while (unvisitedNodes.length) {
            unvisitedNodes.sort((a, b) => a.distance - b.distance);
            const closestNode = unvisitedNodes.shift();

            if (closestNode.isWall) continue;
            if (closestNode === this.endNode) return this.getShortestPath();

            closestNode.isVisited = true;
            this.visitedNodes.push(closestNode);
            this.updateNeighbors(closestNode);
        }
        return [];
    }

    updateNeighbors(node) {
        const neighbors = this.grid.getNeighbors(node);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.distance = node.distance + 1;
                neighbor.previousNode = node;
            }
        }
    }

    getShortestPath() {
        const path = [];
        let currentNode = this.endNode;
        while (currentNode) {
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        this.shortestPath = path;
        return path;
    }

    visualizePath() {
        for (const node of this.visitedNodes) {
            node.isVisited = true;
        }
        for (const node of this.shortestPath) {
            node.isInShortestPath = true;
        }
    }
}

export default Dijkstra;