import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid: any;
  category: any = {};

  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cid = this.route.snapshot.params['cid'];
    this.catService.getCategory(this.cid).subscribe((data) => {
      this.category = data;
    });
  }

  updateCategory() {
    this.catService.updateCategory(this.category).subscribe(() => {
      Swal.fire("Success", "Category updated successfully", "success");
      this.router.navigate(['/admin/categories']);
    });
  }

  deleteCategory(cid: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.catService.deleteCategory(cid).subscribe(() => {
          Swal.fire("Deleted!", "Category removed", "success");
          this.router.navigate(['/admin/categories']);
        });
      }
    });
  }
}
