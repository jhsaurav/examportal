import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
// import { error } from 'console';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;
  intervalId: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionsService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
  
  get timerPercent() {
  return (this.timer / (this.questions.length * 2 * 60)) * 100;
}

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      this.questions = data;

      this.timer = this.questions.length * 2 * 60;

      this.questions.forEach((q) => {
        q['givenAnswer'] = '';
      });
      console.log(this.questions);
      this.startTimer();
    },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Error In loading quizz", "error");
      }
    );
  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
  submitQuiz() {
      this.isSubmit = false;
  this.timer = 0;
    Swal.fire({
      title: 'Do u want to submit',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });

  }
  startTimer() {
    this.intervalId = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(this.intervalId);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTimer() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min:${ss} sec`;
  }
  evalQuiz() {

    // stop timer
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksGot =parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;

        this.isSubmit = true;

        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in submitting quiz', 'error');
      }
    );
  }
  printPage(){
    window.print();
  }

}
