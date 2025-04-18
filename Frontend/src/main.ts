import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TokenInterceptorService } from './app/services/token-interceptor.service';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideHttpClient() , provideHttpClient(withInterceptors([TokenInterceptorService])),
  provideRouter(routes)]
}).catch((err) => console.error(err));



