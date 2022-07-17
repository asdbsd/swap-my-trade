import { Injectable } from '@angular/core';
import { collectionData, Firestore, DocumentReference, docData, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IProfile, IRegisterProfile } from '../shared/interfaces/profiles';
import { getCollectionReference } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private firestore: Firestore
  ) { }

  addProfile(profile: IRegisterProfile): Promise<DocumentReference> {
    return addDoc(getCollectionReference(this.firestore, 'profiles'), profile);
  }

  partialProfileUpdate(id: string, object: Object ) {
    const profileDocRef = doc(this.firestore, 'profiles', id);
    return setDoc(profileDocRef, object, { merge: true });
  }

  getProfileById(id: string) {
    const profileRef = doc(this.firestore, `profiles/${id}`);
    return docData(profileRef, { idField: '_id' }) as Observable<IProfile>;
  }

  getProfiles(): Observable<IProfile[]> {
    return collectionData(getCollectionReference(this.firestore, 'profiles'), { idField: '_id'}) as Observable<IProfile[]>;
  }




  
}
