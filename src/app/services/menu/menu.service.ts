import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public displayCategories: boolean = true;
  public enableMenu: boolean = false; // Menu desactivado por defecto
  public displayToolbar: boolean = true;
  constructor(private menu: MenuController) { }

  public OpenMenu(triggerMenuid: string): void {
    // this.menu.enable(true, triggerMenuid);
    this.menu.open(triggerMenuid);
  }
}
