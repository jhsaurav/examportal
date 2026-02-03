import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar, private router:Router) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
hide = true;

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required', '', {
        duration: 3000,
      });

      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Success',
          'User ID is ' + data.id,
          'success'
        );
        this.router.navigate(['/login']);

      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong', '', {
          duration: 2000,
        })
      }
    );
  }

}
