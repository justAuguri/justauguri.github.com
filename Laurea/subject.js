class Subject {
  constructor(name, semester, level, img, credit) {
    this.name = name;
    this.semester = semester;
    this.level = level;
    this.img = img;
    this.x = 51;
    this.y = this.level == 0 ? 150 : this.level == 1 ? 100 : 50;
    this.dir = 1;
    this.life = this.level == 0 ? 1 : this.level == 1 ? 2 : 3;
    this.speed = this.level == 0 ? 2 : this.level == 1 ? 4 : 6;
    this.credit = credit;
    this.size=50;
    this.voto;
  }

  randomGrade() {
    if(this.name=='Tirocinio' || this.name=='Inglese' || this.name=='Tesi'){
        return 30;
    }
    return int(
      this.level == 0
        ? random(24, 30)
        : this.level == 1
        ? random(22, 28)
        : random(18, 26)
    );
  }

  move() {
    if (this.x > 0 && this.x < width - 50) {
      this.x += this.speed * this.dir;
    } else {
      this.dir *= -1;
      this.x += this.speed * this.dir;
    }
    fill("white");
    text(this.name, this.name.length > 10 ? this.x - 20 : this.x, this.y);
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
