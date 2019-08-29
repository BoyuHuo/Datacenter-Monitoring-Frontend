import { HostListener, ElementRef, Directive, Attribute, Renderer2 } from '@angular/core'

@Directive({
    selector: "[copy]"
})
export class copyDirective {
    constructor(private el: ElementRef,
        @Attribute('copy') public value: string) {
    }

    @HostListener('click') click() {
        console.log(this.el.nativeElement.textContent)

        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.value;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
