import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: string, photoToDisplay?: string): string {
    return (value !== null && value !== undefined && value !== '' && !value.includes('null') ? value : './assets/images/no-image.jpg');
    /*if (value !== null && value !== undefined && value !== '') {
      // Verifica si contiene un valor la imagen
      let urlToDisplay: string = './assets/images/no-image.jpg';
      if (photoToDisplay) {
        urlToDisplay = photoToDisplay;
      }
      return urlToDisplay;
    } else {
      if (value === 'http://www.soluclic.cl/backend/store/upload/image/null') {
        return './assets/images/no-image.jpg';
      }
      return value;
    }*/
  }

}
