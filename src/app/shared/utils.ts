import { collection, Firestore } from "@angular/fire/firestore"

export const getCollectionReference = (db: Firestore, reference: string) => {
  return collection(db, reference)
}

export const getErrorText = (error: any) => {
  return error.code.split('/')[1].split('-').map((v: string) => v.toLowerCase()).map((value: string) => value[0].toUpperCase() + value.slice(1)).join(' ')
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
