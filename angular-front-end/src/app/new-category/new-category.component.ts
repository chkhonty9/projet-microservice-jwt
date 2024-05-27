import {Component} from '@angular/core';
import {CategoriesService} from "../service/categories/categories.service";
import {Category} from "../model/category";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent {

  category: Category = new Category();
  selectedFileName: string = '';

  constructor(private categoryService: CategoriesService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file.name;
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.category.image = reader.result as string;
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  save(): void {
    console.log('New categoryComponent: save');
    console.log('image : ' + this.category.image);
    this.category.id = null;
    this.category.products = [];
    this.categoryService.createCategory(this.category).subscribe(
      resp => {
        console.log('Response : ' + resp);
        this.category = resp;
        console.log('Category name: ' + this.category.name);
        this.category = new Category();
      },
      error => {
        console.log('Error: ' + error);
      }
    )
  }
}
