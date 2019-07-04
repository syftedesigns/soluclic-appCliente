import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { AngularMaterialModule } from '../../angular-material.module';
import { ChatComponent } from './chat/chat.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { StoresComponent } from './stores/stores.component';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { TutorialComponent } from './auth/tutorial/tutorial.component';
import { CalendarServicesComponent } from './geomap/menu/calendar-services/calendar-services.component';
import { HistoryComponent } from './geomap/menu/history/history.component';
import { PopoverComponent } from './geomap/menu/popover/popover.component';
import { EmergencyComponent } from './geomap/menu/emergency/emergency.component';
import { TicketComponent } from './geomap/menu/emergency/ticket/ticket.component';
import { DeliveryComponent } from './geomap/profile/delivery/delivery.component';
import { AccountComponent } from './config/account/account.component';
import { HelpComponent } from './config/help/help.component';
import { NotifyComponent } from './config/notify/notify.component';
import { OffersComponent } from './explorer/offers/offers.component';
import { NoImagePipe } from '../../services/pipes/no-image.pipe';

@NgModule({
  declarations: [
    ProfileComponent,
    ChatComponent,
    ExplorerComponent,
    DatePickerComponent,
    StoresComponent,
    CategoriesComponent,
    OrdersComponent,
    ForgotComponent,
    SignInComponent,
    SignUpComponent,
    TutorialComponent,
    CalendarServicesComponent,
    HistoryComponent,
    PopoverComponent,
    EmergencyComponent,
    TicketComponent,
    DeliveryComponent,
    AccountComponent,
    HelpComponent,
    NotifyComponent,
    OffersComponent,
    NoImagePipe
  ],
  exports: [
    ProfileComponent,
    ChatComponent,
    ExplorerComponent,
    DatePickerComponent,
    StoresComponent,
    CategoriesComponent,
    OrdersComponent,
    ForgotComponent,
    SignInComponent,
    SignUpComponent,
    TutorialComponent,
    CalendarServicesComponent,
    HistoryComponent,
    PopoverComponent,
    EmergencyComponent,
    TicketComponent,
    DeliveryComponent,
    AccountComponent,
    HelpComponent,
    NotifyComponent,
    OffersComponent,
    NoImagePipe
  ],
  entryComponents: [
    ProfileComponent,
    ChatComponent,
    ExplorerComponent,
    DatePickerComponent,
    StoresComponent,
    CategoriesComponent,
    OrdersComponent,
    ForgotComponent,
    SignInComponent,
    SignUpComponent,
    TutorialComponent,
    CalendarServicesComponent,
    HistoryComponent,
    PopoverComponent,
    EmergencyComponent,
    TicketComponent,
    DeliveryComponent,
    AccountComponent,
    HelpComponent,
    NotifyComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularMaterialModule,
    RouterModule,
  ]
})
export class SharedModule { }
