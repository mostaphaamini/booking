import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Member } from '../models/member';
import { AlertDialog } from '../agent/agent.component';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { JalaliMomentDateAdapter, JALALI_MOMENT_FORMATS } from 'material-jalali-moment-adapter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
   
    //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: 
    [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS},
  ],
})
export class RegisterComponent implements OnInit {
  @Input() id: number = 0;
  endpoint: string = environment.backendUrl;
  registerForm: FormGroup;
  mine: boolean = true;
  health: boolean = true;
  gender: number = 1;
  solType: number = 1;
  jobType: number = 1;
  married: number = 1;
  locType: number = 1;
  vacFileName: string = '';
  solFileName: string = '';
  passFileName: string = '';
  hasPass: boolean = false;
  hasCar: boolean = false;
  hasEx: boolean = false;
  hasEx40: boolean = false;
  samah: boolean = false;
  selfAid: boolean = false;

  agents: any[] = [];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    console.log(this.authService.currentUser);
    //this.registerForm = this.fb.group({fname: ['ddd']});
    this.registerForm = new FormGroup({
      relation: new FormControl(), 
      userId: new FormControl(),
      agentId: new FormControl(),
      fName: new FormControl(''),
      lName: new FormControl(''),
      pName: new FormControl(''),
      pID: new FormControl(''),
      nID: new FormControl(''),
      bDate: new FormControl(),
      pDate: new FormControl(),
      vacFileName: new FormControl(),
      solFileName: new FormControl(),
      passFileName: new FormControl(),
      gender: new FormControl(),
      hasPass: new FormControl(),
      married: new FormControl(),
      religion: new FormControl(),
      postalCode: new FormControl(),
      adr: new FormControl(),
      health: new FormControl(),
      healthDesc:  new FormControl(''),
      boder: new FormControl(),
      education: new FormControl(),
      job: new FormControl(),
      support: new FormControl(),
      earn: new FormControl(),
      jobDesc: new FormControl(''),
      earnDesc: new FormControl(''),
      earnAmount: new FormControl(),
      border: new FormControl(),
      car: new FormControl(),
      carType: new FormControl(''),
      carYear: new FormControl(''),
      selfTravel: new FormControl(),
      experienced: new FormControl(),
      exNum: new FormControl(),
      exLast: new FormControl(),
      experienced40: new FormControl(),
      ex40Num: new FormControl(),
      ex40Last: new FormControl(),
      pay: new FormControl(),
      bank: new FormControl(''),
      acount: new FormControl(''),
      shaba: new FormControl(''),
      kids: new FormControl(),
      solType: new FormControl(),
      house: new FormControl(),
      locType: new FormControl(),
      phone: new FormControl(''),
      relMobile: new FormControl(''),
      otherTravel: new FormControl(),
      province: new FormControl(''),
      city: new FormControl(''),
    }); 
  }

  ngOnInit(): void {
    const memberId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    
    this.authService.getMember(memberId).subscribe((res) => {
      if(res && res.id){
        this.mine = res.relation == 1;
        this.health = res.health == 1;
        this.vacFileName = res.vacFileName || '';
        this.solFileName = res.solFileName || '';
        this.passFileName = res.passFileName || '';
        this.gender = res.gender;
        this.solType = res.solType;
        this.jobType = res.job;
        this.married = res.married;
        this.locType = res.locType;
        this.hasPass = res.hasPass;
        this.hasCar = res.car == 1;
        this.hasEx = res.experienced == 1;
        this.hasEx40 = res.experienced40 == 1;
        
        this.registerForm = this.fb.group(res);
      }else{
        //const dialogRef = this.dialog.open(AlertDialog, {data: '??????!'});
      }
    });

    let api = `${this.endpoint}auth/getAgents`;
    this.authService.http.get(api).subscribe((res) => {
      this.agents = res as [] || [];
    });
  }

  calculateDiff(dateSent: any){
    let currentDate = new Date();
    //console.log('ffff ' + currentDate);
    dateSent = new Date(dateSent);
    //console.log('ffff ' + dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24 * 365));
  }

  checkAge(){
    let age = this.calculateDiff(this.registerForm.value.bDate);
    if(this.mine && this.registerForm.value.gender == 2 && this.registerForm.value.married == 1 
      && age < 50){
      let msg = '???????????????? ?????????? ???????? ?????????????? ???????? ?????? ???? ?????? ???????? ???? ???????? ?????? ???????????? ???????? ?????? ????????';
      const dialogRef = this.dialog.open(AlertDialog, {data: msg});
      return false;
    }
    return true 
  }

  register() {
    if(!this.checkAge()){
      return;
    }
    let api = `${this.endpoint}auth/saveMember`;
    this.authService.postReq(api, this.registerForm.value).subscribe((res) => {
      const dialogRef = this.dialog.open(AlertDialog, {data: '?????????????? ?????????? ????'});
    });
  }

  relationChange(sel: any){
    console.log(sel.value);
    this.mine = (sel.value == 1 || sel.value == 5);
  }

  genderChange(sel: any){
    this.gender = sel.value;
    this.checkAge();
  }

  solChange(sel: any){
    this.solType = sel.value;
  }

  jobChange(sel: any){
    this.jobType = sel.value;
  }

  aidChange(sel: any){
    this.selfAid = sel;
  }

  marriedChange(sel: any){
    this.married = sel.value;
    this.checkAge();
  }

  locChange(sel: any){
    this.locType = sel.value;
    console.log(this.locChange);
  }

  healthChange(sel: any){
    this.health = sel.value == 1;
  }

  passChange(sel: any){
    this.hasPass = sel.value == 1;
  }

  carChange(sel: any){
    this.hasCar = sel.value == 1;
  }

  exChange(sel: any){
    this.hasEx = sel.value == 1;
  }

  ex40Change(sel: any){
    this.hasEx40 = sel.value == 1;
  }

  onVacFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("image", file);
        let api = `${this.endpoint}auth/file`;
        this.authService.http.post(api, formData).subscribe((res: any) => {
          console.log(res.filename);
          this.vacFileName = res.filename;
          this.registerForm.patchValue({vacFileName: this.vacFileName});

        });
    }
  }
  
  onSolFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("image", file);
        let api = `${this.endpoint}auth/file`;
        this.authService.http.post(api, formData).subscribe((res: any) => {
          console.log(res.filename);
          this.solFileName = res.filename;
          this.registerForm.patchValue({solFileName: this.solFileName});

        });
    }
  }

  onPassFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("image", file);
        let api = `${this.endpoint}auth/file`;
        this.authService.http.post(api, formData).subscribe((res: any) => {
          console.log(res.filename);
          this.passFileName = res.filename;
          this.registerForm.patchValue({passFileName: this.passFileName});
        });
    }
  }
}
