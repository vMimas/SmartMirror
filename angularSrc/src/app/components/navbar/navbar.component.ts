import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  logout(){
    //no need to subscribe.
    this.userService.logout();
    this.router.navigate(['/login']);

  }

  loadDashboard(){
    this.userService.getDashboard().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.router.navigate(['/dashboard']);
    document.querySelector('nav').classList.add('.d-none');
  }

  loadSettings(){
    this.userService.getSettings().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.router.navigate(['/settings']);
    document.querySelector('nav').classList.add('.d-none');
  }

}
