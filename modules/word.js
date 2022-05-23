//words.js is responsible for creating a list of words from the dictionary 
//as well as randomly choosing a word from a given array.

var dictionary = [ {jp:"黒", en:"black"}, {jp:"青", en:"blue"},
	{jp:"茶色", en:"brown"},
	{jp:"緑", en:"green"},
	{jp:"灰色", en:"gray"},
	{jp:"オレンジ", en:"orange"},
	{jp:"ピンク", en:"pink"},
	{jp:"紫", en:"purple"},
	{jp:"赤", en:"red"},
	{jp:"白", en:"white"},
	{jp:"黄色", en:"yellow"}
];

function createWordList(wordCount){
  let wordList = [];
  for (let i = 0; i < wordCount; i++){
    wordList[i] = {xPos: 0, yPos: 0, answer: chooseWords(dictionary), status: 1}; 
  }
  return wordList;
}

//Randomly selects a word object from wordArray
function chooseWords(wordArray){
  let randomNum = Math.floor(Math.random() * wordArray.length);
  let randomWordObj = wordArray[randomNum];
  return randomWordObj;
}

export { createWordList, chooseWords };
