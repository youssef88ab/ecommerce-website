import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Import your routing module

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,   // This module is required to run Angular in the browser
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [],  // Bootstraps the root component
})
export class AppModule { }
