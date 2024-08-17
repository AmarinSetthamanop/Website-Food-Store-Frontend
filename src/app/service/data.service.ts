import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // IP server ของ backend ที่กำลังทำงานอยูู่ (เครื่องตัวเอง localhost 127.0.0.1)
  // pathApi = 'http://localhost:8000/shopwebapi';

  // IP server ของ backend ที่กำลังทำงานอยูู่บน Render
  pathApi = 'https://website-food-store-backend.onrender.com/shopwebapi';

  /* id สินค้า */
  gid : any;

  /*  */
  name : any;

  /* oid ของ order นั้นๆ */
  oid : any;

  /* ที่อยูาของ ลูกค้า */
  address : any;

  /* ชื่อลูกค้า */
  customer_name : any

  /* เบอร์ของลูกค้าที่อยู่ใน iorder นั้นๆ */
  customer_phone : any;

  /* customer */
  customer : any;

  /* admin */
  admin : any;

  /* ราคารวมทั้งหมดของสินค้าที่จะซื้อ */
  end_total : any;


  constructor() {
    console.log(this.oid);
  }


}

