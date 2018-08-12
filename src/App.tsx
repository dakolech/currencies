import * as React from 'react';
import './App.css';

import { CurrenciesListComponent } from './containers/Currencies-List/Currencies-List.container';
import { NewCurrencyComponent } from './containers/New-Currency/New-Currency.container';

class App extends React.Component {
  public render() {
    return (
      <div>
        <NewCurrencyComponent/>
        <CurrenciesListComponent/>
      </div>
    );
  }
}

export default App;
