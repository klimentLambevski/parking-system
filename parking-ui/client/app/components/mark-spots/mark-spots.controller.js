import MarkedRectangle from '../canvas/marked-rectangle';
import Draw from '../../common/draw/draw';
import CanvasDataService from '../canvas/canvas.data.service';
import _ from 'lodash';

class MarkSpotsController {
    constructor(Draw, CanvasDataService) {
        this.name = 'markSpots';
        this.Draw = Draw;
        this.CanvasDataService = CanvasDataService;
        this.name = 'canvas';
        this.image = 'http://localhost:3333/image/parking';
        this.rectangles = [];
    }

    markParkingSpots() {
        let rectangles = this.Draw.getRectangles();
        let markedRectangles = _.map(rectangles, function (rectangle, index) {
            return new MarkedRectangle(index, index, rectangle.getPoints());
        });
        this.CanvasDataService.markParkingSpots({parkingSpots: markedRectangles});
    }

}

export default MarkSpotsController;