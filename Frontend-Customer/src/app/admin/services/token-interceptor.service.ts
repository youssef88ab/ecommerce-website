import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptorService: HttpInterceptorFn = (req, next) => {
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);  // Debugging

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      console.log('Request with token:', cloned);  // Debugging
      return next(cloned);
    }

    console.log('Request without token');  // Debugging
  } else {
    console.log('Not running in browser — skipping localStorage access');
  }

  return next(req);
};
