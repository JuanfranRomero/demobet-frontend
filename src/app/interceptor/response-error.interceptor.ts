import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { SnackBarService } from "../service/snackbar.service";
import { Router } from "@angular/router";

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackBarService: SnackBarService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                let errorMessage = '';
                if (error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Client-side error: ${error.error.message}`;
                } else {
                    // backend error
                    if (error.status === 401) {
                        errorMessage = `Inicio de sesión requerido`;
                        this.router.navigate(['/login']);
                        
                    } else if (error.status === 403) {
                        errorMessage = `Session token expired. Please log in again.`;
                        this.router.navigate(['/login']);
                    }
                }

                this.snackBarService.showError(errorMessage);
                return throwError(errorMessage);
            })
        );
    }

}