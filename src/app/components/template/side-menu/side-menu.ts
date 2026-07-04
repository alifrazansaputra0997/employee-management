import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '@config/interfaces/menuItem.interface';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-side-menu',
  imports: [
    MatExpansionModule,
    MatListModule,
    RouterLink
],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  menus: MenuItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon:'folder',
      children: [
        { 
          id: 6,
          title: 'Overview', 
          route: '/dashboard' 
        }
      ]
    },
    {
      id: 2,
      title: 'Employee',
      icon:'folder',
      children: [
        {
          id: 3,
          title: 'Master',
          children: [
            {
              id: 4,
              title: 'Employee',
              route: '/employee'
            },
            {
              id: 5,
              title: 'Departement',
              route: '/departement'
            }
          ]
        }
      ]
    },
    {
      id: 88,
      title: 'Settings',
      route: '/settings'
    }
  ]
}
