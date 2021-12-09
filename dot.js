class Dot {
  constructor() {
    this.pt = createVector(
      random(50, width - 50),
      random(50, height - 50)
    );
  }

  show() {
    push();
    noStroke();
    fill(0);
    ellipseMode(CENTER);
    circle(this.pt.x, this.pt.y, 5);
    pop();
  }
}
