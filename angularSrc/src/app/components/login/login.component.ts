import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(data => {
        this.router.navigate(['/']);
        this.userService.storeUserData(data.token, data.user, data.expiresIn);
      });
  }

}
