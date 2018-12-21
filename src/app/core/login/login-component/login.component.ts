import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/User';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  principalUser: boolean;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkLogin();
  }
  private checkLogin() {
    this.authService.signinReq().subscribe((res: any) => {
      this.user = res.principal;
      this.principalUser = !!res.principal;
    });
  }
  loginUser(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe((res: any) => {
      if (res.principal === undefined) {
        return window.alert('Пользователь не найден! Попробуйте ещё раз');
      } else {
        this.user = res.principal;
        for (const role of this.user.roles) {
          if (this.user.roles.indexOf(role) !== -1) {
            if (role === 'ADMIN') {
              this.router.navigate(['payments']);
              this.authService.setAdminLoggedIn(true);
              return this.authService.setUserLoggedIn(true);
            } else if (role === 'USER') {
              this.router.navigate(['products']);
              return this.authService.setUserLoggedIn(true);
            } else {
              return window.alert(res.message);
            }
          }
        }
      }
      });
  }

  registrUser(registrForm: NgForm) {
    this.authService.register(registrForm.value).subscribe(res => {
      this.user = res;
    });
  }

  logoutUser() {
      this.authService.logout().subscribe( (res: any) => {
        if (this.user === undefined) {
           return window.alert('Вы ещё не зашли!');
        } else {
          this.router.navigate(['/']);
          this.user = res;
          this.principalUser = !!res.principal;
          this.authService.setAdminLoggedIn(false);
          return this.authService.setUserLoggedIn(false);
        }
    });
  }
}
