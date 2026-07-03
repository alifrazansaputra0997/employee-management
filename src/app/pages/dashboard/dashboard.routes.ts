import { Routes } from "@angular/router";

export const dashboardRouutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard').then(m => m.Dashboard)
    }
]