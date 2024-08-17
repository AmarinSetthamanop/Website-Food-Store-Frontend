import { Component } from '@angular/core';

/* import Http */
import { HttpClient } from '@angular/common/http';

/* import service */
import { DataService } from 'src/app/service/data.service';

/* impoer Model class IOrder */
import { Convert as IOrderOIDCvt, IOrderOID } from 'src/app/model/iorderOid-model';

/* ต้องรอข้อมูลมาก่อน */
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-iorder-oid',
  templateUrl: './iorder-oid.component.html',
  styleUrls: ['./iorder-oid.component.scss']
})
export class IorderOidComponent {

  /* Array ที่เป็นชนิดของ class IOrder */
  iorderOid = Array<IOrderOID>();

  /* สร้าง ชื่อ columns ที่ต้องการแสดง โดยชื่อต้องตรงกับ iorderOid-model.ts*/
  displayedColumns: string[] = ['no', 'url', 'goods_name', 'price', 'amount', 'total'];

  /* ที่อยู่การจักส่งของ order นั้นๆ */
  address : any;

  /* ชื่อลูกค้าที่เป็นคนสั่ง order นั้นๆ */
  customer_name : any;

  /* เบอร์ของลูกค้าที่อยู่ใน iorder นั้นๆ */
  customer_phone : any;

  /* ราคารวมของรายการสินค้าทั้งหมด */
  sum_total = 0;

  /* ลำดับรายการอาหาร */
  no = 0;

  /* รายการสินค้าที่อยู่ในตะกร้าทั้งหมด */
  all_items = 0;

  /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
  end_total = 0;

  constructor (private http: HttpClient, private dataService: DataService) {
    this.address = dataService.address; //ที่อยู่การจักส่งของ order นั้นๆ
    this.customer_name = dataService.customer_name; // ชื่อลูกค้าที่เป็นคนสั่ง order นั้นๆ
    this.customer_phone = this.dataService.customer_phone; // เบอร์ของลูกค้าที่อยู่ใน iorder นั้นๆ

    // /* เรียก api แสดงรายการอาหารที่อยู่ใน  order นั้นๆ*/
    // http.get(dataService.pathApi + '/iorder/' + dataService.oid).subscribe( (data:any) =>{
    //   this.iorderOid = IOrderOIDCvt.toIOrderOID(JSON.stringify(data));
    //   console.log(this.iorderOid);
    // });

    /* เรียกใช้ Method api*/
    this.getIorderOid(http, dataService);

  }

  /* Method เรียก api แบบ รอข้อมูลมาให้ครบก่อน */
  async getIorderOid(http:  HttpClient, dataService: DataService) {

    console.log('start');

    /* เรียก api แบบ await คือ รอข้อมมูลมาให้ครบก่อน*/
    this.iorderOid = IOrderOIDCvt.toIOrderOID(JSON.stringify(
      await lastValueFrom(
        http.get(dataService.pathApi + '/iorder/' + dataService.oid
    ))));

    console.log(this.iorderOid);

    console.log('compless');

    /* วนรอบ หา ราคารวมของรายการสินค้าทั้งหมด */
    this.iorderOid.forEach(element => {
      this.sum_total = this.sum_total + element.total;
      console.log(element.total);
    });

    /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
    this.end_total = this.sum_total + 15;

    /* วนรอบเรียงลำดับเลขให้สินค้าในตะกร้า */
    this.no = 0;
    this.iorderOid.forEach(goods => {
      this.no = this.no + 1;
      goods.no = this.no;
      this.all_items = this.no;
    })

  }

}
