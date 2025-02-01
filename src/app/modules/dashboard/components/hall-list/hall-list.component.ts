import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hall } from 'src/app/models/hall';
import { HallService } from 'src/app/services/hall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css']
})
export class HallListComponent {
  public halls!: Hall[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public updatedHall = new Hall;

  constructor(
    private hallService: HallService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllHalls();
  }

  public addNewHall(hall: Hall): void {
    this.hallService.createHall(hall).subscribe(
      (response: Hall) => {
        document.getElementById('addHallForm')?.click();
        this.getAllHalls();
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


  public onUpdateHall(hall: Hall): void {
    this.hallService.updateHall(hall, this.updatedHall?.hallId).subscribe(
      (response: Hall) => {
        document.getElementById('updateHallFormClose')?.click();
        this.getAllHalls();
        Swal.fire({
          icon: 'success',
          title: 'Hall updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update new hall.',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
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

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllHalls();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllHalls();
  }

  public findHallById(hallId: number): void {
    this.hallService.findHallById(hallId).subscribe(
      (successResponse: Hall) => {
        this.updatedHall = successResponse;
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
