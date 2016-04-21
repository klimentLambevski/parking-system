import Point from './point';
import Line from  './line';
import Rectangle from './rectangle';

let DrawService = function () {
  let rectangles = [];
  let lines = [];
  let firstPoint;
  let context;
  let width, height;
  let image;

  /**
   * Draws all lines.
   * */
  let draw = () => {
    context.drawImage(image, 0, 0);
    drawLines();
    drawRectangles();
  };

  /**
   * Draw line from first point to given X and Y coordinates.
   *
   * @param x x-coordinate
   * @param y y-coordinate
   * */
  let drawLineTo = (x, y) => {
    firstPoint.drawLineTo(x, y, context);
  };

  /**
   * Sets first point.
   *
   * @param x x-coordinate
   * @param y y-coordinate
   * */
  let setFirstPoint = (x, y) => {
    firstPoint = new Point(x, y);
  };

  /**
   * Adds new line in list of existing lines.
   *
   * @param x x-coordinate
   * @param y y-coordinate
   * */
  let addLine = (x, y) => {
    let  endPoint = new Point(x, y);
    lines.push(new Line(firstPoint, endPoint));
    if (isDrawEnd()) {
      addRectangle();
      firstPoint = undefined;
    } else {
      firstPoint = endPoint;
    }
  };

  let isDrawEnd = () => {
    return lines.length === 4 || lines.length === 0;
  };

  /**
   * Sets canvas context.
   *
   * @param ctx context
   * */
  let setContext = (ctx) => {
    context = ctx;
  };

  /**
   * Sets canvas width.
   *
   * @param w width
   * */
  let setWidth = (w) => {
    width = w;
  };

  /**
   * Sets canvas height.
   *
   * @param h height
   * */
  let setHeight = (h) => {
    height = h;
  };

  let getFirstPoint = () => {
    return firstPoint;
  };

  let getRectangles = () => {
    return _.flatten(rectangles);
  };

  let setImage = (img) => {
    image = img;
  };

  let setRectangles = (list) => {
    rectangles = list;
    draw();
  };

  //private
  let drawLines = () => {
    lines.forEach(function (line) {
      line.draw(context);
    });
  };

  let drawRectangles = () => {
    rectangles.forEach(function (rectangle) {
      rectangle.draw(context);
    });
  };

  let addRectangle = () => {
    lines[3].setP1(lines[0].getP0());
    let newRectangle = new Rectangle(lines[0], lines[1], lines[2], lines[3]);
    rectangles.push(newRectangle);
    lines = [];
  };

  return {
    draw: draw,
    setContext: setContext,
    setFirstPoint: setFirstPoint,
    addLine: addLine,
    setWidth: setWidth,
    setHeight: setHeight,
    drawLineTo: drawLineTo,
    isDrawEnd: isDrawEnd,
    getFirstPoint: getFirstPoint,
    getRectangles: getRectangles,
    setImage: setImage,
    setRectangles: setRectangles
  };
};

export default DrawService;