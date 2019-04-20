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
  private settingsSaved:boolean = false;
  private editUsername:boolean = false;
  private editEmail:boolean = false;
  private editMessage:boolean = false;

  user : User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  deleteUser() {
    this.userService.deleteUser().subscribe();
    this.userService.logout();
    this.router.navigate(['/']);
    console.log('Account deleted.');
  }

  updateUser(){
    //reset edit trackers
    this.editUsername = false;
    this.editEmail = false;
    this.editMessage = false;

    //forward edits to backend
    this.userService.updateUser(this.user)
      .subscribe();
    this.settingsSaved = true;
    console.log('Account updated.');
  }

  //track edits
  onUsernameClick(){
    this.editUsername = true;
    this.settingsSaved = false;
  }
  onEmailClick(){
    this.editEmail = true;
    this.settingsSaved = false;
  }
  onMessageClick(){
    this.editMessage = true;
    this.settingsSaved = false;
  }

}
