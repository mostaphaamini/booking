import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  username: any;
  password: any;
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private dialog: MatDialog,
  ) {

    this.username = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]);
    
    this.signinForm = this.fb.group({
      username: this.username ,
      password: this.password,
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
    if(!this.signinForm.valid){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'اطلاعات وارد شده صحیح نمی باشد'});
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
