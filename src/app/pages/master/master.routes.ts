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
        loadComponent: () => import('./employee/employee').then(m => m.Employee),
        children: [
            {
                path: 'add-employee',
                loadComponent: () => import('./employee/add-employee/add-employee').then(m => m.AddEmployee)
            },
            {
                path: 'employee-list',
                loadComponent: () => import('./employee/employee-list/employee-list').then(m => m.EmployeeList)
            }
        ]
    }
]