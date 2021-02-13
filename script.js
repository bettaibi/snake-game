document.addEventListener('DOMContentLoaded', ()=>{
    console.log("The game is running...")

    // Variables
    const sceen = document.getElementById('game-area');
    const ctx = sceen.getContext('2d');
    const box = 32;
    let snake = [];
    let score = 0;
    let currentDirection = undefined;

    // Import Game Backgound
    const ground = new Image();
    ground.src = "img/ground.png";

    const foodImg = new Image();
    foodImg.src = "img/food.png";

    // Load Audio Files
    let dead = new Audio("audio/dead.mp3");
    let eat = new Audio("audio/eat.mp3");
    let up = new Audio("audio/up.mp3");
    let right = new Audio("audio/right.mp3");
    let left = new Audio("audio/left.mp3");
    let down = new Audio("audio/down.mp3");
    
    // Create The head of Snake
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }

    // Positionate The Food
    let food = {
        x: Math.floor(Math.random() * 17+1) * box,
        y: Math.floor(Math.random() * 15+3) * box
    };

    document.addEventListener('keydown', direction)

    function direction(e){
        if(e.key === "ArrowRight" && currentDirection != 'left'){
            currentDirection = 'right';
            right.play();
        }
        if(e.key === "ArrowLeft" && currentDirection != 'right'){
            currentDirection = 'left';
            left.play();
        }
        if(e.key === "ArrowUp" && currentDirection != 'down'){
            currentDirection = 'up';
            up.play();
        }
        if(e.key === "ArrowDown" && currentDirection != 'up'){
            currentDirection = 'down';
            down.play();
        }
    }

    function collision(head, array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }
    
    function draw(){
        ctx.drawImage(ground, 0, 0);
        ctx.drawImage(foodImg, food.x, food.y);
        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score,2*box,1.6*box);

        for(var i=0; i< snake.length; i++){
            // CREATE THE HEAD OF THE SNAKE
            ctx.fillStyle = (i==0)?'green':'white';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            //  RECTANGLE BORDER
            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }

        // Head Position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        switch(currentDirection){
            case 'right': snakeX+=box; break;
            case 'left': snakeX-=box; break; 
            case 'up': snakeY-=box; break; 
            case 'down': snakeY+=box; break; 
            default: return;
        }

        // IF THE SNALE EATS THE FOOD
        if(snakeX === food.x && snakeY === food.y){
            eat.play();
            score++;
            food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
        }
        else{
            snake.pop()
        }

        let newHead = {
            x : snakeX,
            y : snakeY
        }

        // game over
        if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
            clearInterval(game);
            dead.play();
            alert("Game Over");
            location.reload();
        }

        snake.unshift(newHead);
    }
 
   let game = setInterval(draw,150);
});