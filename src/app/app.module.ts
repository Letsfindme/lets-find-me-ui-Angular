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
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import {PostService} from './post-creation/post.service';
import {PostCreationModule} from './post-creation/post-creation.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { httpInterceptorProviders, AuthInterceptor } from './auth/auth-interceptor';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostShowComponent } from './post-show/post-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    LoginComponent,
    UserComponent,
    BreadcrumbComponent,
    MainNavComponent,
    RegisterComponent,
    AdminComponent,
    PageNotFoundComponent,
    PostDetailsComponent,
    PostShowComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    //material
    MatButtonModule,
    MatDialogModule,
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
    PostService,
    UserServiceService, 
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
