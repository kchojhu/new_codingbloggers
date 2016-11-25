import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit, ElementRef
} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {AppEvent} from "../model/app-event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    '(document:click)': 'checkClickLocation($event)',
  },
  animations: [
    trigger('loginMenu', [
      state('inactive', style({
        height: 0,
        opacity: 0
      })),
      state('active', style({
        height: '*',
        opacity: 1
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginMenuState:string = 'inactive';
  isLoggedIn:boolean = null;
  user: User;

  showLoginForm() {
    this.loginMenuState = this.loginMenuState === 'inactive' ? 'active' : 'inactive';
  }

  constructor(private elementRef: ElementRef, private userService: UserService, private router:Router) {
  }

  checkClickLocation(event) {
    if (this.loginMenuState === 'active' && !this.elementRef.nativeElement.contains(event.target)) {
      this.loginMenuState = 'inactive';
    }
  }

  login(type: string) {
    this.userService.login(type);
  }

  logout() {
    this.userService.logout();
  }

  // verifyNewUser() {
  //   if (this.user.)
  // }

  ngOnInit() {
    this.userService.userEvent.subscribe((appEvent: AppEvent) => {

      switch (appEvent.type) {
        case 'notLoggedIn':
        case 'loggedOut':
          this.user = this.userService.user;
          this.isLoggedIn = false;
          break;
        case 'loggedIn':
          this.user = this.userService.user;
          console.debug('logged', this.user);
          if (this.user.isNewUser) {
            this.router.navigate(['/user-profile']);
          }
          this.isLoggedIn = true;
          break;
      }
    });
  }

}
