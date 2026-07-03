import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Auth } from '@services/auth/auth';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(Auth);

  const user = authService.getLogin();
  if(user){
    
  }

  return true;
};
