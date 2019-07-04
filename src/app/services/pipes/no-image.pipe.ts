import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: string, photoToDisplay?: string): string {
    if (!value) {
      // Verifica si contiene un valor la imagen
      let urlToDisplay: string = './assets/images/picture.png';
      if (photoToDisplay) {
        urlToDisplay = photoToDisplay;
      }
      return urlToDisplay;
    } else {
      if (value === 'http://localhost/soluclic_opencart/upload/image/null') {
        return './assets/images/picture.png';
      }
      return value;
    }
  }

}
