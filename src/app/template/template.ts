import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarTemplate } from '../components/template/toolbar-template/toolbar-template';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenu } from '@components/template/side-menu/side-menu';
import { Breadcrumb } from '@components/breadcrumb/breadcrumb';
import { MenuItem } from '@config/interfaces/menuItem.interface';
import { LoadingService } from '@services/common/loading-service/loading-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarTemplate,
    MatSidenavModule,
    SideMenu,
    Breadcrumb,
    MatProgressSpinnerModule
  ],

  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: ElementRef;
  loadingService = inject(LoadingService)
  isLoading = this.loadingService.isLoading;

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
          route: '/master/employee/employee-list',
          children: []
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('drawer', this.drawer)

  }

}
