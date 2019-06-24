import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuService } from '../../../../services/menu/menu.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ObjectCustomerClass } from '../../../../classes/customer/customer.class';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  constructor(public Modal: ModalController, private menu: MenuService,
              private authDB: AuthService, private router: Router) { }

  ngOnInit() {}

  LoginCustomer(formData: NgForm): void {
    const prefix = formData.value;
    if (formData.invalid) {
      throw new Error('Formulario inválido');
    }
    this.menu.OpenLoader('Iniciando sesión...');
    let loginCustomer = new ObjectCustomerClass(null, null, prefix.email, null,
      null, prefix.password, null, null, null, null, null, null, null, null,
      null, null, null, null, null, prefix.customer_group_id);
    this.authDB.RegisterNewCustomer('loginNewCustomerAPI', loginCustomer)
      .subscribe(async (data) => {
        if (data.status) {
          loginCustomer = data.data[0];
          loginCustomer.password = ':)';
          loginCustomer.salt = ':)';
          if (await this.authDB.SaveStorage(loginCustomer, loginCustomer.token)) {
            setTimeout(() => {
              this.menu.closeLoader();
              this.menu.ToastErrors('Registrado con éxito');
              this.Modal.dismiss();
              this.router.navigate(['/tabs/tab3']);
            }, 800);
          }
          console.log(loginCustomer);
        } else {
          setTimeout(() => {
            this.menu.closeLoader();
            this.menu.ToastErrors('Credenciales incorrectas');
            return;
          }, 1000);
        }
      });
  }
}
