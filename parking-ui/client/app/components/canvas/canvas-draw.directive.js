import Draw from '../../common/draw/draw'

let canvasDraw = function (Draw) {
    return {
        restrict: 'A',
        scope: {
            image: '=',
            rectangles: '=?',
            drawingEnabled: '@?'
        },
        link: function (scope, element) {
            let canvas = angular.element(element)[0];
            let context = canvas.getContext('2d');
            let drawing = false;
            let image = new Image();
            let offsetTop = canvas.offsetTop;
            let offsetLeft = canvas.offsetLeft;
            console.log(element, offsetTop);
            image.src = scope.image;

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                console.log(canvas.width, canvas.height);
                context.drawImage(image, 0, 0);
                Draw.setContext(context);
                Draw.setImage(image);
                Draw.setRectangles(scope.rectangles);
            };

            //TODO click ?
            let onMouseDown = ($event) => {
                console.log($event);
                drawing = true;
                let x = $event.layerX;
                let y = $event.layerY;

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
                let x = $event.layerX;
                let y = $event.layerY;
                Draw.draw();
                Draw.drawLineTo(x, y);
            };

            if (scope.drawingEnabled) {
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