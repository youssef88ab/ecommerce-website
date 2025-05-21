import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { PlainComponent } from './plain/plain.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
/*import { SignupComponent } from './pages/signup/signup.component';*/
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AuthGuardService } from './admin/services/auth-guard.service';
import { LogoutComponent } from './admin/pages/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'cart', component: CartComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'product/:id', component: ProductDetailComponent },
    ]
  },
  {
    path: '',
    component: PlainComponent, // Contains only <router-outlet>
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      /*{ path: 'signup', component: SignupComponent },*/
      { path: 'forgot-pass', component: ForgotPassComponent },
      { path: 'verify-code', component: VerifyCodeComponent }
      // other routes without navbar
    ],
  },
   // Admin-protected routes
   {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    data: { role: 'ADMIN' },
    children: [
      { path: '', component: DashboardComponent },
    ],
  },
  {
     path: 'logout', component: LogoutComponent
  },

];
