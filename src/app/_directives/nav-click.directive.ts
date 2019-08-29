import { HostListener, ElementRef, Directive, Attribute, Renderer2 } from '@angular/core'

@Directive({
    selector: "[navLink]"
})
export class navLinkDirective {
    constructor(private el: ElementRef,
        private renderer: Renderer2,
        @Attribute('navLink') public elId: string) {
    }

    @HostListener('click') click() {
        if (this.el.nativeElement.classList.contains('disabled')) {
            return;
        }
        const links = document.querySelectorAll('.tab-pane');
        // console.log('links', links);
        // const nav = document.querySelectorAll('.nav-link.m-tabs__link');
        for (let i = 0; i < links.length; i++) {
            this.renderer.removeClass(links[i], 'active');
            // this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');
        }
        const link = document.getElementById(this.elId);
        this.renderer.addClass(link, 'active');
    }
}
