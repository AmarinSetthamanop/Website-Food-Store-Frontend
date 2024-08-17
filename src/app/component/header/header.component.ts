import { Component } from '@angular/core';

/* ส่วนควบคุม หน้าต่าง dialog */
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog : MatDialog, private router : Router) {

  }

  // function เเสดง dialog เพื่อใช้ในการ Login
  addLogIn(){
    this.router.navigateByUrl('/login');
  }

}
