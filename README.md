# angular-medium-editor
This is an AngularJS directive for the [Medium.com inline editor clone](https://github.com/yabwe/medium-editor) by Davi Ferreira.

## Install

Install with [Bower](https://bower.io/):
```sh
$ bower install --save angular-medium-editor
```

Then add `<script>` to your `index.html`:

```html
<script src="/bower_components/angular-medium-editor/dist/angular-medium-editor.js"></script>
```

Remember to include Angular and [Medium editor](https://github.com/yabwe/medium-editor) before the directive.

Then add `angular-medium-editor` as a dependency for your app:

```javascript
angular.module('myApp', ['angular-medium-editor']);
```

## Documentation

Use as an element:
```html
<medium-editor></medium-editor>
```

...or attribute:
```html
<p medium-editor></p>
```

Pass options with `bind-options` attribute:
```html
<p medium-editor bind-options="options"></p>
```

See MediumEditor's [options documentation](https://github.com/yabwe/medium-editor#mediumeditor-options) for details.

## Examples

#### Single line, no toolbar
Header example limited to one line and no toolbar
```html
<h1 ng-model="title" medium-editor bind-options="{disableReturn: true, disableExtraSpaces: true, toolbar: false}" data-placeholder="Enter a title"></h1>
```

#### Multiline with custom toolbar
Paragraph with support for multiple lines and customized toolbar buttons
```html
<p ng-model="description" medium-editor bind-options="{'toolbar': {'buttons': ['bold', 'italic', 'underline']}}" data-placeholder="Enter a description"></p>
```

#### Custom extension
Example for extending the toolbar with customized element `highlighter` (using [rangy](https://github.com/timdown/rangy) and the [CSS Class Applier Module](https://code.google.com/p/rangy/wiki/CSSClassApplierModule) to support highlighting of text). For more detailed info on extensions, please refer to [MediumEditor](https://github.com/yabwe/medium-editor).
```html
<p ng-model="text" medium-editor bind-options="mediumBindOptions"></p>
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
  toolbar: {
    buttons: ['bold', 'italic', 'highlight']
  },
  extensions: {
    highlight: new Highlighter()
  }
};
```

## Running the demo
If you want to view the included demo, you have to run `bower` first in order to retrieve the dependencies.

## License
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
