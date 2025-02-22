import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotFoundComponent } from './features/layout/not-found/not-found.component';
import { authenticationGuard } from './core/guard/authentication/authentication.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { AllOrdersComponent } from './features/pages/all-orders/all-orders.component';
import { AddressComponent } from './features/pages/address/address.component';
import { OrderDetailsComponent } from './features/pages/order-details/order-details.component';

export const routes: Routes = [
    
    /* Redirecting to home if path is empty */
    {path:"" , redirectTo:"home" , pathMatch:'full'},
    
    /* Pages routing */
    {path:"home", component:HomeComponent , title: 'home' , canActivate: [authenticationGuard]},
    {path:"cart", component:CartComponent , title: 'cart' , canActivate: [authenticationGuard]},
    {path:"brands", component:BrandsComponent , title: 'brands' , canActivate: [authenticationGuard]},
    {path:"categories", component:CategoriesComponent , title: 'categories' , canActivate: [authenticationGuard]},
    {path:"products", component:ProductsComponent , title: 'products' , canActivate: [authenticationGuard]},
    {path:"productDetails/:productId", component:ProductDetailsComponent , title: 'product details' , canActivate: [authenticationGuard]},
    {path:"allorders", component:AllOrdersComponent , title: 'orders' , canActivate: [authenticationGuard]},
    {path:"orderdetails", component:OrderDetailsComponent , title: 'order details' , canActivate: [authenticationGuard]},
    {path:"address/:cartId", component:AddressComponent , title: 'shipping address' , canActivate: [authenticationGuard]},

    /* Authentication components roting */
    {path: "login" , component:LoginComponent , title:'Login'},
    {path: "register" , component:RegisterComponent , title:'Register'},

    /* not-found routing if the path is incorrect */
    {path:"**",component:NotFoundComponent , title: 'not found'}
];
