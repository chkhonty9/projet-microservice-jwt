import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {CategoriesComponent} from "./categories/categories.component";
import {HomeComponent} from "./home/home.component";
import {LayoutComponent} from "./layout/layout.component";
import {ProfileComponent} from "./profile/profile.component";
import {InfoComponent} from "./info/info.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {NewCategoryComponent} from "./new-category/new-category.component";
import {ManageCategoriesComponent} from "./manage-categories/manage-categories.component";
import {ManageProductComponent} from "./manage-product/manage-product.component";

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path: "register", component: SignUpComponent},
  {path: "layout", component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: "home", component: HomeComponent},
      {path: "categories", component: CategoriesComponent },
      {path: "profile", component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {path: "info", component: InfoComponent},
          {path: "new-category", component: NewCategoryComponent},
          {path: "new-product", component: NewProductComponent},
          {path: "manage-categories", component: ManageCategoriesComponent},
          {path: "manage-product", component: ManageProductComponent},
        ]
      }
    ],
  },
  {path:"", redirectTo:"login", pathMatch:"full"},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
