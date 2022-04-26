import { Injectable } from '@angular/core';
import { Firestore, addDoc, DocumentReference, DocumentData, collectionData, docData} from '@angular/fire/firestore';
import { collection, doc} from '@firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { ITrade } from '../shared/interfaces/trades'; 

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

  getTradeById(id: string) {
    const swapRef = doc(this.firestore, `trades/${id}`);
    return docData(swapRef, { idField: '_id' }) as Observable<ITrade>;
  }


}
