import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { clearCurrentUser } from 'src/app/+store/actions';
import { IAppState } from 'src/app/+store/reducers';
import { currentUserSelector } from 'src/app/+store/selectors';
import { IProfile } from 'src/app/shared/interfaces/profiles';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public displayCss!: string
  private profileUl!: HTMLUListElement

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.profileUl && event.target.tagName !== 'IMG') {
      this.profileUl.style.display = 'none';
    }
  }

  
  isLoggedIn: boolean = false;
  

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {  }

  ngOnInit() {
    this.store.select(currentUserSelector).subscribe(profile => {
      this.isLoggedIn = profile !== null ? true : false
    });
  }

  toggelProfileNav(profileUl: HTMLUListElement, event?: any) {
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

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(clearCurrentUser());
    this.router.navigate(['/']);  
  }

}