import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../models/Category';
import {CategoriesService} from '../../../services/categories.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  @ViewChild('inputImg') inputRef: ElementRef;
  categories: Category[] = [];
  image: File;
  imagePreview: any;
  principalUser: boolean;

  constructor(
    private categoriesService: CategoriesService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res.result ? res.result : [];
      this.principalUser = !!res.user;
      this.imagePreview = 'http://localhost:3000/upload/7Z85AwR-QnU-1547713926459.jpg';
    });
  }

  removeCategory(category: Category) {
    this.categoriesService.delete(category._id).subscribe(() => {
      this.getCategories();
    });
  }
  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

  createCategory(categoryForm: NgForm) {
    this.categoriesService.createCategory(categoryForm.value, this.image).subscribe((newCategory) => {
      console.log(newCategory);
      this.categories.push(newCategory);
    });
  }
}
