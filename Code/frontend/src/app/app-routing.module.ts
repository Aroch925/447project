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
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: {title: 'Finder', depth: 1} },
  { path: 'login', component: LoginComponent, data: {title: 'Login', depth: 2} },
  { path: 'signup', component: SignupComponent, data: {title: 'Sign Up', depth: 3}},
  { path: 'survey', component: SurveyComponent, data: {title: 'Survey', depth: 4}},
  { path: 'admin', component: AdminComponent, data: {title: 'Admin', depth: 5}},
  { path: 'account', component: AccountComponent, data: {title: 'Account', depth: 6}},
  { path: 'social', component: SocialComponent, data: {title: 'Explore', depth: 7}},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
