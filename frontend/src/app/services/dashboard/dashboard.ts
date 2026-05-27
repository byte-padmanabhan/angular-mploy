import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/records';

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`, this.getHeaders());
  }

  getRecords() {
    return this.http.get(`${this.apiUrl}/recordswithdelay?delay=3000`, this.getHeaders());
  }
}
