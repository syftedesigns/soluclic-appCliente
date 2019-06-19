import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Map } from 'mapbox-gl';
import { SourceMap } from '@angular/compiler';
import { EmergencyComponent } from '../components/shared/geomap/menu/emergency/emergency.component';
import { DeliveryComponent } from '../components/shared/geomap/profile/delivery/delivery.component';
import { ChatComponent } from '../components/shared/chat/chat.component';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  Map: Map;
  Source: any;
  Layout: any;
  Paint: any;
  constructor(public modal: ModalController) {
  }
  ngOnInit() {
    this.Source = {
      type: 'geojson',
      data: {
          type: 'Feature',
          properties: {},
          geometry: {
              type: 'LineString',
              coordinates: [
                  [
                      -66.910554,
                      10.503358
                  ],
                  [
                      -66.911392,
                      10.507107
                  ],
                  [
                      -66.909199,
                      10.506449
                  ],
                  [
                      -66.910248,
                      10.484866
                  ],
                  [
                      -66.918901,
                      10.481362
                  ],
                  [
                      -66.912016,
                      10.461222
                  ],
                  [
                      -66.923016,
                      10.448133
                  ],
                  [
                      -66.924074,
                      10.430283
                  ],
                  [
                      -66.929391,
                      10.424063
                  ],
                  [
                      -66.915465,
                      10.421899
                  ],
                  [
                      -66.907368,
                      10.411555
                  ],
                  [
                      -66.908637,
                      10.406245
                  ],
                  [
                      -66.890384,
                      10.396383
                  ],
                  [
                      -66.887205,
                      10.382036
                  ],
                  [
                      -66.880612,
                      10.380208
                  ],
                  [
                      -66.881742,
                      10.373402
                  ],
                  [
                      -66.890081,
                      10.368341
                  ],
                  [
                      -66.88957,
                      10.363197
                  ],
                  [
                      -66.884537,
                      10.357324
                  ],
                  [
                      -66.877576,
                      10.354283
                  ],
                  [
                      -66.877909,
                      10.348409
                  ],
                  [
                      -66.874191,
                      10.342471
                  ],
                  [
                      -66.866936,
                      10.341733
                  ],
                  [
                      -66.864453,
                      10.337992
                  ],
                  [
                      -66.86739,
                      10.331067
                  ],
                  [
                      -66.874912,
                      10.334834
                  ],
                  [
                      -66.88147,
                      10.332254
                  ],
                  [
                      -66.872316,
                      10.322393
                  ],
                  [
                      -66.879927,
                      10.318893
                  ],
                  [
                      -66.881204,
                      10.307417
                  ],
                  [
                      -66.889581,
                      10.303701
                  ],
                  [
                      -66.899108,
                      10.305229
                  ],
                  [
                      -66.906871,
                      10.302103
                  ],
                  [
                      -66.909343,
                      10.296455
                  ],
                  [
                      -66.907571,
                      10.291752
                  ],
                  [
                      -66.912827,
                      10.282156
                  ],
                  [
                      -66.928711,
                      10.28004
                  ],
                  [
                      -66.93813,
                      10.27136
                  ],
                  [
                      -66.943079,
                      10.271167
                  ],
                  [
                      -66.955251,
                      10.264099
                  ],
                  [
                      -66.998526,
                      10.253669
                  ],
                  [
                      -67.04372,
                      10.255631
                  ],
                  [
                      -67.054741,
                      10.241261
                  ],
                  [
                      -67.064936,
                      10.238604
                  ],
                  [
                      -67.072968,
                      10.242827
                  ],
                  [
                      -67.08913,
                      10.238302
                  ],
                  [
                      -67.109461,
                      10.241351
                  ],
                  [
                      -67.129328,
                      10.238834
                  ],
                  [
                      -67.13549,
                      10.249118
                  ],
                  [
                      -67.148726,
                      10.252647
                  ],
                  [
                      -67.16707,
                      10.25067
                  ],
                  [
                      -67.1734,
                      10.247482
                  ],
                  [
                      -67.182059,
                      10.250124
                  ],
                  [
                      -67.210326,
                      10.242619
                  ],
                  [
                      -67.22068,
                      10.242849
                  ],
                  [
                      -67.293585,
                      10.221192
                  ],
                  [
                      -67.314845,
                      10.223329
                  ],
                  [
                      -67.31945,
                      10.226265
                  ],
                  [
                      -67.33294,
                      10.221331
                  ],
                  [
                      -67.331932,
                      10.211791
                  ],
                  [
                      -67.31867,
                      10.207903
                  ],
                  [
                      -67.320372,
                      10.205834
                  ],
                  [
                      -67.31803,
                      10.20597
                  ],
                  [
                      -67.316682,
                      10.201259
                  ],
                  [
                      -67.309639,
                      10.196956
                  ],
                  [
                      -67.306062,
                      10.182837
                  ],
                  [
                      -67.301201,
                      10.183027
                  ],
                  [
                      -67.298982,
                      10.178588
                  ],
                  [
                      -67.295333,
                      10.181788
                  ],
                  [
                      -67.290497,
                      10.18082
                  ],
                  [
                      -67.2931,
                      10.179909
                  ],
                  [
                      -67.292882,
                      10.173564
                  ],
                  [
                      -67.294788,
                      10.17306
                  ],
                  [
                      -67.289709,
                      10.170623
                  ],
                  [
                      -67.290976,
                      10.169125
                  ],
                  [
                      -67.287538,
                      10.170514
                  ],
                  [
                      -67.281053,
                      10.157579
                  ],
                  [
                      -67.271292,
                      10.154987
                  ],
                  [
                      -67.259776,
                      10.137137
                  ],
                  [
                      -67.269099,
                      10.134402
                  ],
                  [
                      -67.272822,
                      10.135796
                  ],
                  [
                      -67.273268,
                      10.133625
                  ],
                  [
                      -67.275236,
                      10.135188
                  ],
                  [
                      -67.275456,
                      10.132326
                  ],
                  [
                      -67.280424,
                      10.134808
                  ],
                  [
                      -67.287204,
                      10.132279
                  ],
                  [
                      -67.285949,
                      10.129152
                  ],
                  [
                      -67.29869,
                      10.121706
                  ]
              ]
          }
      }
    };
    this.Layout = {
      'line-join': 'round',
      'line-cap': 'round'
    };
    this.Paint = {
      'line-color': '#2DC5B0',
      'line-width': 2
    };
  }
async OpenEmergencyModal() {
  const modal = await this.modal.create({
    component: EmergencyComponent,
    backdropDismiss: false,
    cssClass: 'emergency-modal'
  });
  await modal.present();
}
async OpenDeliveryProfile() {
    let modal = await this.modal.create({
      component: DeliveryComponent,
      backdropDismiss: false,
    });
    await modal.present();
    modal.onDidDismiss().then(
      async (data: any) => {
        if (data.data) {
          switch (data.data.operationType) {
              case 'startChat':
                  console.log('hola');
                  modal = await this.modal.create({
                    component: ChatComponent
                  });
                  await modal.present();
                  break;
          }
        }
      },
      () => {
        return false;
      }
    );
  }
}
