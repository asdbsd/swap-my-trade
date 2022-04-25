import { Injectable } from '@angular/core';
import { Firestore, addDoc, DocumentReference, DocumentData, collectionData} from '@angular/fire/firestore';
import { collection} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ITrade } from '../shared/interfaces/swaps';

@Injectable({
  providedIn: 'root'
})

export class TradeService {
  

  constructor(
    private firestore: Firestore
  ) { }


  addTrade(trade: ITrade): Promise<DocumentReference<DocumentData>> {
    const tradeRef = collection(this.firestore, 'trades'); 
    return addDoc(tradeRef, trade);
  }

  getTrades(): Observable<ITrade[]> {
    const tradeFer = collection(this.firestore, 'trades')
    return collectionData(tradeFer, { idField: '_id'}) as Observable<ITrade[]>;
  }


}
