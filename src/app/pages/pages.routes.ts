import { Routes } from "@angular/router";

export const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        data: {
            breadcrumb: 'Dashboard'
        },
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
    }
]