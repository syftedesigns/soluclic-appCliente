import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExplorerComponent } from '../../shared/explorer/explorer.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  async OpenExplorerStore() {
    const modal = await this.modal.create({
      component: ExplorerComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}
