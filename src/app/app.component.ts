import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletDialog } from './dialogs/wallet-dialog/wallet-dialog.component';
import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { WalletService } from './service/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  authenticatedUser: User | null;
  currentAmount: number;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private walletService: WalletService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.userChange.subscribe((user: User | null) => {
      this.authenticatedUser = user;
      this.walletService.getAmount(user!.id);
    });
    this.walletService.currentAmountChange.subscribe((amount: number) => {
      this.currentAmount = amount;
    });
  }

  public openDialog(isDeposit: boolean, enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(WalletDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    
    dialogRef.componentInstance.isDeposit = isDeposit;
    dialogRef.componentInstance.user = this.authenticatedUser;
  }

  public logout() {
    this.authenticationService.logout();
    this.userService.forgetAuthenticatedUser();
    this.router.navigate(['/login']);
  }

}
