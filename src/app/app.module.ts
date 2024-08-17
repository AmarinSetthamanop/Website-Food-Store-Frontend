import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* import รูปแบบ Angular Material */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

/* Http */
import { HttpClientModule } from '@angular/common/http';

/* หน้าต่างๆ */
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { GoodsComponent } from './page/goods/goods.component';
import { IorderComponent } from './page/iorder/iorder.component';
import { IorderOidComponent } from './page/iorder-oid/iorder-oid.component';
import { AddToBasketComponent } from './page/add-to-basket/add-to-basket.component';
import { LoginComponent } from './page/login/login.component';
import { BasketComponent } from './page/basket/basket.component';
import { IorderCustomerComponent } from './page/iorder-customer/iorder-customer.component';
import { DeliveryComponent } from './page/delivery/delivery.component';
import { SingUpComponent } from './page/sing-up/sing-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GoodsComponent,
    IorderComponent,
    IorderOidComponent,
    AddToBasketComponent,
    LoginComponent,
    BasketComponent,
    IorderCustomerComponent,
    DeliveryComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

















// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HeaderComponent } from './component/header/header.component';
// import { FooterComponent } from './component/footer/footer.component';
// import { CentralComponent } from './component/central/central.component';
// import { MainComponent } from './page/main/main.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select';
// import { HttpClientModule } from '@angular/common/http';
// import {MatDialogModule} from '@angular/material/dialog';
// import { NewComponent } from './page/new/new.component';
// import {MatChipsModule} from '@angular/material/chips';
// import { LogInComponent } from './page/log-in/log-in.component';
// import { BasketComponent } from './page/basket/basket.component';
// import {MatTableModule} from '@angular/material/table';
// import {MatCardModule} from '@angular/material/card';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { SingUpComponent } from './page/sing-up/sing-up.component';
// import { DeliveryComponent } from './page/delivery/delivery.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     FooterComponent,
//     CentralComponent,
//     MainComponent,
//     NewComponent,
//     LogInComponent,
//     BasketComponent,
//     SingUpComponent,
//     DeliveryComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatButtonModule,
//     MatDividerModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     HttpClientModule,
//     MatDialogModule,
//     MatChipsModule,
//     MatTableModule,
//     MatCardModule,
//     MatProgressBarModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
