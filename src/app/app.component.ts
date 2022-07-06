import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialog } from './agent/agent.component';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    private dialog: MatDialog,
  ) {
    this.isAuthenticated = this.authService.isLoggedIn;
  }
  title = 'سامانه ثبت نام زیارتی';
  agree: boolean = false;

  goto(){
    if(this.authService.isLoggedIn){
      this.router.navigate(['members']);
    }else{
      this.router.navigate(['login']);
    }
  }

  logInOut(){
    if(this.authService.isLoggedIn){
      const dialogRef = this.dialog.open(ConfirmDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result === true){
          this.authService.doLogout();
          this.router.navigate(['login']);
        }else{
          console.log(2);
        }
      });
    }else{
      this.router.navigate(['login']);
    }
  }
}
