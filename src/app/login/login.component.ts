import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AlertDialog } from '../agent/agent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  endpoint: string = 'http://localhost:3000/';
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private dialog: MatDialog,
  ) {
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  loginUser() {
    console.log('clicked');
    this.authService.signIn(this.signinForm.value);
  }

  addUser(){ 
    let api = `${this.endpoint}auth/addUser`;
    this.authService.postReq(api, this.signinForm.value).subscribe((res) => {
      if(res){
        const dialogRef = this.dialog.open(AlertDialog, {data: 'کلمه عبور به شماره همراه شما ارسال شد'});
      }
    });
  }

}
