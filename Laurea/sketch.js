let i,
  j,
  k,
  tmp,
  actual,
  song,
  rick,
  vlad,
  img,
  img1,
  img2,
  img3,
  backgroundImage,
  col,
  button,
  rickButton,
  subjects = [],
  projectiles = [],
  grades = [],
  started = false,
  sentinel1 = true,
  sentinel2 = true,
  sentinellaS = true,
  killS,
  hitS;
let subs = [
  "Geometria&Algebra",
  "Informatica 1",
  "Analisi 1",
  "Inglese",
  "Informatica 2",
  "Reti Logiche",
  "Analisi 2",
  "Fisica",
  "Matematica Applicata",
  "Sistemi Informativi",
  "Calcolatori",
  "Elettrotecnica",
  "Economia",
  "Sistemi Operativi",
  "Telecomunicazioni",
  "Elettronica",
  "Reti Calcolatori",
  "Tekweb",
  "Controlli",
  "Tirocinio",
  "Diritto",
  "Sicurezza",
  "Ingegneria Software",
  "Tesi",
];
let levels = [
  0, 1, 2, 0, 1, 2, 2, 0, 1, 1, 1, 0, 0, 1, 2, 0, 1, 1, 2, 0, 0, 1, 1, 0,
];
let semesters = [
  1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6,
];
let credits = [
  6, 12, 9, 6, 12, 6, 6, 9, 6, 9, 6, 6, 6, 9, 9, 6, 9, 9, 9, 6, 6, 6, 9, 3,
];

function preload() {
  img = loadImage("img/photo.png");
  img1 = loadImage("img/1.png");
  img2 = loadImage("img/2.png");
  img3 = loadImage("img/3.png");
  backgroundImage = loadImage("img/backgroundImage.jpg");
  song = loadSound("assets/song.mp3");
  rick = loadSound("assets/rick.m4a");
  hitS = loadSound("assets/hit.wav");
  killS = loadSound("assets/kill.wav");
}

function initMe() {
  for (i = 0; i < subs.length; i++) {
    subjects[i] = new Subject(
      subs[i],
      semesters[i],
      levels[i],
      levels[i] == 0 ? img1 : levels[i] == 1 ? img2 : img3,
      credits[i]
    );
  }
  vlad = new Vlad(img);
  actual = 0;
}

function setup() {
  createCanvas(500, 500);
  createCanvas(windowWidth>windowHeight ? windowHeight : windowWidth, windowWidth>windowHeight ? windowHeight : windowWidth);
  initMe();
  background(backgroundImage);
  col = color(25, 23, 200, 50);
  button = createButton('Iscrizione Università');
  button.position(width/2-100, height/3*2);
  button.mousePressed(startMe);
  button.size(200);
  rickButton = color(25, 23, 200, 50);
  rickButton = createButton('toRick');
  rickButton.position(width/2-25, height/2);
  rickButton.mousePressed(toRick);
  rickButton.size(50);
  rickButton.hide();
}

function draw() {
  if(started){
    background(backgroundImage);
    if (vlad.crediti >= 180) {
      finish();
    }else{
      scoreUpdate();
      vlad.move();
      subjects[actual].move();
      projectilesMove();
      hit();
      gradesShow();
      upgrade();
    }
  }
}

function startMe() {
  song.play();
  rick.stop();
  started = true;
  button.hide();
}

function scoreUpdate(){
  fill("white");
  textSize(20);
  text(
    "Media: " +
      (Math.round(vlad.media * 100) / 100).toString() +
      "\n" +
      "Crediti:" +
      vlad.crediti.toString(),
    width - 150,
    height - 50
  );
}

function lifeCheck() {
  if (subjects[actual].life <= 0) {
    vlad.calculate(subjects[actual]);
    actual++;
    killS.play();
  }
}

function hit() {
  for (j = 0; j < projectiles.length; j++) {
    if (
      dist(
        projectiles[j].x,
        projectiles[j].y,
        subjects[actual].x,
        subjects[actual].y
      ) <
      projectiles[j].size + subjects[j].size
    ) {
      subjects[actual].life -= 1;
      hitS.play();
      projectiles.splice(j, 1);
      lifeCheck();
    }
  }
}

function projectilesMove() {
  for (i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    if (
      projectiles[i].x <= 0 ||
      projectiles[i].x >= width ||
      projectiles[i].y <= 0 ||
      projectiles[i].x >= height
    ) {
      projectiles.splice(i, 1);
    }
  }
}

function shoot(x, y, speed, damage, size, myColor) {
  projectiles.push(new Projectile(x, y, speed, damage, size, myColor));
}

function finish() {
  if(sentinellaS){
    song.stop();
    rick.play();
    sentinellaS=false;
  }
  fill('white');
  textSize(40);
  text("Voto: " + (Math.round((vlad.media * 110) / 30) + 5).toString(), 50, 50);
  rickButton.show();  
} 

function toRick(){
  window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

function upgrade(){
  if(vlad.crediti>=60 && vlad.crediti<120 && sentinel1==true){
    vlad.projectileSpeed=12;
    vlad.projectileColor='blue';
    console.log('upgrade');
    sentinel1=false;
  }
  if(vlad.crediti>=120 && vlad.crediti<=180 && sentinel2==true){
    vlad.projectileSize=45;
    vlad.projectileColor='red';
    console.log('upgrade');
    sentinel2=false;
  }
}

function gradesShow() {
  for (i = 0; i < grades.length; i++) {
    grades[i].showMe();
  }
}
