import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hall } from '../models/hall';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  public createHall(hall: Hall): Observable<Hall> {
    return this.httpClient.post<Hall>(
      `${this.apiUrl}/api/halls/create`,
      hall
    );
  }

  public updateHall(
    hall: Hall,
    hallId: number
  ): Observable<Hall> {
    return this.httpClient.put<Hall>(
      `${this.apiUrl}/api/halls/update/${hallId}`,
      hall
    );
  }

  public getAllHalls(): Observable<Hall[]> {
    return this.httpClient.get<Hall[]>(`${this.apiUrl}/api/halls/all`);
  }

  public getTotalHalls(): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/api/halls/totalHalls`
    );
  }

  public findHallById(hallId: number): Observable<Hall> {
    return this.httpClient.get<Hall>(
      `${this.apiUrl}/api/halls/${hallId}`
    );
  }

  public deleteHall(hallId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/halls/delete/${hallId}`
    );
  }
}
