import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../service/categories/categories.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent  implements OnInit{
  wordTosearch: any;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    console.log('getCategories : ');
    this.categoriesService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.log('error :',error);
      }
    )
  }

  getCategory(){
    console.log('getCategory : ');
    this.categoriesService.getCategoryByName(this.wordTosearch).subscribe(
      category => {
        this.categories = category;
      },
      error => {
        console.log('error :',error);
      }
    )
  }

  onInputChange($event: Event) {
    const inputElement = event!.target as HTMLInputElement;
    if (!inputElement.value) {
      console.log('Input cleared');
      this.getCategories();
    }
  }
}
