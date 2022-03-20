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
  subjects = [],
  projectiles = [],
  grades = [],
  sentinel1 = true;
  sentinel2 = true;
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
  rick = loadSound("assets/rick.mp3");
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
  initMe();
  song.play();
  rick.stop();
}

function draw() {
  background(backgroundImage);
  if (vlad.crediti >= 180) {
    finish();
  }
  fill("white");
  text(
    "Media: " +
      (Math.round(vlad.media * 100) / 100).toString() +
      "\n" +
      "Crediti:" +
      vlad.crediti.toString(),
    400,
    450
  );
  vlad.move();
  subjects[actual].move();
  projectilesMove();
  hit();
  gradesShow();
  upgrade();
}

function lifeCheck() {
  if (subjects[actual].life <= 0) {
    vlad.calculate(subjects[actual]);
    actual++;
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
  song.stop();
  rick.play();
  fill('white');
  text("Voto: " + (Math.round((vlad.media * 110) / 30) + 5).toString(), 50, 50);
  setTimeout(
    (window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    5000
  );
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
