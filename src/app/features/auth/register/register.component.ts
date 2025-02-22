import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, inject, input, ViewChild, ViewChildren } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  /* DOM elements */
  /* Validate name input element */
  @ViewChild('validateName') validateNameElement !: ElementRef;
  /* Validate email input element */
  @ViewChild('validateEmail') validateEmailElement !: ElementRef;
  /* Validate pass input element */
  @ViewChild('validatePass') validatePassElement !: ElementRef;
  /* Validate repassowrd input element */
  @ViewChild('validateRepass') validateRepassElement !: ElementRef;
  /* Validate phone input element */
  @ViewChild('validatePhone') validatePhoneElement !: ElementRef;


  /* Show password */
  showPassword : boolean = false;

  /* Show rePassword */
  showRepassword : boolean = false;

  /* form to collect user signup data */
  registerForm : FormGroup = new FormGroup({
    name : new FormControl(
                            null , 
                            [ 
                              /* Required field */
                              Validators.required , 
                              /* name minimum length: 3 characters */
                              Validators.minLength(3) , 
                              /* name maximum length: 20 characters */
                              Validators.maxLength(20)
                            ]
                          ),
    email : new FormControl(
                             null , 
                             [
                               /* Required field */
                               Validators.required ,
                               /* Validating if this field is in the * 
                                * email form.                        */
                               Validators.email
                             ]
                           ),
    password : new FormControl(
                                null , 
                                [ 
                                  /* Required field */
                                  Validators.required ,
                                  /* Required to be compatiple of the *
                                   * following regex.                 */
                                  Validators.pattern(/^[A-Z][A-Za-z0-9]{6,10}$/)
                                ]
                              ),
    rePassword : new FormControl(
                                  null , 
                                  [ 
                                    /* Required field */
                                    Validators.required ,
                                    /* Required to be compatiple of the *
                                     * following regex.                 */
                                    Validators.pattern(/^[A-Z][A-Za-z0-9]{6,10}$/)
                                  ]
                                ),
    phone : new FormControl(
                              null , 
                              [ 
                                /* Required field */
                                Validators.required ,
                                /* Required to be compatiple of the *
                                 * following regex.                 */
                                Validators.pattern(/^(01)[0125][0-9]{8}$/)
                              ]
                           )
  });

  /* property to check on the equality between password field *
   * and the repassword field in the form.                    */
  rePasswordExtraValidation : boolean = true;

  /* property to show and hide loading of the request */
  isLoading : boolean = false;

  /* Injecting signUp service */
  private readonly authenticationService = inject(AuthenticationService);

  /* Injecting toastr service */
  private readonly toastrService = inject(ToastrService);

  /* Injecting router service */
  private readonly router = inject(Router);

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
    /* reassiging the rePasswordExtraValidation property */
    this.rePasswordExtraValidation = this.registerForm.get('rePassword')?.value === this.registerForm.get('password')?.value;
    
    /* if the input is rePassword then do 2 checks:          *
     * 1. check if it is compatible with the pattern or not. *
     * 2. check if it is same as the password or not.        */
    if(whichInput == 'rePassword'){
      if (this.rePasswordExtraValidation && !this.registerForm.get('rePassword')?.errors){
        this.validateRepassElement.nativeElement.classList.add('opacity-0');
        this.validateRepassElement.nativeElement.classList.add('h-0');
        this.validateRepassElement.nativeElement.classList.remove('opacity-100');
        this.validateRepassElement.nativeElement.classList.remove('h-12');

        
      } else {
        this.validateRepassElement.nativeElement.classList.remove('opacity-0');
        this.validateRepassElement.nativeElement.classList.remove('h-0');
        this.validateRepassElement.nativeElement.classList.add('opacity-100');
        this.validateRepassElement.nativeElement.classList.add('h-12');
      }
    }
    /* if the input to be validated is any one other than rePassword input */ 
    else{
      /* if there is no errors regarding the angular validation */
      if( this.registerForm.get(whichInput)?.errors ){
        switch(whichInput){
          case 'name':
            this.validateNameElement.nativeElement.classList.remove('opacity-0');
            this.validateNameElement.nativeElement.classList.remove('h-0');
            this.validateNameElement.nativeElement.classList.add('opacity-100');
            this.validateNameElement.nativeElement.classList.add('h-12');
            break;
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
          case 'phone':
            this.validatePhoneElement.nativeElement.classList.remove('opacity-0');
            this.validatePhoneElement.nativeElement.classList.remove('h-0');
            this.validatePhoneElement.nativeElement.classList.add('opacity-100');
            this.validatePhoneElement.nativeElement.classList.add('h-12');
            break;
        }
      }
      /* if there is error regarding the Angular validation */
      else{
        switch(whichInput){
          case 'name':
            this.validateNameElement.nativeElement.classList.add('opacity-0');
            this.validateNameElement.nativeElement.classList.add('h-0');
            this.validateNameElement.nativeElement.classList.remove('opacity-100');
            this.validateNameElement.nativeElement.classList.remove('h-12');
            break;
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
          case 'phone':
            this.validatePhoneElement.nativeElement.classList.add('opacity-0');
            this.validatePhoneElement.nativeElement.classList.add('h-0');
            this.validatePhoneElement.nativeElement.classList.remove('opacity-100');
            this.validatePhoneElement.nativeElement.classList.remove('h-12');
            break;
        }
      }
    }
  }

  showHidePassword(event:Event){
    this.showPassword = (event.target as HTMLInputElement).checked;
  }
  showHideRepassword(event:Event){
    this.showRepassword = (event.target as HTMLInputElement).checked;
  }

  RegisterSubmit(){
    if( this.registerForm.valid && this.rePasswordExtraValidation ){
      /* run the spinner */
      this.isLoading = true;
      this.authenticationService.sendRegisterInfo(this.registerForm.value).subscribe({
        next : (response)=>{
          
          this.toastrService.success('Thank you for your time' , 'signup succeeded');
          /* stopping the loading spinner */
          this.isLoading = false;
          /* setting the token in the local storage */
          localStorage.setItem('userToken' , response.token);

          /* navigate to login page */
          this.router.navigate(['/login']);
        },
        error: (err)=>{
          /* stopping the loading spinner */
          this.isLoading = false;
        }
      });
    }
  }
}