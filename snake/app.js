const header = document.querySelector('h2')
let playerName;
let timer
const easyLvl = document.querySelector('#easyLvl')
const medLvl = document.querySelector('#medLvl')
const hardLvl = document.querySelector('#hardLvl')
const firstName = document.querySelector('#name')
const startBtn = document.querySelector('#startGame')
const form = document.querySelector('.form')
const intro = document.querySelector('.intro')
const submitBtn = document.querySelector('#submit')
const lvlDiv = document.querySelector('.lvls')
const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d')
const scoreText = document.querySelector('#score')
const resetBtn = document.querySelector('#resetBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBg = 'white'
const snakeColor = 'lightgreen'
const snakeBr = 'black'
const foodColor = 'red'
const unitSize = 25
let running = false
let xVelocity = unitSize
let yVelocity = 0;
let foodX
let foodY
let score = 0;
let snake = [
    {x:unitSize * 4,y:0},
    {x:unitSize * 3,y:0},
    {x:unitSize * 2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
];



submitBtn.addEventListener('click',getName);
startBtn.addEventListener('click',gameReady);

window.addEventListener('keydown',changeDirection);
resetBtn.addEventListener('click',resetGame);

gameStart();


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood()
    drawFood()
    nextTick()
    
};

function gameReady(){
        switch(true){
            case(easyLvl.checked):
            timer = 200;
            gaming();
            break;
            case(medLvl.checked):
            timer = 150;
            gaming();
            break;
            case(hardLvl.checked):
            timer = 90;
            gaming();
            break;
            default:
                alert(`Please Select a Level!`)
        }
    }
    
    function gaming(){
    intro.style.display = 'none'; 

    }
function getName(){
   
    if(firstName.value == ''){
        alert('Please Enter a Name!!')
    }else{
        playerName = firstName.value
        header.textContent = `Hi there ${playerName}, Please select a Level:`
        form.style.display = 'none';
        lvlDiv.style.display = 'block';
    }
   

}
function nextTick(){
if(running){
    setTimeout(() => {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick()
    },100)
}else{
    displayGameOver();
}
};
function clearBoard(){

    ctx.fillStyle = boardBg;
    ctx.fillRect(0,0,gameWidth,gameHeight)
};
function createFood(){

function randFood(min,max){
    const randNum = Math.round((Math.random() * (max-min) + min) / unitSize)*unitSize
    return randNum
}
foodX = randFood(0,gameWidth - unitSize)
foodY = randFood(0,gameWidth - unitSize)
};
function drawFood(){
ctx.fillStyle = foodColor;
ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity
}
snake.unshift(head);
if(snake[0].x == foodX && snake[0].y == foodY) {
    score+=1;
    scoreText.textContent = score;
    createFood()
}
else{
    snake.pop()
}
};

function drawSnake(){

    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBr;
    snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
    ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    } )
};
function changeDirection(event){

    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const left  = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
    case(keyPressed == left && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
    case(keyPressed == right && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
    case(keyPressed == up && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
    case(keyPressed == down && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
       
    }
};
function checkGameOver(){

    switch(true){
        case(snake[0].x < 0):
        running = false;
        break;
        
        case(snake[0].x > gameWidth):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y > gameHeight):
        running = false;
        break;
    }

    for(let i = 1;i < snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }

};
function displayGameOver(){
ctx.font = '50px cursive'
ctx.fillStyle = 'blue'
ctx.textAlign = 'center'
ctx.fillText('Game Over!!', gameWidth/2,gameHeight/2)
running = false
};
function resetGame(){
score = 0;
xVelocity = unitSize
yVelocity = 0
snake = [
    {x:unitSize * 4,y:0},
    {x:unitSize * 3,y:0},
    {x:unitSize * 2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
]
gameStart()

};