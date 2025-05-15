import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
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
import { DelivrerComponent } from './pages/delivrer/delivrer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccesDeniedComponent } from './pages/acces-denied/acces-denied.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';


// Services
import { AuthGuardService } from './services/auth-guard.service';
import { DelivererLayoutComponent } from './components/deliverer-layout/deliverer-layout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'acces-denied', component: AccesDeniedComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'verify-code', component: VerifyCodeComponent },

  // Admin-protected routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    data: { role: 'ADMIN' },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:productId', component: EditProductComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'order-details/:orderId', component: OrderDetailsComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:userId', component: EditUserComponent },
      { path: 'user-details/:userId', component: UserDetailsComponent },
      { path: 'product-details/:productId', component: ProductDetailsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'payment-details/:paymentId', component: PaymentDetailsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'delivrer', component: DelivrerComponent },
    ],
  },

  {
    path: 'logout',
    component: LogoutComponent
  },

  // Delivrer Protected Routes
  {
    path: 'deliverer',
    component: DelivererLayoutComponent,
    canActivate: [AuthGuardService],
    data: { role: 'DELIVERER' },
    children: [
      { path: '', component: DelivrerComponent }
    ]
  }
];
