import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {HomeComponent} from "./components/home/home.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductComponent} from "./components/product/product.component";
import {PromoComponent} from "./components/promo/promo.component";
import {SearchComponent} from "./components/search/search.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {InfoComponent} from "./components/info/info.component";
import {NewCategoryComponent} from "./components/new-category/new-category.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {ManageCategoriesComponent} from "./components/manage-categories/manage-categories.component";
import {ManageProductComponent} from "./components/manage-product/manage-product.component";

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path: "register", component: SignUpComponent},
  {
    path: "layout", component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: "home", component: HomeComponent},
      {path: "categories", component: CategoriesComponent },
      {path: 'product', component: ProductComponent},
      {path: 'promo', component: PromoComponent},
      {path: 'search', component: SearchComponent},
      {
        path: "profile", component: ProfileComponent,
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
