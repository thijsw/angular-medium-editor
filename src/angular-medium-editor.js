'use strict';

angular.module('angular-medium-editor', [])

  .directive('mediumEditor', function($timeout) {

    return {
      require: 'ngModel',
      restrict: 'AE',
      link: function (scope, iElement, iAttrs, ctrl) {

        angular.element(iElement).addClass("angular-medium-editor");

        // Parse options
        var opts = { };
        if (iAttrs.options) {
          opts = angular.fromJson(iAttrs.options);
        }

        var placeholder = opts.placeholder || 'Type your text';

        var createEditor = function(options) {
          var editor = new MediumEditor(iElement, options);
          if(options.addons && iElement.mediumInsert) {
            $timeout(function() {
              iElement.mediumInsert({
                editor: editor,
                addons: options.addons
              });
            });
          }
          return editor;
        };

        var onChange = function() {

          scope.$apply(function() {

            // If user cleared the whole text, we have to reset the editor because MediumEditor
            // lacks an API method to alter placeholder after initialization
            if (iElement.html() == '<p><br></p>') {
              opts.placeholder = placeholder;
              var editor = createEditor(opts);
            }

            ctrl.$setViewValue(iElement.html());
          });
        };

        // view -> model
        iElement.on('blur', onChange);
        iElement.on('input', onChange);

        // model -> view
        ctrl.$render = function() {

          if (!editor) {
            // Hide placeholder when the model is not empty
            if (!ctrl.$isEmpty(ctrl.$viewValue)) {
              opts.placeholder = '';
            }

            var editor = createEditor(opts);
          }

          iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
        };

      }
    };

  });
