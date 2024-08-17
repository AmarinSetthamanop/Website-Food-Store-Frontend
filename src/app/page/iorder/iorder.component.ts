import { Component } from '@angular/core';

/* import Http */
import { HttpClient } from '@angular/common/http';

/* import service */
import { DataService } from 'src/app/service/data.service';

/* impoer Model class IOrder */
import { Convert as IOrderCvt, IOrder } from 'src/app/model/iorder-model';

/* ต้องรอข้อมูลมาก่อน */
import { lastValueFrom } from 'rxjs';

/* import Dialog */
import { MatDialog } from '@angular/material/dialog';

/* import class ของรายการสินค้าที่อยู่ใน order นั้นๆ */
import { IorderOidComponent } from '../iorder-oid/iorder-oid.component';


@Component({
  selector: 'app-iorder',
  templateUrl: './iorder.component.html',
  styleUrls: ['./iorder.component.scss']
})



export class IorderComponent {

  /* Array ที่เป็นชนิดของ class IOrder */
  iorder = Array<IOrder>();

  /* สร้าง ชื่อ columns ที่ต้องการแสดง โดยชื่อต้องตรงกับ iorderOid-model.ts*/
  displayedColumns: string[] = ['oid', 'customer_name', 'customer_phone', 'status'];

  constructor (private http: HttpClient, private dataService: DataService, private dialog: MatDialog) {

    /* เรียกใช้ Method api*/
    this.getIorder(http, dataService);

  }

  /* Method เรียก api แบบ รอข้อมูลมาให้ครบก่อน */
  async getIorder(http:  HttpClient, dataService: DataService) {

    console.log('start');

    /* เรียก api แบบ await คือ รอข้อมมูลมาให้ครบก่อน*/
    this.iorder = IOrderCvt.toIOrder(JSON.stringify(
      await lastValueFrom(
        http.get(dataService.pathApi + '/iorder'
    ))));

    console.log(this.iorder);

    console.log('compless');

  }

  /* Method add Oid ไปที่ service */
  addOid( oid : any, address : any, customer_name : any, customer_phone : any) {
    this.dataService.oid = oid; // oid ของ order นั้น
    this.dataService.address = address; // ที่อยู่ที่ต้องการจัดส่งของ order นั้น
    this.dataService.customer_name = customer_name; // ชื่อลูกค้าที่สั่ง order นั้นๆ
    this.dataService.customer_phone = customer_phone; //เบอร์ของลูดค้าที่อยู๋ใน iorder นั้นๆ
    console.log(oid,address,customer_name);

    /* คำสั่ง เปิดหน้า dialog โดยไปที่ class IorderOidComponent */
    this.dialog.open(IorderOidComponent, {
      minHeight : '550px',
      minWidth : '800px'
    });
  }

  /* Method แก้ไข้สถานะของ order นั้นๆ */
  editStatus(oid : any, status_ : string) {

    /* confirm คือเด่งหน้าต่างกดยืนยัน */
    if (confirm("เปลี่ยนสถานะหรือไม่") == true) {

      console.log(oid,status_);

      /* สร้าง json oblect เพื่อเก็บข้อมูลตาม สิ่งที่ต้องการแก้ไข*/
      let json_Object = {
        status : status_
      }

      /* แปลง json object ไปเป็น json JavaScript ของหน้า web*/
      let json_String = JSON.stringify(json_Object);

      /* เรียกใช้ api put เพื่อแก้ไปสถานะของ order นั้นๆ ------ โดย JSON JavaScript ส่งไป ตัวแปล response ----------- subcribe ตรวจสอบทุกครั้งที่ได้รับข้อมูล แล้วให้แสดงผลออกมาทาง consol*/
      this.http.put(this.dataService.pathApi + '/iorder/' + oid, json_String, {observe: 'response'}).subscribe( (data) =>{
        console.log(JSON.stringify(data.status));
        console.log(JSON.stringify(data.body));
      });

    }

  }

  /* Method เรรียก api แสดง iorder ตามสถานะต่างๆ */
  iorderStatus( status : any ) {

    /* เรียก aip แล้วแปลงค่ามาเก็บไว้เลย */
    this.http.get(this.dataService.pathApi + '/iorder/status/' + status).subscribe( (data : any) =>{
      this.iorder = IOrderCvt.toIOrder(JSON.stringify(data));
    });
  }

  /* Mathod เรียก api แสดง iorder ทั้งหมด */
  iorderAll() {

    /* เรียก aip แล้วแปลงค่ามาเก็บไว้เลย */
    this.http.get(this.dataService.pathApi + '/iorder').subscribe( (data : any) =>{
      this.iorder = IOrderCvt.toIOrder(JSON.stringify(data));
    });
  }
}
