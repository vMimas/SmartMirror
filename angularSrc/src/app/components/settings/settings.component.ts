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
  private settingsSaved : boolean = false;
  private passwordSaved : boolean = false;

  private editUsername : boolean = false;
  private editEmail : boolean = false;
  private editMessage : boolean = false;

  private showSettings : boolean = false;
  private showPassword : boolean = false;
  private showDelAccount : boolean = false;

  user : User;
  pwNew : string = '';
  pwCheck : string = '';

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

  updatePassword(){
    this.user.password = this.pwNew;
    console.log(this.user.password);
    if (this.user.password){
      this.passwordSaved = true;
      //forward password to backend
      this.userService.updatePassword(this.user)
        .subscribe();
    //clear values
    this.pwNew = '';
    this.pwCheck = '';
    } else {
      console.log("No password stored.")
    }
  }

  hideAlerts(){
    //toggle save state
    this.settingsSaved = false;
    this.passwordSaved = false;
  }

  toggleSettings(){
    this.hideAlerts();

    if(this.showSettings === true){
      this.showSettings = false;
    } else {
      this.showSettings = true;
    }
  }

  togglePWedit(){
    this.hideAlerts();

    if(this.showPassword === true){
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }
  toggleDelete(){
    this.hideAlerts();

    if(this.showDelAccount === true){
      this.showDelAccount = false;
    } else {
      this.showDelAccount = true;
    }
  }

  //track edits
  onUsernameClick(){
    this.editUsername = true;
    this.hideAlerts();
  }
  onEmailClick(){
    this.editEmail = true;
    this.hideAlerts();
  }
  onMessageClick(){
    this.editMessage = true;
    this.hideAlerts();
  }

}
