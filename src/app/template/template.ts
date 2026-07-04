import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarTemplate } from '../components/template/toolbar-template/toolbar-template';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenu } from '@components/template/side-menu/side-menu';
import { Breadcrumb } from '@components/breadcrumb/breadcrumb';

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

  constructor() { }

  ngOnInit(): void {

  }

}
