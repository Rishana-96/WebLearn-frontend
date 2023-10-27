import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminlogedGuard: CanActivateFn = (route, state) => {
  
  const router:Router = inject(Router)

  let token:string | null = localStorage.getItem('adminSecret')
  console.log(token);

  if(!token){
    router.navigate(['/admin'])
    return false
  }else{
    return true
  }
  
};

export const adminlogoutGuard:CanActivateFn=(route,state)=>{
  const router:Router = inject(Router);

  let token:string | null = localStorage.getItem('adminSecret')
  if(token){
    router.navigate(['/admin/dashboard'])
    return false
  }else{
  return true
  }
}
