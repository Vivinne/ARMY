var isBuild = false;
var FPS = 60;
var enemies = []; //存放Enemy的陣列
var clock = 0; //紀錄時間
var hp = 100;

// 畫筆
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext("2d");

// 地圖
var bgImg = document.createElement("img");
bgImg.src = "images/1.png";

// 敵人
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

// 塔按鈕
var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

// 防禦塔
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
//
var  crosshair= document.createElement("img");
		crosshair.src = "images/crosshair.png";

// 敵人路徑物件
var enemyPath = [
	{x:96, y:64},
	{x:384, y:64},
	{x:384, y:192},
	{x:224, y:192},
	{x:224, y:320},
	{x:544, y:320},
	{x:544, y:96}
];

var tower = {
	x:640,
	y: 480,
	range : 321,
	aimingEnemyId :null,
	searchEnemyId : function () {
		for (var i = 0; i < enemies.length; i++) {
			var distance = Math.sqrt(
				Math.pow(this.x - enemies[i].x, 2) + Math.pow(this.y - enemies[i].y, 2)
				);
			if(distance <= this.range){
				this.aimingEnemyId = i;
				return;
			}
		}
		this.aimingEnemyId = null;
	}
}

// 敵人"類別"
function Enemy(speed) {
	this.x = 96;
	this.y = 480-32;
	this.speed = speed;
	this.speedX = 0;
	this.speedY = - this.speed;
	this.pathDes = 0;
	this.hp = 1;

	this.move = function(){
		this.x += this.speedX;
		this.y += this.speedY;
		
		if (isCollided(
			enemyPath[this.pathDes].x, 
			enemyPath[this.pathDes].y,
			this.x, 
			this.y, 
			this.speed, 
			this.speed)){
			if (this.pathDes == enemyPath.length - 1) {
				console.log("here");
				this.hp = 0;
				hp -=10;
			} else {
				console.log("else");
				this.x = enemyPath[this.pathDes].x;
				this.y = enemyPath[this.pathDes].y;
				this.pathDes++;

				if (this.x > enemyPath[this.pathDes].x) {
					this.speedX = -this.speed;
				}else if(this.x < enemyPath[this.pathDes].x){
					this.speedX = this.speed;
				}else{
					this.speedX = 0;
				}

				if (this.y > enemyPath[this.pathDes].y) {
					this.speedY = -this.speed;
				}else if(this.y < enemyPath[this.pathDes].y){
					this.speedY = this.speed;
				}else{
					this.speedY = 0;
				}
			}
		}
	}
}

// 指標物件
var cursor = {
	x: 0,
	y: 0
}

// 塔物件
var tower = {
	x: 640,
	y: 480
}


// draw();
// setTimeout(draw, 1000);
setInterval(draw, 1000/FPS);


function draw() {
	ctx.drawImage(bgImg, 0, 0);
	clock++; //每畫一次遊戲時間增加一
	if (clock%80 == 0) { //每80遊戲時間創造一個Enemy
		var newEnemy = new Enemy((64 + Math.floor(clock/100))/FPS); //利用類別創造物件
		enemies.push(newEnemy); //將新的Enemy紀錄在陣列裡
	}



	for (var i = 0; i < enemies.length; i++) { //讓enemies陣列裡物件依序被挑出來
		if (enemies[i].hp == 0) {
			enemies.splice(i, 1)
		} else {
		enemies[i].move(); //執行move
		ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y);
		} 
	}
	
	// ctx.drawImage(enemyImg, enemy.x, enemy.y);
	ctx.drawImage(towerBtnImg, 640-64, 480-64, 64, 64);
	ctx.drawImage(towerImg, tower.x, tower.y);
	
	if (isBuild) {
		ctx.drawImage(towerImg, cursor.x - 16, cursor.y - 16);
	}

	
	ctx.font = "24px Arial";
	ctx.fillStyle = "#FFFFFF" ;
	ctx.fillText("HP" + hp, 50, 50);


	tower.searchEnemyId();
	if (tower.aimingEnemyId !== null) {
		var id = tower.aimingEnemyId;
		ctx.drawImage(crosshair, enemies[id].x, enemies[id].y);
	}
}

// 是否涵蓋
function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight){
	if(pointX >= targetX &&
		pointX <= targetX + targetWidth &&
		pointY >= targetY &&
		pointY <= targetY + targetHeight)
	{
		return true;
	} else{
		return false;
	}
}

// 紀錄滑鼠座標
$("#game-canvas").on("mousemove", function(event){
	console.log("x: " + event.offsetX + ", y: " + event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
});

// 蓋塔
$("#game-canvas").on("click", function(){
	if (cursor.x > 640-64 && cursor.y > 480-64) {
		isBuild = true;
	}else{
		if(isBuild){
			tower.x = Math.floor(cursor.x/32) *32;
			tower.y = Math.floor(cursor.y/32) *32;
		}
		isBuild = false;
	}
});

