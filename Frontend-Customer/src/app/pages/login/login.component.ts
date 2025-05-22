import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;
    constructor(private authService: AuthService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!);
    }
  }
}