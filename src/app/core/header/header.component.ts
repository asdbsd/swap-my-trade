import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  constructor() { }

  
  toggleProfile(profileUl: HTMLUListElement, event: Event) {
    event.preventDefault();
    profileUl.style.display === 'none' ? profileUl.style.display = 'block' : profileUl.style.display = 'none'
  }

}
