# angular-medium-editor
This is an Angular 4 directive for the [Medium.com inline editor clone](https://github.com/yabwe/medium-editor) by Davi Ferreira.

## Installing the Directive

Install with [Npm](https://www.npmjs.com/):

```sh
$ npm install --save angular-medium-editor
```

If all goes well, the angular-medium-editor package should import medium-editor from your node_modules.

Finally, import the directive into your project:

```typescript
  import { MediumEditorDirective } from 'angular-medium-editor/medium-editor.directive.ts';
```

And add the directive to your Declarations:

```typescript
  @NgModule({
    ...
    bootstrap: [ AppComponent ],
    declarations: [
      MediumEditorDirective,
      ...
```

## Usage

Use as an element:

```html
  <medium-editor [(editorModel)]="textVar"
      [editorOptions]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}" 
      [editorPlaceholder]="placeholderVar"></medium-editor>
```

You can optionally pass a placeholder value:

```html
  <medium-editor [(editorModel)]="textVar"
      [editorOptions]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}" 
      [editorPlaceholder]="placeholderVar"></medium-editor>
```

For more information on which options you can pass with [editorOptions], check MediumEditor's [options documentation](https://github.com/yabwe/medium-editor#mediumeditor-options) for details.

This library only adds the necessary Javascript to get the editor working, you have to include the styles yourself or use the CDN:

```html
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css" type="text/css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/themes/default.min.css" type="text/css" media="screen" charset="utf-8">
```

## Thank you
This Angular 4 version was created by **@codiak** and **@ferdiemmen** based on initial work by @thijsw for the AngularJS 1.x version. A big thanks to them!

## License
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
