import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public sliderOpts: any = {
    autoplay: true,
    speed: 500
  };
  public sliderOpts2: any = {
    autoplay: true,
    speed: 800
  };
  constructor() {}

}
