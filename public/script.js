const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const playerNameInput = document.getElementById('player-name');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const scoreList = document.getElementById('score-list');

let seal = { x: 400, y: 300, width: 50, height: 50, speed: 5 };
let fishes = [];
let keys = {};
let score = 0;
let timer = 60;
let gameInterval;
let timerInterval;

// Load images
const sealImg = new Image();
sealImg.src = 'seal.png'; // Replace with your seal image URL or base64 data

const fishImg = new Image();
fishImg.src = 'fish.png'; // Replace with your fish image URL or base64 data

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startButton.addEventListener('click', startGame);

// Start the game
function startGame() {
    if (playerNameInput.value === '') {
        alert('Please enter your name.');
        return;
    }
    resetGame();
    spawnFish();
    gameInterval = setInterval(gameLoop, 1000 / 60);
    timerInterval = setInterval(updateTimer, 1000);
}

// Reset game variables
function resetGame() {
    seal.x = 400;
    seal.y = 300;
    fishes = [];
    score = 0;
    timer = 60;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = 'Time: 60';
}

// Update the game each frame
function gameLoop() {
    updateSeal();
    updateFishes();
    checkCollisions();
    drawGame();
}

// Update seal position
function updateSeal() {
    if (keys['ArrowUp'] || keys['w']) seal.y -= seal.speed;
    if (keys['ArrowDown'] || keys['s']) seal.y += seal.speed;
    if (keys['ArrowLeft'] || keys['a']) seal.x -= seal.speed;
    if (keys['ArrowRight'] || keys['d']) seal.x += seal.speed;

    // Keep seal within canvas
    seal.x = Math.max(0, Math.min(canvas.width - seal.width, seal.x));
    seal.y = Math.max(0, Math.min(canvas.height - seal.height, seal.y));
}

// Update fishes positions
function updateFishes() {
    fishes.forEach(fish => {
        fish.x += fish.vx;
        fish.y += fish.vy;

        // Bounce off walls
        if (fish.x < 0 || fish.x > canvas.width - fish.width) fish.vx *= -1;
        if (fish.y < 0 || fish.y > canvas.height - fish.height) fish.vy *= -1;
    });
}

// Spawn a new fish every 2 seconds
function spawnFish() {
    setInterval(() => {
        const fish = {
            x: Math.random() * (canvas.width - 30),
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
        };
        fishes.push(fish);
    }, 2000);
}

// Check for collisions between seal and fishes
function checkCollisions() {
    fishes.forEach((fish, index) => {
        if (
            seal.x < fish.x + fish.width &&
            seal.x + seal.width > fish.x &&
            seal.y < fish.y + fish.height &&
            seal.y + seal.height > fish.y
        ) {
            fishes.splice(index, 1);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    });
}

// Draw everything on canvas
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw seal
    ctx.drawImage(sealImg, seal.x, seal.y, seal.width, seal.height);

    // Draw fishes
    fishes.forEach(fish => {
        ctx.drawImage(fishImg, fish.x, fish.y, fish.width, fish.height);
    });
}

// Update the timer
function updateTimer() {
    timer--;
    timerDisplay.textContent = 'Time: ' + timer;
    if (timer <= 0) {
        endGame();
    }
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert('Time is up! Your score is ' + score);
    saveScore();
}

// Save the player's score to the server
function saveScore() {
    fetch('/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerNameInput.value, score: score }),
    })
        .then(response => response.json())
        .then(data => {
            getScores();
        })
        .catch(error => console.error('Error:', error));
}

// Retrieve and display the leaderboard
function getScores() {
    fetch('/scores')
        .then(response => response.json())
        .then(data => {
            scoreList.innerHTML = '';
            data.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.name}: ${entry.score}`;
                scoreList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load leaderboard on page load
getScores();
