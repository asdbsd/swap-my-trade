import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  constructor() { }

  

  toggleNavigation(profileUl: HTMLUListElement, event: any) {
    event.preventDefault();
    let displayCss = profileUl.style.display
    

    if(event.target.tagName === 'IMG') {
      displayCss === 'block' ? profileUl.style.display = 'none' : profileUl.style.display = 'block'
    } else if(event.target.tagName === 'A' && event.target.parentElement.nodeName === 'LI') {
      displayCss === 'block' ? profileUl.style.display = 'none' : profileUl.style.display = 'block'
    }
    
  }

}
