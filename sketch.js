var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  survivalTime=0;
  

  
}


function draw() {
  background("white");
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime,100,50);
  
  if (gameState===PLAY){
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (ground.x <150){
      ground.x = ground.width/2;
    }
    survivalTime=Math.ceil(frameCount/frameRate());
    if(monkey.isTouching(FoodGroup)){
      banana.destroy();
    }
    monkey.collide(ground);
    food();
    obstacles();
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }

  }else if(gameState===END){
    monkey.velocityY=0;
    ground.velocityY=0;
    ground.x=400;
    ground.y=350;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
     stroke("black");
     textSize(40);
     fill("black");
     text("Game Over",200,190);
    
  }
  
  
drawSprites();
}
function food(){
  if(frameCount%150===0){
    banana = createSprite(600,140,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=150;

    
   FoodGroup.add(banana); 
    
  }
}
function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(300,310,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;
    obstacle.lifetime=150;
    
    obstacleGroup.add(obstacle);
  }
}







