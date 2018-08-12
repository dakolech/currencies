import * as React from 'react';
import './App.css';

import { NewCurrencyComponent } from './containers/new-currency/new-currency.container';

class App extends React.Component {
  public render() {
    return (
      <NewCurrencyComponent/>
    );
  }
}

export default App;
