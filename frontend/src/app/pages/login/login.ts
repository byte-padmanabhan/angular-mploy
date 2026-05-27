import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userId = '';
  password = '';
  role = 'General User';

  isLoading = false;

  onLogin() {
    this.isLoading = true;

    const loginData = {
      userId: this.userId,
      password: this.password,
      role: this.role,
    };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('SUCCESS:', response);

        localStorage.setItem('token', response.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        this.isLoading = false;

        this.router.navigate(['/dashboard']);
      },

      error: (error: any) => {
        console.log('ERROR:', error);

        this.isLoading = false;

        alert('Login Failed ❌');
      },
    });
  }
}
