
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX () {
    return this.x;
  };

  getY () {
    return this.y;
  };

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  drawLineTo(x, y, context) {
    context.beginPath();
    context.moveTo(this.getX(), this.getY());
    context.lineTo(x, y);
    context.stroke();
  }

  equals (point) {
    return this.x === point.getX() && this.y === point.getY();
  }

  toString () {
    return this.x.toString() + this.y.toString();
  }

}

export default Point;