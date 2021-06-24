const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.backgroundColor = 'white';

let leftScore = 0;
let rightScore = 0;

let speed = 5;

;

function randomInitialDirection (){
  let random = Math.random() - 0.5;

  if(random < 0) {
    return Math.floor(random);
  } else {
    return Math.ceil(random);
  }
}

let end = false;

class Ball {
  constructor(){
    this.radius = 10;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.xVel = randomInitialDirection() * speed;
    this.yVel = randomInitialDirection() * speed / 3;
  }


  draw(){
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  update(){

    if(this.x > canvas.width - 10 || this.x <  10){
      end = true;
    }

    if(this.y > canvas.height || this.y <  0){
      this.yVel *= -1;
    }

    this.x = this.x + this.xVel;
    this.y = this.y + this.yVel;
  }

}

class Player {
  constructor(x){
    this.y = canvas.height / 2;
    this.x = x;
    this.height = 100;
    this.width = 5;
  }

  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

}


// Move players
window.addEventListener('keydown', (e) => {
  if(e.keyCode == 83){
    playerOne.y += 10;
  }

  if(e.keyCode == 87){
    playerOne.y -= 10;
  }

  if(e.keyCode == 38){
    playerTwo.y -= 10;
  }

  if(e.keyCode == 40){
    playerTwo.y += 10;
  }

});



// Trying to get the ball to rebound of player one using this function

function PlayerOneRebound(){
  if((ball.x - ball.radius <= playerOne.x)
&&
((playerOne.y + ((playerOne.height) / 2)  + (canvas.height / 8) > ball.y)
&&
(playerOne.y - ((playerOne.height) / 2) + (canvas.height / 8) < ball.y)))

  {
    ball.xVel = ball.xVel * (-1);
  }
}

function PlayerTwoRebound(){
  if((ball.x + ball.radius >= playerTwo.x)
&&
((playerTwo.y + ((playerTwo.height) / 2) + (canvas.height / 8) > ball.y)
&&
(playerTwo.y - ((playerTwo.height) / 2) + (canvas.height / 8) < ball.y)))

  {
    ball.xVel = ball.xVel * (-1);
  }
}

const ball = new Ball();
const playerOne = new Player(10);
const playerTwo = new Player(canvas.width - 10);

function animate() {

  if(end == false){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText('Score: '  + (leftScore) + ':' + (rightScore), canvas.width / 10, canvas.height / 10);
    PlayerOneRebound();
    PlayerTwoRebound();
    ball.draw();
    ball.update();
    playerOne.draw();
    playerTwo.draw();
  }

  if((end == true) && ball.x > canvas.width / 2){
    leftScore += 0.5;
  } else if ((end == true) && ball.x < canvas.width / 2){
    rightScore += 0.5;
  }
}

window.addEventListener('keyup', (e) => {
  // start game
  if(e.keyCode == 72){
    animate();
  }

  // start next round
  if(e.keyCode == 71){
    end = false;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xVel = randomInitialDirection() * speed;
    ball.yVel = randomInitialDirection() * speed / 3;
    animate();
  }

});














