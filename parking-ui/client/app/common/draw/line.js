import Point from './point';

class Line {

  constructor(p0, p1) {
    this.p0 = p0;
    this.p1 = p1;
  }

  getP0 () {
    return this.p0;
  };

  getP1 () {
    return this.p1;
  };

  setP1 (p) {
    this.p1.setCoordinates(p.getX(), p.getY());
  }

  draw (context) {
    context.beginPath();
    context.moveTo(this.getP0().getX(), this.getP0().getY());
    context.lineTo(this.getP1().getX(), this.getP1().getY());
    context.stroke();
  }

}

export default Line;