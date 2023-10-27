import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userlogedGuard: CanActivateFn = (route, state) => {

  const router:Router = inject(Router)

  let token:string | null = localStorage.getItem('userSecret')
  console.log(token);
  if(token){
    router.navigate(['/'])
    return false
  }else{
    return true
  }
  
};

export const userlogoutGuard: CanActivateFn = (route,state)=>{

  const router:Router = inject(Router);

  let token:string | null =localStorage.getItem('userSecret')

  if(token){
    return true;
  }else{
    router.navigate(['/login'])
    return false
  }
}