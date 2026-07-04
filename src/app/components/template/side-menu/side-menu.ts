import { Component, Input } from '@angular/core';
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
  @Input() menus: MenuItem[] = [];
}
