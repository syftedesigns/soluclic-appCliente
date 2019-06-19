import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from '../../../shared/auth/sign-up/sign-up.component';
import { SignInComponent } from '../../../shared/auth/sign-in/sign-in.component';
import { TutorialComponent } from '../../../shared/auth/tutorial/tutorial.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  async SignUpPage() {
    const Modalpage = await this.modal.create(
      {
        component: SignUpComponent,
        backdropDismiss: true
      }
    );
    await Modalpage.present();
  }
  async SignInPage() {
    const Modalpage = await this.modal.create(
      {
        component: SignInComponent,
        backdropDismiss: true
      }
    );
    await Modalpage.present();
  }
  async TutorialPage() {
    const Modalpage = await this.modal.create(
      {
        component: TutorialComponent,
        backdropDismiss: true
      }
    );
    await Modalpage.present();
  }
  ForgotPage() {}
}
