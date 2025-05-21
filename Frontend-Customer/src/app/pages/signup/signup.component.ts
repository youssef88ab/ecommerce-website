import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage = '';

  constructor(private fb: FormBuilder,private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.userData)
      .then(() => {
        // Success - navigation handled in service
      })
      .catch((error) => {
        this.errorMessage = error || 'Registration failed';
      });
  }
}
