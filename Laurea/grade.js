class Grade {
  constructor(x,y,grade) {
    this.x=x;
    this.y=y;
    this.time = 150;
    this.grade = grade;
  }
  showMe() {
    if (--this.time > 0) {
      fill('yellow');
      textSize(20);
      text(this.grade.toString(), this.x, this.y);
    }
  }
}
