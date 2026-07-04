import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from '@config/interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {

  buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const child = route.firstChild;
    if (!child) {
      return breadcrumbs;
    }
    const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL) {
      url += `/${routeURL}`;
    }
    const label = child.snapshot.data['breadcrumb'];
    if (label) {
      breadcrumbs.push({
        label,
        url
      });
    }
    return this.buildBreadcrumb(
      child,
      url,
      breadcrumbs
    );
  }
}
