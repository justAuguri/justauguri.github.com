class Grade {
  constructor(x,y,grade) {
    this.x=x;
    this.y=y;
    this.time = 180;
    this.grade = grade;
  }
  showMe() {
    if (--this.time > 0) {
      textSize(14);
      text(this.grade.toString(), this.x, this.y);
    }
  }
}
