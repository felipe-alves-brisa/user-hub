import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Post } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/users/${id}/posts`);
  }
}
