import { Component, Inject, OnInit } from '@angular/core';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../shared/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Member } from '../models/member';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: number;
  position: number;
  fName: string;
  lName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})

export class AgentComponent implements OnInit {

  ELEMENT_DATA: Member[] = [];

  displayedColumns: string[] = ['select', 'position', 'fName', 'lName', 'agentConfirm', 'adminConfirm', 'superAdminConfirm'];
  public direction: Direction;
  dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
  selection = new SelectionModel<Member>(true, []);
  endpoint: string = 'http://localhost:3000/';
  
  public constructor(
    private readonly dir: Directionality,
    public authService: AuthService,
    private dialog: MatDialog,
    public router: Router,
  ) {
   this.direction = 'rtl';
   this.getAllMembers();
  }
  
  ngOnInit(): void {
    
  }

  getAllMembers(){
    console.log('clicked');
    let api = `${this.endpoint}auth/getMembers`;
    this.authService.postReq(api, {}).subscribe((res) => {
      res.forEach((value: { position: any; }, index: number) => {
          value.position = index + 1;
      });
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  confirm(){
    if(this.pickOne()){
      this.openDialog(true);
    }
  }

  reject(){
    if(this.pickOne()){
      this.openDialog(false);
    }
  }

  showIt(){
    if(this.pickOne()){
      const id: number = this.selection.selected[0].id;
      this.router.navigate(['/register', { id: id }]);
    }
  }

  pickOne() : boolean{
    if(this.selection.selected.length == 0){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'گزینه مورد نظر را انتخاب نمایید!'});
      return false;
    }
    return true;
  }

  openDialog(status: boolean) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true){
        let vals: number[] = []; 
        this.selection.selected.forEach((value: Member, index: number) => {
          vals.push(value.id);
        });
        const params = { ids: vals, status: status };
        let api = `${this.endpoint}auth/agentConfirm`;
        this.authService.postReq(api, params).subscribe((res) => {
          this.getAllMembers();
        });
      }else{
        console.log(2);
      }
    });
  }

}

@Component({
  template: `
  <h2 mat-dialog-title style="direction:rtl">هشدار!</h2>
  <mat-dialog-content class="mat-typography">
    <h3  style="direction:rtl">{{this.data}}</h3>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>تایید</button>
  </mat-dialog-actions>
  `,
})
export class AlertDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}

@Component({
  template: `
  <h2 mat-dialog-title style="direction:rtl">هشدار!</h2>
  <mat-dialog-content class="mat-typography">
    <h3  style="direction:rtl">مطمئن هستید؟</h3>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="false" mat-dialog-close>خیر</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>بله</button>
  </mat-dialog-actions>
  `,
})
export class ConfirmDialog {}


