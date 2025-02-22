import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NavbarComponent } from "./features/layout/navbar/navbar.component";
import { FooterComponent } from "./features/layout/footer/footer.component";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { DOCUMENT } from '@angular/common';
import { Env } from './core/environment/environment';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-Ecommerce';

  constructor(@Inject(DOCUMENT) private document: Document) {}
  private readonly flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    Env.successURL = this.getBaseUrl();
    console.log('successURL:');
    console.log(Env.successURL);

  }

  getBaseUrl(): string {
    return window.location.origin; // or document.location.origin
  }
}
