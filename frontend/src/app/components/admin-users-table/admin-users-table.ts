import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-admin-users-table',
  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './admin-users-table.html',

  styleUrls: ['./admin-users-table.css'],
})
export class AdminUsersTableComponent implements OnInit {
  private adminService = inject(AdminService);

  users: any[] = [];

  isLoading = true;

  newUser = {
    userId: '',
    password: '',
    name: '',
    role: 'General User',
    email: '',
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;

        this.isLoading = false;
      },

      error: (error: any) => {
        console.log(error);

        this.isLoading = false;
      },
    });
  }

  createUser() {
    this.adminService.createUser(this.newUser).subscribe({
      next: () => {
        alert('User Created ✅');

        this.loadUsers();

        this.newUser = {
          userId: '',
          password: '',
          name: '',
          role: 'General User',
          email: '',
        };
      },

      error: (error: any) => {
        console.log(error);

        alert('Failed ❌');
      },
    });
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        alert('User Deleted 🗑️');

        this.loadUsers();
      },

      error: (error: any) => {
        console.log(error);

        alert('Delete Failed ❌');
      },
    });
  }
}
