import { Routes } from '@angular/router';
import { Login } from '@pages/login/login';
import { NotFound } from '@pages/not-found/not-found';
import { Template } from '@template/template';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
    {
        path: '',
        component: Template,
        canActivateChild: [authGuard],
        loadChildren: () => import('./pages/pages.routes').then(m => m.pagesRoutes)
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '**',
        component: NotFound
    }
];
