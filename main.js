var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor = {x : 0, y : 0};
var isBuilding = false;
var FPS = 64;
//敵人路徑
var enemyPath = [
	{x : 96, y : 64},
	{x : 384, y : 64},
	{x : 384, y : 192},
	{x : 224, y : 192},
	{x : 224, y : 320},
	{x : 544, y : 320},
	{x : 544, y : 96}
]

		//塔
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var tower = {
	x : 0,
	y : 0
}


		//敵人
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";
var enemy = {
	x : 96, 
	y : 480-32, 
	speedX : 0,
	speedY : -64/FPS,
	pathDes : 0,	
	move : function () {
		this.x += this.speedX;
		this.y += this.speedY;
		if (isCollided(
			enemyPath[this.pathDes].x, 
			enemyPath[this.pathDes].y,
			this.x,
			this.y,
			64/FPS,
			64/FPS
			)) {
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;
			if (this.x > enemyPath[this.pathDes].x) {
				this.speedX = -64/FPS;
			}else if (this.x < enemyPath[this.pathDes].x) {
				this.speedX = 64/FPS;
			}else{
				this.speedX = 0;
			}
			if (this.y > enemyPath[this.pathDes].y) {
				this.speedY = -64/FPS;
			}else if (this.y < enemyPath[this.pathDes].y) {
				this.speedY = 64/FPS;
			}else{
				this.speedY = 0;
			}

		}
	}
};


		//地圖
var bgImg = document.createElement("img");
bgImg.src = "images/1.png";

		//tower
var twImg = document.createElement("img");
twImg.src = "images/tower-btn.png"

		//地圖
setInterval(draw, 1000/FPS);
function draw() {
	ctx.drawImage(bgImg, 0, 0);
	ctx.drawImage(enemyImg, enemy.x, enemy.y);
	ctx.drawImage(twImg, 640-64, 480-64, 64, 64);
	if (isBuilding) {
		ctx.drawImage(towerImg, cursor.x - 16, cursor.y - 16, 32, 32);
	}
	ctx.drawImage(towerImg, tower.x, tower.y, 32, 32);
	enemy.move();
}	

$("#game-canvas").on("mousemove", function (event) {
	console.log("x : " + event.offsetX + ", y : " + event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
});

$("#game-canvas").on("click", function () {
	if (cursor.x > 640-64 && cursor.y > 480-64) {
		isBuilding = true;
	} else {
		if (isBuilding) {
			

			tower.x = Math.floor(cursor.x/32)*32;
			tower.y = Math.floor(cursor.y/32)*32;
		}
		isBuilding = false;
	}
});

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
	if (
		pointX >= targetX
		&& pointX <= targetX + targetWidth
		&& pointY >= targetY
		&& pointY <= targetY + targetHeight
		){
		return true;
	} else {
		return false;
	}
}