import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@services/auth/auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);

  const alreadyLogin = authService.getLogin();
  if (alreadyLogin) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
