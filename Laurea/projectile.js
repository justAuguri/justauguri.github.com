class Projectile {
  constructor(x, y, speed, damage, size) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.size = size;
  }

  move() {
    this.y -= this.speed;
    circle(this.x, this.y, this.size);
  }
}
