import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Category} from '../../../../models/Category';
import {CategoriesService} from '../../../../services/categories.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  @ViewChild('inputImg') inputRef: ElementRef;
  image: File;
  category: Category = new Category();
  imagePreview: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.category = <Category>data;
      this.categoriesService.getById(this.category._id).subscribe(
        (res: any) => {
          console.log(res);
          this.category = res.result;
          this.imagePreview = `http://localhost:3000/upload/categoryImgs/${this.category.imageSrc}`;
        }
      );
    });
  }
  updateCategory(categoryForm: NgForm) {
    this.category = {...this.category, ...categoryForm.value};
    this.categoriesService.updateCategory(this.category._id, this.category, this.image).subscribe((res) => {
      this.category = res;
      this.router.navigate(['categories'], {});
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
      this.category.imageSrc = file.name;
    };
    reader.readAsDataURL(file);
  }


}
