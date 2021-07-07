var man, corona, sanitizer,back,invisible;
var manImage, coronaImage, sanitizerImage,backImage; 
var PLAY = 1;
var END = 0;
var gameState = 1; 
var coronaGroup, sanitizerGroup; 
var score = 0;







function preload(){
  manImage = loadImage("superhero.png"); 
  coronaImage = loadImage("enemy.png");
  sanitizerImage = loadImage("logo.png"); 
  backImage = loadImage("background.jpg"); 
  sound = loadSound("jump.mp3"); 
  
  
}


function setup(){
  createCanvas(600,600); 
  
  back = createSprite(600,280,600,600);
  back.addImage("ground",backImage);
  back.scale = 2;
  
  man = createSprite(100,560,20,20);
  man.addImage("man",manImage);
  man.scale = 0.07; 
  
  invisible = createSprite(300,580,600,10);
  invisible.visible = false; 
  
  
  
  
  coronaGroup = createGroup(); 
  sanitizerGroup = createGroup(); 
}

function draw(){
  background("white")
  if(gameState===PLAY){
   
     if(keyDown("space")){
       man.velocityY = -6; 
       sound.play(); 
     }
    if(back.x<0){
      back.x = 400; 
       
    }
    man.velocityY = man.velocityY + 0.5;
    back.velocityX = -2
    if(sanitizerGroup.isTouching(man)){
       score = score+1; 
       sanitizerGroup.destroyEach(); 
    }
    if(coronaGroup.isTouching(man)){
       gameState = END; 
    }
    
    spawnCorona(); 
    spawnSanitizer();
    drawSprites();
    fill("white")
    textSize(20)
    text("SCORE:"+score,500,30); 
  } else if (gameState===END){
     background("black");
     fill("white"); 
     textSize(20);
     text("GAME OVER",250,300); 
     
    if(keyDown("space")&&gameState===END){
      gameState = PLAY; 
      sanitizerGroup.destroyEach(); 
      coronaGroup.destroyEach(); 
      man.x = 50;
      man.y = 560;
      score = 0; 
    }
    
  }
  
  man.collide(invisible);
  
}
function spawnCorona(){
 
  if(frameCount%200===0){
    corona = createSprite(600,300,20,20);
    corona.addImage("corona",coronaImage);
    corona.scale = 0.08;
    corona.y = Math.round(random(150,450)); 
    corona.velocityX = -(5+score/4); 
    coronaGroup.add(corona);
  }
}

function spawnSanitizer(){
  if(frameCount%140===0){
    sanitizer = createSprite(600,300,30,30);
    sanitizer.addImage("sanitizer",sanitizerImage);
    sanitizer.velocityX = -(5+score/4);
    sanitizer.scale = 0.04;
    sanitizer.y = Math.round(random(150,450));
    sanitizerGroup.add(sanitizer); 
    
    
  }
}












