import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[csLoading]'
})
export class LoadingDirective implements OnChanges{
  /**
   * Type of Loading.
   * default: Loading Position center.
   * button: Loading Position Left of button text.
   * @description You can easily add types and customize.
   */
  @Input() csLoading: boolean = false;
  @Input() loadingType!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    el.nativeElement.style.position = "relative";
    this.span = this.renderer.createElement('span');
    // this.renderer.addClass(this.span, "w-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin");
    this.renderer.addClass(this.span, "h-40");
    // this.renderer.setStyle(this.span, "position", "absolute");
    // this.renderer.setStyle(this.span, "top", "calc(50% - 0.75rem)");
    // this.renderer.setStyle(this.span, "left", "calc(50% - 0.75rem)");
    // this.renderer.setStyle(this.span, "width", "1.5rem");
    // this.renderer.setStyle(this.span, "height", "1.5rem");
    this.renderer.setAttribute(this.span, "role", "status");
    this.renderer.setAttribute(this.span, "aria-hidden", "true");

    this.renderer.appendChild(this.el.nativeElement, this.span);
  }

  private span: Node;

  ngOnChanges() {

    if (this.csLoading) {
      this.renderer.setStyle(this.span, "display", "block");
    } else {
      this.renderer.setStyle(this.span, "display", "none");
    }
    switch(this.loadingType) {
      case 'button':
        this.renderer.setStyle(this.span, "width", "1rem");
        this.renderer.setStyle(this.span, "height", "1rem");
        this.renderer.setStyle(this.span, "top", "calc(50% - 0.5rem)");
        this.renderer.setStyle(this.span, "left", "calc(50% - 4rem)");
        break;
      default:
        this.renderer.setStyle(this.span, "width", "1.5rem");
        this.renderer.setStyle(this.span, "height", "1.5rem");
        this.renderer.setStyle(this.span, "top", "calc(50% - 0.75rem)");
        this.renderer.setStyle(this.span, "left", "calc(50% - 0.75rem)");
        break;
    }
  }
}