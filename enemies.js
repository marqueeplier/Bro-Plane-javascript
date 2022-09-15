var enemies = [];

var timer_crow = 1000;
var timer_ring = 2000;
var timer_heart = 8000;

var crow_black = new Image();
crow_black.src = "assets/obstacles/crow_black.png";
var crow_white = new Image();
crow_white.src = "assets/obstacles/crow_white.png";
var img_ring = new Image();
img_ring.src = "assets/obstacles/ring.png";
var img_heart = new Image();
img_heart.src = "assets/obstacles/heart.png";

var current_crow = crow_black;

var enemy_speed = 5;

function enemy_spawn(){
	timer_crow = timer_crow - 20;
	timer_ring = timer_ring - 10;
	timer_heart = timer_heart - 10;

	if (timer_crow <= 0){
		timer_crow = 1000;
		var crow = {};
		crow.width = 29;
		crow.height = 25;
		crow.x = canvas.width;
		crow.y = random(0, canvas.height - crow.height);
		crow.fps = 8;
		crow.anim_timer = 1 / crow.fps;
		crow.xoff = 172 - crow.width;
		crow.crossed = false;
		crow.touched = false;
		crow.id = "crow";

		enemies.push(crow);
	}

	if (timer_ring <= 0){
		timer_ring = 2000;
		var ring = {};
		ring.width = 35;
		ring.height = 100;
		ring.x = canvas.width;
		ring.y = random(0, canvas.height - ring.height);
		ring.id = "ring";
		ring.op = 1;
		ring.touched = false;
		enemies.push(ring);
	}

	if (timer_heart <= 0){
		timer_heart = 8000;
		var heart = {};
		heart.width = 50;
		heart.height = 50;
		heart.x = canvas.width;
		heart.y = random(0, canvas.height - heart.height);
		heart.id = "heart";
		ring.touched = false;
		enemies.push(heart);
	}

	for (var i = 0; i <= enemies.length; i++){
		if (enemies[i]){
			enemies[i].x = enemies[i].x - enemy_speed;
			if (enemies[i].x <= 0 || game_over == true){
				enemies.splice(i, 1);
			}
		}
	}

	if (bkg_no > 1){
		current_crow = crow_white;
	}else{
		current_crow = crow_black;
	}
}

function enemy_draw(){
	ctx.fillStyle = "#fffefa";
	for (var i = 0; i <= enemies.length; i++){
		if (enemies[i]){
			
			ctx.globalAlpha = 1;
			
			if (enemies[i].id == "crow"){
				if (enemies[i].touched == false){
					ctx.drawImage(current_crow, enemies[i].xoff, 0, enemies[i].width, enemies[i].height, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
				}
			}
			if (enemies[i].id == "ring"){
				ctx.globalAlpha = enemies[i].op;
				ctx.drawImage(img_ring, enemies[i].x, enemies[i].y);
				
				if (enemies[i].touched == true){
					enemies[i].op = enemies[i].op - 0.02;
					
					ctx.fillText("+5", enemies[i].x, enemies[i].y - 5);
					
					if (enemies[i].op <= 0){
						enemies[i].op = 0;
					}
				}
			}

			if (enemies[i].id == "heart"){
				if (enemies[i]){
					if (enemies[i].touched == false){
						ctx.drawImage(img_heart, enemies[i].x, enemies[i].y);
					}
				}
			}
		}
	}
	ctx.globalAlpha = 1;
}

function enemy_animate(){
	for (var i = 0; i <= enemies.length; i++){
		if (enemies[i]){
			enemies[i].anim_timer = enemies[i].anim_timer - 0.02;

			if (enemies[i].anim_timer <= 0){
				enemies[i].anim_timer = 1 / enemies[i].fps;

				enemies[i].xoff = enemies[i].xoff - 29;

				if (enemies[i].xoff <= 0){
					enemies[i].xoff = 172 - enemies[i].width;
				}
			}
		}
	}
}

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}