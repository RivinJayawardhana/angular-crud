import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  openAddUserModal(): void {
    let name = prompt('Enter Name:');
    let email = prompt('Enter Email:');
    if (name && email) {
      const newUser: User = { id: 0, name, email };
      this.userService.addUser(newUser).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  editUser(user: User): void {
    let newName = prompt('Edit Name:', user.name);
    let newEmail = prompt('Edit Email:', user.email);
    if (newName && newEmail) {
      const updatedUser: User = { ...user, name: newName, email: newEmail };
      this.userService.updateUser(user.id, updatedUser).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
