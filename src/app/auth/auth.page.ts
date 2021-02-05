import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in...',
      })
      .then((loadingEl) => {
        loadingEl.present();

        setTimeout(() => {
          loadingEl.dismiss();
          this.isLoading = false;
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let email = form.value.email;
    let password = form.value.password;
  }
}
