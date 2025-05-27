import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string;
    console.log(`Role: ${requiredRole}`);
  
    // ✅ Check if window is defined (i.e., running in the browser)
    if (typeof window === 'undefined') {
      console.warn('localStorage is not available in this environment');
      return false;
    }
  
    const token = localStorage.getItem('token');
    console.log(`Token: '${token}'`);
  
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
  
    if (!this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/acces-denied']);
      return false;
    }
  
    return true;
  }
  

}
