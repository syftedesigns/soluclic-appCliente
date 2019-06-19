import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private route: Router) {
  }
  NavigateToStore(STORE_ID: number) {
    this.route.navigate([`/tabs/store/${STORE_ID}`]);
  }
}
