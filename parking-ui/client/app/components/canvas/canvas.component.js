import template from './canvas.html';
import controller from './canvas.controller';

let canvasComponent = {
  restrict: 'E',
  bindings: {
    rectangles: '=',
    image: '=',
    editable: '@?'
  },
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true
};

export default canvasComponent;