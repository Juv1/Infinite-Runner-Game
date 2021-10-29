var man,man_running;
var groundImg, ground, invisGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound, dieSound;
var score;
var obstaclesGroup, obstacle, obstacleImg;
var gameOverImg, gameOver, restart;

function preload(){
  man_running = loadAnimation('running-man-1.png','running-man-2.png','running-man-3.png','running-man-4.png');
  groundImg = loadImage('background.png');
  jumpSound = loadSound('jump.mp3');
  obstacleImg = loadImage('stone.png');
  dieSound = loadSound('dieSound.mp3');
  gameOverImg = loadImage('gameOver.png');

}

function setup() {
  createCanvas(600,400);
  invisGround = createSprite(300,370,600,15);
  
  ground = createSprite(300,200,2400,30);
  ground.addImage(groundImg);
  ground.scale = 0.5
  
  man = createSprite(200,290,50,50);
  man.addAnimation('running', man_running);
  man.scale=0.3

  restart = createSprite(307,337,170,40);
  gameOver = createSprite(300,200,20,20);
  gameOver.addImage(gameOverImg);
  
  obstaclesGroup=createGroup();
  score = 0;
}

function draw() {
  background(180);
  man.velocityY = man.velocityY + 1.75;
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
   
    
    ground.velocityX = -4;

    score = score + 1;

    if(ground.x < 0){
      ground.x = 600;     
    }
    
    if(keyDown('space') && man.y >= 250){
      man.velocityY = -16;
      jumpSound.play();
    }

    if(obstaclesGroup.isTouching(man)){
      gameState=END;
      dieSound.play();
    }
    
    spawnObstacles();
  }
  else if(gameState===END){
     background(gameOverImg);
     gameOver.visible = true;
     restart.visible = true;

     ground.velocityX = 0;
     man.Velocity = 0;

     obstaclesGroup.destroyEach();
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);

     if(mousePressedOver(restart)||keyDown('enter')){
      gameState=PLAY; 
      score=0;
     }
   }
 
 
  man.collide(invisGround);

  drawSprites();
  fill(0,255,0);
  text('Score: '+score,520,25);
}

function spawnObstacles(){
  if(frameCount%70===0){
    obstacle = createSprite(500,330,20,20);
    obstacle.x = Math.round(random(475,600))
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.25;
    obstacle.velocityX = -15;
    obstacle.lifetime = 40
    obstaclesGroup.add(obstacle);
  }
}