import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostCreationLayoutComponent } from './posts/post-creation-layout/post-creation-layout.component';
import { PostSearchResultLayoutComponent } from './posts/post-search-result-layout/post-search-result-layout.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PreloadGuard } from './preload.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { 
        path: '', 
        component: HomePageComponent 
      },
      {
        path: 'searchResault',
        component: PostSearchResultLayoutComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'postCreation', 
        component: PostCreationLayoutComponent 
      },
      { 
        path: 'posts/:id', 
        canActivate: [AuthGuard],
        component: PostDetailsComponent 
      },
      { 
        path: 'profile', 
        canActivate: [AuthGuard],
        component: UserComponent 
      }
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
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
