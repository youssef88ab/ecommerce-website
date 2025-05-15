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
    
    // Get The Requiered Role Frome The Route Data 
    const requiredRole = route.data['role'] as string ;
    console.log(`Role : ${requiredRole}`);

    // Check If the User is logged in 
    const token = localStorage.getItem('token'); 
    console.log(`Token :' ${token}`);
    if(!token) {
      this.router.navigate(['login']);
      return false; 
    }

    // Check if user has the required role 
    if (!this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/acces-denied']);
      return false;
    }
    
    return true ;
  }

}
