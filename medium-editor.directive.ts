import {
    Directive,
    HostListener,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer,
    ɵlooseIdentical
} from '@angular/core';
import * as MediumEditor from 'medium-editor';

/**
 * Medium Editor wrapper directive.
 *
 * Examples
 * <medium-editor
      [(editorModel)]="textVar"
 *    [editorOptions]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}"
 *    [editorPlaceholder]="placeholderVar"></medium-editor>
 */
@Directive({
  selector: 'medium-editor'
})
export class MediumEditorDirective implements OnInit, OnChanges, OnDestroy {

  private lastViewModel: string;
  private element: HTMLElement;
  private editor: any;
  private active: boolean;

	@Input('editorModel') model: any;
  @Input('editorOptions') options: any;
  @Input('editorPlaceholder') placeholder: string;

  @Output('editorModelChange') update = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.element = this.el.nativeElement;
    this.element.innerHTML = '<div class="me-editable">' + this.model + '</div>';
    this.active = true;

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }

    // Global MediumEditor
    this.editor = new MediumEditor('.me-editable', this.options);
    this.editor.subscribe('editableInput', (event, editable) => {
      this.updateModel();
    });
  }

  refreshView() {
    if (this.editor) {
      this.editor.setContent(this.model);
    }
  }

  ngOnChanges(changes): void {
    if (this.isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  /**
   * Emit updated model
   */
  updateModel(): void {
    let value = this.editor.getContent();
    value = value.trim().replace('&nbsp;', '');
    this.lastViewModel = value;
    this.update.emit(value);
  }

  /**
   * Remove MediumEditor on destruction of directive
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  isPropertyUpdated(changes, viewModel) {
    if (!changes.hasOwnProperty('model')) { return false; }

    const change = changes.model;

    if (change.isFirstChange()) {
      return true;
    }
    return !ɵlooseIdentical(viewModel, change.currentValue);
  }
}
