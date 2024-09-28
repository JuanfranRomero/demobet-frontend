import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) {}

    public showError(errorMessage: string, duration?: number) {
        this.snackBar.open(errorMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: duration ? duration : 5000,
            panelClass: 'error-snackbar'
        });
    }

    public showSuccess(successMessage: string, duration?: number) {
        this.snackBar.open(successMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: duration ? duration : 5000,
            panelClass: 'success-snackbar'
        });
    }

    public showWarning(warningMessage: string, duration?: number) {
        this.snackBar.open(warningMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: duration ? duration : 5000,
            panelClass: 'warning-snackbar'
        });
    }

}
