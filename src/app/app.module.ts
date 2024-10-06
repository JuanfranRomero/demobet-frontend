import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { WalletDialog } from './dialogs/wallet-dialog/wallet-dialog.component';
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
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './component/page/login/login.component';
import { SignupComponent } from './component/page/signup/signup.component';
import { HomeComponent } from './component/page/home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { WalletService } from './service/wallet.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BetService } from './service/bet.service';

@NgModule({
  declarations: [
    AppComponent,
    WalletDialog,
    LoginComponent,
    SignupComponent,
    HomeComponent
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
    // Drag and drop
    DragDropModule,
    // Menu
    MatMenuModule,
    // Progress bar
    MatProgressBarModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(), 
    // Services
    AuthenticationService, UserService, SnackBarService, WalletService, BetService,
    // JWT Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // Response Error Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
