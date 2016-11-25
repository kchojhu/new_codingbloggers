import {
  Component, OnInit, ElementRef, Renderer
} from '@angular/core';
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private userService:UserService, private elementRef:ElementRef, private renderer:Renderer) {

  }

  ngOnInit() {
    this.userService.userEvent.subscribe((appEvent) => {
      this.renderer.setElementClass(this.elementRef.nativeElement.parentElement, 'in', true);
    });
  }

}
