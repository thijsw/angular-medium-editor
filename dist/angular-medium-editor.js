'use strict';
angular.module('angular-medium-editor', []).directive('mediumEditor', function () {
  return {
    require: 'ngModel',
    restrict: 'AE',
    link: function (scope, iElement, iAttrs, ctrl) {
      angular.element(iElement).addClass('angular-medium-editor');
      var opts = {};
      if (iAttrs.options) {
        opts = angular.fromJson(iAttrs.options);
      }
      var placeholder = opts.placeholder || 'Type your text';
      iElement.on('blur', function () {
        scope.$apply(function () {
          if (iElement.html() == '<p><br></p>') {
            opts.placeholder = placeholder;
            var editor = new MediumEditor(iElement, opts);
          }
          ctrl.$setViewValue(iElement.html());
        });
      });
      ctrl.$render = function () {
        if (!editor) {
          if (!ctrl.$isEmpty(ctrl.$viewValue)) {
            opts.placeholder = '';
          }
          var editor = new MediumEditor(iElement, opts);
        }
        iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
    }
  };
});