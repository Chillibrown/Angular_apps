import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HallListComponent } from './components/hall-list/hall-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MyBookingListComponent } from './components/my-booking-list/my-booking-list.component';
import { CreateHallComponent } from './components/create-hall/create-hall.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UserListComponent,
    UpdateUserComponent,
    UserProfileComponent,
    HallListComponent,
    BookingListComponent,
    MyBookingListComponent,
    CreateHallComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class DashboardModule {}
