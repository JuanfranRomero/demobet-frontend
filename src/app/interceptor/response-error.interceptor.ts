import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { SnackBarService } from "../service/snackbar.service";

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {

    constructor(private snackBarService: SnackBarService) {}

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
                    }
                }

                this.snackBarService.showError(errorMessage);
                return throwError(errorMessage);
            })
        );
    }

}