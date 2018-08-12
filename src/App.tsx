import * as React from 'react';
import './App.css';

import { AppContainerComponent } from './components/App-Container/App-Container.component';
import { HeaderComponent } from './components/Header/Header.component';
import { TitleComponent } from './components/Title/Title.component';
import { white } from './config/styles/colors';
import { CurrenciesListComponent } from './containers/Currencies-List/Currencies-List.container';
import { NewCurrencyComponent } from './containers/New-Currency/New-Currency.container';

class App extends React.Component {
  public render() {
    return (
      <AppContainerComponent>
        <AppContainerComponent direction="column">
          <HeaderComponent>
            <TitleComponent big={true} color={white}> Currencies Tracker</TitleComponent>
            <NewCurrencyComponent/>
          </HeaderComponent>
          <CurrenciesListComponent/>
        </AppContainerComponent>
      </AppContainerComponent>
    );
  }
}

export default App;
