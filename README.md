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

Integrating with [medium-editor-insert-plugin](https://github.com/orthes/medium-editor-insert-plugin)
```html
<script src="path/to/medium-editor-insert-plugin.all.min.js"></script>
<div ng-model="description" medium-editor options='{"addons": { "images": {} } }'></div>
```

_(More coming soon)_

## Examples
_(Coming soon)_

