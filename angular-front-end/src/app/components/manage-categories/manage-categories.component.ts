import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../service/categories/categories.service";
import {Category} from "../../model/category";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent  implements OnInit{
  wordTosearch: any;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService) {}

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
        this.toastr.error('no category found');
        console.log('error :',error);
      }
    )
  }

  getCategory(){
    console.log('getCategory : ');
    this.categoriesService.getCategoryByName(this.wordTosearch).subscribe(
      category => {
        this.categories = category;
        if(this.categories.length == 0){
          this.toastr.error('no product found');
        }
      },
      error => {
        this.toastr.error('no category found');
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

  delete(id: string | null) {
    const shouldDelete = window.confirm("Are you sure you want to delete this item?");
    if(shouldDelete) {
      this.categoriesService.deleteCategory(id!);
      let index = this.categories.findIndex(category => category.id === id);
      this.categories.splice(index, 1);
    }
  }
}
