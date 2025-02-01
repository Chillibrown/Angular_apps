import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { HallListComponent } from './components/hall-list/hall-list.component';
import { MyBookingListComponent } from './components/my-booking-list/my-booking-list.component';
import { CreateHallComponent } from './components/create-hall/create-hall.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'update-user/:userId', component: UpdateUserComponent },
      { path: 'user-profile', component: UserProfileComponent },

      { path: 'create-hall', component: CreateHallComponent },
      { path: 'hall-list', component: HallListComponent },
      { path: 'booking-list', component: BookingListComponent },
      { path: 'my-booking-list', component: MyBookingListComponent },

      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
