# Seal Hunting Game

A simple browser-based game where you control a seal to catch fishes within a 1-minute timer. Compete with players worldwide and see your score on the leaderboard!

## Features

- **Player Control**: Use arrow keys or WASD to move the seal.
- **Random Fishes**: Fishes appear and swim randomly around the game area.
- **Score Tracking**: Each fish caught increases your score.
- **Timer**: 1-minute gameplay per session.
- **Leaderboard**: Save your score with your name and see worldwide rankings.
- **Animations**: Simple animations for the seal and fishes for visual appeal.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite

## Project Structure

project/

    public/
        index.html
        styles.css
        script.js
        seal.png
        fish.png
    server.js
    package.json
    .gitignore
    README.md

## Installation and Setup

1. **Clone the Repository**

```bash
   git clone https://github.com/yourusername/seal-hunting-game.git
   cd seal-hunting-game
```

2. **Install Dependencies**

    Ensure you have Node.js installed. Install the required packages:

```bash

    npm install
```

3. **Start the Server**

```bash

    node server.js
```

4. **Play the Game**

    Open your web browser and navigate to http://localhost:3000.

## How to Play

    Enter Your Name: Input your name in the text box.
    Start Game: Click the "Start Game" button.
    Control Seal: Use arrow keys or WASD to move.
    Catch Fishes: Move over fishes to catch them and earn points.
    Timer: You have 60 seconds to catch as many fishes as possible.
    Submit Score: Your score is automatically saved at the end of the game.
    Leaderboard: View the top scores from players worldwide.

This project is open-source and available under the MIT License.