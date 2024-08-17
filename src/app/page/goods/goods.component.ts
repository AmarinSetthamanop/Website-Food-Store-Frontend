
import { Component } from '@angular/core';
import { Convert as goodsCvt, Goods } from 'src/app/model/goods-model'; // จะเเปลง JSON เป็น class จะต้อง import
import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป
import { DataService } from 'src/app/service/data.service';
import { Convert as typeCvt, Type } from 'src/app/model/type-model'; // จะเเปลง JSON เป็น class จะต้อง import
import { MatDialog } from '@angular/material/dialog'; // ทำการ import Dialog เพื่อใช้เปิดหน้าต่าง

import { Convert as adminCvt, Admin } from 'src/app/model/admin-model'; // จะเเปลง JSON เป็น class จะต้อง import
import { Convert as customerCvt, Customer } from 'src/app/model/customer-model'; // จะเเปลง JSON เป็น class จะต้อง import

import { Router } from '@angular/router';
import { AddToBasketComponent } from '../add-to-basket/add-to-basket.component';


@Component({
  selector: 'app-central',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {

  goods = Array<Goods>(); // สร้าง attribute ของ class มีชนิดเป็น Array ของ Goods คือ Model Serialization ที่เราสร้างขึ้น เพื่อเอาข้อมูล JSON มาเเปลงเป็น Object ให้อยู่ในรูปเเบบของ class
  type = Array<Type>(); // attribute สำหรับเก็บข้อมูลประเภทสินค้าเพื่อจะนำไปเเสดงให้ผู้ใช้เลือกในหน้า html

  admin = Array<Admin>();
  customer = Array<Customer>();

  constructor(private dataService : DataService, private http : HttpClient, private dialog : MatDialog, private router: Router){ // ทำการ Inject dialog เข้ามา มีชื่อว่า dialog มีชนิดเป็น MatDialog เพื่อใช้เปิดหน้าต่าง

    http.get(dataService.pathApi + "/goods").subscribe((data : any) => { // dataService.apiEndpoint คือการเรียกใช้ attribute ของ Service ที่สร้างขึ้น ที่เก็บ url ของ api

      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
      console.log(this.goods); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });

    http.get(dataService.pathApi + "/type").subscribe((data : any) => { // เรียก api ในการ select ประเภทสินค้าออกมา
      this.type = typeCvt.toType(JSON.stringify(data));
      console.log(this.type); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });
  }

  // function ในการค้นหาอาหารเฉพาะประเภทที่เลือก โดยรับ พารามิเตอร์ เป็นชื่อ ประภท
  findByType(name : string){
    this.http.get(this.dataService.pathApi + "/goods/type/" + name).subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // เมื่อได้รับข้อมูลเเล้วนำไปเก็บใน attribute goods ซึ่งเป็นตัวเเปรที่จะเเสดงสินค้า
    });
  }

  // function ในการค้นหาอาหารทั้งหมด
  findAll(){
    this.http.get(this.dataService.pathApi + "/goods").subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
      console.log(this.goods); // console จะมีข้อมูลเเสดงออกมาในรูปเเบบของ Object
    });
  }

  // function ในการค้นหาอาหารจากชื่ออาหาร
  search(productName : string){
    this.http.get(this.dataService.pathApi + "/goods/name/" + productName).subscribe((data : any) => {
      this.goods = goodsCvt.toGoods(JSON.stringify(data)); // นำผลการเรียก api มาเเปลงลง model โดยใช้ตัว convert ที่ import เข้ามา
    });
  }

  // function addNew แสดง dialog เพื่อใช้ในการเพิ่มอาหารลงตะกร้า เก็บไว้ใน data Service
  addNew(gid : any, name : any){
    this.dataService.gid = gid; // gid ไปเก็บใน data Service
    this.dataService.name = name; // name ไปเก็บใน data Service
    this.dialog.open(AddToBasketComponent, { // หมายความว่าจะทำการเเสดง dialog โดยการเปิดหน้า new.component.html มาเเสดงเป็น dialog
      minWidth: '300px',
    });
  }

  /* เปิดหน้า ตะกร้าของลูกค้าคนๆนั้น */
  openBasket(){
    this.customer = this.dataService.customer;
    console.log(this.customer[0].name);
    this.router.navigateByUrl("/basket");
  }

}
