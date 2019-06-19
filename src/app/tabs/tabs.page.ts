import { Component } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public menu: MenuService) {}

}
