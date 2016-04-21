import Draw from '../../common/draw/draw';
import CanvasDataService from './canvas.data.service';
import MarkedRectangle from './marked-rectangle';
import _ from 'lodash';

class CanvasController {
  constructor(Draw, CanvasDataService) {
    this.Draw = Draw;
    this.CanvasDataService = CanvasDataService;
    this.name = 'canvas';
    this.image = 'http://localhost:3333/image/parking';
    this.rectangles = [];
  }

  getParkingSpots () {
    this.CanvasDataService.getParkingSpots()
      .then(function (data) {
        //TODO
      });
  }

  markParkingSpots () {
    let rectangles = this.Draw.getRectangles();
    let markedRectangles = _.map(rectangles, function (rectangle, index) {
      return new MarkedRectangle(index, index, rectangle.getPoints());
    });
    this.CanvasDataService.markParkingSpots({parkingSpots: markedRectangles});
  }

}

export default CanvasController;