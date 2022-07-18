<h1 style="text-align: center;">SwapMyTrade - Practice Trade Swapping Project</h1>

This project angular version is 13.3.3.

The project is using _firebase_ for back-end and _Angular_ for front-end with _Bootstrap_.

Currently the project has basic state user state management, routing, authentication, and firebase integration for DB and Storage.



## Usage

1. Create _environment.ts_ file in _src/environments/_.
2. Add following code in _environment.ts_ file.

```
export const environment = {
    production: false,
    firebase: {
      projectId: 'swapmytrade',
      appId: '1:818348905316:web:0e156c4a0c75481aa96071',
      storageBucket: 'swapmytrade.appspot.com',
      locationId: 'europe-west',
      apiKey: 'AIzaSyBPhZ9qsORSQw6aTYbnqi6DbJZZq9fRQxg',
      authDomain: 'swapmytrade.firebaseapp.com',
      messagingSenderId: '818348905316',
      measurementId: 'G-ZKT0Z2Y76Z',
    }
  };
```
3. Run from inside project folder _npm install_ or _yarn install_ depending on your package manager to install all required node packages.
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### DEMO ACCOUNTS TO TEST FUNCTIONALITY - _Free to create your own account_
#### Account - 1
**email**: asdbsd@gmail.com
**password**:  123456
#### Account - 2
**email**: dobriyanmp@gmail.com
**password**:  123456

### SWAP FUNCTIONALITY

**Swap view as Non-Logged In**
![swap-view-as-non-logged-in](https://ibb.co/Yjh8dPq)
**Create new Swap**
![swap-view-as-non-logged-in](https://ibb.co/yhqMrct)
**Logged in user, not swap owner, offer trade view**
![logged-in-not-owner-ofer-trade](https://ibb.co/R3TgFHV)
**Logged in user, not swap owner, trade offered view**
![logged-in-not-owner-trade-offered](https://ibb.co/k2jKgwb)
**Logged in user, swap owner, trades list view**
![logged-in-owner-trades-list-view](https://ibb.co/7gt1S3s)
**Logged in user, swap owner, selected from the list view**
![logged-in-owner-trade-selected-view](https://ibb.co/dQqb0t8)









