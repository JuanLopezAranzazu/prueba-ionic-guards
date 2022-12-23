import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
// services
import { AuthService } from './../services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  /*
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
  */

  async canLoad() {
    const token = await Preferences.get({ key: 'token' });
    if (token && token.value) {
      return true;
    } else {
      const navigation = this.router.getCurrentNavigation();
      let url = '/';
      if (navigation) {
        url = navigation.extractedUrl.toString();
      }
      this.router.navigate(['/login'], { queryParams: { returnto: url } });
      return false;
    }
  }
}
