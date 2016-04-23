import Point from './point';
import _ from 'lodash';

class Rectangle {
  constructor(p0, p1, p2, p3) {
    this.lines = [];
    this.lines.push(p0);
    this.lines.push(p1);
    this.lines.push(p2);
    this.lines.push(p3);
  }

  draw(context) {
    this.lines.forEach(function (line) {
      line.draw(context);
    });
  }

  getPoints() {
    return _.map(this.lines, function (line) {
      return line.getP0();
    });
  }

}

export default Rectangle;