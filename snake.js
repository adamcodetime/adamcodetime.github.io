const toggle = document.getElementById("game-toggle");
const container = document.getElementById("game-container");
const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

let grid = 20;
let snake = [{ x: 100, y: 100 }];
let dx = grid;
let dy = 0;
let food = randomFood();
let gameLoop;

toggle.onclick = () => {
    container.style.display =
        container.style.display === "none" ? "block" : "none";

    if (container.style.display === "block") startGame();
    else stopGame();
};

function startGame() {
    snake = [{ x: 100, y: 100 }];
    dx = grid;
    dy = 0;
    food = randomFood();
    gameLoop = setInterval(update, 120);
}

function stopGame() {
    clearInterval(gameLoop);
}

function update() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wrap around edges
    head.x = (head.x + canvas.width) % canvas.width;
    head.y = (head.y + canvas.height) % canvas.height;

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        food = randomFood();
    } else {
        snake.pop();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            startGame();
            return;
        }
    }

    draw();
}

function draw() {
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8fda8f";
    snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(food.x, food.y, grid, grid);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
        y: Math.floor(Math.random() * (canvas.height / grid)) * grid
    };
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
});
