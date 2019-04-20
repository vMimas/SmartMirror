import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(){
    // window.addEventListener('scroll', (event)=>{
    //   var scrolled = window.pageYOffset;
    //   const background = document.getElementById('background');
    //   background.style.top = -(scrolled * .2) + 'px';
    // });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

}
