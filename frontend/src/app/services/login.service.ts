import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { ReturnStatement } from '@angular/compiler';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject=new Subject<boolean>();

  constructor(private http: HttpClient) { }
  //currrent user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }
  //Generate Token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }
  //Login user
  public loginUser(token) {
    localStorage.setItem('token', token);
    return true;
  }
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;

    } else {
      return true;
    }
  }
  //logout
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //get token
  public getToken() {
    return localStorage.getItem('token');
  }
  //set userdetails
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }
  //get user role
  // public getUserRole(){
  //   let user=this.getUser();
  //   return user.authorities[0].authority;
  // }
  public getUserRole() {
    let user = this.getUser();
    if (user && user.userRoles && user.userRoles.length > 0) {
      return user.userRoles[0].role.roleName;  // matches the JSON structure you showed
    }
    return null;
  }
}
