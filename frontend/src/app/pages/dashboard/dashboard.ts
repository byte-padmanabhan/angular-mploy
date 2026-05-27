import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserProfileComponent } from '../../components/user-profile/user-profile';

import { RecordsTableComponent } from '../../components/records-table/records-table';

import { DashboardService } from '../../services/dashboard/dashboard';
import { AdminUsersTableComponent } from '../../components/admin-users-table/admin-users-table';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [CommonModule, UserProfileComponent, RecordsTableComponent, AdminUsersTableComponent],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  profile: any = null;

  records: any[] = [];

  isLoading = true;

  ngOnInit(): void {
    this.loadProfile();

    this.loadRecords();
  }

  loadProfile() {
    this.dashboardService.getProfile().subscribe({
      next: (response: any) => {
        console.log('PROFILE:', response);

        this.profile = response.profile;
      },

      error: (error: any) => {
        console.log(error);
      },
    });
  }

  loadRecords() {
    this.dashboardService.getRecords().subscribe({
      next: (response: any) => {
        console.log('RECORDS:', response);

        this.records = response.records;

        this.isLoading = false;
      },

      error: (error: any) => {
        console.log(error);

        this.isLoading = false;
      },
    });
  }
}
