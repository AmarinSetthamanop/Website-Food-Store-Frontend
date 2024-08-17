import { Component } from '@angular/core';

/* import Http */
import { HttpClient } from '@angular/common/http';

/* import service */
import { DataService } from 'src/app/service/data.service';

/* impoer Model class IOrder */
import { Convert as IOrderCvt, IOrder } from 'src/app/model/iorder-model';

/* impoer Model class Customer */
import { Convert as CustomerCvt, Customer } from 'src/app/model/customer-model';

/* ต้องรอข้อมูลมาก่อน */
import { lastValueFrom } from 'rxjs';

/* import Dialog */
import { MatDialog } from '@angular/material/dialog';

/* import class ของรายการสินค้าที่อยู่ใน order นั้นๆ */
import { IorderOidComponent } from '../iorder-oid/iorder-oid.component';

@Component({
  selector: 'app-iorder-customer',
  templateUrl: './iorder-customer.component.html',
  styleUrls: ['./iorder-customer.component.scss']
})
export class IorderCustomerComponent {

  /* Array ที่เป็นชนิดของ class IOrder */
  iorder = Array<IOrder>();

  /* customer ที่ login เข้ามาแล้ว */
  customer = Array<Customer>();

  /* สร้าง ชื่อ columns ที่ต้องการแสดง โดยชื่อต้องตรงกับ iorderOid-model.ts*/
  displayedColumns: string[] = ['oid', 'customer_name', 'customer_phone', 'status'];

  constructor (private http: HttpClient, private dataService: DataService, private dialog: MatDialog) {

    this.customer = this.dataService.customer;

    /* เรียกใช้ Method api*/
    this.getIorder(http, dataService);
  }

  /* Method เรียก api แบบ รอข้อมูลมาให้ครบก่อน */
  async getIorder(http:  HttpClient, dataService: DataService) {

    console.log('start');

    // let jsonObj = {
    //   cid : this.customer[0].cid
    // }
    // let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    /* เรียก api แบบ await คือ รอข้อมมูลมาให้ครบก่อน*/
    this.iorder = IOrderCvt.toIOrder(JSON.stringify(
      await lastValueFrom(
        http.get(dataService.pathApi + '/iorder/customer/' + this.customer[0].cid)
      )
    ));

    console.log(this.iorder);

    console.log('compless');

  }

  /* Method add Oid ไปที่ service */
  addOid( oid : any, address : any, customer_name : any, customer_phone : any) {
    this.dataService.oid = oid; // oid ของ order นั้น
    this.dataService.address = address; // ที่อยู่ที่ต้องการจัดส่งของ order นั้น
    this.dataService.customer_name = customer_name; // ชื่อลูกค้าที่สั่ง order นั้นๆ
    this.dataService.customer_phone = customer_phone; // เบอร์ลูกค้าที่อยู่ใน iorder นะ้นๆ
    console.log(oid,address,customer_name);

    /* คำสั่ง เปิดหน้า dialog โดยไปที่ class IorderOidComponent */
    this.dialog.open(IorderOidComponent);
  }

}
