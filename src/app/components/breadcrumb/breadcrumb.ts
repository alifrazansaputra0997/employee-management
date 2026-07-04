import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from '@config/interfaces/breadcrumb.interface';
import { BreadcrumbService } from '@services/breadcrumb/breadcrumb';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  imports: [
    MatIcon,
    RouterLink,
  ],
  providers: [
    BreadcrumbService
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];
  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = this.breadcrumbService.buildBreadcrumb(this.route.root);
    console.log('this.breadcrumbItems', this.breadcrumbItems)
  }
}
