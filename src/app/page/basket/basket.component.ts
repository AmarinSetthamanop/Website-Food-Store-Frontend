import { Component } from '@angular/core';
/* import Http */
import { HttpClient } from '@angular/common/http';
/* import service */
import { DataService } from 'src/app/service/data.service';
/* impoer Model class IOrder */
import { Convert as basketCvt, Basket } from 'src/app/model/basket-model';
/* ต้องรอข้อมูลมาก่อน */
import { lastValueFrom } from 'rxjs';

import { Convert as customerCvt, Customer } from 'src/app/model/customer-model'; // จะเเปลง JSON เป็น class จะต้อง import

/* เปิดหน้าต่าง dialog ขึ้นมา */
import { MatDialog } from '@angular/material/dialog';

/* class ของหน้า Delivery */
import { DeliveryComponent } from '../delivery/delivery.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  /* Array ที่เป็นชนิดของ class IOrder */
  basket = Array<Basket>();
  customer = Array<Customer>();

  /* สร้าง ชื่อ columns ที่ต้องการแสดง โดยชื่อต้องตรงกับ iorderOid-model.ts*/
  displayedColumns: string[] = ['delete', 'no', 'url', 'goods_name', 'price', 'amount', 'total'];

  /* ราคารวมของรายการสินค้าทั้งหมด */
  sum_total = 0;

  /* ลำดับเลขสินค้า */
  no = 0;

  /* รายการอาหารทั้งหมด */
  all_items = 0;

  /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
  end_total = 0;

  constructor (private http: HttpClient, private dataService: DataService, private dialog: MatDialog ) {

    /* เรียกใช้ Method api*/
    this.getIorderOid(http, dataService);

  }

  /* Method เรียก api แบบ รอข้อมูลมาให้ครบก่อน */
  async getIorderOid(http:  HttpClient, dataService: DataService) {
    this.customer = this.dataService.customer;
    console.log('start');

    /* เรียก api แบบ await คือ รอข้อมมูลมาให้ครบก่อน*/
    this.basket = basketCvt.toBasket(JSON.stringify(
      await lastValueFrom(
        http.get(this.dataService.pathApi + '/basket/' + this.customer[0].cid,
    ))));

    console.log(this.basket);

    console.log('compless');

    /* วนรอบ หา ราคารวมของรายการสินค้าทั้งหมด */
    this.basket.forEach(goods => {
      this.sum_total = this.sum_total + goods.total;
      console.log(goods.total);
    });

    if (this.sum_total > 0) {
      /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
      this.end_total = this.sum_total + 15;
    }

    /* วนรอบเรียงลำดับเลขให้สินค้าในตะกร้า */
    this.basket.forEach(goods => {
      this.no = this.no + 1;
      goods.no = this.no;
      this.all_items = this.no;
    })
  }

  /* Method ลบสินค้าอกจากตะกร้า */
  deleteGoods(element : any){

    this.sum_total = this.sum_total - element.total;

    if (this.sum_total > 0) {
      /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
      this.end_total = this.sum_total + 15;
    }

    let $cid = this.customer[0].cid;
    let jsonObj = {
      cid : $cid,
      gid : element.gid
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    this.http.post(this.dataService.pathApi + "/basket/delete", jsonString,
    {observe: 'response'}).subscribe((response) => {

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));

      /* sql ดึงรายการสินค้าที่อยู่ในตะกร้า ของคนๆนั้น*/
      this.http.get(this.dataService.pathApi + '/basket/' + this.customer[0].cid).subscribe((data) => {
        this.basket = basketCvt.toBasket(JSON.stringify(data));

        /* วนรอบเรียงลำดับเลขให้สินค้าในตะกร้า */
        this.no = 0;
        this.basket.forEach(goods => {
          this.no = this.no + 1;
          goods.no = this.no;
          this.all_items = this.no;
        })
      });
    });
  }

  /* Method แก้ไขจำนวนสินค้า */
  editAmount(element : any, new_amount : any) {

    if (new_amount <= 0) {
      new_amount = 1;
    }

    /* วัด ความห่างของ จำนวนที่จะ เพิ่ม-ลด กับจำนวนที่มีอยู่แล้วของสินค้านั้นๆ
        ถ้า จำนวนใหม่ที่จะ เพิ่ม คือ 5 แต่จำนวนที่มีอยู่แล้วมี 3 ดังนั้นจะส่ง 2 ไปทำงานที่ sql สรุปจำนวนสินค้าชิ้นนี้จะเป็น 7
        ถ้า จำนวนใหม่ที่จะ ลด คือ 3 แต่จำนวนที่มีอยู่แล้วมี 5 ดังนั้นจะส่ง -2 ไปทำงานที่ sql สรุปจำนวนสินค้าชิ้นนั้นจะเป็น 3*/
    new_amount = new_amount - element.amount;

    let $cid = this.customer[0].cid;
    let jsonObj = {
      cid : $cid,
      gid : element.gid,
      amount : new_amount
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    this.http.post(this.dataService.pathApi + "/basket", jsonString,
    {observe: 'response'}).subscribe((response) => {

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));

      /* sql ดึงรายการสินค้าที่อยู่ในตะกร้า ของคนๆนั้น*/
        this.http.get(this.dataService.pathApi + '/basket/' + this.customer[0].cid).subscribe((data) => {
        this.basket = basketCvt.toBasket(JSON.stringify(data));

        /* เปลี่ยน ราารวมทั้งหมดใหม่ทุกครั้ง */
        this.sum_total = 0;
        this.basket.forEach(element => {
          this.sum_total = this.sum_total + element.total;
          console.log(element.total);
        });

        if (this.sum_total > 0) {
          /* ราคาที่ต้องจ่าย หลังจากบวกค่าจัดส่งไป 15 บาท */
          this.end_total = this.sum_total + 15;
        }
        /* วนรอบเรียงลำดับเลขให้สินค้าในตะกร้า */
        this.no = 0;
        this.basket.forEach(goods => {
          this.no = this.no + 1;
          goods.no = this.no;
          this.all_items = this.no;
        })
      });
    });
  }

  /* Method กดยืนยันสั่งซื้อสินค้าทั้งหมด ที่อยู่ในตะกร้า */
  openDelivery() {

    this.dataService.end_total = this.end_total;

    /* เปิดหน้าต่าง ของหน้า Delivery */
    this.dialog.open(DeliveryComponent);
  }
}
