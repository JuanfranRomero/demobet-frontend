import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
            panelClass: 'danger'
        })
    }

}
