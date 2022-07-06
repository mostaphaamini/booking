import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { catchError, EMPTY } from "rxjs";
import { AlertDialog } from "../agent/agent.component";
import { MatDialog } from "@angular/material/dialog";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private dialog: MatDialog) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req).pipe( catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
                console.log('need login');
                const dialogRef = this.dialog.open(AlertDialog, {data: 'اطلاعات وارد شده صحیح نمی باشد'});
            } 
              
            return EMPTY;
        }));
    }
}