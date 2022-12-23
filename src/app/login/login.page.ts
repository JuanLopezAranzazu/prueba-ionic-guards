import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
// services
import { ToastService } from './../services/toast.service';
import { AuthService } from './../services/auth.service';

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
  loginUrl = '';

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginUrl =
      this.activateRoute.snapshot.queryParamMap.get('returnto') || 'profile';
    console.log(this.loginUrl);
  }
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

  async login() {
    if (this.validateInputs()) {
      const loading = await this.loadingController.create();
      await loading.present();

      console.log(this.postData);
      this.authService.login(this.postData).subscribe(
        async (res: any) => {
          await loading.dismiss();
          this.router.navigateByUrl(this.loginUrl, { replaceUrl: true });
        },
        async (res: any) => {
          console.log('Network Issue.');
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: 'Network Issue.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    } else {
      console.log('Please enter email/username or password.');
      this.toastService.presentToast('Please enter username or password.');
    }
  }
}
