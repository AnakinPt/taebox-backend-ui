import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(readonly usersService: UsersService,
    readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.usersService.users().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    if (confirm('Confirm delete of user')) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.usersService.users().subscribe(users => this.users = users);
      });
    }
  }

}
