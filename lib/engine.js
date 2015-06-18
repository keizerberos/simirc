var canvas;
var stage;
var player;
var fondo;


$(document).ready(function(){
	
	cargar()

	iniciar();
	
	ejecutar();
});

function _Player(){
	this.name = "jose";
	this.x = 0;
	this.y = 0;
	this.isAnim = "";
	this.key = new Array();
	for (i = 0; i < 255 ; i++)	this.key[i] = false;
	
	this.anim = new createjs.SpriteSheet({"images": ["img/pj.png"],
	"frames": {"regX": 0, "height": 32, "count": 12, "regY": 0, "width": 32},
	"animations": { "stand_f": [0, 0], "walk_f": [0, 2,"walk_f",0.5],
	"stand_l": [3, 3], "walk_l": [3, 5,"walk_l",0.5],
	"stand_r": [6, 6], "walk_r": [6, 8,"walk_r",0.5],
	"stand_d": [9, 9], "walk_d": [9, 11,"walk_d",0.5]}});

	this.handle =  new createjs.Sprite(this.anim);
	this.handle.x = 100;
	this.handle.y = 50;
	this.handle.regX = 50;
	this.handle.regY = 50;
	this.handle.shadow = new createjs.Shadow("#787", 0, 5, 4);
	this.handle.direction = 90;
	this.handle.vX = 4;
	this.handle.dir = "";

	this.update = function(){
		if (this.key["D".charCodeAt(0)] == true){
			this.handle.x +=this.handle.vX;
			this.handle.dir = "stand_r";
			if (this.isAnim ==""){
				this.isAnim = "walk_r";
				this.handle.gotoAndPlay("walk_r");				
			}
		}
		if (this.key["A".charCodeAt(0)] == true){	
			this.handle.x -=this.handle.vX;
			this.handle.dir = "stand_l";
			if (this.isAnim ==""){
				this.isAnim = "walk_l";
				this.handle.gotoAndPlay("walk_l");				
			}
		}
		if (this.key["W".charCodeAt(0)] == true){
			this.handle.y -=this.handle.vX;
			this.handle.dir = "stand_d";
			if (this.isAnim ==""){
				this.isAnim = "walk_d";
				this.handle.gotoAndPlay("walk_d");				
			}
		}
		if (this.key["S".charCodeAt(0)] == true){
			this.handle.y += this.handle.vX;
			this.handle.dir = "stand_f";
			if (this.isAnim ==""){
				this.isAnim = "walk_f";
				this.handle.gotoAndPlay("walk_f");				
			}
		}
		if (!(this.key["W".charCodeAt(0)] || this.key["S".charCodeAt(0)] || this.key["D".charCodeAt(0)] || this.key["A".charCodeAt(0)]) )
		{
			this.handle.gotoAndStop(this.handle.dir);
			this.isAnim = "";
			this.handle.stop();
		}
	};
}


function cargar(){
	canvas = document.getElementById("demoCanvas");
	stage = new createjs.Stage(canvas);
	var img1 = new Image();
	img1.src = "img/fondo1.jpg";
	fondo = new createjs.Bitmap(img1);
	player  = new _Player();
	var text = new createjs.Text("Utiliza las teclas W,S,D,A ", "bold 24px Arial", "#ff7700");
	text.x = 400;
//	player.handle.direction = 90;
//	player.handle.currentFrame = 0;
//	player.handle.vX = 4;
//	player.handle.x = 16;
//	player.handle.y = 32;
	//player.handle.gotoAndPlay("walk");
	stage.addChild(fondo);
	
	stage.addChild(player.handle);
	stage.addChild(text);
}

function tecladoPress(){
	if (event.keyCode == "D".charCodeAt(0)) {
		player.key["D".charCodeAt(0)] = true;
	}
	if (event.keyCode == "A".charCodeAt(0)) {
		player.key["A".charCodeAt(0)] = true;
	}
	if (event.keyCode == "W".charCodeAt(0)) {
		player.key["W".charCodeAt(0)] = true;
	}
	if (event.keyCode == "S".charCodeAt(0)) {
		player.key["S".charCodeAt(0)] = true;
	}
}
function tecladoPressUp(){
	if (event.keyCode == "D".charCodeAt(0)) {
		player.key["D".charCodeAt(0)] = false; 
		player.isAnim = "";		
	}
	if (event.keyCode == "A".charCodeAt(0)) {
		player.key["A".charCodeAt(0)] = false; 
		player.isAnim = "";
	}
	
	if (event.keyCode == "W".charCodeAt(0)) {
		player.key["W".charCodeAt(0)] = false;
		player.isAnim = "";
	}
	if (event.keyCode == "S".charCodeAt(0)) {
		player.key["S".charCodeAt(0)] = false;
		player.isAnim = "";
	}
}

function iniciar(){
	document.onkeydown = tecladoPress;
	document.onkeyup = tecladoPressUp;
}

function ejecutar(){	
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
	
	player.update();

	stage.update(event);
}

