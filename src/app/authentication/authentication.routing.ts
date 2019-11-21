import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';

export const AuthenticationRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '404',
        component: Error404Component
    }
]