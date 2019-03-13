import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, CanActivate  } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService, private router: Router){}
    canActivate(){
        if(!this.userService.isLoggedIn()){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
