var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Classes

class ball{
  constructor(height, width){
    this.height = height;
    this.width = width;
    this.posx = mousex;
    this.posy = mousey;

    this.radius = (Math.random() * (40 - 21) + 20);

    this.spawny = this.posy;
    this.ychange = 0;

    this.red = 0;
    this.green = 0;
    this.blue = 255;
    this.alpha = 0.2;

    this.incx = Math.random() * (0.75 + 1.5) - 0.75;
    this.incy = Math.random() * (2 + 1) + 1;
  }

  create(){

    ctx.beginPath();
    ctx.arc(this.posx, this.posy, this.radius, 0, 360);
    ctx.fillStyle = "rgba(" + this.red.toString() + ", " + this.green.toString() + ", " + this.blue.toString() + ", " + this.alpha.toString() + ")";
    ctx.fill();
    ctx.closePath();

    this.posx += this.incx;
    this.posy -= this.incy;

    this.ychange = this.spawny - this.posy;

    this.red += (this.ychange / 15);
    this.green += (this.ychange / 100);
    this.blue -= (this.ychange / 40);
    this.alpha -= ((this.ychange / 150000));

  }
}

// Variables and stuff

balls = []

for (var i = 0; i < 1000; i++){

  x = new ball();
  balls.push(x)


}

var mousex = 0;
var mousey = 0;

var mousex1 = 0;
var mousey1 = 0;

var speedx = 0;
var speedy = 0;


// Functions

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  speedx = Math.sqrt(Math.pow(mousex - mousex1, 2));
  speedy = Math.sqrt(Math.pow(mousey - mousey1, 2));

  var diffuse = (speedx + speedy) / 2500;

  console.log(diffuse);

  mousex1 = mousex;
  mousey1 = mousey;

  var particleCount = 0;

  for (var i = 0; i < balls.length; i++){

    particleCount++;
    balls[i].create();

    if (balls[i].alpha > 0.05){
      balls[i].alpha -=  diffuse;
    }

    if (balls[i].spawny - balls[i].posy < 10){
      balls[i].blue += diffuse * 3000;
      balls[i].green += diffuse * 3000;
      balls[i].red += diffuse * 3000;
    }

    if (balls[i].alpha <= 0){
      balls.splice(i, 1)
    }


  }

  balls.push(new ball());


  //Counter
  ctx.beginPath()
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Particles: " + particleCount, 10, 20);
  ctx.closePath();
}

function getMouse(event){

  var rect = canvas.getBoundingClientRect();

  mousex = event.clientX - rect.left;
  mousey = event.clientY - rect.top;

}


canvas.addEventListener("mousemove", getMouse);

setInterval(draw, 15);
