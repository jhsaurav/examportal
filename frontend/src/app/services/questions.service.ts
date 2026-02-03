import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http: HttpClient) { }
  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/questions/quiz/all/${qid}`);
  }

 public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${baseUrl}/questions/quiz/${qid}`);
  }

  //addques
  public addQuestion(questions){
    return this._http.post(`${baseUrl}/questions/`,questions);
  }
  //delete ques
  public deleteQuestion(questionId){
    return this._http.delete(`${baseUrl}/questions/${questionId}`);
  }
  //evaluate quiz
  public evalQuiz(questions){
    return this._http.post(`${baseUrl}/questions/eval-quiz`,questions);
  }
}


