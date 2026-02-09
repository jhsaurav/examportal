import { Component, OnInit } from '@angular/core';
// import { error } from 'console';
import { title } from 'process';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];
page: number = 1; 
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    console.log("ViewCategories ngOnInit running...");
    this._category.categories().subscribe((data: any) => {
      console.log("DATA RECEIVED:", data);
      this.categories = data;
     
    },
      (error) => {
        console.log("ERROR:",error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }



}
