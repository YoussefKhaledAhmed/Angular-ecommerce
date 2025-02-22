import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(localStorage.getItem('userToken')){
    let userHeader: any = {
      token : localStorage.getItem('userToken')
    };
    
    req = req.clone({
      setHeaders: userHeader
    });
  }
  
  
  return next(req);
};
