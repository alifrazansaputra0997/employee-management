import { Routes } from "@angular/router";

export const masterRoutes: Routes = [
    {
        path: '',
        redirectTo: 'master/employee',
        pathMatch: 'full'
    },
    {
        path: 'employee',
        data: {
             breadcrumb: 'Employee'
        },
        loadComponent: () => import('./employee/employee').then(m => m.Employee)
    }
]