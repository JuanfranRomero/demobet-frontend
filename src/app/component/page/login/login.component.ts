import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/authentication.service';
import { UserService } from '../../../service/user.service';
import { LoginRequest } from '../../../model/request/login-request.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  hide = signal(true);
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginFormGroup?.get('username')!.value;
  }

  get password() {
    return this.loginFormGroup?.get('password')!.value;
  }

  public login() {
    this.loading = true;
    let loginRequest: LoginRequest = this.buildLoginRequest();
    this.authenticationService.login(loginRequest).subscribe((response) => {
      if (response && response.token) {
        localStorage.setItem('access_token', JSON.stringify(response.token));
        this.userService.authenticatedUser();
        this.loading = false;
        this.snackBarService.showSuccess('Successful login.')
        this.router.navigate(['/home']);
      }
    },
    (error) => {
      this.loading = false;
    });
  }

  private buildLoginRequest(): LoginRequest {
    return {
      username: this.username,
      password: this.password
    }
  }

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
  }

}
