import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  CloseModal() {
    this.modalController.dismiss();
  }
}
