import { Component, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../service/authentication.service";
import { LoginRequest } from "../../model/login-request.model";
import { UserService } from "../../service/user.service";

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.component.html',
})
export class LoginDialog implements OnInit {
    
    loginFormGroup: FormGroup;
    hide = signal(true);
    loading: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<LoginDialog>, 
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {}
    
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
            }
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
        event.stopPropagation();
    }
    
}