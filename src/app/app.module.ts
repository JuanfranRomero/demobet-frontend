import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialog } from './dialogs/login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from './service/authentication.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JwtInterceptor } from './interceptor/jwt-interceptor';
import { UserService } from './service/user.service';
import { ResponseErrorInterceptor } from './interceptor/response-error.interceptor';
import { SnackBarService } from './service/snackbar.service';
import { LoginComponent } from './component/page/login/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    // Inputs
    MatInputModule,
    // Dialog
    MatDialogModule,
    // Forms
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    // Spinner
    MatProgressSpinnerModule,
    // Card
    MatCardModule,
    // Grid
    MatGridListModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(), 
    // Services
    AuthenticationService, UserService, SnackBarService,
    // JWT Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // Response Error Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
