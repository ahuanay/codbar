import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    LoginComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  exports: []
})
export class AuthenticationModule { }
