import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
    .subscribe(
      data => {console.log(data); this.router.navigate(['/'])},
      error => console.log(error)
    );
  }

}
