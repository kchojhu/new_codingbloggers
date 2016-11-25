import {Injectable, EventEmitter} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseDatabase} from "angularfire2";
import {User} from "../model/user";
import {AppEvent} from "../model/app-event";
import {AppContants} from "../app.constants";

@Injectable()
export class UserService {
  user: User;

  userEvent: EventEmitter<AppEvent> = new EventEmitter();

  constructor(private angulareFire: AngularFire) {
    this.initLogin();
  }

  private initLogin() {

    this.angulareFire.auth.subscribe((auth: any) => {

      if (auth) {
        console.info("Logged In", auth);
        let currentUser: FirebaseObjectObservable<any> = this.angulareFire.database.object("/users/" + auth.auth.uid);
        currentUser.subscribe(user=> {
            console.log("currentUser", user);
            this.user = <User> currentUser;
            if (!user.$exists()) {
              this.user.isNewUser = true;
              // currentUser.set({
              //   name: auth.auth.displayName,
              //   email: auth.auth.email,
              //   photoUrl: auth.auth.photoURL,
              //   provider: auth.auth.providerData[0].providerId,
              //   createdAt: AppContants.firebaseServerTime
              // });

            } else {
              this.user.isNewUser = false;
            }

            this.userEvent.next({
              type: 'loggedIn'
            });

          }
        );

      } else {
        console.info("Not logged in");
        this.userEvent.next({
          type: 'notLoggedIn'
        });
      }

    });
  }

  getCurrentUser(): FirebaseObjectObservable<any> {
    // let existingUser:FirebaseObjectObservable<any> = this.angulareFire.database.object("/users/" + this.user.provider + "-" + this.user.providerUserId);
    // let existingUser:FirebaseObjectObservable<any> = this.angulareFire.database.object("/users/abc-123");
    // console.log(existingUser.subscribe(data=>{
    //   console.log(data);
    // }));

    let existingUser: FirebaseObjectObservable<any> = this.angulareFire.database.object("/users/abc-456");
    console.log(existingUser);
    existingUser.set({
      test: 'blah'
    })

    return existingUser;
  }

  login(type: string) {
    switch (type) {
      case 'facebook':
        this.angulareFire.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Redirect
        });
        break;
      case 'google':
        this.angulareFire.auth.login({
          provider: AuthProviders.Google,
          method: AuthMethods.Redirect
        });
        break;
      case 'github':
        this.angulareFire.auth.login({
          provider: AuthProviders.Github,
          method: AuthMethods.Redirect
        });
        break;
      case 'twitter':
        this.angulareFire.auth.login({
          provider: AuthProviders.Twitter,
          method: AuthMethods.Redirect
        });
        break;
    }
  }

  logout() {
    this.angulareFire.auth.logout();
    this.user = null;
    this.userEvent.next({
      type: 'loggedOut'
    });
  }


}
