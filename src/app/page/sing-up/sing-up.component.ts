import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ก่อนจะ Inject ได้จะต้อง import HttpClient เข้าไป
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {


  constructor(private http : HttpClient, private dataService : DataService, private router: Router){

  }

  addSingUp(name : any, phone : any, address : any, email : any, password : any, confirmPassword : any) {
    console.log(name);
    console.log(phone);
    console.log(address);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    let jsonObj = {
      name : name,
      phone : phone,
      address : address,
      email : email,
      password
    }
    let jsonString = JSON.stringify(jsonObj); // เเปลงเป็น JSON string

    if(name && phone && address && email && password && confirmPassword) { // จะทำการเช็คว่าลูกค้ากรอกข้อมูลครบหรือไม่ถ้ากรอกครบก็ให้ทำงาน
      if(confirmPassword == password){ // ทำการเช็ค password ที่จะสมัครว่าตรงกันหรือไม่
        this.http.post(this.dataService.pathApi + "/customer", jsonString,
        {observe: 'response'}).subscribe((response) => {
          console.log(JSON.stringify(response.status));
          console.log(JSON.stringify(response.body));

          this.router.navigateByUrl("");
        });
      } else {
        console.log('รหัสผ่านไม่ตรงกัน');
      }
    } else {
      console.log("กรุณาป้อนข้อมูลให้ครบ");
    }

  }


}












