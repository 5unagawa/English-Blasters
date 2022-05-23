// word-blasters.js 

import { create , drawUI, drawPickup, drawWords, drawTank, drawBullet } from './modules/canvas.js';
import { createTank, moveTank, createBullet } from './modules/tank.js';
import { createWordList, chooseWords } from './modules/words.js';

var canvas = create('myDiv','myCanvas', document.body, 480, 320);
var ctx = canvas.ctx;

var lives = 3;
var score = 0;
var round = 1;
var roundMultiplier = 1;
var extraLife = createExtraLife(canvas.width);

//keyboard inputs
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Tank-related variables
var tank = createTank(myCanvas);
var bullet = createBullet(myCanvas, tank);

//word-related variables
var wordParameters = {width: 100, height: 40, pad: 30, left: 60, top: 0};
var wordCount = 3;
var wordList = createWordList(wordCount);
var targetWord = chooseWords(wordList);
var targetHit = false;

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

function createExtraLife(width){
//randomly choose an x co-ord to spawn in the life object
  let canvasWidth = width;
  let randomNum = Math.floor(Math.random(canvasWidth) * (canvasWidth - 44)); //44 is width of health shape
  let lifeObj = {xPos: randomNum, yPos: 0, active: false, spawn: true};
  return lifeObj;
}

function collisionDetection(words, bulletObj, lifeObj){
  let bullet = bulletObj;
  let life = lifeObj;
  for (let i = 0; i < words.length; i++){
    let word = words[i];
    if (word.status == 1 && bullet.active == true) {
      if (bullet.xPos > word.xPos && bullet.xPos < (word.xPos + wordParameters.width) && bullet.yPos > word.yPos && bullet.yPos < (word.yPos + wordParameters.height) ) {
        word.status = 0;
        bullet.active = false;
        bullet.yPos = bullet.spawn;
        if (word.answer.en != targetWord.answer.en ){
          score -= 10;
	  lives -= 1;
        }
        else {
          if (round % 5 == 0){
	    score += 50
	  }
	  else {
	    score+=10;	
	  }
	  targetHit = true;
        }
      }  	
    }
    if (bullet.active == true && life.active == true){
      if (bullet.xPos > life.xPos && bullet.xPos < (life.xPos + 44) && bullet.yPos > life.yPos && bullet.yPos < (life.yPos + 40)){
        lives += 1;
        bullet.active = false;
        bullet.yPos = bullet.spawn;
        life.active = false;
        life.spawn = false;
      }
    }
  }
}

function gameLoop(){
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawUI(canvas, lives, round, score);
 drawWords(canvas, wordList, wordParameters ,round);
 drawTank(canvas, tank);
 
 	
 //Respond to key inputs	
 if (leftPressed){
   tank.position = moveTank(canvas, tank, leftPressed, rightPressed);
 }
 if (rightPressed){
   tank.position = moveTank(canvas, tank, leftPressed, rightPressed);
 }
 if (spacePressed && bullet.active == false){
   bullet.xPos = tank.position + 15;
   bullet.yPos = bullet.spawn;
   bullet.active=true;
 }
 if (bullet.active == true) {
   bullet.yPos -= 10;
   drawBullet(canvas, bullet);
   if (bullet.yPos <= 2){
     bullet.yPos = -1;
     bullet.active = false;
   }
 }
	
  if (targetHit == true) {
    console.log("Round multiplier: " + roundMultiplier);
    roundMultiplier += 0.1;
    round += 1;

    if (extraLife.active == true){
      extraLife.spawn = false;
    }
    if (extraLife.active == false){
      extraLife.spawn = true;
      extraLife = createExtraLife(canvas.width);
    }
	  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordList = createWordList(wordCount);
    wordParameters.top = 0;
    targetWord = chooseWords(wordList);
    document.getElementById('targetWord').innerHTML = targetWord.answer.en;
    targetHit = false;
  }

  //Extra life	
  if (round % 10 == 0 && extraLife.spawn == true){
    extraLife.active = true;
  }
  if (extraLife.active == true) {
    drawPickup(canvas, extraLife);
    extraLife.yPos += 0.5;
    if (extraLife.yPos > canvas.height){
      extraLife.active = false;
      extraLife.spawn = false;
      console.log("life despawned");
    }
  }
	
  collisionDetection(wordList, bullet, extraLife);
 
  //Move word list down the screen
  wordParameters.top += (0.1 * roundMultiplier);

  //Check if words have reached the tank or player has run out of lives	
  if ( (wordList[0].yPos + wordParameters.height > (canvas.height - (tank.height + 9))) || lives == 0){
          window.alert("Game Over.");
  	}
  else {
  	  requestAnimationFrame(gameLoop);
  }
}

document.getElementById('targetWord').innerHTML = targetWord.answer.en;
console.log(wordList);
gameLoop(myCanvas)
