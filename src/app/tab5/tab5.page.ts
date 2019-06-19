import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { MatBottomSheet } from '@angular/material';
import { ProfileComponent } from '../components/shared/profile/profile.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(public actionSheetController: ActionSheetController,
              private bottomSheet: MatBottomSheet) { }

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
          alert('native galeria');
        }
      },
      {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          alert('Camara');
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
