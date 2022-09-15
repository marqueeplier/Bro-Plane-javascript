var states = ["menu", "action"];
var state = 0;
var current_state = states[state];

var logo = new Image();
logo.src = "assets/plane/logo.png";

function menu_controls(event){
	switch(event.keyCode){
		case 13:start_game();break;
	}
}

function start_game(){
	if (current_state == "menu"){
		state = 1;
		current_state = states[state];
		sound_music.play();	
	}
}

function menu_draw(){
	background_draw();

	ctx.drawImage(logo, (canvas.width - 352) / 2, 30);

	ctx.fillStyle = "black";
	ctx.font = "30px Arial";
	ctx.fillText("Press Enter to start or Tap to start", (canvas.width - 450) / 2, (canvas.height - 20) / 2);
}