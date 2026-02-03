import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { error } from 'console';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  qId;
  qTitle;
  question = {
    quiz: {
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionsService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['id'] = this.qId;
  }
  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added', 'success');
        this.question.content='',
                this.question.content='',
                this.question.option1='',
                this.question.option2='',
                this.question.option3='',
                this.question.option4=''

      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
