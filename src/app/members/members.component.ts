import { Component, Inject, OnInit } from '@angular/core';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../shared/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Member } from '../models/member';
import { AlertDialog, ConfirmDialog } from '../agent/agent.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  ELEMENT_DATA: Member[] = [];

  displayedColumns: string[] = ['select', 'position', 'fName', 'lName', 'agentConfirm', 'adminConfirm', 'superAdminConfirm'];
  public direction: Direction;
  dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
  selection = new SelectionModel<Member>(true, []);
  endpoint: string = environment.backendUrl;
  
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

  showIt(){
    if(this.pickOne()){
      const id: number = this.selection.selected[0].id;
      this.router.navigate(['/register', { id: id }]);
    }
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

  openDialog(status: boolean) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true){
        let vals: number[] = []; 
        this.selection.selected.forEach((value: Member, index: number) => {
          if(vals.indexOf(value.id) == -1){
            vals.push(value.id);
          }
        });
        const params = { ids: vals, status: status };
        let api = '';
        if(this.authService.currentUser.isAgent){
          api = `${this.endpoint}auth/agentConfirm`;
        }else if(this.authService.currentUser.isAdmin){
          api = `${this.endpoint}auth/adminConfirm`;
        }else if(this.authService.currentUser.isSuperAdmin){
          api = `${this.endpoint}auth/superAdminConfirm`;
        } 
        this.authService.postReq(api, params).subscribe((res) => {
          this.getAllMembers();
        });
      }else{
        console.log(2);
      }
    });
  }

  addUser(){
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        let api = `${this.endpoint}auth/addMember`;
        this.authService.postReq(api, {}).subscribe((res) => {
          if(res){
            this.router.navigate(['/register', { id: res }]);
          }
        });
      }
    });
  }

  del(){
    if(this.pickOne()){
      this.delIt();
    }
  }

  delIt() {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        let api = `${this.endpoint}auth/delMember`;
        let vals: number[] = []; 
        this.selection.selected.forEach((value: Member, index: number) => {
          vals.push(value.id);
        });
        const params = { ids: vals };
        this.authService.postReq(api, params).subscribe((res) => {
          this.getAllMembers();
        });
      }
    });
  }

  pickOne() : boolean{
    if(this.selection.selected.length == 0){
      const dialogRef = this.dialog.open(AlertDialog, {data: 'گزینه مورد نظر را انتخاب نمایید!'});
      return false;
    }
    return true;
  }
}