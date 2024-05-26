import {Component, ViewChild} from '@angular/core';
import {CategoriesService} from "../service/categories/categories.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent {

  category!: Category;

  constructor(private categoryService: CategoriesService) { }


  save(): void {
    console.log('New categoryComponent: save');
    console.log('image : ' + this.category.image);
    this.categoryService.save(this.category).subscribe(
      resp => {
        console.log('Response id: ' + resp.id);
        this.category = resp;
        console.log('Category name: ' + this.category.name);
      },
      error => {
        console.log('Error: ' + error);
      }
    )
  }
}
