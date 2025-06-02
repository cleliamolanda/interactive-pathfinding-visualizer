// This file serves as the entry point for the application. It initializes the grid, sets up event listeners for user interactions, and manages the overall application flow.

import Grid from './components/Grid';
import Controls from './components/Controls';
import Pathfinder from './Pathfinder';

const grid = new Grid(10, 10);
const controls = new Controls(grid);
const pathfinder = new Pathfinder(grid);

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.appendChild(grid.render());
    app.appendChild(controls.render());

    controls.onFindPath(() => {
        const start = grid.getStart();
        const end = grid.getEnd();
        if (start && end) {
            pathfinder.findPath(start, end);
        }
    });

    controls.onReset(() => {
        grid.reset();
        pathfinder.reset();
    });
});