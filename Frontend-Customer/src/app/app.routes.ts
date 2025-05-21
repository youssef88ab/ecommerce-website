import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { PlainComponent } from './plain/plain.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
// import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AuthGuardService } from './admin/services/auth-guard.service';
import { LogoutComponent } from './admin/pages/logout/logout.component';
import { ContactUsComponent } from './admin/pages/contact-us/contact-us.component';
import { ManageProductsComponent } from './admin/pages/manage-products/manage-products.component';
import { ManageOrdersComponent } from './admin/pages/manage-orders/manage-orders.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';
import { EditProductComponent } from './admin/pages/edit-product/edit-product.component';
import { OrderDetailsComponent } from './admin/pages/order-details/order-details.component';
import { ManageUsersComponent } from './admin/pages/manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './admin/pages/edit-user/edit-user.component';
import { UserDetailsComponent } from './admin/pages/user-details/user-details.component';
import { ProductDetailsComponent } from './admin/pages/product-details/product-details.component';
import { PaymentDetailsComponent } from './admin/pages/payments-details/payments-details.component';
import { PaymentsComponent } from './admin/pages/payments/payments.component';
import { AnalyticsComponent } from './admin/pages/analytics/analytics.component';
import { DelivererLayoutComponent } from './admin/components/deliverer-layout/deliverer-layout.component';
import { DelivrerComponent } from './admin/pages/delivrer/delivrer.component';

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
      // { path: 'signup', component: SignupComponent },
      { path: 'forgot-pass', component: ForgotPassComponent },
      { path: 'verify-code', component: VerifyCodeComponent },
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
      { path: 'dashboard', component: DashboardComponent },
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
    ],
  },
  {
    path: 'logout', component: LogoutComponent
  },
  { path: 'contact-us', component: ContactUsComponent },
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
