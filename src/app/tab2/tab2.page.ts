import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../components/shared/chat/chat.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalController: ModalController) {}

  async OpenChat() {
    const chat = await this.modalController.create({
      component: ChatComponent
    });
    return await chat.present();
  }
}
