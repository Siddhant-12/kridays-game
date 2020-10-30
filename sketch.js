var ground,boy, background_sprite;
var gameState="serve";
var boy_image,background_image;
var lives=3, score=0 ;
var image_1,image_2,image_3;

function preload(){
  boy_image=loadImage("Donald Duck.png");
  background_image=loadImage("background.jpg");
  image_1=loadImage("strawberry.png");
  image_2=loadImage("mango.png");
  image_3=loadImage("pineapple.png");
  image_4=loadImage("orange.png");
  
  vegie_1=loadImage("eggplant.png");
  vegie_2=loadImage("pumpkin.png");
  vegie_3=loadImage("cauliflower.png");
  
}

function setup() {
  createCanvas(600, 600);
  background_sprite=createSprite(300,300,600,600);
  background_sprite.addImage(background_image);
  background_sprite.scale=1.6;
  boy=createSprite(100,460,20,120);
  boy.addImage(boy_image);
  boy.scale=0.4;
  ground=createSprite(300,570,600,10);
  ground.visible=false;
  fruitGroup=new Group();
  vegeGroup=new Group();
  boy.setCollider("rectangle",0,0,150,350);
  //boy.debug=true;
  textSize(25);
  fill("black");
  
}

function draw() {

  drawSprites();
     
  if(gameState=="serve"){
    background_sprite.velocityX=0;
    text("You want to bake a Fruit cake,",50,50);
    text("Collect as many Fruits as you can.",50,80);
    text("DO NOT COLLECT VEGETABLES",50,140);
    text("You only have 3 lives",50,110);
    text("Press Enter to start",50,170);
    
    if(keyDown("enter")){
        gameState="play";
    }
  }
  
  
  if(gameState=="play"){
     
    background_sprite.velocityX=-4;
    if(background_sprite.x===0){
         background_sprite.x=300; 
    }
   if(keyDown("space")&& boy.y>460){
       boy.velocityY=-22;
    }
   if(boy.y < 490) {
       boy.velocityY = boy.velocityY + 1;
    }
    boy.collide(ground);
   if(fruitGroup.isTouching(boy)){
      score=score+1;
      fruitGroup.destroyEach();
    }
   if(vegeGroup.isTouching(boy)){
      gameState="serve";
      lives=lives-1;
      restart();
    }
    vegetable();
    fruits();
    text("Fruits:"+score,450,50);
    text("Lives:"+lives,450,80);
  
    if(lives==0){
      gameState="end";
    }
  }

  
  if(gameState=="end"){
    
   text("Your Cake Has too Many Vegies",150,200);
   text("Better Luck Next Time",150,250); 
   text("PRESS R TO RESTART",150,300);
   
   if(keyDown("r")){
      restart();
      score=0;
      lives=3;
      gameState="serve";
    }
  }

}

function fruits(){
    
  rand=Math.round(random(300,480));
  randNum=Math.round(random(1,4));
  
  if(frameCount%170==0){
    Fruit=createSprite(610,410,20,20);
    Fruit.y=rand;
    Fruit.addImage(image_4);
    Fruit.scale=0.1;
    Fruit.velocityX=-4;
    Fruit.lifetime = 160;
    fruitGroup.add(Fruit);
   
   if(randNum==1){
        Fruit.addImage(image_1);
        Fruit.scale=0.3
        Fruit.setCollider("circle",0,0,100);
   }

   if(randNum==2){
        Fruit.addImage(image_2);
        Fruit.scale=0.15
      Fruit.setCollider("circle",0,0,180);
    }

   if(randNum==3){
        Fruit.addImage(image_3);
     Fruit.setCollider("circle",0,20,120);
      Fruit.scale=0.3;
    }

   if(randNum==4){
        Fruit.addImage(image_4);
        Fruit.scale=0.1;
      Fruit.setCollider("circle",0,0,200);
    }
   }
  
  
}

function vegetable(){
  
  position=Math.round(random(350,450));
  randImage=Math.round(random(1,3));
  if(frameCount%300==0){
    vege=createSprite(610,410,20,20);
    vege.y=position;
    vege.velocityX=-5;
    vege.lifetime = 160;
  
     vegeGroup.add(vege);
   
    vege.setCollider("circle",0,0,500);
    
    if(randImage==1){
        vege.addImage(vegie_1);
        vege.scale=0.02;
     }

    if(randImage==2){
        vege.addImage(vegie_2);
        vege.scale=0.02
     }

    if(randImage==3){
        vege.addImage(vegie_3);
        vege.scale=0.02;
    }
    
  }
}

function restart(){
  
  fruitGroup.destroyEach();
  vegeGroup.destroyEach();
  background_sprite.velocityX=0;
  boy.x=100;
  boy.y=460;
  boy.velocityY=0;

}




















