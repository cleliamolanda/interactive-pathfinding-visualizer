class Controls {
    constructor() {
        this.findPathButton = document.getElementById('find-path');
        this.resetButton = document.getElementById('reset');
        this.speedInput = document.getElementById('speed');

        this.addEventListeners();
    }

    addEventListeners() {
        this.findPathButton.addEventListener('click', () => {
            this.onFindPath();
        });

        this.resetButton.addEventListener('click', () => {
            this.onReset();
        });

        this.speedInput.addEventListener('input', (event) => {
            this.onSpeedChange(event.target.value);
        });
    }

    onFindPath() {
        // Logic to initiate pathfinding
        console.log('Finding path...');
    }

    onReset() {
        // Logic to reset the grid
        console.log('Resetting grid...');
    }

    onSpeedChange(speed) {
        // Logic to adjust the speed of the visualization
        console.log(`Speed changed to: ${speed}`);
    }
}

export default Controls;