//canvas.js is responsible for setting up the canvas and any drawing of UI components.

//Create a new canvas object on the webpage
function create(divId, canId, parent, width, height) {
  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
  let pElem = document.createElement('p');
  
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);
  divWrapper.appendChild(pElem)
  divWrapper.id = divId;
  canvasElem.id = canId;
  canvasElem.width = width;
  canvasElem.height = height;
  pElem.id = "targetWord";
  pElem.innerHTML = "PLACEHOLDER";
  pElem.style.textAlign = "center";
  let ctx = canvasElem.getContext('2d');

  return {
    ctx: ctx,
    id: canId,
	width: width,
	height: height
  };
}

function drawUI(myCanvas, lives, round, score){
  myCanvas.ctx.font = "16px Arial";
  myCanvas.ctx.fillStyle = "White";
  myCanvas.ctx.fillText("LIVES: " + lives + "   ROUND: " + round + "   SCORE: " + score, 8, 20);
}

function drawPickup(myCanvas, myPickup){
  let pickup = myPickup;
  
  myCanvas.ctx.fillStyle = 'white';
  myCanvas.ctx.beginPath();
  myCanvas.ctx.moveTo(pickup.xPos, pickup.yPos+20);
  myCanvas.ctx.lineTo(pickup.xPos+12, pickup.yPos);
  myCanvas.ctx.lineTo(pickup.xPos+32, pickup.yPos);
  myCanvas.ctx.lineTo(pickup.xPos+44, pickup.yPos+20);
  myCanvas.ctx.lineTo(pickup.xPos+32, pickup.yPos+40);
  myCanvas.ctx.lineTo(pickup.xPos+12, pickup.yPos+40);
  myCanvas.ctx.closePath();
  myCanvas.ctx.fill();
  myCanvas.ctx.fillStyle = "red";
  myCanvas.ctx.font = "60px Arial";
  let textWidth = myCanvas.ctx.measureText("+");
  myCanvas.ctx.fillText("+", pickup.xPos + 5, pickup.yPos + 41);
}

function drawWords(myCanvas, wordList, params, roundCount){
  let wordWidth = params.width;
  let wordHeight = params.height;
  let wordPadding = params.pad;
  let wordOffsetLeft = params.left;
  let wordOffsetTop = params.top;
  let words = wordList;
  let targetWord = document.getElementById('targetWord');
  
  for (let i = 0; i < words.length; i++){
    if (words[i].status == 1){
      let wX = (i*(wordWidth + wordPadding)) + wordOffsetLeft;
      let wY = (0.5*(wordHeight + wordPadding)) + wordOffsetTop;
      words[i].xPos = wX;
      words[i].yPos = wY;
      myCanvas.ctx.beginPath();
      myCanvas.ctx.rect(wX, wY, wordWidth, wordHeight);
      if (roundCount % 10 == 0 && words[i].answer.en == targetWord.innerHTML){ //Bonus round
        myCanvas.ctx.fillStyle = "purple";
      }
      else {
        myCanvas.ctx.fillStyle = "green";      
      }
      myCanvas.ctx.closePath();
      myCanvas.ctx.fill();
      myCanvas.ctx.fillStyle = "white";
      myCanvas.ctx.font = "20px Arial";
      let textWidth = myCanvas.ctx.measureText(words[i].answer.jp);
      myCanvas.ctx.fillText(words[i].answer.jp, wX + ((wordWidth - textWidth.width)/2), wY+27);
    }
  }
}

function drawTank(myCanvas, tankObj){
  let tank = tankObj;
  
  //draw body of tank
  myCanvas.ctx.beginPath();
  myCanvas.ctx.rect(tank.position, myCanvas.height - tank.height, tank.width, tank.height);
  myCanvas.ctx.fillStyle = "red";
  myCanvas.ctx.fill();
  myCanvas.ctx.closePath();
  //draw turret
  myCanvas.ctx.beginPath();
  myCanvas.ctx.rect(tank.position + 10, myCanvas.height - tank.height - 10, 10, 10);
  myCanvas.ctx.fillStyle = "red";
  myCanvas.ctx.fill();
  myCanvas.ctx.closePath();
}

function drawBullet(myCanvas, bulletObj){
  let bullet = bulletObj;
  
  myCanvas.ctx.beginPath();
  myCanvas.ctx.arc(bullet.xPos, bullet.yPos, 5, 0, Math.PI*2);
  myCanvas.ctx.fillStyle = "white";
  myCanvas.ctx.fill();
  myCanvas.ctx.closePath();
}

export { create, drawUI, drawPickup, drawWords, drawTank, drawBullet };
