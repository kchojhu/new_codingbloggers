import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from "./articles/articles.component";
import {ModuleWithProviders} from "@angular/core";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const appRouters: Routes = [
  { path: 'articles', component: ArticlesComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: '', redirectTo: 'articles', pathMatch: 'full'},
  { path: '**', redirectTo: 'articles', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRouters);


