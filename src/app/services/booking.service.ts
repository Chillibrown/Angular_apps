import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hall } from '../models/hall';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  public makeHallBooking(customerId: number, hallId: number): Observable<Booking> {
    return this.httpClient.post<Booking>(
      `${this.apiUrl}/api/bookings/book/customer/${customerId}/hall/${hallId}`,
      {}
    );
  }

  public getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.apiUrl}/api/bookings/all`);
  }

  public getAllBookingsByCustomerUsername(username: string): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.apiUrl}/api/bookings/all/customer/${username}`);
  }

  public getTotalBookings(): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/api/bookings/totalBookings`
    );
  }

  public findBookingById(id: number): Observable<Booking> {
    return this.httpClient.get<Booking>(
      `${this.apiUrl}/api/bookings/${id}`
    );
  }

  public deleteBooking(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/bookings/delete/${id}`
    );
  }
}
