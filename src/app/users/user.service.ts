import { Injectable } from '@angular/core';
import { collectionData, Firestore, DocumentReference, docData } from '@angular/fire/firestore';
import { addDoc, collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IProfile, IRegisterProfile } from '../shared/interfaces/profiles';
import { getCollectionReference } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private db: Firestore
  ) { }

  addProfile(profile: IRegisterProfile): Promise<DocumentReference> {
    return addDoc(getCollectionReference(this.db, 'profiles'), profile);
  }

  getProfileById(id: string) {
    const swapRef = doc(this.db, `profiles/${id}`);
    return docData(swapRef, { idField: '_id' }) as Observable<IProfile>;
  }

  getProfiles(): Observable<IProfile[]> {
    return collectionData(getCollectionReference(this.db, 'profiles'), { idField: '_id'}) as Observable<IProfile[]>;
  }



  
}
