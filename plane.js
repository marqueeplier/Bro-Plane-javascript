const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var plane_img = new Image();
plane_img.src = "assets/plane/plane.png";

var health_img = new Image();
health_img.src = "assets/plane/health.png";

var game_over = false;
var plane = {
			 width : 80,
			 height : 50,
			 x : (canvas.width - 80) / 2,
			 y : (canvas.height - 50) / 2,
			 xvel : 0,
			 yvel : 0,
			 friction : 3.5,
			 speed : 5,
			 rotation : 0,
			 gravity : 5.5,
			 fly : false,
			 score : 0,
			 counter : 0,
			 jump_vel : 0.5,
			 stunt : 0,
			 health : 2,
			 rot : 0.03
			};

var trails_table = [];

window.onload = function(){
	var fps = 60;
	document.addEventListener("keydown", menu_controls);
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	document.addEventListener("touchstart", touchstart);
	document.addEventListener("touchend", touchend);
	setInterval(gameloop, 1000 / fps);
}

function gameloop(){
	if (current_state == "menu"){
		menu_draw();
	}

	if (current_state == "action"){
		update();
		draw();	
	}
}

function update(){
	if (game_over == false){
		movement();
		fly();
		trails();
		background_update();
	}
	score();
	enemy_spawn();
	enemy_animate();
}

function draw(){
	ctx.fillStyle = "#d3e6d8";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.globalAlpha = 1;

	background_draw();

	ctx.save();
	ctx.translate(plane.x, plane.y);
	ctx.rotate(plane.rotation);
	ctx.translate(-plane.x,-plane.y);
	ctx.drawImage(plane_img, plane.x, plane.y);
	ctx.restore();

	ctx.fillStyle = "#faf7f7";
	
	for (var i = 0; i <= trails_table.length; i++){
		if (trails_table[i]){
			ctx.fillRect(trails_table[i].x, trails_table[i].y, trails_table[i].width, trails_table[i].height);
		}
	}

	ctx.font = "30px Arial";
	ctx.fillText(plane.score, 50, 50);
	
	ctx.fillStyle = "#d90909";

	if (plane.stunt != 0){
		ctx.fillText("+" + plane.stunt, 150, 50);
	}

	ctx.fillStyle = "#fffefa";

	if (game_over == true){
		ctx.fillText("Game Over", (canvas.width - 100) / 2, (canvas.height - 20) / 2);
		ctx.fillText("'R' or Tap to Restart", (canvas.width - 100) / 2, ((canvas.height - 20) / 2) + 50);
		ctx.fillText("Final Score: " + plane.score, (canvas.width - 100) / 2, ((canvas.height - 20) / 2) + 100);
		
	}
	enemy_draw();
	health();
}

function keydown(event){
	switch(event.keyCode) {
		case 32:plane.fly = true;break;
		case 82:reset();break;
	}
}

function keyup(event){
	switch(event.keyCode) {
		case 32:plane.fly = false;break;
	}
}

function touchstart(event){
	start_game();

	plane.fly = true;

	if (game_over){
		reset();
	}
}

function touchend(event){
	plane.fly = false;
}

function movement(){
	if (plane.fly == false) {
		plane.yvel = plane.yvel * (1 - Math.min(plane.friction, 1));
		plane.yvel = plane.yvel + plane.speed;
		plane.y = plane.y + plane.yvel;	
		plane.rotation = plane.rotation + 0.03;
		plane.stunt = plane.stunt + 1;
	}
}

function fly(){
	if (plane.fly == true){
		sound_plane.play();
		plane.yvel = plane.yvel - plane.jump_vel;
		plane.y = plane.y + plane.yvel;	
		plane.rotation = plane.rotation - plane.rot;
		plane.score = plane.score + plane.stunt;
		plane.stunt = 0;
		console.log("up");
	}

	if (plane.rotation >= 0.9){
		plane.rotation = 0.9;
	}

	if (plane.rotation <= -0.5){
		plane.rotation = -0.5;
	}

	if (plane.y <= 0){
		plane.y = 0;
	}
}

function trails(){
	trails_table.push({x: plane.x, y: plane.y, width: 2, height: 2});

	for (var i = 0; i <= trails_table.length; i++){
		if (trails_table[i]){
			trails_table[i].x = trails_table[i].x - 3;

			if (trails_table[i].x <= 0){
				trails_table.splice(i, 1);
			} 	
		}
	}
}

function score(){
	for (var i = 0; i <= enemies.length; i++){
		if (enemies[i]){
			if (plane.x >= enemies[i].x + enemies[i].width && enemies[i].crossed == false){
				plane.score = plane.score + 1;
				plane.counter = plane.counter + 1;
				enemies[i].crossed = true;
			}

			if (CheckCollision(plane, enemies[i])){
				if (enemies[i]){
					if (enemies[i].id == "crow"){
						if (enemies[i].touched == false){
							sound_caw.play();
							plane.health = plane.health - 1;
							enemies[i].touched = true;	
						}
					}

					if (enemies[i].id == "ring"){
						if (enemies[i].touched == false){
							sound_collect.play();
							enemies[i].touched = true;
							plane.score = plane.score + 5;	
						}
					}	
					
					if (enemies[i].id == "heart"){
						if (enemies[i].touched == false){
							sound_collect.play();
							plane.health = plane.health + 1;
							enemies[i].touched = true;	
						}
					}	
				}
			}
		}
	}

	if (plane.y + plane.height > canvas.height){
		plane.health = plane.health - 1;
		plane.x = (canvas.width - 80) / 2;
		plane.y = (canvas.height - 50) / 2;
	}

	if (plane.health <= -1){
		game_over = true;
	}

	if (plane.counter >= 15){
		plane.counter = 0;
		enemy_speed = enemy_speed + 2;
		plane.jump_vel = plane.jump_vel + 0.01;
		plane.rot = plane.rot + 0.02;
		bkg_no = bkg_no + 1;
		parallax_speed = parallax_speed + 2;
		
		if (bkg_no > 4){
			bkg_no = 0;
		}
		current_background = backgrounds[bkg_no];
	}
}

function reset(){
	if (game_over == true){
		game_over = false;
		enemy_speed = 5; 
		plane.x = (canvas.width - 80) / 2;
		plane.y = (canvas.height - 50) / 2;
		plane.counter = 0;
		plane.score = 0;
		plane.stunt = 0;
		plane.health = 2;
		plane.rot = 0.03;
		bkg_no = 0;
		current_background = backgrounds[bkg_no];
		parallax_speed = 0;
	}
}

function health(){
	for (var i = 0; i<= plane.health; i++){
		ctx.drawImage(health_img, (i * 50), 560);
	}
}

function CheckCollision(a, b){
	return a.x < b.x + b.width &&
		   b.x < a.x + a.width &&
		   a.y < b.y + b.height &&
		   b.y < a.y + a.height
}