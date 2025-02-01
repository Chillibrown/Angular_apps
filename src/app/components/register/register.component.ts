import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public registerCustomer(user: User): void {
    this.authenticationService.registerCustomer(user).subscribe(
      (response: User) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'New user registered successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to register new user.',
          showConfirmButton: true,
        });
        console.log('Failed to register user.');
      }
    );
  }
}
