import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { Booking } from 'src/app/models/booking';
import { Hall } from 'src/app/models/hall';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import { HallService } from 'src/app/services/hall.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public currentUser!: User;
  public users!: User[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public totalUsers!: number;
  public totalServices!: number;
  public totalPayments!: number;
  public totalCustomers!: number;
  public halls!: Hall[];
  public hall = new Hall();
  public totalHalls!: number;
  public totalBookings!: number;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private hallService: HallService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
    this.getAllHalls();
    this.getAllUsers();
    this.getTotalUsers();
    this.getTotalCustomers();
    this.getTotalHalls();
    this.getTotalBookings();
  }

  public getAllHalls(): void {
    this.hallService.getAllHalls().subscribe(
      (response: Hall[]) => {
        this.halls = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch halls.');
      }
    );
  }


  public findHallById(hallId: number): void {
    this.hallService.findHallById(hallId).subscribe(
      (response: Hall) => {
        this.hall = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch halls.');
      }
    );
  }


  public makeHallBooking(hallId: number): void {
    this.bookingService.makeHallBooking(this.currentUser?.userId, hallId).subscribe(
      (response: Booking) => {
        this.router.navigateByUrl('/dashboard/my-booking-list')
        Swal.fire({
          icon: 'success',
          title: 'Hall booked successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to book hall.',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }



  // DISPLAY
  public getAllUsers(): void {
    this.userService.fetchAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public getTotalUsers(): void {
    this.userService.getTotalUsers().subscribe(
      (response: number) => {
        this.totalUsers = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public getTotalCustomers(): void {
    this.userService.getTotalCustomers().subscribe(
      (response: number) => {
        this.totalCustomers = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch customers.');
      }
    );
  }

  public getTotalHalls(): void {
    this.hallService.getTotalHalls().subscribe(
      (response: number) => {
        this.totalHalls = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch halls.');
      }
    );
  }

  public getTotalBookings(): void {
    this.bookingService.getTotalBookings().subscribe(
      (response: number) => {
        this.totalBookings = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch bookings.');
      }
    );
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
