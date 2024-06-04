import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./service/auth/authentication.service";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./service/user/user.service";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HeaderComponent} from "./components/header/header.component";
import {HomeComponent} from "./components/home/home.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {NewCategoryComponent} from "./components/new-category/new-category.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {InfoComponent} from "./components/info/info.component";
import {ManageCategoriesComponent} from "./components/manage-categories/manage-categories.component";
import {ManageProductComponent} from "./components/manage-product/manage-product.component";
import {ProductComponent} from "./components/product/product.component";
import {PromoComponent} from "./components/promo/promo.component";
import {SearchComponent} from "./components/search/search.component";
import { CartComponent } from './components/cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainProfileComponent } from './components/main-profile/main-profile.component';

export function tokenGetter(): string {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('token') || '';
  } else {
    // Handle case when localStorage is not available
    console.error('localStorage is not available');
    return '';
  }
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    NewProductComponent,
    NewCategoryComponent,
    CategoriesComponent,
    LayoutComponent,
    ProfileComponent,
    InfoComponent,
    ManageCategoriesComponent,
    ManageProductComponent,
    ProductComponent,
    PromoComponent,
    SearchComponent,
    CartComponent,
    MainProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8888'], // Update with your domain
        disallowedRoutes: ['localhost:8888/USER-MANAGER-SERVICE/login'] // Update with your login route
      }
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    provideClientHydration(),
    AuthenticationService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
