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

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    el.nativeElement.style.position = "relative";
    this.span = this.renderer.createElement('span');
    this.renderer.addClass(this.span, "w-40");
    this.renderer.addClass(this.span, "h-40");
    this.renderer.addClass(this.span, "border-t-4");
    this.renderer.addClass(this.span, "border-b-4");
    this.renderer.addClass(this.span, "rounded-full");
    this.renderer.addClass(this.span, "animate-spin");
    this.renderer.setStyle(this.span, "color", "#ffff");
    this.renderer.setStyle(this.span, "top", "calc(50% - 100px)");
    this.renderer.setStyle(this.span, "position", "absolute");
    this.renderer.setStyle(this.span, "left", "50%");
    // this.renderer.setStyle(this.span, "transform", "translate(-50%, 50%)");
    this.renderer.appendChild(this.el.nativeElement, this.span);
  }

  private span: Node;

  ngOnChanges() {

    if (this.csLoading) {
      this.renderer.setStyle(this.span, "display", "block");
    } else {
      this.renderer.setStyle(this.span, "display", "none");
    }
  }
}