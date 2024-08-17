import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป
import { DataService } from 'src/app/service/data.service';
import { Convert as adminCvt, Admin } from 'src/app/model/admin-model'; // จะเเปลง JSON เป็น class จะต้อง import
import { Convert as customerCvt, Customer } from 'src/app/model/customer-model'; // จะเเปลง JSON เป็น class จะต้อง import

/* Router เพื่อเปลี่ยน หน้าไปหน้าอื่นๆ */
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // ทำการ Inject dialogRef เข้ามาเพื่อสามารถที่จะควบคุมการทํางานของ dialog โดยต้องสร้างให้ตรงชนิดของ class LogInComponent
  admin = Array<Admin>();
  customer = Array<Customer>();

  constructor (private dataService : DataService, private http : HttpClient, private router : Router) {

  }

  // function ในการ Log In การทำงานจะรับ พารามิเตอร์ email เเละ password เข้ามา
  addLogIn(email : any, password : any){
    console.log(email);
    console.log(password);

    let jsonObj = {
      email : email,
      password : password
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    if(email && password) { // ทำการเช็คว่าลูกค้าที่ต้องการสมัครสมาชิกกรอกข้อมูลครบหรือไม่ถ้าครบก็ทำงาน
      this.http.post(this.dataService.pathApi + "/customer/login", jsonString,
      {observe: 'response'}).subscribe((response) => {
        this.dataService.customer = customerCvt.toCustomer(JSON.stringify(response.body)); // นำข้อมูลของ customer ที่ Log In ไปเก็บไว้ใน dataService เพื่อจะนำไปใช้งานต่อไป

        this.customer = this.dataService.customer;

        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(this.customer[0].name));
        //console.log(JSON.stringify(this.dataService.customer));

        this.router.navigateByUrl("");
      });

      this.http.post(this.dataService.pathApi + "/admin/login", jsonString,
      {observe: 'response'}).subscribe((response) => {
        this.dataService.admin = adminCvt.toAdmin(JSON.stringify(response.body)); // นำข้อมูลของ admin ที่ Log In ไปเก็บไว้ใน dataService เพื่อจะนำไปใช้งานต่อไป

        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(this.dataService.admin));

        this.router.navigateByUrl("/iorder");
      });
    } else {
      console.log("กรุณาป้อนข้อมูลให้ครบ");
    }

  }

}
