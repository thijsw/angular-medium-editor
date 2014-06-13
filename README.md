# angular-medium-editor
This is an AngularJS directive for the [medium.com inline editor clone](https://github.com/daviferreira/medium-editor) made by Davi Ferreira.


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/thijsw/angular-medium-editor/master/dist/angular-medium-editor.min.js
[max]: https://raw.github.com/thijsw/angular-medium-editor/master/dist/angular-medium-editor.js

In your web page:

```html
<script src="angular.js"></script>
<script src="dist/angular-medium-editor.min.js"></script>
```

## Demo
If you want to view the included demo, you have to run bower first in order to retrieve the dependencies.

```sh
$ bower install --save angular-medium-editor
```

## Documentation
Header example limited to one line and no toolbar
```html
<h1 ng-model="title" medium-editor options='{"placeholder": "Enter a title", "disableToolbar": true, "forcePlainText": true, "disableReturn": true}'></h1>
```

Paragraph with support for multiple lines and customized toolbar buttons
```html
<p ng-model="description" medium-editor options='{"placeholder": "Enter a description", "buttons": ["bold", "italic", "underline", "anchor", "header1", "header2", "quote", "orderedlist", "unorderedlist"]}'></p>
```

Example for extending the toolbar with customized element 'highlighter' (using [rangy](https://code.google.com/p/rangy/) and the [CSS Class Applier Module](https://code.google.com/p/rangy/wiki/CSSClassApplierModule) to support highlighting of text). For more detailed info on extensions, please refer to [MediumEditor](https://github.com/daviferreira/medium-editor).
```html
<p ng-model="text" medium-editor options='{"buttons": ["bold", "italic", "highlight"]}' bind-options="mediumBindOptions"></p>
```
```javascript
function Highlighter() {
  this.button = document.createElement('button');
  this.button.className = 'medium-editor-action';
  this.button.innerText = 'H';
  this.button.onclick = this.onClick.bind(this);
  this.classApplier = rangy.createCssClassApplier('highlight', {
    elementTagName: 'mark',
    normalize: true
  });
}
Highlighter.prototype.onClick = function() {
  this.classApplier.toggleSelection();
};
Highlighter.prototype.getButton = function() {
  return this.button;
};
Highlighter.prototype.checkState = function(node) {
  if (node.tagName == 'MARK') {
    this.button.classList.add('medium-editor-button-active');
  }
};

scope.mediumBindOptions = {
  extensions: {
    'highlight': new Highlighter()
  }
};
```

_(More coming soon)_

## Examples
_(Coming soon)_

