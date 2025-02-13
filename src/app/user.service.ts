import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';  // Your Spring Boot API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/save`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/delete/${id}`);
  }
}
