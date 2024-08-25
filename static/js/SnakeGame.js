let board=document.querySelector('.board');
let select=document.querySelectorAll('.opt');
let sel=document.querySelector('.sel');
let start=document.querySelector('.Start');
let scor=document.querySelector('.scor');
let inpdir={x:0,y:0};
const movesound=new Audio('move.mp3');
const eatsound=new Audio('food.mp3');
const backsound=new Audio('music.mp3');
const Gmoversound=new Audio('gameover.mp3');
let lastpainttime=0;
let speed=5;
let score=0;
scor.innerHTML=0;
let Inarr=[{x:5,y:5}];
let fdarr={x:10,y:10};

//functions
function main(ctime){
  window.requestAnimationFrame(main);
  // sel.addEventListener('click',()=>{
    // for( let key in select){
    //   if(key.innerHTML=='Low'){
    //     speed=1;
    //   }
    //   if(key.innerHTML=='Medium'){
    //     speed=3;
    //   }
    //   if(key.innerHTML=='High'){
    //     speed=6;
    //   }
    // }
    if(((ctime-lastpainttime)/1000) < 1/speed){ 
      return;
    }
    lastpainttime=ctime;
  // });
  GameEngine();
}

//conditions when snake is colloid with wall or itself
function iscollide(sarr){
  for (let i = 1; i < Inarr.length; i++) {
    if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
      return true;
    }
  }
  
  if (sarr[0].x <= 0 || sarr[0].x >= 18 || sarr[0].y <=0 || sarr[0].y >= 18 ) {
    return true;
  }
}

//Main Game work function
function GameEngine(){
  //ending the game
  if (iscollide(Inarr)) {
    Gmoversound.play();
    backsound.pause();
    inpdir={x:0,y:0};
    alert("Game Over!! Press enter to play again:");
    scor.innerHTML=0;
    Inarr=[{x:5,y:5}];
    fdarr={x:10,y:10};
    backsound.play();
    score=0;
  }

  //part1 Changing eating & generating random food in our area
  if (Inarr[0].x === fdarr.x && Inarr[0].y === fdarr.y) {
    score+=10;
    scor.innerHTML=score;
    eatsound.play();
    Inarr.unshift({x: (Inarr[0].x + inpdir.x) , y: (Inarr[0].y + inpdir.y) });
    let a=0;
    let b=18;
    fdarr={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
  }
  
  //part2 for change snake or movement
  for (let i=(Inarr.length-2); i>=0; i--) {
    Inarr[i+1]={...Inarr[i]};
  }
  Inarr[0].x += inpdir.x;
  Inarr[0].y += inpdir.y;

  //Changing in snake style like food head & his body by adding some new class or intialising our first head of snake and first food and first body element
  board.innerHTML='';
  Inarr.forEach((e,index)=> {
    let head=document.createElement('div');
    head.style.gridRowStart=e.y;
    head.style.gridColumnStart=e.x;
    if (index===0) {
      head.classList.add('head');
    }
    else{
      head.classList.add('snake');
    }
    board.append(head);
  });
    let food=document.createElement('div');
    food.classList.add('food');
    food.style.gridRowStart=fdarr.y;
    food.style.gridColumnStart=fdarr.x;
    board.append(food);
}

//Main work & Arrow movement Tracing
window.requestAnimationFrame(main);
start.addEventListener('click',()=>{
window.addEventListener('keydown',e=>{
  inpdir = {x: 0 , y: 1}; // to start the game 
  backsound.play();
  movesound.play();
  switch (e.key) {
    case "ArrowLeft":
      console.log("ArrowLeft");
      inpdir.x=-1;
      inpdir.y=0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inpdir.x=1;
      inpdir.y=0;
      break;
    case "ArrowUp":
      console.log("ArrowUp");
      inpdir.x=0;
      inpdir.y=-1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inpdir.x=0;
      inpdir.y=1;
      break;
    default:
      break;
  }
});
});