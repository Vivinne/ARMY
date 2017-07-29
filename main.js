var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
		//敵人
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";
		//地圖
var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var enemy = {
	x : 96, 
	y : 480-32, 
}
		//地圖
setInterval(draw, 40);
function draw() {
	ctx.drawImage(bglmg, 0, 0);
	ctx.drawImage(enemyImg, enemy.x, enemy.y);
}