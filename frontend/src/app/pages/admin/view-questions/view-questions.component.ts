import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId;
  qTitle;
  questions = [];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionsService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //delete questions
  deleteQuestion(qid) {

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are You Sure ,Want to delete this!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            Swal.fire('Success', 'Question Deleted', 'success');
          });
      }
    });
  }
}
