import Draw from '../../common/draw/draw';
import CanvasDataService from './canvas.data.service';
import MarkedRectangle from './marked-rectangle';
import Rectangle from '../../common/draw/rectangle';
import Line from '../../common/draw/line';
import Point from '../../common/draw/point';
import _ from 'lodash';

class CanvasController {
    constructor(Draw, CanvasDataService) {
        this.Draw = Draw;
        this.CanvasDataService = CanvasDataService;
        this.name = 'canvas';
        this.image = 'http://localhost:3333/image/parking';
        this.rectangles = [];
        this.getParkingSpots();
    }

    getParkingSpots() {
        //TODO move in parking component
        var that = this;
        this.CanvasDataService.getParkingSpots()
            .then(function (data) {
                _.forEach(data.data.parkingSpots, function (ps) {
                    var p1 = new Point(ps.spots[0].x, ps.spots[0].y);
                    var p2 = new Point(ps.spots[1].x, ps.spots[1].y);
                    var p3 = new Point(ps.spots[2].x, ps.spots[2].y);
                    var p4 = new Point(ps.spots[3].x, ps.spots[3].y);

                    var l1 = new Line(p1, p2);
                    var l2 = new Line(p2, p3);
                    var l3 = new Line(p3, p4);
                    var l4 = new Line(p4, p1);

                    that.rectangles.push(new Rectangle(l1, l2, l3, l4));
                });
            });
    }

    markParkingSpots() {
        let rectangles = this.Draw.getRectangles();
        let markedRectangles = _.map(rectangles, function (rectangle, index) {
            return new MarkedRectangle(index, index, rectangle.getPoints());
        });
        this.CanvasDataService.markParkingSpots({parkingSpots: markedRectangles});
    }

}

export default CanvasController;