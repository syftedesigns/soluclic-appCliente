import { Injectable } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public displayCategories: boolean = true;
  public enableMenu: boolean = false; // Menu desactivado por defecto
  public displayToolbar: boolean = true;
  public isSearching: boolean = false;
  constructor(private menu: MenuController, public Toast: ToastController,
              private loader: LoadingController, public snackBar: MatSnackBar) { }

  public OpenMenu(triggerMenuid: string): void {
    // this.menu.enable(true, triggerMenuid);
    this.menu.open(triggerMenuid);
  }
  async ToastErrors(msgToDisplay: string) {
    const toast = await this.Toast.create(
      {
        message: msgToDisplay,
        duration: 5000,
        cssClass: 'toast-default',
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }],
      }
    );
    await toast.present();
  }
  async OpenLoader(msgToDisplay: string) {
    const loader = await this.loader.create({
      duration: 60000,
      message: msgToDisplay,
      backdropDismiss: true
    });
    await loader.present();
  }
  closeLoader() {
    this.loader.dismiss();
  }
}
