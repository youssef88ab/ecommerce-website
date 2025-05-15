import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { PlainComponent } from './plain/plain.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';

export const routes: Routes = [
  {  path: '',
    component: MainComponent ,
    children: [
        { path: '', component: HomeComponent },
        { path: 'shop', component: ShopComponent },
        { path: 'cart', component: CartComponent },
        // more routes with navbar
      ]
    },
    {
      path: '',
      component: PlainComponent, // Contains only <router-outlet>
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'admin-login', component: AdminLoginComponent},
        { path: 'signup', component: SignupComponent},
        { path: 'forgot-pass', component: ForgotPassComponent},
        { path: 'verify-code', component: VerifyCodeComponent}
        // other routes without navbar
      ],
    }

];
