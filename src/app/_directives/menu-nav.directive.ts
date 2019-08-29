import { HostListener, ElementRef, Directive, Attribute, Renderer2 } from '@angular/core'

@Directive({
    selector: "[menuNav]"
})
export class MenuNavDirective {
    constructor(private el: ElementRef,
        private renderer: Renderer2,
        @Attribute('menuNav') public elId: string) {
    }

    @HostListener('click') click() {                //console.log(this.toClass);
        let links = document.querySelectorAll('.m-menu__nav .m-menu__item');
        for (let i = 0; i < links.length; i++) {
            this.renderer.removeClass(links[i], 'm-menu__item--active');
        }
        this.renderer.addClass(this.el.nativeElement, 'm-menu__item--active');
        // this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');
        // const link = document.getElementById(this.elId);
        // this.renderer.addClass(link, 'active');
        // if(this.el.nativeElement.classList.contains(this.toClass))
        //     this.renderer.addClass(this.el.nativeElement, 'active');
        // else this.renderer.addClass(links[1], 'active');
    }
}
