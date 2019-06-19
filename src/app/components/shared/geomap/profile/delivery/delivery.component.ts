import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../../../chat/chat.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {}
  async sendMsg() {
    this.modal.dismiss({
      operationType: 'startChat'
    });
  }
}
