import { Routes } from '@angular/router';
import { Login } from '@pages/login/login';
import { NotFound } from '@pages/not-found/not-found';
import { Template } from '@template/template';
import { authGuard } from './guards/auth/auth-guard';
import { guestGuard } from '@guards/guest/guest-guard';
export const routes: Routes = [
    {
        path: '',
        component: Template,
        canActivateChild: [authGuard],
        loadChildren: () => import('./pages/pages.routes').then(m => m.pagesRoutes)
    },
    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard]
    },
    {
        path: '**',
        component: NotFound
    }
];
