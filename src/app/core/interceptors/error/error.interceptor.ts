import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let toastrService = inject(ToastrService);

  return next(req).pipe(catchError( (error)=>{
    toastrService.error(error.error.message , 'Error details');
    return throwError( ()=>error )
  }));
};
