import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-booking-list',
  templateUrl: './my-booking-list.component.html',
  styleUrls: ['./my-booking-list.component.css']
})
export class MyBookingListComponent {
  public currentUser!: User;
  public bookings!: Booking[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public updatedBooking = new Booking;

  constructor(
    private authenticationService: AuthenticationService,
    private bookingService: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
    this.getAllBookings();
  }

  public getAllBookings(): void {
    this.bookingService.getAllBookingsByCustomerUsername(this.currentUser?.username).subscribe(
      (response: Booking[]) => {
        this.bookings = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch bookings.');
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch bookings.',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllBookings();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllBookings();
  }

  public findBookingById(id: number): void {
    this.bookingService.findBookingById(id).subscribe(
      (successResponse: Booking) => {
        this.updatedBooking = successResponse;
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occured while processing.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
