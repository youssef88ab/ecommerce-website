import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AuthGuardService } from './services/auth-guard.service'; // Import Auth Guard
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'products', component: ProductsComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit-product/:productId',
    component: EditProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'order-details/:orderId',
    component: OrderDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-details/:userId' , 
    component: UserDetailsComponent , 
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-user/:userId' , 
    component: EditUserComponent , 
    canActivate: [AuthGuardService]
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-user', 
    component: AddUserComponent , 
    canActivate: [AuthGuardService]
  }, 
  {
    path: 'product-details/:productId',
    component: ProductDetailsComponent , 
    canActivate: [AuthGuardService]
  }, 
  {
    path: 'payments', 
    component: PaymentsComponent ,
    canActivate: [AuthGuardService]
  }, 
  {
    path: 'analytics', 
    component: AnalyticsComponent, 
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent, 
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact-us', 
    component: ContactUsComponent, 
    canActivate: [AuthGuardService]
  },
  {
    path: 'payment-details/:paymentId',
    component: PaymentDetailsComponent,
    canActivate: [AuthGuardService]
  }
];
