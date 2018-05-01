import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SurveyComponent } from './survey/survey.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'account', component: AccountComponent},
  { path: 'social', component: SocialComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
