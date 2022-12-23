import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
// services
import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  posts = [];

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.postService.findAll().subscribe(
      async (res: any) => {
        console.log(res);
        this.posts = res;
        await loading.dismiss();
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
  }

  /*
  logout() {
    localStorage.setItem('authenticated', '0');
    this.router.navigateByUrl('/');
  }
  */

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
