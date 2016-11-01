import MarkedRectangle from '../canvas/marked-rectangle';
import Draw from '../../common/draw/draw';
import MarkSpotsService from './mark-spots.service';
import _ from 'lodash';

class MarkSpotsController {
    constructor(Draw, MarkSpotsService) {
        this.name = 'markSpots';
        this.Draw = Draw;
        this.MarkSpotsService = MarkSpotsService;
        //TODO not like this brah
        this.image = 'http://localhost:3333/image/parking';
        this.rectangles = [];
    }

    markParkingSpots() {
        let rectangles = this.Draw.getRectangles();
        let markedRectangles = _.map(rectangles, (rectangle, index) => {
            return new MarkedRectangle(index, index, rectangle.getPoints());
        });
        this.MarkSpotsService.markParkingSpots({parkingSpots: markedRectangles}).then(function (data) {
            toastr.info('New spots saved!');
        });
    }

}

export default MarkSpotsController;