import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/admin';

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`, this.getHeaders());
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`, this.getHeaders());
  }

  createUser(userData: any) {
    return this.http.post(`${this.apiUrl}/users`, userData, this.getHeaders());
  }
}
