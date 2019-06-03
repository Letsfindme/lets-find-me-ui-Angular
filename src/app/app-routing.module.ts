import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PostCreationComponent } from './posts/post-creation/post-creation.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostResaultComponent } from './posts/post-resault/post-resault.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children:[
      {path: '', component: HomePageComponent}
    ]
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'signup',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: 'postCreation',
    component: HomeLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: PostCreationComponent },
      { path: '', component: PostResaultComponent }
    ]
  },
  {
    path: 'searchResault',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PostResaultComponent }
    ]
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
