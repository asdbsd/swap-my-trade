import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from 'src/app/shared/interfaces/profiles';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-swap-owner',
  templateUrl: './swap-owner.component.html',
  styleUrls: ['./swap-owner.component.scss']
})
export class SwapOwnerComponent implements OnInit {

  @Input() ownerId!: string;
  currentSwapOwner$!: Observable<IProfile>

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentSwapOwner$ = this.userService.getProfileById(this.ownerId);
  }

}