var objArray = [ {val:"black", image:"images/black.png"}, {val:"blue", image:"images/blue.png"},
	{val:"brown", image:"images/brown.png"},
	{val:"green", image:"images/green.png"},
	{val:"grey", image:"images/grey.png"},
	{val:"orange", image:"images/orange.png"},
	{val:"pink", image:"images/pink.png"},
	{val:"purple", image:"images/purple.png"},
	{val:"red", image:"images/red.png"},
	{val:"white", image:"images/white.png"},
	{val:"yellow", image:"images/yellow.png"}
];
 
function chooseImage(){
	var randomNum = Math.floor(Math.random() * objArray.length);
  document.getElementById("myImage").src = objArray[randomNum].image;
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tankWidth = 30;
var tankHeight = 10;
var tankX = (canvas.width - tankWidth) / 2;

var bulletSpawn = canvas.height - (tankHeight +15);
var bulletX = 0;
var bulletY = bulletSpawn;
var bulletActive = false;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var score = 0;

var alienRowCount = 1;
var alienColumnCount = 3;
var alienWidth = 100;
var alienHeight = 40;
var alienPadding = 30;
var alienOffsetTop = 30;
var alienOffsetLeft = 60;
var alienX = 0;
var alienY = 0;
var aliens = [];
	for (var c=0; c<alienColumnCount; c++) {
  	aliens[c] = [];
    for (var r=0; r<alienRowCount; r++) {
    	aliens[c][r] = { x:alienX, y:alienY, status:1, answer:0 };
    }
   }
var reversed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
	if (e.key == "Right" || e.key == "ArrowRight"){
  	rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
  	leftPressed = true;
  } else if (e.key == "Spacebar" || e.key == " ") {
  	spacePressed = true;
  }
}

function keyUpHandler(e){
	if (e.key == "Right" || e.key == "ArrowRight"){
  	rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
  	leftPressed = false;
  } else if (e.key == "Spacebar" || e.key == " ") {
  	spacePressed = false;
  }
}

function collisionDetection() {
	for (var c = 0; c < alienColumnCount; c++) {
  	for (var r = 0; r < alienRowCount; r++) {
			var a = aliens[c][r];
      if (a.status == 1) {
      	if (bulletX > a.x && bulletX < a.x + alienWidth && bulletY > a.y && bulletY < a.y + alienHeight) {
         	a.status = 0;
         	bulletY = -1;
          
          if (a.answer != 1){
          	score -= 10;
          }
          else {score+=10;}
         	
        	if (score == alienRowCount * alienColumnCount) {
						alert("You win!");
						document.location.reload();
		    	}
        }
        if (canvas.height - (tankHeight + 10) <
        a.y + alienHeight) {
        	alert("Game Over.");
          document.location.reload();
        }
      }
    }
  }
}	

function drawAliens() {
	for (var c=0; c<alienColumnCount; c++) {
		for (var r=0; r<alienRowCount; r++) {
			if (aliens[c][r].status == 1) {
		  	var aX = (c*(alienWidth + alienPadding)) + alienOffsetLeft;
		    var aY = (r*(alienHeight + alienPadding)) + alienOffsetTop;
	      aliens[c][r].x = aX;
		   	aliens[c][r].y = aY;
		    ctx.beginPath();
		    ctx.rect(aX + alienX, aY + alienY, alienWidth, alienHeight);
		    ctx.fillStyle = "green";
		    ctx.closePath();
		    ctx.fill();
			ctx.fillStyle = "black";
			ctx.font = "20px serif";
			ctx.fillText("Hello", 10, 50);
			
			}
 		}
	}
}

function drawBullet(){
	ctx.beginPath();
  ctx.arc(bulletX, bulletY, 2, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawScore(){
  ctx.font ="16px Arial";
	ctx.fillStyle = "White";
	ctx.fillText("SCORE: " + score, 8, 20);
} 

function drawTank(){
	ctx.beginPath();
  ctx.rect(tankX, canvas.height - tankHeight, tankWidth, tankHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(tankX + 10, canvas.height - tankHeight - 10, 10, 10);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function gameLoop(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  drawAliens();
  collisionDetection();
  drawScore();
	
  if (rightPressed) {
  	tankX += 5;
    if (tankX + tankWidth > canvas.width) {
    	tankX = canvas.width - tankWidth;
    }
  } else if (leftPressed) {
    	tankX -= 5;
      if (tankX  < 0) {
      	tankX = 0;
      }
  } 
  
  if (spacePressed && bulletActive == false) {
  	bulletActive = true;
    bulletX = tankX + 14;
  	drawBullet();
  }
  if (bulletActive) {
  	bulletY -= 10;
    drawBullet();
    if (bulletY <= 2) {
      bulletY = bulletSpawn;
    	bulletActive = false;
    }
	}
	    	alienOffsetTop += 0.09;

  requestAnimationFrame(gameLoop);
}

chooseImage();
gameLoop();
