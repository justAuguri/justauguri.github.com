let i,j,tmp,actual;
let img,img1,img2,img3;
let subs = ['Geometria&Algebra', 'Informatica 1', 'Analisi 1', 'Inglese','Informatica 2' ,'Reti Logiche', 'Analisi 2', 'Fisica', 'Matematica Applicata', 'Sistemi Informativi', 'Calcolatori', 'Elettrotecnica', 'Economia', 'Sistemi Operativi', 'Telecomunicazioni', 'Elettronica', 'Reti Calcolatori', 'Tekweb', 'Controlli', 'Tirocinio', 'Diritto', 'Sicurezza', 'Ingegneria Software', 'Tesi'];
let levels = [0, 1, 2, 0, 1, 2, 2, 0, 1, 1, 2, 0, 0, 1, 2, 0, 1, 1, 2, 0, 0, 1, 1, 0];
let semesters = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6];
let subjects = [];
let projectiles = [];
let vlad;
function preload() {
  img = loadImage("img/photo.png");
  img1 = loadImage("img/1.png");
  img2 = loadImage("img/2.png");
  img3 = loadImage("img/3.png");
}

function initMe(){
  for(i=0;i<subs.length;i++){
    subjects[i] = new Subject(subs[i], semesters[i], levels[i], levels[i]==0 ? img1 : levels[i]==1 ? img2 : img3);
  }
  vlad = new Vlad(img);
  actual=0;
}

function setup() {
  createCanvas(500, 500);
  initMe();
}

function draw() {
  background(0);
  fill('white');
  text('Media: ' + vlad.score.toString() +'\n'+ 'Crediti:' + vlad.crediti.toString(), 400, 450);
  vlad.move();
  subjects[actual].move();
  projectilesCheck();
  hit();
}

function lifeCheck(){
  if(subjects[actual].life<=0 && actual<subjects.length){
    vlad.crediti+=subjects[actual].randomGrade();
    actual++;
  }
}

function hit(){
  for(j=0;j<projectiles.length;j++){
    if(sqrt((projectiles[j].x-subjects[actual].x+50)+(projectiles[j].y-subjects[actual].y+50))<75 && projectiles[j].sec != second()){
      vlad.score+=1;
      subjects[actual].life-=1;
      projectiles.splice(j, 1);
      lifeCheck();
    }
  }
}

function projectilesCheck(){
  for(i=0;i<projectiles.length;i++){
    projectiles[i].move();
  }
}

function shoot(x,y,speed,damage,size){
  projectiles.push(new Projectile(x,y,speed,damage,size));
}

class Subject{
  constructor(name,semester,level,imgx){
    this.name = name;
    this.semester = semester;
    this.level = level;
    this.img = imgx;
    this.x=51;
    this.y= this.level==0 ? 150 : this.level==1 ? 100 : 50;
    this.dir=1;
    this.life= this.level==0 ? 1 : this.level==1 ? 2 : 3;
    this.speed=this.level==0 ? 2 : this.level==1 ? 4 : 6;
  }
  randomGrade(){
    return int((this.level==0 ? random(24,30) : this.level==1 ? random(18,30) : random(18,24)));
  }
  move(){
    if(this.x>0 && this.x<width-50){
      this.x+= this.speed*this.dir;
    }
    else{
      this.dir*=-1;
      this.x+= this.speed*this.dir;
    }
    fill('white');
    text(this.name, this.name.length>10 ? this.x-20:  this.x, this.y);
    image(this.img, this.x, this.y, 50, 50);
  }
}
class Vlad{
  constructor(img){
    this.pointX=0;
    this.pointY=0;
    this.dx=0;
    this.dy=0;
    this.x=500;
    this.y=500;
    this.xscaling=0.75;
    this.yscaling=0.90;
    this.slow=0.05;
    this.score=0;
    this.crediti=0;
    this.img=img;
    this.projectileSpeed=5;
    this.projectileDamage=1;
    this.projectileSize=25;
    this.sec=second();
  }
  move(){
    this.pointX = mouseX;
    this.pointY = (mouseY>height/2 ? mouseY : this.pointY);
    this.dx = this.pointX - this.x;
    this.dy = this.pointY - this.y;
    this.x += this.dx * this.slow;
    this.y += this.dy * this.slow;
    tmp=second();
    if(tmp!=this.sec){
      this.sec=tmp;   
      shoot(this.x, this.y-100*this.yscaling/2,this.projectileSpeed,this.projectileDamage,this.projectileSize);
    }
    image(this.img, this.x-100*this.xscaling/2, this.y-100*this.yscaling/2, 100*this.xscaling, 100*this.yscaling);
  }
}

class Projectile{
  constructor(x,y,speed,damage,size){
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.damage=damage;
    this.size=size;
    this.sec=second();
  }
  move(){
    this.y-=this.speed;
    circle(this.x,this.y,this.size);
  }
}