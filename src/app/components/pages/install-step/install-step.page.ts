import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-install-step',
  templateUrl: './install-step.page.html',
  styleUrls: ['./install-step.page.scss'],
})
export class InstallStepPage implements OnInit {
  public DisabledProgramDatePicker: boolean = false; // Falso por defecto, si el usuario quiere que sea automatico, se desactiva
  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  async DisplayDeliveryDatePicker(value, PickerType: string) {
    if (value.detail.checked) {
      const modalPicker = await this.modal.create({
        component: DatePickerComponent,
        cssClass: 'picker-modal',
        backdropDismiss: false,
        componentProps: {
          Picker: PickerType
        }
      });
      await modalPicker.present();
    } else {
      return;
    }
  }
}
