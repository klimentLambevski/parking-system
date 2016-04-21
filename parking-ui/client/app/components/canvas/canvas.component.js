import template from './canvas.html';
import controller from './canvas.controller';

let canvasComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default canvasComponent;