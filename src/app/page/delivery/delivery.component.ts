import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

/* MatDialogRef คือ ควบคุม หน้าต่าง class ใด class หรือ ในที่นี้ควบคุม class ตัวเอง */
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {

  end_total : any;

  constructor (private http : HttpClient, private dataService : DataService, private dialogRef : MatDialogRef<DeliveryComponent>, private router : Router) {

    this.end_total = dataService.end_total; // constructor จะทำงานทันที จากนั้นนำข้อมูลราคารวมของสินค้าในตะกร้าไปเก็บไว้ใน sum_total

  }

  // เมธอดในการปิดหน้าต่าง dialog
  cancel() {
    this.dialogRef.close();
  }

  /* Method กดยืนยันสั่งซื้อสินค้าทั้งหมด ที่อยู่ในตะกร้า */
  orderConfirmation(name : any, phone : any, address : any) {

    console.log(name); // ทำการ log ออกมาดู
    console.log(phone); // ทำการ log ออกมาดู
    console.log(address); // ทำการ log ออกมาดู

    let jsonObj = {
      cid : this.dataService.customer[0].cid, // นำ cid ของลูกค้าคนั้นๆมาเพื่อจะ insert ลง database
      customer_name : name,
      customer_phone : phone,
      customer_address : address
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    /* ถ้าใส่ ข้อมูลครบ */
    if (name && phone && address) {

      this.http.post(this.dataService.pathApi + "/basket/order/confirmation", jsonString, {observe: 'response'}).subscribe((response) => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));

        this.dialogRef.close(); // คำสั่งในการปิด dialog

        /* เปิดหน้า รายการ iorder ของลูกคนนี้ */
        this.router.navigateByUrl('/iorderCustomer');
      })
    }
    else {
      console.log('ใส่ข้อมูล ชื่อ เบอร์โทร ที่อยู่ ให้ครบ');
    }


  }

}
