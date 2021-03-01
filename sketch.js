var rocket;
var obs1, obs2, obs3, obs4, obs5, obs6;
var wall1, wall2, wall3, wall4, wall5;
var wall6, wall7, wall8, wall9, wall10;
var enemy1, enemy2;
var enemyimage;
var door1, door2;
var bullet, bulletGroup;
var laserGroup;
var gunpowder = 50;
var enemylive = 3;
var gameState = 1;
var Play = 1;
var Win = 2;
var dead = 0;
var diamond;
function preload() {
  enemyimage = loadImage("boss.png");
}
function setup() {
  createCanvas(1300, 650);
  //group
  bulletGroup = new Group();
  laserGroup = new Group();
  diamond = createSprite(1200, 110, 30, 30);
  diamond.shapeColor = "yellow";
  //rocket
  rocket = createSprite(150, 150, 40, 20);
  rocket.shapeColor = "white";
  //obs
  obs1 = createSprite(400, 25, 50, 50);
  obs1.velocityY = 5;
  obs1.shapeColor = "red";
  obs1.scale = 0.5;
  obs2 = createSprite(400, 200, 50, 50);
  obs2.velocityY = -5;
  obs2.shapeColor = "blue";
  obs2.scale = 0.5;
  obs3 = createSprite(600, 25, 50, 50);
  obs3.velocityY = 6;
  obs3.shapeColor = "blue";
  obs3.scale = 0.5;
  obs4 = createSprite(600, 200, 50, 50);
  obs4.velocityY = -6;
  obs4.shapeColor = "red";
  obs4.scale = 0.5;
  // walls
  wall3 = createSprite(970, 150, 10, 50);
  wall3.shapeColor = "brown";
  wall6 = createSprite(1030, 70, 10, 50);
  wall6.shapeColor = "brown";
  //door's
  door1 = createSprite(700, 100, 30, 200);
  door1.shapeColor = "green";
  door2 = createSprite(900, 100, 30, 200);
  door2.shapeColor = "green";
  //enemys
  enemy1 = createSprite(1150, 100, 20, 20);
  enemy1.addImage(enemyimage);
  enemy1.scale = 0.2;
  //wall's
  wall1 = createSprite(500, 200, 1200, 20);
  wall2 = createSprite(400, 10, 1800, 20);
}

function draw() {
  background(0, 0, 0);
  //diamond

  if (rocket.isTouching(diamond)) {
    fill("red");
    textSize(50);
    text("winner", 600, 425);
    diamond.visible = false;
    gameState = 2;
  }
  //bounceOff
  obs1.bounceOff(wall1);
  obs1.bounceOff(wall2);
  obs2.bounceOff(wall1);
  obs2.bounceOff(wall2);
  obs3.bounceOff(wall1);
  obs3.bounceOff(wall2);
  obs4.bounceOff(wall1);
  // bulletGroup.bounceOff(laserGroup);
  obs4.bounceOff(wall2);
  obs1.bounceOff(laserGroup);
  obs2.bounceOff(laserGroup);
  obs3.bounceOff(laserGroup);
  obs4.bounceOff(laserGroup);
  //collide
  rocket.collide(wall1);
  rocket.collide(wall2);
  rocket.collide(door1);
  rocket.collide(enemy1);
  rocket.collide(wall3);
  rocket.collide(wall6);
  bulletGroup.collide(wall3);
  bulletGroup.collide(wall6);
  bulletGroup.collide(wall6);
  if (laserGroup.isTouching(door1) || laserGroup.isTouching(door2)) {
    laserGroup.destroyEach();
  }
  if (gameState === 1) {
    // controls
    if (keyDown(LEFT_ARROW)) {
      rocket.x = rocket.x - 9;
    }
    if (keyDown(RIGHT_ARROW)) {
      rocket.x = rocket.x + 9;
    }
    if (keyDown(UP_ARROW)) {
      rocket.y = rocket.y - 5;
    }
    if (keyDown(DOWN_ARROW)) {
      rocket.y = rocket.y + 5;
    }
    if (keyWentDown("space") && gunpowder > 0) {
      laser = createSprite(rocket.x + 5, rocket.y, 30, 10);
      laser.velocityX = 15;
      laserGroup.add(laser);
      laser.shapeColor = "green";
      gunpowder = gunpowder - 1;
    }
    // bullet and laser
    if (
      laserGroup.isTouching(bulletGroup) ||
      bulletGroup.isTouching(laserGroup)
    ) {
      laserGroup.destroyEach();
      bulletGroup.destroyEach();
    }
    //boss killing
    if (laserGroup.isTouching(enemy1)) {
      enemylive = enemylive - 1;
      laserGroup.destroyEach();
    } else if (enemylive === 0) {
      enemy1.destroy();
    }
    //gamestates
    if (gameState === 1) {
      // touching rocket
      if (
        obs1.isTouching(rocket) ||
        obs2.isTouching(rocket) ||
        obs3.isTouching(rocket) ||
        obs4.isTouching(rocket) ||
        bulletGroup.isTouching(rocket)
      ) {
        rocket.x = 150;
        dead = dead + 1;
        bulletGroup.destroyEach();
      }
    }
  }
  //openings of doors
  if (rocket.x > 600) {
    door1.y = door1.y + 5;
  }
  if (rocket.x > 750) {
    door2.y = door2.y + 5;
  }

  //open enemeys attack
  if (rocket.x > 850) {
    enemy1.y = rocket.y;
    if (frameCount % 40 == 0 && enemylive !== 0) {
      bullet = createSprite(enemy1.x - 5, rocket.y, 40, 10);
      bullet.velocityX = -15;
      bullet.shapeColor = "red";
      bulletGroup.add(bullet);
    }
  }
  //close
  drawSprites();
  fill("blue");
  textSize(20);
  text("deaths: " + dead, 600, 640);
  text("Bullets: " + gunpowder, 70, 50);
}
