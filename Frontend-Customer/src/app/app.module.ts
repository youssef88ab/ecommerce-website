import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Make sure your main component is imported
import { AppRoutingModule } from './app-routing.module';  // Import your routing module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   // This module is required to run Angular in the browser
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],  // Bootstraps the root component
})
export class AppModule { }
