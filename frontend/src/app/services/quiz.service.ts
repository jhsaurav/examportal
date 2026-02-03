import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }
  //add quiz
  public addQuiz(quiz) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }
  //delete quiz
  public deleteQuiz(qid) {
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }
  //get single quiz
  public getQuiz(qid) {
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }
  //Update quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/`,quiz)
  }
  //get quizzes of category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  //active quiz
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/activate`);
  }
  public getActiveQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/activate/${cid}`);
  }
}
