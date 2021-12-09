var points = [];
var convexHull = [];
var index = 0;
var slider;
var nP = 50;
var last;
var next;

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  slider = createSlider(3, 200, nP);
  slider.mouseClicked(reset);
  
  for (var i = 0; i < nP; i++) {
    points.push(new Dot());
  }
  convexHull.push(points[findLeftMostPoint()]);
  last = convexHull[convexHull.length-1];
  next = points[0];
  if (last == next) {
    next = points[1];
  }
}

function draw() {
  background(255);
  
  // Show all points
  for (var i = 0; i < nP; i++) {
    points[i].show();
  }
  
  // Show convex hull
  if (convexHull.length > 0) {
    push();
    stroke(150, 0, 0);
    for (var i = 0; i < convexHull.length - 1; i++) {
      line(convexHull[i].pt.x, convexHull[i].pt.y, convexHull[i+1].pt.x, convexHull[i+1].pt.y);
    }
    pop();
  }

  // Check if convex hull is complete
  if (convexHull[0] != convexHull[convexHull.length - 1] || convexHull.length == 1) {
    // Draw last and next points
    push();
    stroke(0);
    line(last.pt.x, last.pt.y, next.pt.x, next.pt.y);
    pop();

    // Draw next potential point for scanning
    push();
    stroke(0, 150, 0);
    line(last.pt.x, last.pt.y, points[index].pt.x, points[index].pt.y);
    pop();

    // Check if new point is counterclockwise to vector
    // It will be drawn as clockwise due to inverse of y-axis with the canvas
    counterclockwise = orientation(last, next, points[index]);
    if (counterclockwise) {
      next = points[index];
    }

    // Increment index until all points have been checked
    index++;
    if (index >= nP) {
      convexHull.push(next);
      last = next;
      next = convexHull[0];
      index = 0;
    }
  }

}

function findLeftMostPoint() {
  idx = 0;
  for (var i = 0; i < nP; i++) {
    if (points[i].pt.x < points[idx].pt.x) {
      val = points[i].pt.x;
      idx = i;
    }
  }
  return idx;
}

function orientation(p, q, r) {
  val = (q.pt.y - p.pt.y) * (r.pt.x - q.pt.x) - (q.pt.x - p.pt.x) * (r.pt.y - q.pt.y);
  return val < 0;
}

function keyPressed() {
  if (keyCode == 32) {
    reset();
  }
}

function reset() {
  points = [];
  convexHull = [];
  index = 0;
  nP = slider.value();
  
  for (var i = 0; i < nP; i++) {
    points.push(new Dot());
  }
  convexHull.push(points[findLeftMostPoint()]);
  last = convexHull[convexHull.length-1];
  next = points[0];
  if (last == next) {
    next = points[1];
  }
}
