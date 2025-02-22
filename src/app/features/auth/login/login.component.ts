import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /* DOM elements */
  /* Validate email input element */
  @ViewChild('validateEmail') validateEmailElement !: ElementRef;
  /* Validate pass input element */
  @ViewChild('validatePass') validatePassElement !: ElementRef;

  /* reactive form to hold the login data */
  loginForm : FormGroup = new FormGroup({
    email : new FormControl( null, 
                             [
                              /* Required field */
                              Validators.required,
                              /* Validating if this field is in the * 
                                * email form.                       */
                              Validators.email
                             ]
                            ),
    password : new FormControl( null , 
                                [
                                  /* required field */
                                  Validators.required ,
                                  /* Required to be compatiple of the *
                                   * following regex.                 */
                                  Validators.pattern(/^[A-Z][A-Za-z0-9]{6,10}$/)
                                ]
                              )
  });

  /* Show password */
  showPassword : boolean = false;

  /* property to show and hide loading of the request */
  isLoading : boolean = false;

  /* importing required services */
  /* Authentication service */
  private readonly authenticationService = inject(AuthenticationService);
  /* router service */
  private readonly router = inject(Router);
  /* Toastr service */
  private readonly toastrService = inject(ToastrService);

  /**
   * Method name: validateInput
   * arguments (in): whichInput (which one to validate from the form fields
   *                        i.e., name, email, password, rePassword, phone)
   * arguments (out): none
   * arguments (in/out): none
   * Sync/Assync: Synchronous 
   * return: none
   */
  validateInput(whichInput : string){
    /* if there is errors regarding the angular validation */
    if( this.loginForm.get(whichInput)?.errors ){
      switch(whichInput){
        case 'email':
          this.validateEmailElement.nativeElement.classList.remove('opacity-0');
          this.validateEmailElement.nativeElement.classList.remove('h-0');
          this.validateEmailElement.nativeElement.classList.add('opacity-100');
          this.validateEmailElement.nativeElement.classList.add('h-12');
          break;
        case 'password':
          this.validatePassElement.nativeElement.classList.remove('opacity-0');
          this.validatePassElement.nativeElement.classList.remove('h-0');
          this.validatePassElement.nativeElement.classList.add('opacity-100');
          this.validatePassElement.nativeElement.classList.add('h-12');
          break;
      }
    }
    /* if there is no error regarding the Angular validation */
    else{
      switch(whichInput){
        case 'email':
          this.validateEmailElement.nativeElement.classList.add('opacity-0');
          this.validateEmailElement.nativeElement.classList.add('h-0');
          this.validateEmailElement.nativeElement.classList.remove('opacity-100');
          this.validateEmailElement.nativeElement.classList.remove('h-12');
          break;
        case 'password':
          this.validatePassElement.nativeElement.classList.add('opacity-0');
          this.validatePassElement.nativeElement.classList.add('h-0');
          this.validatePassElement.nativeElement.classList.remove('opacity-100');
          this.validatePassElement.nativeElement.classList.remove('h-12');
          break;
      }
    }
  }
  
  /**
   * Method name: showHidePassword
   * @param event 
   * Description: setting the showPassword property 
   *              if the btn is checked.
   */
  showHidePassword(event:Event){
    this.showPassword = (event.target as HTMLInputElement).checked;
  }

  loginSubmit(){
    if( this.loginForm.valid ){
      
      /* run the spinner */
      this.isLoading = true;

      this.authenticationService.sendLoginInfo(this.loginForm.value).subscribe({
        next : (response)=>{
          /* stopping the loading spinner */
          this.isLoading = false;

          /* setting the token in the local storage */
          localStorage.setItem('userToken' , response.token);

          /* Saving user data */
          this.authenticationService.saveUserInfo();
          
          /* navigate to login page */
          this.router.navigate(['/home']);
        },
        error: ()=>{
          /* stopping the loading spinner */
          this.isLoading = false;
        }
      });
    }
  }
}