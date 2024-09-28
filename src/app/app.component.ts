import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WalletDialog } from './dialogs/wallet-dialog/wallet-dialog.component';
import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  authenticatedUser: User | null;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.userChange.subscribe((user: User | null) => {
      this.authenticatedUser = user;
    });
  }

  public openDialog(isDeposit: boolean, enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(WalletDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    
    dialogRef.componentInstance.isDeposit = isDeposit;
  }

  public logout() {
    this.authenticationService.logout();
    this.userService.forgetAuthenticatedUser();
    this.router.navigate(['/login']);
  }

}
