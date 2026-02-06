import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { HttpClient } from '@angular/common/http';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  totalUsers: number = 0;
  totalCategories: number = 0;
  totalQuizzes: number = 0;
  totalQuestions: number = 0;

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private userService: UserService,
    private questionService: QuestionsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCategories();
    this.loadQuizzes();
  }

  // ---------------- USERS -----------------
  loadUsers() {
    // UserService has no method → fetch manually
    this.http.get(`${baseUrl}/user/`).subscribe((data: any[]) => {
      this.totalUsers = data.length;
    });
  }

  // ---------------- CATEGORIES -----------------
  loadCategories() {
    this.categoryService.categories().subscribe((data: any[]) => {
      this.totalCategories = data.length;
    });
  }

  // ---------------- QUIZZES & QUESTIONS COUNT -----------------
  loadQuizzes() {
    this.quizService.quizzes().subscribe((quizList: any[]) => {
      this.totalQuizzes = quizList.length;

      // Count questions across all quizzes
      this.countQuestionsInAllQuizzes(quizList);
    });
  }

  countQuestionsInAllQuizzes(quizzes: any[]) {
    let count = 0;
    let processed = 0;

    if (quizzes.length === 0) {
      this.totalQuestions = 0;
      return;
    }

    quizzes.forEach(q => {
      this.questionService.getQuestionsOfQuiz(q.qid).subscribe((questions: any[]) => {
        count += questions.length;
        processed++;

        if (processed === quizzes.length) {
          this.totalQuestions = count;
        }
      });
    });
  }

}
