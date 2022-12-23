import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad() {
    const isAuthenticated = !!+localStorage.getItem('authenticated');
    if (isAuthenticated) {
      return true;
    } else {
      const navigation = this.router.getCurrentNavigation();
      let url = '/';
      if (navigation) {
        url = navigation.extractedUrl.toString();
      }
      this.router.navigate(['/'], { queryParams: { returnto: url } });
      return false;
    }
  }
}
