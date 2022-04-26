import { Injectable } from '@angular/core';
import { collectionData, Firestore, DocumentReference } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IProfile } from '../shared/interfaces/profiles';
import { getDbReference } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private db: Firestore
  ) { }

  addProfile(profile: IProfile): Promise<DocumentReference> {
    return addDoc(getDbReference(this.db, 'profiles'), profile);
  }

  // getProfile(id)) {
  //   return collectionData(getDbReference(this.db, 'profiles'));
  // }



  
}
