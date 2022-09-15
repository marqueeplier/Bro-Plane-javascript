var one = new Image();
one.src = "assets/backgrounds/1.png";
var two = new Image();
two.src = "assets/backgrounds/2.png";
var three = new Image();
three.src = "assets/backgrounds/3.png";
var four = new Image();
four.src = "assets/backgrounds/4.png";
var five = new Image();
five.src = "assets/backgrounds/5.png";

var prlx_1 = new Image();
prlx_1.src = "assets/parallax/1.png";
var prlx_2 = new Image();
prlx_2.src = "assets/parallax/2.png";
var prlx_3 = new Image();
prlx_3.src = "assets/parallax/3.png";

var sound_plane = new Audio();
sound_plane.src = "assets/music/plane.wav";
var sound_caw = new Audio();
sound_caw.src = "assets/music/caw.wav";
var sound_music = new Audio();
sound_music.src = "assets/music/Ketsa - Ocean Breeze.mp3";
var sound_collect = new Audio();
sound_collect.src = "assets/music/collect.wav";

sound_music.loop = true;

var backgrounds = [one, two, three, four, five];
var bkg_no = 0;
var current_background = backgrounds[bkg_no];

var parallax_speed = 0;

var parallax_1 = {x : 0, y : 0, img : prlx_1};
var parallax_2 = {x : 1, y : 0, img : prlx_1};
var parallax_3 = {x : 0, y : -20, img : prlx_2};
var parallax_4 = {x : 1, y : -20, img : prlx_2};
var parallax_5 = {x : 0, y : 0, img : prlx_3};
var parallax_6 = {x : 1, y : 0, img : prlx_3};

function background_update(){
	parallax_update(parallax_1, parallax_2, 1 + parallax_speed);
	parallax_update(parallax_3, parallax_4, 5 + parallax_speed);
	parallax_update(parallax_5, parallax_6, 10 + parallax_speed);
}

function background_draw(){
	ctx.drawImage(current_background, 0, 0);

	ctx.globalAlpha = 0.5;
	parallax_draw(parallax_1, parallax_2);
	ctx.globalAlpha = 1;
	
	parallax_draw(parallax_3, parallax_4);
	parallax_draw(parallax_5, parallax_6);
}

function parallax_update(prlx1, prlx2, speed){
	let width = 960;
		
	if (prlx1.x + width <= 0) {
		prlx2.x = prlx1.x - speed;
		prlx1.x = prlx2.x + width;
	}

	if (prlx1.x + width > 0) {
		prlx1.x = prlx1.x - speed;
		prlx2.x = prlx1.x + width;
	}
}

function parallax_draw(prlx1, prlx2){
	ctx.drawImage(prlx1.img, prlx1.x, prlx1.y);
	ctx.fillText("1", prlx1.x, prlx1.y);
	ctx.drawImage(prlx2.img, prlx2.x, prlx2.y);
}