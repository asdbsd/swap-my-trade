import { collection, Firestore } from "@angular/fire/firestore"

export const getDbReference = (db: Firestore, reference: string) => {
  return collection(db, reference)
}


// userd in addSwapComponent

export const validations = {
  "notes": (note: string): boolean => {
    note.trim();
    return note !== '' && note.length < 501 && note.length >= 5
  },
  "openUntil": (date: string): boolean => {
    date.trim();
    return (new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)).test(date);
  },
  "title": (title: string): boolean => {
    title.trim();
    return title !== '' && title.length >= 5
  },
  "trade": (trade: string) => {
    trade.trim();
    return trade !== '' && trade.length >= 4
  }
}
