import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public displayCss!: string
  private profileUl!: HTMLUListElement

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.profileUl && event.target.tagName !== 'IMG') {
      this.profileUl.style.display = 'none';
    }
  }

  constructor() { }


  toggleNavigation(profileUl: HTMLUListElement, event?: any) {
    event.preventDefault();
    this.displayCss = profileUl.style.display;

    if (event.target.tagName === 'IMG') {
      this.displayCss === 'block' ? profileUl.style.display = 'none' : profileUl.style.display = 'block'
    } else if (event.target.tagName === 'A' && event.target.parentElement.nodeName === 'LI') {
      this.displayCss === 'block' ? profileUl.style.display = 'none' : profileUl.style.display = 'block'
    }
    this.displayCss = profileUl.style.display;
    this.profileUl = profileUl;

  }

}
