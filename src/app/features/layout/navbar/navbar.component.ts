import { AuthenticationService } from './../../../core/services/auth/authentication.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PlatformService } from '../../../core/services/platform/platform.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLogin : boolean = false;
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly platform = inject(PlatformService);

  ngOnInit(){
    
    if(this.platform.checkPlatform()){
      this.authenticationService.saveUserInfo();
    }

    this.authenticationService.userData.subscribe(()=>{
      if(this.authenticationService.userData.getValue() == null){

        this.isLogin = false;
      } else{
        this.isLogin = true;
      }
      console.log(this.isLogin);
    })
  }

  logout(){
    localStorage.removeItem('userToken');
    this.authenticationService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
