import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user : User;

  private editUsername:boolean = false;
  private editEmail:boolean = false;
  private editMessage:boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  deleteUser() {
    this.userService.deleteUser().subscribe();
    this.userService.logout();
    this.router.navigate(['/']);
  }

  updateUser(){
    this.userService.updateUser(this.user)
      .subscribe();
  }

  //Click to edit stuff
  onUsernameClick(){
    this.editUsername = true;
  }
  onEmailClick(){
    this.editEmail = true;
  }
  onMessageClick(){
    this.editMessage = true;
  }

}
