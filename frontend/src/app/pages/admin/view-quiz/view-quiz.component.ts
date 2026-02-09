import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
  page:number=1;
  quizzes:any[] = [];
  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading', 'error');
      }
    );
  }
  //delete
  deleteQuiz(qid) {
    Swal.fire({
      icon: 'info',
      title: 'are you sure',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.id != qid);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in Deleting Quiz', 'error');
          });
      }
    })
  }
}

