import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 totalUsers: number = 0;
  totalCategories: number = 0;
  totalQuizzes: number = 0;
  totalQuestions: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
