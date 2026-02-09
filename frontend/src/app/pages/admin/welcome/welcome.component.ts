import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpClient } from '@angular/common/http';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  totalUsers: number = 9;
  totalCategories: number = 0;
  totalQuizzes: number = 0;

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadQuizzes();
  }

  loadCategories() {
    this.categoryService.categories().subscribe((data: any[]) => {
      this.totalCategories = data.length;
    });
  }

  
  loadQuizzes() {
    this.quizService.quizzes().subscribe((quizList: any[]) => {
      this.totalQuizzes = quizList.length;

    });
  }

}
