import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  baseurl: string = "localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) { }


  AddUser(obj): Observable<any[]> {
    return this.http.post<any>(
      this.baseurl + "/auth/newUser",
      obj,
      this.httpOptions
    );
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseurl + "/user/users",
      this.httpOptions
    );
  }

  DeleteUser(id): Observable<User[]> {
    return this.http.delete<any>(
      this.baseurl + "/user/delete/" + id,
      this.httpOptions
    );
  }
}
