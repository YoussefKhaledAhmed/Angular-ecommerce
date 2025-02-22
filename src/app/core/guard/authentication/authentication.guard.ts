import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';

export const authenticationGuard: CanActivateFn = (route, state) => {

  let platform = inject(PlatformService);
  let router = inject(Router);

  if(platform.checkPlatform() && localStorage.getItem('userToken')){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
