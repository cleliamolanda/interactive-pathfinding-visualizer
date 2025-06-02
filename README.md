# Interactive Pathfinding Visualizer

This project is an interactive pathfinding visualizer that implements Dijkstra’s Algorithm on a 10x10 grid. Users can place obstacles, set start and end points, and visualize the pathfinding process in real-time.

## Features

- **10x10 Grid**: A grid where users can interact by placing obstacles and defining start and end points.
- **Dijkstra’s Algorithm**: Visualizes the shortest path calculation using Dijkstra’s Algorithm.
- **User Interaction**: Clickable grid cells to set obstacles and path points.
- **Real-time Visualization**: Watch the algorithm explore the grid and find the shortest path.

## Project Structure

```
interactive-pathfinding-visualizer
├── src
│   ├── index.js            # Entry point for the application
│   ├── Pathfinder.js       # Main logic for the pathfinding visualizer
│   ├── algorithms
│   │   └── dijkstra.js     # Implementation of Dijkstra’s Algorithm
│   ├── components
│   │   ├── Grid.js         # Class representing the grid
│   │   ├── Cell.js         # Class representing individual cells
│   │   └── Controls.js      # UI controls for the application
│   └── styles
│       └── main.css        # Styles for the application
├── public
│   └── index.html          # Main HTML file for the application
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd interactive-pathfinding-visualizer
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage Guidelines

- Click on the grid cells to set the start point, end point, and obstacles.
- Use the controls to initiate the pathfinding process or reset the grid.
- Adjust the speed settings to control the visualization speed.

## Acknowledgments

This project is inspired by various pathfinding visualizers and aims to provide an educational tool for understanding Dijkstra’s Algorithm.