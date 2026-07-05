import { Routes } from "@angular/router";

export const masterRoutes: Routes = [
    {
        path: 'employee',
        data: {
            breadcrumb: 'Employee'
        },
        loadComponent: () => import('./employee/employee').then(m => m.Employee),
        children: [
            {
                path: 'add-employee',
                data: {
                    breadcrumb: 'Add Employee'
                },
                loadComponent: () => import('./employee/form-employee/form-employee').then(m => m.FormEmployee)
            },
            {
                path: 'edit-employee',
                data: {
                    breadcrumb: 'Edit Employee'
                },
                loadComponent: () => import('./employee/form-employee/form-employee').then(m => m.FormEmployee)
            },
            {
                path: 'employee-list',
                loadComponent: () => import('./employee/employee-list/employee-list').then(m => m.EmployeeList)
            }
        ]
    }
]