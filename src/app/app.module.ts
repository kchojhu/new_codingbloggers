import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import { LoginComponent } from './login/login.component';
import {UserService} from "./service/user.service";
import { ArticlesComponent } from './articles/articles.component';
import {appRoutingProviders, routing} from "./app.routing";
import { UserProfileComponent } from './user-profile/user-profile.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCxChziANeQ6qBrfdTHtSbSZE_nyIAkfv8",
  authDomain: "codingbloggers.firebaseapp.com",
  databaseURL: "https://codingbloggers.firebaseio.com",
  storageBucket: "",
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesComponent,
    UserProfileComponent
  ],
  imports: [
    routing,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService, appRoutingProviders],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

