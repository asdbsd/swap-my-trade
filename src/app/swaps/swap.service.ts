import { Injectable } from '@angular/core';
import { Firestore, DocumentData, addDoc, DocumentReference} from '@angular/fire/firestore';
import { collection, } from '@firebase/firestore';
import { ISwap } from '../shared/interfaces/swaps';

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  constructor(
    private firestore: Firestore
  ) { }


  addSwap(swap: ISwap): Promise<DocumentReference<DocumentData>>{
    const swapRef = collection(this.firestore, 'books'); 
    return addDoc(swapRef, swap);
  }



}


