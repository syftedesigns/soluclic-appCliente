import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { MenuService } from '../../../../services/menu/menu.service';
import { ObjectCustomerClass } from '../../../../classes/customer/customer.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  constructor(public Modal: ModalController, private authService: AuthService,
              private menu: MenuService, private router: Router) { }

  ngOnInit() {}

  RegisterCustomer(customerModel: NgForm) {
    const prefix = customerModel.value;
    if (customerModel.invalid) {
      throw new Error('Formulario inválido');
    }
    this.menu.OpenLoader('Espere mientras procesamos su operacion');
    const objectCustomer = new ObjectCustomerClass(prefix.firstname, prefix.firstname, prefix.email,
      prefix.telephone, prefix.telephone, prefix.password, null, prefix.cart, prefix.wishlist,
      prefix.newsletter, prefix.address_id, prefix.custom_field, null,
      prefix.status, null, null, null, null, null, prefix.customer_group_id, '0', '0');
    this.authService.RegisterNewCustomer('registerNewCustomerAPI', objectCustomer)
      .subscribe(async (data) => {
          if (data.status) {
            // Significa que el usuario fue registrado
            objectCustomer.customer_id = data.customer_id;
            objectCustomer.token = data.token;
            objectCustomer.code = data.token;
            if (await this.authService.SaveStorage(objectCustomer, data.token)) {
              // Guardamos los datos del nuevo registro, lo mandamos a la pagina principal
              setTimeout(() => {
                this.menu.closeLoader();
                this.menu.ToastErrors('Registrado con éxito');
                this.Modal.dismiss();
                this.router.navigate(['/tabs/tab3']);
              }, 800);
            }
          } else {
            setTimeout(() => {
              this.menu.closeLoader();
              this.menu.ToastErrors('Este usuario ya se encuentra registrado');
              return;
            }, 1000);
          }
      });
  }
}
