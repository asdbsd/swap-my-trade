import { Injectable } from '@angular/core';
import { Firestore, DocumentData, addDoc, DocumentReference, doc, docData, collectionData} from '@angular/fire/firestore';
import { collection, setDoc, updateDoc, } from '@firebase/firestore';
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
  
  partialSwapUpdate(id: string, swapOffers: [{}], tradeOffers?: [{}], completed: boolean = false ) {
    const swapDocRef = doc(this.firestore, `swaps/${id}`);
    return updateDoc(swapDocRef, { swapOffers, tradeOffers, status: { completed } });
  }
  
  updateSwapOffer(id: string, swapOffers: any[]) {
    const swapDocRef = doc(this.firestore, `swaps/${id}`);
    return updateDoc(swapDocRef, { swapOffers });
  }

}


