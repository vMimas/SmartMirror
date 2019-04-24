import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 registerForm: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.email, Validators.required]),
  password: new FormControl(null, [Validators.required]),
  username: new FormControl(null, [Validators.required])
 });

 pw : string = '';
 pwCheck : string = '';
 email : string = '';
 username: string = '';
 errorMsg : string = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  register(){
    this.userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
      //clear values
      this.pw = '';
      this.pwCheck = '';
    }, err => {
      console.log(err);
    });
    this.errorMsg = 'Sorry that person already exists. Try a different username or email.';
  }

}
