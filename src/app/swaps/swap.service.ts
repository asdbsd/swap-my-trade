import { Injectable } from '@angular/core';
import { collectionData, Firestore, DocumentData, docSnapshots, addDoc} from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ISwap } from '../shared/interfaces/swaps';

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  constructor(
    private firestore: Firestore
  ) { }


  addSwap(swap: ISwap) {
    const swapRef = collection(this.firestore, 'books'); 
    return addDoc(swapRef, swap);
  }



}


