import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
  }

  public logout(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    Swal.fire({
      icon: 'success',
      title: 'Logout Success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authenticationService.getUserToLocalStorage().role;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ROLE_ADMIN;
  }

  public get isStaff(): boolean {
    return this.getUserRole() === Role.ROLE_STAFF;
  }

  public get isACustomer(): boolean {
    return this.getUserRole() === Role.ROLE_CUSTOMER;
  }

  public get isAdminOrStaff(): boolean {
    return this.isAdmin || this.isStaff;
  }
}
