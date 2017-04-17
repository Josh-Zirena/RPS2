// This document will hold all my javascript

var score = 0;
var player_choice;

var numbers_to_words = {
	"0": "Rock",
	"1": "Paper",
	"2": "Scissor"
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
		score +=1;
		return "You won!";
	} else {
		score -=1;
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
		//set a player's choice
		player_choice = pos;
		//give feedback to the cpuChoice
		cpu_choice.init();
		paragraph.innerText = "The computer chose: " + cpu_choice.text;
		//determine a winner
		//display the winner and the current score.
		paragraph.innerText += "\n" + choose_winner(player_choice, cpu_choice.store);
		paragraph.innerText += "\n\n" + "Score: " + score;
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
 
images.init();

 
 