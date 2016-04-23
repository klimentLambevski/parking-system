import Draw from '../../common/draw/draw'

let canvasDraw = function (Draw) {
    return {
        restrict: 'A',
        require: '^pkCanvas',
        scope: {
            image: '=',
            rectangles: '=?'
        },
        link: function (scope, element, attrs, ctrl) {
            //TODO scope.editable
            let canvas = angular.element(element)[0];
            let context = canvas.getContext('2d');
            let drawing = false,
                drawingEnabled = true;
            let image = new Image();

            image.src = scope.image;

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                Draw.setContext(context);
                Draw.setImage(image);
                Draw.setRectangles(scope.rectangles);
            };

            scope.$watch('rectangles', function (newRec) {
                if (newRec.length) {
                    Draw.draw();
                }
            }, true);

            //TODO click ?
            let onMouseDown = ($event) => {
                drawing = true;
                let x = $event.x - $event.target.offsetLeft;
                let y = $event.y - $event.target.offsetTop;

                //TODO move this in service ?
                if (!Draw.getFirstPoint()) {
                    Draw.setFirstPoint(x, y);
                } else {
                    Draw.addLine(x, y);
                    drawing = !Draw.isDrawEnd();
                    Draw.draw();
                }
            };

            let onMouseMove = ($event) => {
                if (!drawing) {
                    return false;
                }
                let x = $event.x - $event.target.offsetLeft;
                let y = $event.y - $event.target.offsetTop;
                Draw.draw();
                Draw.drawLineTo(x, y);
            };

            if (drawingEnabled) {
                element.on('mousedown', onMouseDown);
                element.on('mousemove', onMouseMove);
            }

            scope.$on('$destroy', function () {
                //TODO clean this up
            });

        }
    };
};

export default canvasDraw;