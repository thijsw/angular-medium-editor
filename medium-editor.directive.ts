import { Context } from 'vm';
import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer
} from '@angular/core';
import { isPropertyUpdated } from '@angular/forms/src/directives/shared';
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
  selector: 'medium-editor',
  host: {
    '(blur)' : 'updateModel()',
    '(keyup)': 'updateModel()'
  }
})
export class MediumEditorDirective implements OnInit, OnChanges, OnDestroy {
  
  // private options: any = {};
  // private placeholder: string;
  private content : string;
  private lastViewModel: string;

  private factor: number;
  private element: HTMLElement;
  private editor: any;
  private active: boolean;


	@Input('editorModel') model: any;
  @Input('editorOptions') options: any;
  @Input('editorPlaceholder') placeholder: string;

  @Output('editorModelChange') update = new EventEmitter();

  constructor(private el: ElementRef) {
    
  }

  ngOnInit() {
    this.element = this.el.nativeElement;
    this.element.innerHTML = '<div id="angularMediumEditor">' + this.model + '</div>';
    this.active = true;

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }

    // Global MediumEditor
    this.editor = new MediumEditor('#angularMediumEditor', this.options);
  }

  refreshView() {
    if (this.editor) {
      this.editor.setContent(this.model);
    }
  }

  ngOnChanges(changes): void {
    if (isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  /**
   * Emit updated model
   */
  updateModel(): void {
    var value = this.editor.getContent();
    this.lastViewModel = value;
    this.update.emit(value);
  }

  /**
   * Remove MediumEditor on destruction of directive
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}