var ground;
var lander;
var lander_png
var background_img;
var land, thrust, crash;
var obstacle_img;
var gg_img;
var normal;
var rcs_left;
var rcs_right;
var obs;

var vx = 0;
var vy = 0;
var g = 0.05
var fuel = 100;
var timer;
var gg_img;

function preload() {
    
lander_img = loadImage("normal.png");
background_img = loadImage("bg.png");
thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
crash = loadAnimation("crash1.png","crash2.png","crash3.png");
land = loadAnimation("landing1.png","landing2.png","landing_3.png")
normal = loadAnimation("normal.png");
obstacle_img = loadImage("obstacle.png");
gg_img = loadImage("lz.png");
rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");

thrust.playing = true;
thrust.looping = false;
crash.looping = false;
land.looping = false;
rcs_right.looping = false;
rcs_left.looping = false;



}






function setup() {

createCanvas(1000,700);
frameRate(80);
timer = 1500;

thrust.frameDelay = 5;
land.frameDelay = 5;
crash.frameDelay = 10;
rcs_left.frameDelay = 5;

lander = createSprite(220,100,30,30);
lander.addImage(lander_img);
lander.scale = 0.2;
lander.setCollider("circle",0,0,310);
//lander.debug = true;

lander.addAnimation("thrusting",thrust);
lander.addAnimation("crashing",crash);
lander.addAnimation("landing",land);
lander.addAnimation("normal",normal);
lander.addAnimation("left",rcs_left);
lander.addAnimation("right",rcs_right);

obs = createSprite(350,580,50,100);
obs.addImage(obstacle_img);
obs.scale = 0.4;
obs.setCollider("CIRCLE",-45,120,100);
//obs.debug = true;

ellipseMode(CENTER);

ground = createSprite(500,690,1000,20);
gg = createSprite(880,610,50,30);
gg.addImage(gg_img);
gg.scale = 0.3
gg.setCollider("rectangle",0,180,400,100);
rectMode(CENTER);
gg.debug = true;
}


function draw(){

background(51);
image(background_img,0,0);
push()
fill(450);
text("velocidade horizontal: "+ round(vx,2), 800, 50 );
text("combustivel: "+ fuel,800,25 );
text("velocidade vertical: "+ round(vy), 800, 75 );
pop();

//descida
vy +=g
lander.position.y +=vy;
lander.position.x +=vx;

if(lander.collide(obs)==true)
{

lander.changeAnimation('crashing');
stop();


}

if(lander.collide(ground)==true)
{

console.log("collided")
lander.changeAnimation('crashing');
vx = 0
vy = 0;
g = 0;



}



var d = dist(lander.position.x,lander.position.y,gg.position.x,gg.position.y);

if(d<=35 && (vy>- 2 ) && (vx<2 && vx >-32))
{
console.log("landed");
vx = 0;
vy = 0;
g=0;
lander.changeAnimation('landing');

}








drawSprites();








}

function keyPressed()
{

if(keyCode==UP_ARROW && fuel>0){

upward_thrust();
lander.changeAnimation('thrusting')
thrust.nextFrame();

}

if(keyCode==RIGHT_ARROW && fuel>0){

    right_thrust();
    lander.changeAnimation('left')
    
    
    }



    if(keyCode==LEFT_ARROW && fuel>0){

        left_thrust();
        lander.changeAnimation('right')
        
        
    }

}




function upward_thrust()
{

vy = -1;
fuel-=1;

}




function left_thrust(){

vx -= 0.2;
fuel -= 1;


}




function right_thrust(){

vx += 0.2;
fuel -= 1;


}

function stop(){

vx = 0;
vy = 0;
fuel = 0;
g = 0;

}
