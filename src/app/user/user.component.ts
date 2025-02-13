import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClient

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ✅ Add HttpClientModule here
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {} // ✅ HttpClient injected properly

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(data => {
      this.users = data;
    });
  }
}
