import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http
      .get('http://localhost:3001/api/v1/posts')
      .pipe(map((data: any) => data));
  }
}
