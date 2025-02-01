import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Hall } from 'src/app/models/hall';
import { BookingService } from 'src/app/services/booking.service';
import { HallService } from 'src/app/services/hall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  public bookings!: Booking[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public updatedBooking = new Booking;

  constructor(
    private bookingService: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllBookings();
  }

  public getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (response: Booking[]) => {
        this.bookings = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch bookings.');
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
