// This document will hold all my javascript

var score = [0,0];
var player_choice;
let countDown = 3;
let counterInt;
let gameState = 'selection';

var numbers_to_words = {
	"0": "Rock",
	"1": "Paper",
	"2": "Scissors"
}

var cpu_choice = {
	init: function() {
		this.store = Math.floor(Math.random()* 3);
		this.text = numbers_to_words[this.store];
	},
	store: "",
	text: "",
}

cpu_choice.init();
//console.log("cpu_choice:", cpu_choice.store, cpu_choice.text);

var order = [0,1,2,0];

var choose_winner = function(player, cpu) {
	if(order[player] === order[cpu]) {
		return "The game is tied. Try again?";
	}
	if(order[player] === order[cpu+1]) {
		score[0] +=1;
		return "You won!";
	} else {
		score[1] +=1;
		return "You lost :(";
	}
}

 /*
	UI CODE
 */

var paragraph = document.querySelector('p');

var assignClick = function(tag, pos) {
	//assign a click listener
	tag.addEventListener('click', function() {
		if(gameState != 'selection') return;
		//set a player's choice
		player_choice = pos;
		gameState = 'result';
		Counter();
		//give feedback to the cpuChoice
		cpu_choice.init();
		paragraph.innerText = "The computer chose: " + cpu_choice.text;
		//determine a winner
		//display the winner and the current score.
		paragraph.innerText += "\n" + choose_winner(player_choice, cpu_choice.store);
		///paragraph.innerText += "\n\n" + "Score: " + score;
	})

}

var images = {
  tags: document.getElementsByTagName('img'),
  init: function() {
    for(var step = 0; step < this.tags.length; step++) {
      assignClick(this.tags[step], step);
    }
  }
}

function Counter(){
	counterInt = setInterval(function(){

		let string = function() {
			if(countDown >= 1) return countDown;
			else return "";

		}
		document.getElementById('countdown').innerText = string();
		countDown--;
		if(countDown < 0){clearInterval(counterInt); ShowResult();}
	}, 1000)
}
function SwitchScreen(x, y){
	let show = document.getElementById(x);
	let hide = document.getElementById(y);
	show.className = '';
	hide.className = 'hide';
}
function ShowResult(){
	let cPick = document.getElementById('cimg').src = 'images/'+ cpu_choice.text + '.jpg';
	let pPick = document.getElementById('pimg').src = 'images/'+ numbers_to_words[player_choice] + '.jpg';
	SwitchScreen('result', 'selection');
	document.getElementById('score').innerText = 'Score: '+ score[0] + ' - ' + score[1];
}
function Retry(){
	SwitchScreen('selection', 'result');
	countDown = 3;
	gameState = 'selection';
}

images.init();
