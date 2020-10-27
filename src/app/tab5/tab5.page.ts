import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { MatBottomSheet } from '@angular/material';
import { ProfileComponent } from '../components/shared/profile/profile.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { MenuService } from '../services/menu/menu.service';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  imagePreview: string;
  imageBase64: string;
  constructor(public actionSheetController: ActionSheetController,
              private bottomSheet: MatBottomSheet, private camera: Camera,
              private image: ImagePicker, private global: MenuService) { }

  ngOnInit() {
  }
  // Nos preguntará desde que dispositivo nativo deseamos cargar la imagen
  async DisplayActionSheet() {
    const popupBottom = await this.actionSheetController.create({
      header: 'Cargar una foto desde el dispositivo',
      buttons: [{
        text: 'Galeria',
        icon: 'images',
        handler: () => {
          const options: ImagePickerOptions = {
            quality: 100,
            maximumImagesCount: 1,
            outputType: 1
          };
          this.image.getPictures(options).then(
            (data) => {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < data.length; i++) {
                this.imagePreview = `data:image/jpeg;base64,${data[i]}`;
                this.imageBase64 = data[i];
               // console.log('Image URI: ' + results[i]);
                }
            }, (err) => {
              this.global.snackBar.open('Debe elegir una imagen del carrusel', null, {duration: 5000});
              throw new Error(JSON.stringify(err));
            }
          );
        }
      },
      {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
            // Camara del dispositivo
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };
            // Obtener foto y transformarla en base 64
            this.camera.getPicture(options).then(
              (data) => {
                this.imagePreview = `data:image/jpeg;base64,${data}`;
                this.imageBase64 = data;
              }, (err) => {
                this.global.snackBar.open('No eligió ninguna opción con el dispositivo', null, {duration: 5000});
                throw new Error(JSON.stringify(err));
              }
            );
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          alert('cancelo');
        }
      }
    ],
    });
    await popupBottom.present();
  }
  // Profile Popup
  async ProfilePopup() {
    const profile = await this.bottomSheet.open(ProfileComponent, {
      data: 'hola mundo'
    });
    profile.afterDismissed().subscribe(
      (profileSchema) => {
        console.log('cerro el bottom sheet');
      }
    );
  }
}
