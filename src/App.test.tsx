import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as R from 'ramda';
import * as React from 'react';
import { Provider } from 'react-redux';
import Select  from 'react-select';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of, throwError } from 'rxjs';
import App from './App';
import { RemoveButtonComponent } from './components/Remove-Button/Remove-Button.component';
import { CurrenciesListComponent } from './containers/Currencies-List/Currencies-List.container';
import { CurrencyItemComponent } from './containers/Currencies-List/Currency-Item.container';
import { NewCurrencyComponent } from './containers/New-Currency/New-Currency.container';
import { epics } from './epics';
import { CurrenciesPayload } from './models/currencies-payload.model';
import { AppState } from './reducers';
import { api } from './services/api.service';
import {
  addCurrency,
  getCurrencies,
  getCurrenciesErr,
  getCurrenciesSuccess,
  removeCurrency
} from './store/currencies.actions';

configure({ adapter: new Adapter() });

const currencies: CurrenciesPayload[] = [{
  currency: 'dolar can.',
  code: 'CAN',
  ask: 3.2,
  bid: 3.1,
}, {
  currency: 'dolar am.',
  code: 'USD',
  ask: 4.2,
  bid: 4.1,
}, {
  currency: 'euro',
  code: 'EUR',
  ask: 4.4,
  bid: 4.3,
}, {
  currency: 'funt',
  code: 'GBP',
  ask: 5.2,
  bid: 5.1,
}];

const favourites = ['EUR', 'GBP'];
const initialState: AppState = {
  currencies: {
    isError: false,
    isPending: false,
    values: currencies,
    favourites,
  },
};

let component: ReactWrapper;
let store: any;

const payload = {
  response: [{
    rates: currencies,
  }],
};

describe('AppComponent', () => {
  beforeEach(() => {
    const epicMiddleware = createEpicMiddleware();

    const mockStore = configureStore([ epicMiddleware ]);
    store = mockStore({ ...initialState });

    epicMiddleware.run(epics);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('when component is mount', () => {
    describe('and api get is not successful', () => {
      beforeEach(() => {
        spyOn(api, 'get').and.returnValue(throwError({}));
        component = mount(
          <Provider store={store}>
            <App />
          </Provider>
        );
      });

      it('should call api to get currencies', () => {
        expect(store.getActions()[0]).toEqual(getCurrencies());
      });

      it('should call handle api get', () => {
        expect(store.getActions()[1]).toEqual(getCurrenciesErr());
      });
    });

    describe('and api get is successful', () => {
      beforeEach(() => {
        spyOn(api, 'get').and.returnValue(of(payload));
        component = mount(
          <Provider store={store}>
            <App />
          </Provider>
        );
      });

      it('should call api to get currencies', () => {
        expect(store.getActions()[0]).toEqual(getCurrencies());
      });

      it('should call handle api get', () => {
        expect(store.getActions()[1]).toEqual(getCurrenciesSuccess(currencies));
      });

      it('should show NewCurrencyComponent', () => {
        expect(component.find(NewCurrencyComponent).length).toBeTruthy();
      });

      it('should show CurrenciesListComponent', () => {
        expect(component.find(CurrenciesListComponent).length).toBeTruthy();
      });

      it('should show favourites currency items in the list', () => {
        expect(component.find(CurrencyItemComponent).length).toBe(favourites.length);
      });

      describe('when USD is selected', () => {
        const value = 'USD';
        beforeEach(() => {
          (component
            .find(Select)
            .instance() as any)
            .onChange({ value });

          component.update();
        });

        it('should call add to favourites action', () => {
          expect(R.last<any>(store.getActions())).toEqual(addCurrency(value));
        });
      });

      describe('when remove button is clicked', () => {
        const currencyIndex = 1;
        beforeEach(() => {
          component
            .find(RemoveButtonComponent)
            .at(currencyIndex)
            .simulate('click');

          component.update();
        });

        it('should call remove from favourites action', () => {
          expect(R.last<any>(store.getActions())).toEqual(removeCurrency(favourites[currencyIndex]));
        });
      });
    });
  });
});
