//Binario- 0 nao fazer nada| 1- fazer algo   width e height
var PLAY = 1;

var END = 0;

var gameState = PLAY;

var trex ,trex_running, trex_spatifado
//chão***
var xao

var xao_img

var nuvi_img

var nuvi

var caquito

var ob1, ob2, ob3, ob4, ob5, ob6;

var deserto

var tempestade

var pontos

var over_game

var over_gameimg

var pulim

var faliceu

var xekipointi

var restarte

var foiti_restarte


function preload()
{

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  trex_spatifado = loadAnimation("trex_collided.png");
  
  xao_img = loadImage('ground.png');

  nuvi_img = loadImage('cloud.png');

  //imagens do obstaculo
  ob1 = loadImage("obstacle1.png");

  ob2 = loadImage("obstacle2.png");

  ob3 = loadImage("obstacle3.png");

  ob4 = loadImage("obstacle4.png");

  ob5 = loadImage("obstacle5.png");

  ob6 = loadImage("obstacle6.png");

  over_gameimg = loadImage('gameOver.png') 

  xekipointi = loadSound('checkpoint.mp3');

  faliceu = loadSound("die.mp3");

  pulim = loadSound('jump.mp3');

  foiti_restarte = loadImage('restart.png')
  
}

function setup()
{
  createCanvas(windowWidth,windowHeight)

  pontos = 0
  
  xao = createSprite (width*0.5,height*0.7)
  xao.addImage (xao_img)
  //ligar o raio de colisão
  xao.debug = false;
  //modificar o raio
  //formato,offset X, offset Y, largura, altura, rotação 
  xao.setCollider("rectangle",0,15 )

  //crie um sprite de trex
  trex = createSprite(50,height*0.65);
  trex.addAnimation("running", trex_running);
  trex.addAnimation('trex_collided', trex_spatifado);
  trex.scale = 0.6
  trex.debug = false;
  trex.setCollider("circle",0,10,30);

  restarte = createSprite(width*0.5 , height*0.6);
  restarte.addImage(foiti_restarte);

  //grupos
  deserto = new Group();
  tempestade = new Group();

  //criar um sprite para o game Over
  over_game = createSprite (width*0.5, height*0.5)
  over_game.addImage(over_gameimg);
  

}

function draw()  
{
    background("white")

    fill("red")
    stroke("red")
    text(pontos, width*0.9, height*0.15);

  if(gameState === PLAY)
  {

    //a cada 100 pontos tocar o som de checkpoint
    if(pontos>0 && pontos %100 === 0)
    {
      xekipointi.play();
    }

    //mudar para noite
    if(pontos>700)
    {
      background("black");    
      
      fill("red")
      stroke("red")
      text(pontos, width*0.9, height*0.15);  
    
  }
    if (pontos>=900)
    {
      background("white");   
      
      fill("red")
      stroke("red")
      text(pontos, width*0.9, height*0.15);   
    }



    over_game.visible = false;
    restarte.visible = false;

    //rodar a pontuação
    pontos = pontos + Math.round(getFrameRate()/60)

    //controle para o trex andar para cima
    if(keyDown('space') && trex.y>485)
    {
      pulim.play();
      
      trex.velocityY =-20
    }


    //gravidade
     trex.velocityY = trex.velocityY + 1.8;


    //chao se mexendo
    xao.velocityX = -(10 + 3* pontos/100)

    //chao infinito
    if(xao.x < width*0.3)
    {
      xao.x = width / 2;
    }

    criarNuvi();

    criarObistaculo();
    

    if(deserto.isTouching(trex))
    {
      faliceu.play();
      gameState = END;
    }



 }

 if(gameState === END)
 {

  over_game.visible = true;
  restarte.visible = true;
  
  xao.velocityX = 0;

  tempestade.setVelocityXEach(0);

  deserto.setVelocityXEach(0);

  //deixar o tempo de vida infinito 
  tempestade.setLifetimeEach(-1); 
  deserto.setLifetimeEach(-1); 
                                                                                   
  trex.changeAnimation('trex_collided',trex_spatifado)
  
 }

 // console.log(trex.y);

  trex.collide(xao)

  drawSprites();

}

function criarNuvi()
{
  // % modulo= o resto da divisão
  if(frameCount %60 === 0)
  {    

  nuvi = createSprite(width* 0.98, height* 0.2);
  nuvi.velocityX = -5

  nuvi.addImage (nuvi_img)

  nuvi.y = Math.round(random(height*0.1,height*0.5))

  //consertando o vazamento de memoria
  nuvi.lifetime = width/5 //largura da tela/velocidade
  
  tempestade.add(nuvi);
  
  

  }

}

function criarObistaculo()
{
if(frameCount %60 === 0)
{

caquito = createSprite(width* 0.99, height* 0.68)
caquito.velocityX = -(10 + 3* pontos/100)
caquito.scale = 0.6
caquito.lifetime = width/5;
deserto.add(caquito);
caquito.debug = false;

 var rand = Math.round(random(1,6)); 
  switch (rand) {
    case 1: caquito.addImage(ob1);
    break;
     
    case 2: caquito.addImage(ob2);
    break;

    case 3: caquito.addImage(ob3);
    break;

    case 4: caquito.addImage(ob4);
    break;

    case 5: caquito.addImage(ob5);
    break;

    case 6: caquito.addImage(ob6);
            caquito.scale = 0.4;
    break;
    
    default:
      break;
  }

}

}

