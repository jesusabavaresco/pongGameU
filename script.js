const counterText = document.querySelector('.counterText');
let resetButton;
let message;

let difficult = [-4, -3, -2, 2, 3, 4];

let canvas;
let context;
let gameLoop;

let counter = 0;

const boardX = 300;
const boardY = 300;
const paddleH = 10;
const paddleD = boardY - paddleH;
const paddleW = 80;

let paddleX = 150;
let ballX = 150;
let ballY = 150;
let ballDX = difficult[Math.floor(Math.random() * 6)];
let ballDY = difficult[Math.floor(Math.random() * 6)];

function drawGameCanvas(){
    canvas = document.getElementById('gameBoard');

    if (canvas.getContext){
        context = canvas.getContext('2d');
        gameLoop = setInterval(draw, 16)
        window.addEventListener('keydown', keyInput, true);
    }
}
function draw(){
    context.clearRect(0, 0, boardX, boardY);

    context.fillStyle = '#99c728';
    context.beginPath();
    context.rect(0, 0, boardX, boardY);
    context.closePath();
    context.fill();

    context.fillStyle = 'rgb(75, 74, 74)';
    context.beginPath();
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    context.fillStyle = 'rgb(75, 74, 74)';
    context.beginPath();
    context.rect(paddleX, paddleD, paddleW, paddleH);
    context.closePath();
    context.fill();

    ballX += ballDX
    ballY += ballDY
    
    if(ballX + ballDX > boardX - 15 || ballX + ballDX < 15){
        ballDX = -ballDX;
    }

    if(ballY + ballDY < 15) {
        ballDY = -ballDY
    } else if (ballY + ballDY > boardY - 15) {
        if(ballX > paddleX && ballX < paddleX + paddleW){
            ballDY = -ballDY;
            counter += 1
            counterText.textContent = 'Puntos: ' + counter;
        }else {
            clearInterval(gameLoop);
            counterText.textContent = 'Total: ' + counter;
            message = document.createElement('button');
            message.style.margin = '-200px 10px 0 -35px'
            message.textContent = '¡ Game Over !';
            document.body.append(message);
            resetButton = document.createElement('button');
            resetButton.textContent = 'Star new game';
            document.body.append(resetButton);
            resetButton.addEventListener('click', resetGame);
        }
    }
}

function keyInput(e) {
    switch(e.keyCode){
        case 37:
            paddleX -= 20;
            if(paddleX < 0){
                paddleX = 0;
            }
            break;
        case 39:
            paddleX += 20;
            if(paddleX > boardX - paddleW) {
                paddleX = boardX - paddleW;
            }
            break;
    }
}
function resetGame() {
    counter = 0;

    paddleX = 150;
    ballX = 150;
    ballY = 150;
    ballDX = difficult[Math.floor(Math.random() * 6)];
    ballDY = difficult[Math.floor(Math.random() * 6)];

    drawGameCanvas();
    resetButton.parentNode.removeChild(resetButton);
    message.textContent = '';
}

drawGameCanvas();