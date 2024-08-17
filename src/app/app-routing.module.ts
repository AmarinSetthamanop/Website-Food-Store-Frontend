import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/* import class ของ หน้าแสดงข้อมูลอื่นๆ */
import { GoodsComponent } from './page/goods/goods.component';
import { IorderOidComponent } from './page/iorder-oid/iorder-oid.component';
import { IorderComponent } from './page/iorder/iorder.component';
import { BasketComponent } from './page/basket/basket.component';
import { IorderCustomerComponent } from './page/iorder-customer/iorder-customer.component';
import { LoginComponent } from './page/login/login.component';
import { SingUpComponent } from './page/sing-up/sing-up.component';



/* สร้าง path ไปยังหน้าอื่นๆ */
const routes: Routes = [
  {path: '', component: GoodsComponent},
  {path: 'iorder', component: IorderComponent},
  {path: 'iorderoid', component: IorderOidComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'iorderCustomer', component: IorderCustomerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'singUp', component: SingUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
