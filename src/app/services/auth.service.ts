import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Preferences.get({ key: 'token' });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { username; password }): Observable<any> {
    return this.http
      .post('http://localhost:3001/api/v1/auth', credentials)
      .pipe(
        map((data: any) => data.token),
        switchMap((token) => {
          return from(Preferences.set({ key: 'token', value: token }));
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: 'token' });
  }
}
