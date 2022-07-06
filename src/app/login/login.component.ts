import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AlertDialog } from '../agent/agent.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  endpoint: string = environment.backendUrl;
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private dialog: MatDialog,
  ) {
    this.signinForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  loginUser() {
    if(!this.signinForm.value.username){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'لطفا شماره همراه را وارد نمایید'});
      return;
    }
    if(!this.signinForm.value.password){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'لطفا کلمه عبور را وارد نمایید'});
      return;
    }

    let res = this.authService.signIn(this.signinForm.value);
    console.log(res);
  }

  addUser(){ 
    if(!this.signinForm.value.username){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'لطفا شماره همراه را وارد نمایید'});
      return;
    }
    let api = `${this.endpoint}auth/addUser`;
    this.authService.postReq(api, this.signinForm.value).subscribe((res) => {
      if(res){
        const dialogRef = this.dialog.open(AlertDialog, {data: 'کلمه عبور به شماره همراه شما ارسال شد'});
      }
    });
  }

}
