import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  }
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }
  hide = true;
  ngOnInit(): void {
  }
  formSubmit() {
    console.log('login');
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required !!', '', {
        duration: 3000,
      });
      return;
    }
    //request to server
    this.login.generateToken(this.loginData).subscribe((data: any) => {
      console.log('sucess');
      console.log(data);


      //login
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
        (user: any) => {
          this.login.setUser(user);
          console.log(user);

          const role = this.login.getUserRole();
          console.log("Role from backend:", role);

          if (role && role.toUpperCase() === 'ADMIN') {
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);

          } else if (role && role.toUpperCase() === 'NORMAL') {
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);

          } else {
            this.login.logout();
          }
        }
      );

    },
      (error) => {
        console.log('error');
        console.log(error);
      }
    );

  }
}
