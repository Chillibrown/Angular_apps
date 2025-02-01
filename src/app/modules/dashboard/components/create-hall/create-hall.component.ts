import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hall } from 'src/app/models/hall';
import { HallService } from 'src/app/services/hall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.css']
})
export class CreateHallComponent {

  constructor(
    private hallService: HallService,
    private router: Router,
  ) {}

  public createHall(hall: Hall): void {
    this.hallService.createHall(hall).subscribe(
      (response: Hall) => {
        this.router.navigateByUrl('/dashboard/hall-list')
        Swal.fire({
          icon: 'success',
          title: 'New hall added.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to create new hall.',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }
  
}
