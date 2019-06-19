import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as $ from 'jquery';
import { PickerOptions } from '@ionic/core';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  public dateHour: any;
  constructor(private modalSheet: ModalController,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  async CloseDatePicker() {
    /*Es importante que si el usuario desea programar el delivery,
    nos de una fecha y hora, por lo que añadiremos una confirmación de salida*/
    const closeConfirmation = await this.alertController.create({
      header: '¿Estás seguro que deseas salir?',
      message: 'Necesitas proporcionar esta información en caso que desees programar el envío del producto que estas comprando',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          handler: () => {
            return; // No salimos
          }
        },
        {
          text: 'Salir',
          role: 'close',
          handler: () => {
            this.modalSheet.dismiss(null);
          }
        }
      ],
    });
    await closeConfirmation.present();
  }
  // Mostrar la Hora
  DisplayHourPopup(datePickerId: string) {
    $(`#${datePickerId}`).trigger('click');
  }
}
