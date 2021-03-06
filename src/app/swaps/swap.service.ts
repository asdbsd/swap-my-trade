import { Injectable } from '@angular/core';
import { Firestore, DocumentData, addDoc, DocumentReference, doc, docData, collectionData} from '@angular/fire/firestore';
import { collection, deleteDoc, setDoc, updateDoc, } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ISwap } from '../shared/interfaces/swaps';

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  constructor(
    private firestore: Firestore
  ) { }


  addSwap(swap: ISwap): Promise<DocumentReference<DocumentData>>{
    const swapRef = collection(this.firestore, 'swaps'); 
    return addDoc(swapRef, swap);
  }

  getSwapById(id: string) {
    const swapRef = doc(this.firestore, `swaps/${id}`);
    return docData(swapRef, { idField: '_id' }) as Observable<ISwap>;
  }

  getSwaps(): Observable<ISwap[]> {
    const swapRef = collection(this.firestore, 'swaps');
    return collectionData(swapRef, { idField: '_id'}) as Observable<ISwap[]>;
  }
  
  updateSwap(swap: ISwap) {
    const bookDocRef = doc(this.firestore, `swaps`);
    return setDoc(bookDocRef, swap);
  }
  
  partialSwapUpdate(id: string, object: object ) {
    const swapDocRef = doc(this.firestore, 'swaps', id);
    return setDoc(swapDocRef, object , { merge: true });
  }
  
  deleteSwap(swap: ISwap) {
    const swapDocRef = doc(this.firestore, `swaps/${swap._id}`);
    return deleteDoc(swapDocRef);
  }
}


