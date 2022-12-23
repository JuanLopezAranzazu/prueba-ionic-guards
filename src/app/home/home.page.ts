import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginUrl = '';
  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loginUrl =
      this.activateRoute.snapshot.queryParamMap.get('returnto') || 'profile';
    console.log(this.loginUrl);
  }

  signIn() {
    localStorage.setItem('authenticated', '1');
    this.router.navigateByUrl(this.loginUrl);
  }
}
