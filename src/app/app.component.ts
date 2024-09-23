import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialog } from './dialogs/login-dialog/login-dialog.component';
import { UserService } from './service/user.service';
import { User } from './model/user.model';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  authenticatedUser: User | null;

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.userService.userChange.subscribe((user: User | null) => {
      this.authenticatedUser = user;
    });
  }

  public openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public logout() {
    this.authenticationService.logout();
    this.userService.forgetAuthenticatedUser();
  }

}
