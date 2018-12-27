//TODO:maybe also store a radius and have radius proportional to how many particles are already in snowflake
//then change collision to dist<curr[2]+snowflake[i][2]
let snowflake=[];
let curr=[];//x,y for current particle(maybe add in radius)
let radius=4;
let branches=8;

function setup() {
  createCanvas(innerWidth,innerHeight);
  curr=[width/2,random(-5,5)];
}

function draw() {
  //move center to screen center
  translate(width/2,height/2)
  background(0);
  if(snowflake.length==0 || snowflake[snowflake.length-1][0]<width/2-10){
    let go=true;
    while(go){
      //update current particle's position
      curr[0]-=1;
      curr[1]+=random(-2,2);
      //check if collides with snowflake
      for(let i=0;i<snowflake.length;i++){//moved this into own loop so can draw snowflake faster
        //check if collides with current
        if(dist(snowflake[i][0],snowflake[i][1],curr[0],curr[1])<radius*2){
          snowflake.push(curr);
          curr=[width/2,random(-5,5)];
          go=false;
          break;
        }
      }
      //check if went past center
      if(curr[0]<0){
        snowflake.push(curr);
        curr=[width/2,random(-5,5)];
        break;
      }
    }

    /*//show current particle
    push();
    //scale(1,-1);
    for(let i=0;i<branches;i++){
    rotate(2*PI/branches);
    fill(0,255,0);
    stroke(0,255,0);
    ellipse(curr[0],curr[1],radius*2,radius*2);
  }
  pop();*/
}
//show snowflake
for(let i=0;i<snowflake.length;i++){
  //draw particle
  push();
  for(let j=0;j<branches;j++){
    rotate(2*PI/branches);
    //rgba mapped to particles order in snowflake and what banch it is part of
    //playing around with swithcing mappings from 255 to 0 instead of 0 to 255 change look
    let a=map(i,0,snowflake.length,255,20);
    let g=map(j,0,branches,0,255);
    let b=map(j+i,0,branches+snowflake.length,255,0);
    let r=map(i-j,snowflake.length-branches,snowflake.length,0,255);
    fill(r,g,b,a);
    stroke(r,g,b,a);
    ellipse(snowflake[i][0],snowflake[i][1],radius*2,radius*2);
  }
  pop();
}
}
