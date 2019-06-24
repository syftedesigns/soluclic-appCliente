import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanatizer'
})
export class DomSanatizerPipe implements PipeTransform {
  constructor(private healtyDom: DomSanitizer) {}
  transform(HTML_ELEMENT: string) {
    return this.healtyDom.bypassSecurityTrustHtml(HTML_ELEMENT);
  }

}
