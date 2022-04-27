import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth'
import { signOut } from '@firebase/auth';
import { Store } from '@ngrx/store'
import { ILoginData } from '../shared/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private auth: Auth
  ) { }

  login({email, password}: ILoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  register({ email, password }: ILoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }


}
