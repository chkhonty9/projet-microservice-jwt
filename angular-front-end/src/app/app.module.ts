import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./service/auth/authentication.service";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
import {UserService} from "./service/user/user.service";
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './product/product.component';

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
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
