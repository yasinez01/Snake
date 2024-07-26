const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const $score = document.querySelector('span');
const $section = document.querySelector('section');
const BLOCK_SIZE = 20;
const BLOCK_WIDTH = 35;
const BLOCK_HEIGHT = 25;
const EVEN_MOVEMENTS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp'
};
let score = 0;
let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 15 };

canvas.width = BLOCK_SIZE * BLOCK_WIDTH;
canvas.height = BLOCK_SIZE * BLOCK_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);

document.addEventListener('keydown', event => {
    if (event.key === EVEN_MOVEMENTS.LEFT && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === EVEN_MOVEMENTS.RIGHT && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.key === EVEN_MOVEMENTS.UP && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === EVEN_MOVEMENTS.DOWN && direction !== 'UP') {
        direction = 'DOWN';
    }
});

function createFood() {
    food.x = Math.floor(Math.random() * BLOCK_WIDTH);
    food.y = Math.floor(Math.random() * BLOCK_HEIGHT);
}

function draw() {
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'red';
    snake.forEach(segment => {
        context.fillRect(segment.x, segment.y, 1, 1);
    });

    context.fillStyle = 'yellow';
    context.fillRect(food.x, food.y, 1, 1);

    $score.textContent = score;
}

function update() {
    const head = { ...snake[0] };
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;
    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;

    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
        const audio = new window.Audio('./eat.mp3')
        audio.volume = 0.5
        audio.currentTime = 0
        audio.play()
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= BLOCK_WIDTH || head.y < 0 || head.y >= BLOCK_HEIGHT || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
        return;
    }

    snake.unshift(head);
    draw();
}

function resetGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    createFood();
    draw();
}

$section.addEventListener('click', () => {
    $section.remove();
    resetGame();
    setInterval(update, 200);
    const audio = new window.Audio('./snake.mp3')
    audio.volume = 0.5
     audio.play()
});

