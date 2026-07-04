import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarTemplate } from '../components/template/toolbar-template/toolbar-template';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenu } from '@components/template/side-menu/side-menu';
import { Breadcrumb } from '@components/breadcrumb/breadcrumb';
import { MenuItem } from '@config/interfaces/menuItem.interface';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarTemplate,
    MatSidenavModule,
    SideMenu,
    Breadcrumb
  ],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template implements OnInit {
  menus: MenuItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'folder',
      route: '/dashboard',
      children: []
    },
    {
      id: 2,
      title: 'Master',
      icon: 'folder',
      children: [
        {
          id: 3,
          title: 'Employee',
          route: '/employee',
          children: [
            {
              id: 3,
              title: 'Employee',
              route: '/employee',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Settings',
      route: '/settings',
      children: [
           {
              id: 3,
              title: 'Employee',
              route: '/employee',
              children: []
            }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
