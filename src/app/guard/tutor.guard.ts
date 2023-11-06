import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tutorlogedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('tutorSecret');
  console.log(token);

  if (!token) {
    router.navigate(['/tutor']);
    return false;
  } else {
    return true;
  }
};

export const tutorlogoutGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let token: string | null = localStorage.getItem('tutorSecret');
  if (token) {
    router.navigate(['/tutor/tutor-home']);
    return false;
  } else {
    return true;
  }
};
