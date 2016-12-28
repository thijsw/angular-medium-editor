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
  
  private options: any = {};
  private placeholder: string;
  private content : string;
  private lastViewModel: any;

  private factor: number;
  private element: HTMLElement;
  private editor: any;
  private active: boolean;

  @Input() set editorOptions(options: any) { this.options = options; }
  @Input() set editorPlaceholder(placeholder: string) { this.placeholder = placeholder; }

	@Input('editorModel') model: any;
  @Output('editorModelChange') update = new EventEmitter();

  constructor(private el: ElementRef) {
    
  }

  ngOnInit() {
    this.element = this.el.nativeElement;
    this.active = true;

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }

    // Global MediumEditor
    this.editor = new MediumEditor(this.element, this.options);
  }

  refreshView() {
    this.el.nativeElement.innerHTML = this.model;
  }

  ngOnChanges(changes): void {
    if (isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model;
      this.refreshView()
    }
  }

  updateModel(): void {
    var value = this.el.nativeElement.innerHTML;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}