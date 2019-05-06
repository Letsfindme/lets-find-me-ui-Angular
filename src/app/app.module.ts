import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatRippleModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserServiceService} from './user-service.service';
import { Interceptor } from './core/inteceptor.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import {PostCreationService} from './post-creation/post-creation.service';
import {PostCreationModule} from './post-creation/post-creation.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    BreadcrumbComponent,
    MainNavComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    PostCreationModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  providers: [
    HttpClientModule,
    PostCreationService,
    UserServiceService,
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
