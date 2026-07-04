import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbItem } from '@config/interfaces/breadcrumb.interface';
import { BreadcrumbService } from '@services/breadcrumb/breadcrumb';
import { RouterLink, Router } from '@angular/router';
import { filter } from 'rxjs';
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
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = this.breadcrumbService.buildBreadcrumb(this.route.root);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb() {
    this.breadcrumbItems = this.breadcrumbService.buildBreadcrumb(this.route.root);
  }
}
