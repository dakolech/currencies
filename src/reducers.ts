import { currenciesReducer, CurrenciesState } from './store/currencies.reducer';

export interface AppState {
  currencies: CurrenciesState,
}

export const reducers = {
  currencies: currenciesReducer,
};
