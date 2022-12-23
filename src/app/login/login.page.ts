import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit() {}

  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  login() {
    if (this.validateInputs()) {
      console.log(this.postData);
    } else {
      console.log('Please enter email/username or password.');
      this.toastService.presentToast('Please enter username or password.');
    }
  }
}
